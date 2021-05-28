from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Library_Link, db

library_link_routes = Blueprint("libraryLinks", __name__)


@library_link_routes.route("/", methods=["GET", "POST"])
@login_required
def library_links():
    if request.method == "GET":
        library_links = Library_Link.query.filter(Library_Link.user_id ==
                                                  session["_user_id"]).all()
        return ({library_links.id: library_link.to_dict()
                 for library_link in library_links})
    elif request.method == "POST":
        body = request.get_json()
        new_library_link = Library_Link(
            title=body.get("title"),
            library_link_url=body.get("library_link_url"),
            user_id=session["_user_id"]
        )
        db.session.add(new_library_link)
        db.session.commit()
        return {new_library_link.id: new_library_link.to_dict()}


@library_link_routes.route("/<int:libraryLinkId>", methods=["GET", "PUT",
                           "DELETE"])
@login_required
def update_library_link(libraryLinkId):
    library_link = Library_Link.query.get(libraryLinkId)
    if request.method == "GET":
        return ({library_link.id: library_link.to_dict()}
                if library_link else {"libraryLink": "null"})
    elif request.method == "PUT":
        body = request.get_json()
        library_link.title = body.get("title", library_link.title)
        library_link.library_link_url = body.get("library_link_url",
                                                 library_link.library_link_url)
        db.session.commit()
        return {library_link.id: library_link.to_dict()}
    elif request.method == "DELETE":
        db.session.delete(library_link)
        db.session.commit()
        return {library_link.id: library_link.to_dict()}
    else:
        return {"libraryLink": "null"}
