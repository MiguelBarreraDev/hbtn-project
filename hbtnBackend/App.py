#!/usr/bin/python3
"""
starts a Flask web application
"""
from curses import flash
from flask import Flask
from os import getenv
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from routes import app_views


# from flask_mysqldb import MySQL

# 
app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5173" ]}})

# manejo de errores#
@app.errorhandler(404)
def error(e):
    """ Handler for 404 errors.
    Args:
        e (err): Error message.
    Returns:
        response: json response.
    """
    return make_response(jsonify({"error": "Not found"}), 404)

# conf. para coneccion a mysql
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'localhost'
# mysql = MySQL(app)

@app.route('/')
def Index():
    return "Hello"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)