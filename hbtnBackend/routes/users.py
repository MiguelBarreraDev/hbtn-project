#!/usr/bin/python3
"""
Funcion que obtiene los datos de una solicitud 
y retorna la data
"""
from crypt import methods
from unittest.mock import patch
from flask import jsonify, abort, request, make_response
from routes import app_views
from routes.apitest import my_request
import json

@app_views.route("/users", methods=['GET'], strict_slashes=False)
def get_users():
    """
    funcion que recibe una solicutud y devuelve la data
    """
    ## si el method es POST: tiene valores en el cuerpo de solicitud.
    #username = request.values.get('user') # Your form's

    ## si la solicitud contiene argumentos.
    id = request.args.get('ID', '')
    re = my_request(path=f"students")
    
    print("Response: {}".format(json.dumps(re.json(), indent=2)))
    #procedure = "consulta"
    #data = procedure
    return make_response(jsonify(re.json()), 200)