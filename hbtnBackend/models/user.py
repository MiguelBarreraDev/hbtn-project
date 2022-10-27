#!/usr/bin/python3
"""Contains:
    (class) User.
"""
from models.base_model import BaseModel
import hashlib


class User(BaseModel):
    """Class that reflects the structure of the table Users.
    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.id_rol = 0
        self.nombre = ''
        self.apellido = ''
        self.email = ''
        self.estado = ''
        self.creado_en = ''
        self.creado_por = ''
        self.actualizado_en = ''
        self.actualizado_por = ''
        self.eliminado_en = ''
        self.eliminado_por = ''
        self.eliminado = ''
        super().__init__(**kwargs)