from flask import Blueprint, render_template, request, redirect, flash
from ..extensions import db, mail
from ..models import Project, Message
from flask_mail import Message as MailMessage
import os

main = Blueprint("main", __name__)

@main.route("/")
def index():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return render_template("index.html", projects=projects)

@main.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        try:
            # Get form data
            name = request.form.get("name")
            email = request.form.get("email")
            mobile = request.form.get("mobile")
            position = request.form.get("position")
            content = request.form.get("message")

            # Save in database
            msg = Message(name=name, email=email, mobile=mobile, position=position, content=content)
            db.session.add(msg)
            db.session.commit()

            # Send email
            email_msg = MailMessage(
                subject="New Portfolio Message",
                recipients=[os.getenv("EMAIL_USER")],
                body=f"From: {name} ({email})\nMobile: {mobile}\nPosition: {position}\n\nMessage:\n{content}",
                sender=os.getenv("EMAIL_USER")
            )
            mail.send(email_msg)

            flash("Message sent successfully!", "success")
        except Exception as e:
            print("Error:", e)
            flash("Something went wrong. Please try again later.", "danger")

        return redirect("/")  # redirect to home page (index.html)
    return redirect("/")  # fallback


