from flask_bcrypt import Bcrypt
from tinydb import TinyDB, Query
import uuid

db = TinyDB('docs.json')

def createDocument(name, type, user, fr, to):
    print(name)
    id = uuid.uuid4().hex
    db.insert({'id': id, "name": name, "type": type, "user": user, "from": fr, "to":to})
    return id

def findById(user):
    Doc = Query()
    docs = db.search(Doc.user==user)
    return docs

def findByDoc(id):
    Doc = Query()
    docs = db.search(Doc.id==id)[0]
    return docs
def removeDoc(id):
    Doc = Query()
    db.remove(Doc.id == id)

db_2 = TinyDB('users.json')

def addUser( email, username, password):
    db_2.insert({"id": uuid.uuid4().hex, 'email': email, 
                 "username": username, "password": password})

def findUser(username, password, bcrypt):
    User = Query()
    user = db_2.search((User.username == username))
    if bcrypt.check_password_hash(user[0]["password"], password):
        print(user)
        return user
    else: 
        return None

