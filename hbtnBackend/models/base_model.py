#!/usr/bin/python3
"""Contains:
    (class) BaseModel.
"""

class_list = [
    'User'
    # 'Role',
]


class BaseModel:
    """Base model containing general definition.
    """

    create_by = ''
    update_by = ''

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    setattr(self, key, value)
        else:
            self.create_by = ''
            self.update_by = ''

    def to_dict(self, audit=False):
        """Generate a dictionary containing all keys/values of the instance.
        """
        new_dict = self.__dict__.copy()
        if audit:
            if 'create_at' in new_dict:
                new_dict['create_at'] = new_dict['create_at']
            if 'update_at' in new_dict:
                new_dict['update_at'] = new_dict['update_at']
        else:
            if 'create_at' in new_dict:
                del new_dict['create_at']
            if 'create_by' in new_dict:
                del new_dict['create_by']
            if 'update_at' in new_dict:
                del new_dict['update_at']
            if 'update_by' in new_dict:
                del new_dict['update_by']

        # new_dict['__class__'] = self.__class__.__name__
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']

        # Dictionary and List and Date.
        # for key, value in new_dict.items():
        #     # Lists
        #     if type(value) == list:
        #         child_list = []
        #         for item in value:
        #             child_list.append(item.to_dict(audit))
        #         new_dict[key] = child_list
        #     # Objects
        #     if type(value).__name__ in class_list:
        #         new_dict[key] = value.to_dict(audit)

        return (new_dict)

    def to_list(self, audit=False):
        """Generate a list containing all values of the instance.
        """
        new_dict = self.__dict__.copy()
        avoid = ['_sa_instance_state']
        list_data = []

        # Exclude information.
        for key, value in new_dict.items():
            # Lists
            if type(value) == list:
                continue
            # Custom
            if key not in avoid:
                list_data.append(value)

        return (list_data)