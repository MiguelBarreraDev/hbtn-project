import base64
import hashlib
import json
from pickle import GET
import requests
import sys
import time

#if len(sys.argv) < 3:
#  print("Missing arguments. Example: ./api_client.py <ApiCredential.key> <ApiCredential.secret>")
#  exit(1)
# forech key, value in data:
#     key [0]

def my_request(path='', method='GET', headers={}):
  """
  """
  KEY = "2b05c485-5390-4bd4-acde-a44afcb9056b"
  SECRET = "f73e79af1bd33e9edd93d61d0db2daeda6892a570c98d023ad2958c4cf10667884f8be6e47e1997c"

  HOST = "intranet.hbtn.io"

  cohort_id = "110"
  student_id = "2847"
  report_id = "1"

  #PATH = "/api/v1/products" # ESTE NO # GET - MUESTRA LA LISTA DE PRODUCTOS DEL CAMPUS

  # APIS-COHORTS
  #PATH = "/api/v1/cohorts" # GET - LISTA TODOS LOS DATOS DE LOS COHORTS
  #PATH = f"/api/v1/cohorts/{cohort_id}" # GET - LISTA TODOS LOS DATOS DE UNA COHORT
  #PATH = f/api/v1/cohorts/{cohort_id}/students # GET - LISTA TODOS LOS ALUMNOS DE UNA COHORT
  # APIS-ALUMNOS
  PATH = f"/api/v1/{path}" # GET - LISTA DE TODOS LOS ALUMNOS DEL CAMPUS
  #PATH = f"/api/v1/students/{student_id}" # GET - ESTE MUESTRA TODA LA INFO DE UN ESTUDIANTE
  #PATH = f"/api/v1/students/{student_id}/projects" # GET - MUESTRA EL PROGRESO DE UN ALUMNO EN TODOS LOS PROYECTOS
  # APIS-REPORTES
  #PATH = "/api/v1/report_types" # GET - MUESTRA LOS TIPOS DE REPORTES QUE EXISTEN EN EL SISTEMA
  #PATH = f"/api/v1/students/{student_id}/reports" # GET - MUESTRA TODOS LOS REPORTES DE UN ESTUDIANTE
  #PATH = f"/api/v1/students/{student_id}/reports" # POST - AGREGA UN REPORTE A UN ESTUDIANTE
  #PATH = f"/api/v1/students/{student_id}/reports/{report_id}" # GET - RETORNA LOS DATOS DE UN REPORTE DE UN ALUMNO

  data = None
  # PARA AGREGAR UN REPORTE, SE DEBE AGREGAR EL SIGUIENTE BODY EN EL REQUEST
  #data = {
  #  "date": "2022-10-04",
  #  "internal_note": "string",
  #  "skip_professional_impact": true,
  #  "student_note": "string",
  #  "type_value": "string",
  #  "user_report_type_id": 0
  #}



  url = f"https://{HOST}{PATH}"
  #credentials = { 'key': sys.argv[1], 'secret': sys.argv[2] }
  credentials = { 'key': KEY, 'secret': SECRET }
  timestamp = int(time.time())

  query_string = { 'timestamp': timestamp }

  request = { 'method': method, 'params': query_string, 'path': PATH, 'raw_body': data }

  signature_components = ["{}={}&".format(k, request['params'][k]) for k in sorted(request['params'].keys())]
  if request['raw_body'] is not None:
    signature_components.append(json.dumps(request['raw_body']))

  signature_components.append(request['method'])
  signature_components.append(request['path'])
  signature_components.append(credentials['secret'])

  signature = hashlib.sha1(''.join(signature_components).encode()).hexdigest().lower()
  token = base64.b64encode("{}:{}".format(credentials['key'], signature).encode('utf8')).decode('utf8')
  print(token)
  end_headers = { **headers, 'X-AUTH-TOKEN': token, 'Content-Type': 'application/json', 'Accept': 'application/json' }
  r = requests.request(method, url, params=request['params'], headers=end_headers)
  print("Status: {}".format(r.status_code))
  print("Response: {}".format(json.dumps(r.json(), indent=2)))
  return r

