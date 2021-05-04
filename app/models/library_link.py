from .db import db


class Library_Link(db.Model):
    __tablename__ = "library_links"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(55))
    library_link_url = db.Column(db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="library_links")
