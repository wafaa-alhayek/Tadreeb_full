"""Arabic PDF documents: the guidance letter (FR-17) and the certificate (FR-34).

ReportLab draws glyphs left to right and doesn't join Arabic letters, so every Arabic
string goes through ar(): arabic_reshaper joins the letters and python-bidi puts them in
display order. Brackets come out mirrored, so the texts below avoid them.
The Amiri font (SIL Open Font License, fonts/OFL.txt) ships with the code so the server
doesn't need an Arabic font installed.
"""

from io import BytesIO
from pathlib import Path

import arabic_reshaper
from bidi import get_display
from django.conf import settings
from django.utils import timezone
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONTS = Path(__file__).resolve().parent / "fonts"
REGULAR, BOLD = "Amiri", "Amiri-Bold"
BRAND = colors.HexColor("#1F4E79")


def register_fonts():
    if REGULAR not in pdfmetrics.getRegisteredFontNames():
        pdfmetrics.registerFont(TTFont(REGULAR, str(FONTS / "Amiri-Regular.ttf")))
        pdfmetrics.registerFont(TTFont(BOLD, str(FONTS / "Amiri-Bold.ttf")))


def ar(text):
    return get_display(arabic_reshaper.reshape(str(text)))


def wrap(text, font, size, width):
    """Split `text` into lines no wider than `width` points, breaking between words."""
    lines, line = [], ""
    for word in str(text).split():
        candidate = f"{line} {word}".strip()
        if line and pdfmetrics.stringWidth(ar(candidate), font, size) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    return lines


class Page:
    """A canvas that writes right-aligned Arabic lines from the top of the page down."""

    def __init__(self, buffer, pagesize, margin=2.2 * cm):
        register_fonts()
        self.canvas = canvas.Canvas(buffer, pagesize=pagesize)
        self.width, self.height = pagesize
        self.margin = margin
        self.right = self.width - margin
        self.y = self.height - margin

    def line(self, text, size=14, font=REGULAR, gap=1.7, color=colors.black):
        self.canvas.setFont(font, size)
        self.canvas.setFillColor(color)
        self.canvas.drawRightString(self.right, self.y, ar(text))
        self.y -= size * gap

    def paragraph(self, text, size=14, font=REGULAR, gap=1.7):
        for part in wrap(text, font, size, self.right - self.margin):
            self.line(part, size, font, gap)

    def centered(self, text, size=14, font=REGULAR, gap=1.7, color=colors.black):
        self.canvas.setFont(font, size)
        self.canvas.setFillColor(color)
        self.canvas.drawCentredString(self.width / 2, self.y, ar(text))
        self.y -= size * gap

    def space(self, points):
        self.y -= points

    def rule(self):
        self.canvas.setStrokeColor(BRAND)
        self.canvas.setLineWidth(1.2)
        self.canvas.line(self.margin, self.y, self.right, self.y)
        self.y -= 18

    def qr(self, value, x, y, size=3.2 * cm):
        widget = QrCodeWidget(value)
        left, bottom, right, top = widget.getBounds()
        drawing = Drawing(size, size, transform=[size / (right - left), 0, 0, size / (top - bottom), 0, 0])
        drawing.add(widget)
        renderPDF.draw(drawing, self.canvas, x, y)

    def finish(self):
        self.canvas.showPage()
        self.canvas.save()


def full_name(user):
    return user.get_full_name() or user.username


