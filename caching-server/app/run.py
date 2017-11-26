# from app import app
# import logging
# logging.basicConfig(level=logging.INFO)
# app.run(debug=True)
from app import db
if __name__ == '__main__':
    db.drop_all()
    db.create_all()