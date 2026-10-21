#!/bin/bash
# Deploys the latest main on PythonAnywhere. Run it from a PythonAnywhere Bash console:
#   bash ~/Tadreeb_full/backend/deploy/update.sh
set -e

cd ~/Tadreeb_full
git checkout main
git pull origin main

cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py check --deploy --fail-level ERROR

# Touching the WSGI file makes PythonAnywhere reload the web app.
# Its name uses the lowercased username (FTPlatform -> ftplatform_pythonanywhere_com_wsgi.py).
WSGI_FILE="/var/www/${USER,,}_pythonanywhere_com_wsgi.py"
if [ ! -f "$WSGI_FILE" ]; then
    echo "WSGI file $WSGI_FILE not found: reload the web app from the Web tab instead."
    exit 1
fi
touch "$WSGI_FILE"
echo "Deployed. Open https://${USER,,}.pythonanywhere.com/api/docs/"
