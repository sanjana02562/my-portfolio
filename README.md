Personal Portfolio 🌐

This is my personal portfolio website built with Flask and Bootstrap.
It showcases my skills, projects, and a contact form to reach me.

---

🚀 Features

🖼️ Hero section with introduction

🙋 About Me section with profile picture and bio

💼 Projects showcase with links

📩 Contact form with email integration (Flask-Mail)

🎨 Responsive UI with custom CSS

---

🛠️ Tech Stack

Backend: Flask, SQLAlchemy

Frontend: HTML, CSS, Bootstrap

Database: SQLite

Email Service: Flask-Mail (SMTP with Gmail)

---

📂 Project Structure
my_portfolio/
│── app.py
│── requirements.txt
│── .env (not tracked in Git)
│── instance/portfolio.db
│── portfolio/
│   ├── routes/
│   ├── models.py
│   └── extensions.py
│── static/
│   ├── css/
│   ├── images/
│── templates/
│── README.md
└── .gitignore

---

⚡ Setup Instructions

Clone the repository

git clone https://github.com/your-username/portfolio.git
cd portfolio


Create a virtual environment

python -m venv venv
source venv/bin/activate  # for Linux/Mac
venv\Scripts\activate     # for Windows


Install dependencies

pip install -r requirements.txt


Set up environment variables (.env)

SECRET_KEY=your_secret_key
DATABASE_URI=sqlite:///portfolio.db
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


Run the app

flask run
