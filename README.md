# Harshad's Personal Portfolio

A responsive personal portfolio website for Harshad Chaudhari, built with Flask, HTML, CSS, and JavaScript. The site includes a space-themed splash screen, portfolio sections, project highlights, a contact form, and an AI chatbot powered by Hugging Face Transformers.

## Features

- Space-themed animated landing screen
- Responsive portfolio layout
- About, skills, projects, and contact sections
- Animated typing effect on the home section
- Contact form with email delivery through Gmail SMTP
- AI chatbot page using a local GPT-2 text-generation pipeline
- Dark mode toggle on the chatbot page

## Screenshots

![Landing page](./screenshots/landing.png)

![Chatbot page](./screenshots/Chatbot.png)

## Tech Stack

- Python
- Flask
- Flask-CORS
- HTML5
- CSS3
- JavaScript
- Hugging Face Transformers
- PyTorch
- Gmail SMTP

## Project Structure

```text
.
+-- head.py                 # Main Flask application
+-- llm_model.py            # Optional LLM wrapper for GPT-2 text generation
+-- requirements.txt        # Python dependencies
+-- CNAME                   # Custom domain configuration
+-- documents/              # Resume and document assets
+-- image/                  # Portfolio images and skill icons
+-- screenshots/            # README screenshots
+-- static/
|   +-- scripts.js          # Frontend JavaScript
|   +-- styles.css          # Main stylesheet
+-- templates/
    +-- star.html           # Splash animation page
    +-- index.html          # Main portfolio page
    +-- chatbot.html        # AI chatbot interface
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

On macOS or Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add environment variables

Create a `.env` file in the project root:

```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Use a Gmail app password instead of your normal account password.

### 5. Run the app

```bash
python head.py
```

Open the app in your browser:

```text
http://127.0.0.1:5000
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Space-themed splash screen |
| `/index` | Main portfolio page |
| `/chatbot` | AI chatbot interface |
| `/ask` | Chatbot API endpoint |
| `/submit` | Contact form submission endpoint |

## Notes

- The chatbot loads GPT-2 through `transformers.pipeline`, so the first run may take time while the model downloads.
- The contact form requires valid Gmail SMTP credentials in `.env`.
- The site uses external CDNs for icons, fonts, animations, and typed text effects.

## Author

Harshad Chaudhari

- GitHub: [HarshadChaudhari49](https://github.com/HarshadChaudhari49)
- LinkedIn: [Harshad Chaudhari](https://www.linkedin.com/in/-harshad-chaudhari)
- Email: [engg.harshad49@gmail.com](mailto:engg.harshad49@gmail.com)