def guidance_letter(placement):
    """FR-17: the letter that introduces the student to the training provider."""
    application = placement.application
    student = application.student
    profile = getattr(student, "student_profile", None)
    opportunity = placement.opportunity
    provider = opportunity.provider

    buffer = BytesIO()
    page = Page(buffer, A4)
    page.centered(settings.TADREEB_INSTITUTION_NAME, 22, BOLD, color=BRAND)
    page.centered("وحدة التدريب الميداني", 15, gap=1.4)
    page.rule()
    page.line(f"الرقم: TDR-L-{placement.pk:05d}", 12, gap=1.4)
    page.line(f"التاريخ: {timezone.localdate():%Y-%m-%d}", 12)
    page.space(10)
    page.centered("كتاب توجيه لتدريب ميداني", 19, BOLD, gap=2.2)

    page.line(f"السادة / {provider.name} المحترمين", 15, BOLD)
    page.line("تحية طيبة وبعد،", 14)
    page.paragraph(
        "نرجو التكرم بقبول الطالب المذكورة بياناته أدناه لقضاء فترة التدريب الميداني لديكم، "
        "وذلك ضمن متطلبات التخرج، مع الشكر الجزيل لتعاونكم."
    )
    page.space(6)

    rows = [
        ("اسم الطالب", full_name(student)),
        ("الرقم الجامعي", student.username),
        ("القسم", profile.department.name if profile and profile.department else "-"),
        ("التخصص", profile.specialization.name if profile and profile.specialization else "-"),
        ("فرصة التدريب", opportunity.title),
        ("موقع التدريب", opportunity.location),
        ("فترة التدريب", f"من {placement.start_date:%Y-%m-%d} إلى {placement.end_date:%Y-%m-%d}"),
        ("المشرف الأكاديمي", full_name(application.supervisor) if application.supervisor else "-"),
    ]
    for label, value in rows:
        page.line(f"{label}: {value}", 13, gap=1.75)

    page.space(10)
    page.paragraph(
        "يرجى من جهة التدريب تأكيد حضور الطالب اليومي عبر النظام، وتعبئة نموذج التقييم في نهاية الفترة.",
        13,
    )
    page.space(24)
    page.line("وتفضلوا بقبول فائق الاحترام،", 14)
    page.line("منسق التدريب الميداني", 14, BOLD)
    page.finish()
    return buffer.getvalue()


def certificate_pdf(certificate, verify_url):
    """FR-34: the certificate, with a QR code that opens the public check (FR-35)."""
    buffer = BytesIO()
    page = Page(buffer, landscape(A4), margin=2 * cm)
    c = page.canvas
    c.setStrokeColor(BRAND)
    c.setLineWidth(4)
    c.rect(1 * cm, 1 * cm, page.width - 2 * cm, page.height - 2 * cm)
    c.setLineWidth(1)
    c.rect(1.3 * cm, 1.3 * cm, page.width - 2.6 * cm, page.height - 2.6 * cm)

    page.y -= 0.6 * cm
    page.centered(settings.TADREEB_INSTITUTION_NAME, 24, BOLD, color=BRAND)
    page.centered("شهادة إتمام تدريب ميداني", 30, BOLD, gap=2.2, color=BRAND)
    page.centered("تشهد وحدة التدريب الميداني بأن الطالب", 16, gap=2.6)
    page.centered(certificate.student_name, 26, BOLD, gap=1.8)
    page.centered(f"الرقم الجامعي: {certificate.university_id}", 14)
    if certificate.specialization:
        page.centered(f"التخصص: {certificate.specialization}", 14)
    page.centered(
        f"قد أتم التدريب الميداني لدى {certificate.provider_name} في {certificate.opportunity_title}", 16
    )
    page.centered(
        f"خلال الفترة من {certificate.start_date:%Y-%m-%d} إلى {certificate.end_date:%Y-%m-%d}"
        f" بمجموع {certificate.total_hours.normalize():f} ساعة تدريبية",
        16,
    )

    issued = timezone.localtime(certificate.issued_at)
    c.setFont(REGULAR, 12)
    c.setFillColor(colors.black)
    c.drawRightString(page.right, 3.6 * cm, ar(f"رقم الشهادة: {certificate.serial_number}"))
    c.drawRightString(page.right, 2.9 * cm, ar(f"تاريخ الإصدار: {issued:%Y-%m-%d}"))
    c.setFont(BOLD, 14)
    c.drawCentredString(page.width / 2, 3.2 * cm, ar("منسق التدريب الميداني"))

    page.qr(verify_url, page.margin, 2 * cm)
    c.setFont(REGULAR, 9)
    c.drawString(page.margin, 1.6 * cm, ar("امسح الرمز للتحقق من الشهادة"))
    page.finish()
    return buffer.getvalue()
