from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os

project = Flask(
    import_name = "settings",
    static_folder = "static",
    instance_path = os.path.abspath(__file__ + "/.."),
    template_folder = "counter/templates"
    )

project.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

database = SQLAlchemy(app = project)
migration = Migrate(app = project, db = database)