from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from transformers import pipeline
import smtplib
from email.message import EmailMessage
import os
import re
from dotenv import load_dotenv
import logging
from transformers import pipeline
from flask_cors import CORS


# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize Flask App
head = Flask(__name__, template_folder="templates", static_folder="static")
CORS(head)  # Enable CORS for frontend communication

# === GPT-2 Model Initialization ===
try:
    llm = pipeline("text-generation", model="gpt2")
    print("✅ GPT-2 Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading GPT-2 model: {e}")
    llm = None

# === Email Credentials ===
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
    logging.error("❌ EMAIL_ADDRESS or EMAIL_PASSWORD is missing in .env file!")

def is_valid_email(email):
    """Validate email format using regex."""
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email)

# === ROUTES ===

@head.route('/')
def splash():
    return render_template('star.html')

@head.route('/index')
def index():
    return render_template('index.html')

@head.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')


@head.route('/ask', methods=["POST"])
def ask():
    user_question = request.json.get("question", "").strip()

    if not user_question:
        return jsonify({"answer": "⚠️ Please enter a valid question!"})

    if not llm:
        return jsonify({"answer": "⚠️ Model loading failed. Please try again later."})

    try:
        result = llm(user_question, max_length=100, num_return_sequences=1, truncation=True)
        answer = result[0]["generated_text"]
        clean_answer = answer.replace(user_question, "").strip()
        return jsonify({"answer": clean_answer})
    except Exception as e:
        return jsonify({"answer": f"❌ Error generating response: {e}"})


@head.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({"message": "⚠️ All fields are required!"}), 400

    if not is_valid_email(email):
        return jsonify({"message": "❌ Invalid email format!"}), 400

    msg = EmailMessage()
    msg.set_content(f"📩 New Contact Form Submission\n\n👤 Name: {name}\n📧 Email: {email}\n✉️ Message:\n{message}")
    msg["Subject"] = f"New Message from {name} ({email})"
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = EMAIL_ADDRESS
    msg["Reply-To"] = email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        logging.info(f"✅ Email received from {email}")
        return jsonify({"message": "✅ Message sent successfully!"})
    except smtplib.SMTPAuthenticationError:
        logging.error("❌ SMTP Authentication failed!")
        return jsonify({"message": "❌ SMTP Authentication failed. Check your credentials!"}), 500
    except Exception as e:
        logging.error(f"❌ Error sending email: {str(e)}")
        return jsonify({"message": f"❌ Error: {str(e)}"}), 500

@head.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(head.static_folder, filename)

@head.route('/image/<path:filename>')
def serve_image(filename):
    return send_from_directory("image", filename)

# === Run App ===
if __name__ == '__main__':
    head.run(debug=True)
