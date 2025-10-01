from flask import Blueprint, render_template, request, redirect, flash
from ..extensions import db, mail
from ..models import Project, Message
from flask_mail import Message as MailMessage
import os
import traceback


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

            # Save message to database
            msg = Message(name=name, email=email, mobile=mobile, position=position, content=content)
            db.session.add(msg)
            db.session.commit()

            # Get email settings with fallback
            sender_email = os.getenv("EMAIL_USER") or "noreply@example.com"
            recipient_email = os.getenv("EMAIL_USER") or "you@example.com"
            
            if not sender_email or not recipient_email:
                flash("Email settings are not configured properly.", "danger")
                return redirect("/")

            # Prepare email
            email_msg = MailMessage(
                subject=f"New Portfolio Message from {name}",
                recipients=[recipient_email],
                body=f"From: {name} ({email})\nMobile: {mobile}\nPosition: {position}\n\n{content}",
                sender=sender_email
            )

            # Send email
            mail.send(email_msg)

            flash("Message sent successfully!", "success")

        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.exception("Error sending contact form message")
            flash("Something went wrong. Please try again later.", "danger")

        return redirect("/")
    
    return redirect("/")


