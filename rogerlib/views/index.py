import flask
import rogerlib
from flask_cors import cross_origin

@rogerlib.app.route('/', methods=['GET'])
@cross_origin()
def show_index():
    return flask.render_template("index.html")

@rogerlib.app.route('/about', methods=['GET'])
@cross_origin()
def show_about():
    return flask.render_template("index.html")

@rogerlib.app.route('/cntct', methods=['GET'])
@cross_origin()
def show_cntct():
    return flask.render_template("index.html")

@rogerlib.app.route('/gallery', methods=['GET'])
@cross_origin()
def show_gallery():
    """Display / route"""
    return flask.render_template("index.html")
