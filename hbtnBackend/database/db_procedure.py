#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from typing import List

from database.engine.bd_storage import  DBStorage
# from models.base_model import BaseModel
# from models.user import User
# from models.role import Role
# from general.library import Libraries
import traceback


class DBProcedures():

    @staticmethod
    def users_one(id):
        """Get one user by id.
        Args:
            user (int): Id user.
        Returns:
            User: Information of the user who login.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            # new_user = User()
            parameters = []
            parameters.append(id)
            storage.open_db()
            tables = storage.exec_procedure('usp_user_s_user', parameters)

            if not tables:
                return (None)

            # for x in range(0, len(tables)):
            #     # Info user.
            #     if x == 0:
            #         new_user = User(**tables[x][0])
            #     # Info role.
            #     if x == 1:
            #         new_user.role = Role(**tables[x][0])
            #     # Info options.
            #     if x == 2:
            #         for opt in tables[x]:
            #             new_user.options.append(Option(**opt))
            #     # Info permissions.
            #     if x == 3:
            #         new_user.permissions = tables[x][0]
            return (tables)
        except BaseException as error:
            print(error.msg)
            # Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage