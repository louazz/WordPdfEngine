from flask import Flask, send_file
from flask import jsonify
from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager
from db import addUser, createDocument, findByDoc, findById, findUser, removeDoc
from flask_jwt_extended import jwt_required
import subprocess
from pdf import translatedPDF
from Docx import translatedDOCX
from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY']= "louai"
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)

@app.route("/api/login", methods = ["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    user = findUser(username=username, password=password,bcrypt=bcrypt)
    if not user:
        return jsonify({"msg": "User does not exist"}), 401
    
    access_token = create_access_token(identity=user[0]['id'])
    return jsonify({"token": access_token}), 200

@app.route("/api/signup", methods= ["POST"])
def singup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    pw_hash = bcrypt.generate_password_hash(password)


    addUser(email=email, password=pw_hash.decode("utf-8"), username=username)
    return jsonify({"msg": "User created"}), 200

@app.route("/api/document", methods = ["POST"])
@jwt_required()
async def addDocument():
    user = get_jwt_identity()
    file = request.files['file']
    src = request.form['src']
    target = request.form['target']
   
    type = file.filename.split(".")[-1] 
    print(type)
    id = createDocument(name= str(file.filename), type = type, user= user, fr=src, to= target)
    subprocess.run(["mkdir", "./uploads/"+ str(id)]) 
    file.save("./uploads/"+ str(id)+"/"+file.filename)

    if type == "docx":
        print("docx")
        await translatedDOCX(id, file.filename,src, target)
        return send_file("./uploads/"+ str(id)+"/"+target+"-"+file.filename, as_attachment=True, download_name="doc.docx")
    elif type == "pdf":
        translatedPDF(id, file.filename,src, target)
        return send_file("./uploads/"+ str(id)+"/"+target+"-"+file.filename, as_attachment=True, download_name="doc.pdf")

    return jsonify({"msg": "Document Translated"}), 200


@app.route("/api/document/find", methods = ["GET"])
@jwt_required()
def search():
    user = get_jwt_identity()
    docs = findById(user)
    return jsonify({"docs": docs}), 200

@app.route("/api/document/id", methods = ["GET"])
@jwt_required()
def findDoc():
    request.args.get('id')
    docs = findByDoc(request.para)
    return jsonify({"docs": docs}), 200

@app.route("/api/document/download", methods=["POST"])
@jwt_required()
def download():
    id = request.json.get("id", None)
    target = request.json.get("target", None)
    name = request.json.get("name", None)
    #find document by id 
    return send_file("./uploads/"+ str(id)+"/"+target+"-"+name, as_attachment=True)

@app.route("/api/document/delete", methods= ["POST"])
@jwt_required()
def delete():
    id = request.json.get("id", None)
    path = "./uploads/"+ str(id)
    subprocess.run(["rm","-r", path]) 
    removeDoc(id)
    return jsonify({"msg": "file deleted!"}), 200


app.run(debug=True, port=5000)