from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar_url = db.Column(db.String(256))
    hashed_password = db.Column(db.String(255), nullable=False)

    notebooks = db.relationship("Notebook", back_populates="user")
    notes = db.relationship("Note", back_populates="user")
    library_links = db.relationship("Library_Link", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "username": self.username,
          "email": self.email,
          "lastName": self.last_name,
          "firstName": self.first_name,
          "avatarUrl": self.avatar_url
        }
