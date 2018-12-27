import os

from flask import Flask
from flask_pymongo import PyMongo
from flask import Blueprint, render_template, abort
    # create and configure the app
from .database import mongo
from .server.dadjoke_folder import routes as dadjoke_router

def create_app(test_config=None, testing=False):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev'
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    if test_config is None and not testing:
        # load the instance config, if it exists, when not testing
        app.config["MONGO_URI"] = "mongodb://localhost:27017/dadjoke"
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config["MONGO_URI"] = "mongodb://localhost:27017/dadjokeTest"
        if test_config:
            app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    # a simple page that says hello
    app.register_blueprint(dadjoke_router.dadjoke)
    mongo.init_app(app)
    return app

if __name__=="__main__":
    app.runt(debug=True)
