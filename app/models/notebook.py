import .db from db


class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    private = db.Column(db.Boolean, default=True)

    user = db.relationship("User", back_populates="notebooks")
