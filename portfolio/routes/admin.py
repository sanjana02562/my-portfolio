from flask import Blueprint, render_template, redirect, request, flash, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from ..models import User, Project, Message

admin = Blueprint("admin", __name__)

@admin.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for("admin.dashboard"))
        flash("Invalid credentials", "danger")
    return render_template("admin/login.html")

@admin.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("admin.login"))

@admin.route("/dashboard")
@login_required
def dashboard():
    projects = Project.query.all()
    messages = Message.query.all()
    return render_template("admin/dashboard.html", projects=projects, messages=messages)

@admin.route("/projects/add", methods=["POST"])
@login_required
def add_project():
    title = request.form["title"]
    description = request.form["description"]
    link = request.form["link"]
    project = Project(title=title, description=description, link=link)
    db.session.add(project)
    db.session.commit()
    flash("Project added!", "success")
    return redirect(url_for("admin.dashboard"))
