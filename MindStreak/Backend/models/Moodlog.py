from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class MoodLog(db.Model):
    __tablename__ = 'mood_logs'

    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String(50), nullable=False)
    journal = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "mood": self.mood,
            "journal": self.journal,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id
        }
