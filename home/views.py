from flask import render_template
from flask_login import current_user

def render_home_page():
    return render_template(template_name_or_list = "home.html")