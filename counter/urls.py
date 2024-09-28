from .settings import project
import authorization
import home

authorization.auth_app.add_url_rule(rule = "/login/", view_func = authorization.render_auth_page, methods = ["GET", "POST"])
home.home_app.add_url_rule(rule = "/", view_func = home.render_home_page)

project.register_blueprint(blueprint = authorization.auth_app)
project.register_blueprint(blueprint = home.home_app)