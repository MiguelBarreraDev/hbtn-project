#!/usr/bin/python3
"""Contains:
    (class) Resquest.
"""
from models.base_model import BaseModel


class Api_request(BaseModel):
    """Class that reflects the structure of the table Roles.
    Args:
        BaseModel (cls): Parent class - Inheritance.
    """
    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.url = ''
        self.cabecera = ''
        self.cuerpo = ''
        self.f_rconsulta = ''
        super().__init__(**kwargs)