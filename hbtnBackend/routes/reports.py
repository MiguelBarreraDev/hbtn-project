#!/usr/bin/python3
"""
Funcion que obtiene los datos de una solicitud 
y retorna la data
"""
from crypt import methods
from importlib.resources import path
from flask import jsonify, abort, request, make_response
from routes import app_views
from routes.apitest import my_request
import json

@app_views.route("/reports", methods=['GET'], strict_slashes=False)
# students/{student_id}/reports
def get_students():
    """
    """