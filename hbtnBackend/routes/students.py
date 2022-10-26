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


@app_views.route("/students", methods=['GET'], strict_slashes=False)
# students/{student_id}/reports
def get_students():
    """
    """

    id = request.args.get('ID', '')
    if id == '':
        re = my_request(path=f"students")
    else:
        re = my_request(path=f"students/{id}")

    print("Response: {}".format(json.dumps(re.json(), indent=2)))
    return make_response(jsonify(re.json()), 200)

@app_views.route("/students/<id>/reports", methods=['GET'], strict_slashes=False)
# students/{student_id}/reports
def get_studentsReports(id):
    """
    """
    re = my_request(path=f"students/{id}/reports")
    print("Response: {}".format(json.dumps(re.json(), indent=2)))
    return make_response(jsonify(re.json()), 200)