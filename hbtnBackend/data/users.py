import mysql.connector
from mysql.connector import Error
from os import getenv

class Users:

    def connector(self):
        conexion = mysql.connector.connect(
            host="localhost", #getenv("YND_DB_HOST"),
            user="root", #getenv("YND_DB_USERNAME"),
            password="", #getenv("YND_DB_USERPASSWORD"),
            database="", #getenv("YND_DB_DATABASENAME"),
            port="3306", #getenv("YND_DB_PORT")
        )
        return conexion

    def listado(self):
        rtn = []
        args = []
        params = ()
        try:
            cnn = self.connector()
            cursor = cnn.cursor(dictionary=True)
            args = cursor.callproc("usp_user_s_users", params)
            for result in cursor.stored_results():
                rtn.append(result.fetchall())
            cnn.commit()
            cursor.close()
        except Error as e:
            print(e)
        finally:
            if (cnn and cnn.is_connected()):
                cnn.close()
        return { 'result': rtn, 'params': args }
