import json


class MyJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        d = {}
        d['__class__'] = obj.__class__.__name__
        d['__module__'] = obj.__module__
        d.update(obj.__dict__)
        return d


class MyJSONDecoder(json.JSONDecoder):
    def __init__(self):
        json.JSONDecoder.__init__(self, object_hook=self.dict2obj)

    def dict2obj(self, d):
        if '__class__' in d:
            class_name = d.pop('__class__')
            module_name = d.pop('__module__')
            module = __import__(module_name)
            class_ = getattr(module, class_name)
            args = dict((key.encode('ascii'), value) for key, value in d.items())
            instance = class_(**args)
        else:
            instance = d
        return instance