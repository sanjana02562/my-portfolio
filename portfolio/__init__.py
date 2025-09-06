from flask import Flask
from .extensions import db, mail, login_manager
from .models import User
from .routes.main import main
from .routes.admin import admin

def create_app(config_class="config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Init extensions
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = "admin.login"

    # Blueprints
    app.register_blueprint(main)
    app.register_blueprint(admin, url_prefix="/admin")

    with app.app_context():
        db.create_all()

    return app

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
