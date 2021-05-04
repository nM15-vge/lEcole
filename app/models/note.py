from .db import db


class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    content = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id"),
                            nullable=True)
    private = db.Column(db.Boolean, default=True)
    notes_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "content": self.content,
          "userId": self.user_id,
          "notebookId": self.notebook_id,
          "private": self.private,
          "notesUrl": self.notes_url,
          "createdAt": self.created_at,
          "updatedAt": self.updated_at
        }
