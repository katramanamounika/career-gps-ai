"""User storage with a local-development fallback when MongoDB is unreachable."""
import json
import os
from pathlib import Path
from threading import Lock

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

_lock = Lock()
_local_file = Path(__file__).resolve().parent.parent / "data" / "users.json"
_collection = None
_remote_checked = False


def _get_collection():
    """Connect once. DNS/network problems should never prevent local use."""
    global _collection, _remote_checked
    if _remote_checked:
        return _collection
    _remote_checked = True
    uri = os.getenv("MONGO_URI")
    if not uri:
        return None
    try:
        client = MongoClient(uri, connectTimeoutMS=2500, serverSelectionTimeoutMS=2500)
        client.admin.command("ping")
        _collection = client["career_gps_ai"]["users"]
    except Exception:
        _collection = None
    return _collection


def _read_local():
    if not _local_file.exists():
        return []
    try:
        return json.loads(_local_file.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []


def _write_local(users):
    _local_file.parent.mkdir(parents=True, exist_ok=True)
    _local_file.write_text(json.dumps(users, indent=2), encoding="utf-8")


def find_user(email: str):
    collection = _get_collection()
    if collection is not None:
        return collection.find_one({"email": email})
    with _lock:
        return next((user for user in _read_local() if user.get("email") == email), None)


def create_user(user: dict):
    collection = _get_collection()
    if collection is not None:
        collection.insert_one(user)
        return "mongodb"
    with _lock:
        users = _read_local()
        users.append(user)
        _write_local(users)
    return "local"


def update_password(email: str, password: str) -> bool:
    collection = _get_collection()
    if collection is not None:
        return collection.update_one({"email": email}, {"$set": {"password": password}}).matched_count > 0
    with _lock:
        users = _read_local()
        for user in users:
            if user.get("email") == email:
                user["password"] = password
                _write_local(users)
                return True
    return False
