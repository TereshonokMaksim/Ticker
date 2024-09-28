from .settings import project
from authorization.models import User
from flask_login import LoginManager
import random

project.secret_key = ''.join([random.randint(97, 122) for letter in range(random.randint(10, 20))])

manager = LoginManager(app = project)

@manager.user_loader
def load_user(id):
    return User.query.get(id)