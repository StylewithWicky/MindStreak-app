from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .Recommendedsong import RecommendedSong

db = SQLAlchemy()
jwt = JWTManager()

