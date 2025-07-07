from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from controllers.auth_controllers import user_bp
from controllers.login_controller import login_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ✅ CORS setup
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    db.init_app(app)

    # ✅ Register Blueprints
    app.register_blueprint(user_bp)
    app.register_blueprint(login_bp)

    # ✅ Create DB tables
    with app.app_context():
        db.create_all()

    return app
