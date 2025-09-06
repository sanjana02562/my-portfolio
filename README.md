# 🌟 Sanjana Raj - Portfolio Website  

Welcome to my personal portfolio built with **Flask** and **Bootstrap**.  
This site showcases my skills, projects, and provides a way to get in touch with me.  

---

## ✨ Features  
✅ Modern responsive design  
✅ About Me section with profile picture  
✅ Dynamic Projects showcase  
✅ Contact form with email integration  
✅ Built with Flask & SQLAlchemy  

---

## 🛠 Tech Stack  
- **Backend:** Flask, SQLAlchemy  
- **Frontend:** HTML, CSS, Bootstrap  
- **Database:** SQLite  
- **Email Service:** Flask-Mail (SMTP with Gmail)  

---

## 📂 Project Structure  
MY_PORTFOLIO/
│── app.py
│── config.py
│── requirements.txt
│── README.md
│── .gitignore
│── instance/
│ └── portfolio.db # SQLite database (ignored in Git)
│── portfolio/
│ ├── init.py
│ ├── extensions.py
│ ├── models.py
│ ├── routes/
│ ├── static/
│ │ ├── css/
│ │ ├── images/
│ │ └── js/
│ └── templates/
│ ├── index.html
│ ├── contact.html
│ └── base.html
│── venv/ # Virtual environment (ignored in Git)
└── pycache/ # Python cache files (ignored in Git)

---

## ⚡ Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/sanjana02562/portfolio.git
   cd portfolio


2. **Create a virtual environment**
    ```bash
    python -m venv venv
    source venv/bin/activate  # for Linux/Mac
    venv\Scripts\activate     # for Windows


3. **Install dependencies**
    ```bash
    pip install -r requirements.txt


4. **Set up environment variables (.env)**
    ```ini
    SECRET_KEY=your_secret_key
    DATABASE_URI=sqlite:///portfolio.db
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password


5. **Run the application**
    ```bash
    flask run
