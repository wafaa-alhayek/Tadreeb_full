// صفحة مؤقتة للشاشات اللي لسا ما انبنت. بتوضح الوحدة (Module) والمسؤول.
import Card from '../components/Card.jsx'

export default function PlaceholderPage({ title, module, owner }) {
  return (
    <Card title={title}>
      <p className="text-gray-500">
        🚧 هاي الصفحة لسا ما انبنت.
        {module && <> بتنبني بـ <b>الوحدة {module}</b></>}
        {owner && <> — المسؤول: <b>{owner}</b></>}
      </p>
    </Card>
  )
}
