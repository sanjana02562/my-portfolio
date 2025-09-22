from flask import Flask
from .extensions import db, mail, login_manager
from flask_migrate import Migrate
import os
from .routes.main import main
from .models import User  # make sure User is imported for login_manager

def create_app(config_class="config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Flask-Mail configuration
    app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
    app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT"))
    app.config['MAIL_USE_SSL'] = os.getenv("MAIL_USE_SSL") == 'True'
    app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS") == 'True'  # Add this
    app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USER")
    app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(main)

    return app

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
