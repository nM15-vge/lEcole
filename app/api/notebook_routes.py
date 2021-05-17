from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Notebook, Note, db


notebook_routes = Blueprint("notebooks", __name__)


@notebook_routes.route("/", methods=["GET", "POST"])
@login_required
def notebooks():
    notebooks = (Notebook.query.
                 filter(Notebook.user_id == session["_user_id"]).all())
    if request.method == "POST":
        body = request.get_json()
        new_notebook = Notebook(
            name=body.get("name"),
            user_id=session["_user_id"],
            private=body.get("private", False)
        )
        db.session.add(new_notebook)
        db.session.commit()
        return {new_notebook.id: new_notebook.to_dict()}
    return ({notebook.id: notebook.to_dict() for notebook in notebooks}
            if notebooks else {"notebooks": "null"})


@notebook_routes.route("/<int:notebookId>", methods=["GET", "PUT", "DELETE"])
@login_required
def update_notebook(notebookId):
    notebook = Notebook.query.get(notebookId)
    if request.method == "GET":
        return ({notebook.id: notebook.to_dict()}
                if notebook else {"notebook": "null"})
    elif request.method == "PUT":
        body = request.get_json()
        notebook.name = request.get_json("name", notebook.name)
        notebook.private = request.get_json("private", notebook.private)
        db.session.commit()
        return {notebook.id: notebook.to_dict()}
    elif request.method == "DELETE":
        db.session.delete(notebook)
        db.session.commit()
        return {notebook.id: notebook.to_dict()}
    else:
        return {"notebook": "null"}


@notebook_routes.route("/<int:notebookId>/notes")
@login_required
def notebookNotes(notebookId):
    notes = Note.query.filter(Note.notebook_id == notebookId).all()
    return ({note.id: note.to_dict() for note in notes}
            if notes else {"notes": "null"})
