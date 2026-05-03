# Docker Deployment Pipeline: GitHub to Hugging Face Spaces

This guide deploys the Flask portfolio app to Hugging Face Spaces using Docker.

## 1. Prepare the Project Locally

Make sure these files exist in the project root:

```text
Dockerfile
.dockerignore
requirements.txt
README.md
head.py
templates/
static/
image/
```

The Dockerfile should run the Flask app on port `7860`, because Hugging Face Spaces expects web apps to listen on that port.

## 2. Check the Dockerfile

Use this Dockerfile:

```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=7860

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . .

EXPOSE 7860

CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-7860} --workers 1 --timeout 180 head:head"]
```

Important part:

```text
head:head
```

The first `head` is the Python file `head.py`.
The second `head` is the Flask app object inside that file:

```python
head = Flask(__name__)
```

## 3. Check Requirements

Your `requirements.txt` should include:

```text
Flask==2.2.5
flask-cors==3.0.10
python-dotenv==1.0.1
transformers==4.40.1
torch>=1.13.0
email-validator==2.1.0.post1
gunicorn==22.0.0
```

`gunicorn` is required because the Docker container should not use Flask's debug server in production.

## 4. Check `.dockerignore`

Use this `.dockerignore`:

```text
.git
.gitignore
.gitattributes
.env
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
pip-wheel-metadata/
.pytest_cache/
.mypy_cache/
.ruff_cache/
screenshots/
```

This prevents secrets, virtual environments, and cache files from being copied into the Docker image.

## 5. Add Hugging Face Space Metadata

At the top of `README.md`, add:

```yaml
---
title: Harshad Personal Portfolio
emoji: 🚀
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
---
```

The important lines are:

```yaml
sdk: docker
app_port: 7860
```

They tell Hugging Face to build the Space using Docker and expose port `7860`.

## 6. Push Code to GitHub

Initialize Git if needed:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Add Docker deployment for Hugging Face"
```

Add your GitHub remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Push to GitHub:

```bash
git branch -M main
git push -u origin main
```

Do not commit `.env`.

## 7. Create a Hugging Face Space

Go to:

```text
https://huggingface.co/new-space
```

Choose:

```text
Owner: your Hugging Face account
Space name: your project name
License: your preferred license
SDK: Docker
Visibility: Public or Private
```

Create the Space.

## 8. Connect Local Repo to Hugging Face

Install Git LFS if Hugging Face asks for it:

```bash
git lfs install
```

Add the Hugging Face Space as another remote:

```bash
git remote add space https://huggingface.co/spaces/YOUR_HF_USERNAME/YOUR_SPACE_NAME
```

Push your GitHub code to Hugging Face:

```bash
git push space main
```

If Hugging Face rejects the branch name, push like this:

```bash
git push space main:main
```

## 9. Add Environment Variables on Hugging Face

Your app uses email credentials, so add them as Hugging Face secrets.

Open your Space:

```text
Settings > Variables and secrets
```

Add these as secrets:

```text
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Use a Gmail app password, not your normal Gmail password.

## 10. Build and Run

After pushing, Hugging Face will automatically build the Docker image.

You can watch the logs here:

```text
Your Space > Logs
```

When the build succeeds, open:

```text
https://huggingface.co/spaces/YOUR_HF_USERNAME/YOUR_SPACE_NAME
```

## 11. Update Deployment After Code Changes

Make changes locally, then push to both GitHub and Hugging Face:

```bash
git add .
git commit -m "Update portfolio app"
git push origin main
git push space main
```

Hugging Face will rebuild automatically after every push.

## 12. Optional: Deploy From GitHub Automatically

If you want GitHub to deploy to Hugging Face automatically, create a GitHub Actions workflow.

Create this file:

```text
.github/workflows/deploy-to-huggingface.yml
```

Add:

```yaml
name: Deploy to Hugging Face Space

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          lfs: true

      - name: Push to Hugging Face Space
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: |
          git config --global user.email "actions@github.com"
          git config --global user.name "github-actions"
          git remote add space https://harshad:${HF_TOKEN}@huggingface.co/spaces/YOUR_HF_USERNAME/YOUR_SPACE_NAME
          git push space main --force
```

Then add this secret in GitHub:

```text
Settings > Secrets and variables > Actions > New repository secret
```

Secret name:

```text
HF_TOKEN
```

Create a Hugging Face token here:

```text
https://huggingface.co/settings/tokens
```

The token needs write access.

## 13. Common Problems

### App does not open

Check that the app listens on port `7860`.

This Dockerfile already does that:

```text
--bind 0.0.0.0:${PORT:-7860}
```

### Build is slow

The app installs `torch` and downloads GPT-2, so the first build can take time.

### Chatbot is slow on first request

The model loads at startup. Hugging Face may take extra time when restarting the Space.

### Email form fails

Check these Hugging Face secrets:

```text
EMAIL_ADDRESS
EMAIL_PASSWORD
```

Also confirm the Gmail account uses an app password.

### Space restarts or crashes

Check the logs. If memory is the issue, GPT-2 and PyTorch may be too heavy for the free CPU Space. You can either upgrade the Space hardware or replace GPT-2 with a lighter API-based model.

## 14. Full Deployment Flow

Short version:

```bash
git add .
git commit -m "Add Docker deployment"
git push origin main
git remote add space https://huggingface.co/spaces/YOUR_HF_USERNAME/YOUR_SPACE_NAME
git push space main
```

Then add secrets on Hugging Face:

```text
EMAIL_ADDRESS
EMAIL_PASSWORD
```

After that, Hugging Face builds and hosts the app automatically.
