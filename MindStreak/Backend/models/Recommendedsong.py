from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class RecommendedSong(db.Model):
    __tablename__ = 'recommended_songs'

    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String(50), nullable=False)
    song_name = db.Column(db.String(120), nullable=False)
    artist_name = db.Column(db.String(120), nullable=False)
    cover_url = db.Column(db.String(300))
    preview_url = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Assumes a User model
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "mood": self.mood,
            "song_name": self.song_name,
            "artist_name": self.artist_name,
            "cover_url": self.cover_url,
            "preview_url": self.preview_url,
            "timestamp": self.timestamp.isoformat(),
        }
    @classmethod
    def save_from_api(cls, mood, track, user_id=None):
        song = cls(
            mood=mood,
            song_name=track["name"],
            artist_name=track["artist"],
            cover_url=track["cover"],
            preview_url=track.get("preview_url"),  # handle None safely
            user_id=user_id
    )
        db.session.add(song)
        db.session.commit()
        return song

