from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Note, db


note_routes = Blueprint("notes", __name__)


@note_routes.route("/", methods=["POST"])
@login_required
def notes():
    body = request.get_json()
    new_note = Note(
        name=body.get("name"),
        content=body.get("content"),
        user_id=session["_user_id"],
        notebook_id=body.get("notebookId", None),
        private=body.get("private"),
        notes_url=body.get("notesUrl", None)
    )
    db.session.add(new_note)
    db.session.commit()
    return {new_note.id: new_note.to_dict()}


@note_routes.route("/<int:noteId>", methods=["GET", "PUT", "DELETE"])
@login_required
def update_note(noteId):
    note = Note.query.get(noteId)
    if request.method == "GET":
        return {note.id: note.to_dict()}
    elif request.method == "PUT":
        body = request.get_json()
        note.name = request.get_json("name", note.name)
        note.content = request.get_json("content", note.content)
        note.private = request.get_json("private", note.private)
        note.notes_url = request.get_json("notesUrl", note.notes_url)
        db.session.commit()
        return {note.id: note.to_dict()}
    elif request.method == "DELETE":
        db.session.delete(note)
        db.session.commit()
        return {note.id: note.to_dict()}
    else:
        return {"note": "null"}
