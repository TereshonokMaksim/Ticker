from flask import Blueprint

home_app = Blueprint(
    name = "home",
    import_name = "app",
    static_folder = "static/home",
    template_folder = "home/templates",
    static_url_path = "/"
)