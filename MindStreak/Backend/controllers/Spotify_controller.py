import os
import base64
import requests
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv

load_dotenv()

spotify_bp = Blueprint("spotify_bp", __name__)

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

def get_access_token():
    auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth_str}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "client_credentials"
    }

    r = requests.post("https://accounts.spotify.com/api/token", headers=headers, data=data)
    return r.json().get("access_token")

def get_spotify_recommendation(query):
    access_token = get_access_token()
    if not access_token:
        return None

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    params = {
        "q": query,
        "type": "track",
        "limit": 1
    }

    r = requests.get("https://api.spotify.com/v1/search", headers=headers, params=params)
    data = r.json()

    items = data.get("tracks", {}).get("items", [])
    if not items:
        return None

    item = items[0]
    return {
        "name": item["name"],
        "artist": item["artists"][0]["name"],
        "cover": item["album"]["images"][0]["url"],
        "preview_url": item.get("preview_url")
    }


    r = requests.get("https://api.spotify.com/v1/search", headers=headers, params=params)
    data = r.json()

    tracks = []
    for item in data.get("tracks", {}).get("items", []):
        tracks.append({
            "name": item["name"],
            "artist": item["artists"][0]["name"],
            "cover": item["album"]["images"][0]["url"],
            "preview_url": item.get("preview_url")
        })

    return jsonify(tracks)
