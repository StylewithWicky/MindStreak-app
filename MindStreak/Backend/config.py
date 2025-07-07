import os
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv("JWT_SECRET_KEY")  
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
    SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, os.getenv("DATABASE_FILENAME", "moods.db"))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
