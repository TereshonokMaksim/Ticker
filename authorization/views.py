from flask import render_template, redirect, request
from flask_login import login_user, current_user
from .models import User

def render_auth_page():
    if type(current_user) != User:
        if request.method == "POST":
            'Authorization part'
            data = dict(request.form)
            for user in [*User.query.filter_by(name = data["username"])]:
                if user.password == data["password"]:
                    login_user(user = user)
                    return redirect("/")
            return render_template(template_name_or_list = "auth.html", incorrect = True)
        
        else:
            return render_template(template_name_or_list = "auth.html")
    else:
        return redirect("/")