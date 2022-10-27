#!/usr/bin/python3
"""Contains:
    (class) Role.
"""
from models.base_model import BaseModel


class Role(BaseModel):
    """Class that reflects the structure of the table Roles.
    Args:
        BaseModel (cls): Parent class - Inheritance.
    """
    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.nombre = ''
        self.descripcion = ''
        self.creado_en = ''
        self.creado_por = ''
        self.actualizado_el = ''
        self.actualizado_por = ''
        self.eliminado_en = ''
        self.eliminado_por = ''
        super().__init__(**kwargs)