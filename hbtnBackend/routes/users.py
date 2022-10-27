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
from database.db_procedure import DBProcedures
from google.oauth2 import id_token
from google.auth.transport import requests

# from database.db_procedure import DBProcedures
import json

@app_views.route("/users", methods=['GET'], strict_slashes=False)
def get_users():
    """
    funcion que recibe una solicutud y devuelve la data
    """
    

    ## si la solicitud contiene argumentos.
    # id = request.args.get('ID', '')
    # print("hello", id)
    # re = my_request(path=f"students")
    
    response = DBProcedures.listado()
    print(response)
    print("Response: {}".format(response))
    # procedure = "consulta"
    # data = procedure
    return make_response(jsonify(response), 200)

@app_views.route("/login", methods=['POST'], strict_slashes=False)
def login():
    """
    """
    CLIENT_ID = "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com"
    data = request.get_json()
    token = data["data"]["token"]
    response = {}
    print("Response: {}".format(token))
    # (Receive token by HTTPS POST)
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        email = idinfo["email"]
        response = DBProcedures.users_login(email)

        # Or, if multiple clients access the backend server
        userid = idinfo['sub']
    except ValueError:
        # Invalid token
        return make_response(401)
    return make_response(jsonify(response), 200)

