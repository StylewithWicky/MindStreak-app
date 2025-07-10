from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models.Moodlog import MoodLog
from models.Recommendedsong import RecommendedSong
from models import db
from controllers.Spotify_controller import get_spotify_recommendation

mood_bp = Blueprint('mood_bp', __name__)

# POST /api/moodlog
@mood_bp.route('/moodlog', methods=['POST'])
@jwt_required()
def save_mood():
    current_user = get_jwt_identity()
    data = request.get_json()
    print("🔥 Received data:", data)

    mood = data.get("mood")
    entry = data.get("entry")

    if not mood or not entry:
        return jsonify({"error": "Mood and entry required"}), 400

    # Save MoodLog
    new_log = MoodLog(mood=mood, journal=entry, user_id=current_user, created_at=datetime.utcnow())
    db.session.add(new_log)
    db.session.commit()

    try:
        # Get song recommendation from Spotify
        track = get_spotify_recommendation(mood)
        print("🎵 Track from Spotify:", track)

        if track:
            saved_song = RecommendedSong.save_from_api(mood, track, user_id=current_user)
            return jsonify({
                "message": "Mood saved with song recommendation",
                "music": saved_song.to_dict()
            }), 201
        else:
            return jsonify({"message": "Mood saved, but no song found."}), 201

    except Exception as e:
        print("❌ Error in saving song:", e)
        return jsonify({"error": str(e)}), 422


# GET /api/history
@mood_bp.route('/history', methods=['GET'])
@jwt_required()
def get_mood_history():
    current_user = get_jwt_identity()
    logs = MoodLog.query.filter_by(user_id=current_user).order_by(MoodLog.created_at.desc()).all()
    history = [
        {
            "mood": log.mood,
            "entry": log.journal,
            "date": log.created_at.strftime("%Y-%m-%d %H:%M")
        }
        for log in logs
    ]
    return jsonify(history) 