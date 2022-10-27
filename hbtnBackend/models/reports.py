#!/usr/bin/python3
"""Contains:
    (class) Role.
"""
from models.base_model import BaseModel


class Report(BaseModel):
    """Class that reflects the structure of the table Roles.
    Args:
        BaseModel (cls): Parent class - Inheritance.
    """
    def __init__(self, **kwargs):
    """Initialize a new instance of the class.
    """
    self.id = 0
    self.id_usuario = 0
    self.id_tipo = ''
    self.calificacion = ''
    self.creado_por = ''
    self.creado_en = ''
    self.actualizado_por = ''
    self.actualizado_en = ''
    self.eliminado_por = ''
    self.eliminado_en = ''
    self.eliminado = ''
    super().__init__(**kwargs)