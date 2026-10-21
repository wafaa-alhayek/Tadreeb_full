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
touch "/var/www/${USER}_pythonanywhere_com_wsgi.py"
echo "Deployed. Open https://${USER}.pythonanywhere.com/api/docs/"
