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
        name = request.form["name"]
        email = request.form["email"]
        content = request.form["message"]

        msg = Message(name=name, email=email, content=content)
        db.session.add(msg)
        db.session.commit()

        email_msg = MailMessage(
            subject="New Portfolio Message",
            recipients=[os.getenv("EMAIL_USER")],
            body=f"From: {name} ({email})\n\n{content}",
            sender=email
        )
        mail.send(email_msg)

        flash("Message sent successfully!", "success")
        return redirect("/contact")
    return render_template("contact.html")
