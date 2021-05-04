import .db from db


class Notes(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    content = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id"),
                            nullable=True)
    private = db.Column(db.Boolean, default=True)
    notes_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, default=CURRENT_TIMESTAMP)
    updated_at = db.Column(db.TIMESTAMP, default=CURRENT_TIMESTAMP)
