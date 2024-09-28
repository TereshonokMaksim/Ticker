from flask import Blueprint

auth_app = Blueprint(
    name = "auth",
    import_name = "app",
    static_folder = "static/authorization",
    template_folder = "authorization/templates",
    static_url_path = "/login/"
)