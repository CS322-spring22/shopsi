from flask import Flask, request, render_template, session
from flask_session.__init__ import Session
from flask_cors import CORS, cross_origin
import json
import os

template_dir = os.path.abspath('/home/anastatiaD/shopsi/extension/templates')
api = Flask(__name__, template_folder=template_dir)
api.config['CORS_HEADERS'] = 'Content-Type'
api.config["SESSION_PERMANENT"] = False
api.config["SESSION_TYPE"] = "filesystem"
api.secret_key = 'butteredpopcornjellybellyismyfavorite'
SESSION_TYPE = 'redis'
CORS(api, headers=['Content-Type'])
Session(api)

def updateMeas(measurement, user, number):
    users = {}
    with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
        users = json.load(f)
    if measurement in users[user]['measurements']:
        if users[user]['measurements'][measurement] != number:
            users[user]['measurements'][measurement] = number
    else:
        users[user]['measurements'][measurement] = number
    with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
        json.dump(users, f)
    
@api.route('/numUsers')
def getUsers():
    users = {}
    with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
        users = json.load(f)
    return { 'number' : users.__len__()}

@api.route('/profile')
def my_profile():
    users = {}
    with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
        users = json.load(f)
    res = {}
    res['name'] = users['0']['username']
    res['about'] = users['0']['password']
    return res

#LANDING-LANDING-LANDING-LANDING-LANDING-LANDING-LANDING-LANDING
# login
# signup
# measurements

@api.route('/signupLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def signupLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            userL = request.json
            if os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0:
                users[0] = request.json
                session['user'] = userL
                with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                    json.dump(users, f)
                return {'Status' : 'Successful Signup!'}
            else:
                with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                    users = json.load(f)
                if userL in users.values():
                    return {'Status' : 'Existing User'}
                else:
                    num = users.__len__()
                    users[num] = userL
                    with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                        json.dump(users, f)
                    session['user'] = userL
                    return {'Status' : 'Successful Signup!'}  
    return {'Maybe this works too?': 'meh'}

@api.route('/loginLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def loginLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            userL = request.json
            if os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                    users = json.load(f)
                for user in users:
                    if users[user]['username'] == userL['username'] and users[user]['password'] == userL['password']:
                        session['user'] = userL
                        return {'Status' : 'Successful Login'}
                return {'Status' : 'User does not exist'}
    return {'Maybe this works too?': 'meh'}

@api.route('/measureLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def measureLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            userL = request.json
            if os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                    users = json.load(f)
                if 'user' in session:
                    userU = session['user']
                    for user in users:
                        if users[user]['username'] == userU['username'] and users[user]['password'] == userU['password']:
                            updateMeas('Waist', user, userL['Waist'])
                            updateMeas('Bust/Chest', user, userL['Bust/Chest'])
                            updateMeas('Inseam', user, userL['Inside Leg'])
                            updateMeas('Arm Length', user, userL['Arm Length'])
                            updateMeas('Neckline', user, userL['Neckline'])
                            updateMeas('Low Hip', user, userL['Low Hip'])
                            return {'Status' : 'Updated Measurements'}
                    return {'Status' : 'User does not exist'}
                return {'Status' : 'No user logged in'}
    return {'Maybe this works too?': 'meh'}

@api.route('/logoutLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def logoutLP():
    if request.method == 'POST':
        res = request.json
        if res['Status'] == 'logout' and 'user' in session:
            return {'Status' : 'Successful Logout'}
        return {'Status' : 'No user logged in'}
    return {'Maybe this works too?': 'meh'}

#EXTENSION-EXTENSION-EXTENSION-EXTENSION-EXTENSION-EXTENSION-EXTENSION
# login
# signup
# measuremnents

@api.route('/loginEXT', methods=['GET', 'POST'])
def loginEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        if (os.stat("../shopsi/backend//home/anastatiaD/shopsi/backend/users.json").st_size == 0):
            return render_template("signup.html")
        else:
            with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if(users[user]["username"] == username and users[user]["password"] == password):
                    session['user'] = username + " " + password
                    return render_template('index.html')
            return render_template('signup.html')
    return render_template("popup.html")

@api.route('/signupEXT', methods=['GET', 'POST'])
def signupEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if (os.stat("../shopsi/backend//home/anastatiaD/shopsi/backend/users.json").st_size == 0):
            users[0]['username'] = username
            users[0]['password'] = password
            users[0]['measurements'] = {}
            with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                json.dump(users, f)
            session['user'] = username + " " + password
            return render_template('index.html')

        else:
            with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if (users[user]["username"] == username and users[user]["password"] == password):
                    return render_template('popup.html')
            num = users.__len__()
            users[num]['username'] = username
            users[num]['password'] = password
            users[num]['measurements'] = {}
            with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                json.dump(users, f)
            session['user'] = username + " " + password
            return render_template('index.html')
    return render_template("signup.html")

@api.route('/measureEXT', methods=['GET', 'POST'])
def measureEXT():
    users = {}
    if request.method == 'POST':
        waist = request.form.get('waist')
        bust = request.form.get('bust/chest')
        inseam = request.form.get('inseam')
        armlen = request.form.get('armLength')
        neck = request.form.get('neckline')
        hip = request.form.get('lowHip')
        with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
            users = json.load(f)
        if 'user' in session:
            list = session['user'].split(" ")
            username = list[0]
            password = list[1]
            for user in users.keys():
                if users[user]['username'] == username and users[user]['password'] == password:
                    updateMeas('Waist', user, waist)
                    updateMeas('Bust/Chest', user, bust)
                    updateMeas('Inseam', user, inseam)
                    updateMeas('Arm Length', user, armlen)
                    updateMeas('Neckline', user, neck)
                    updateMeas('Low Hip', user, hip)
                    return render_template('index.html')
        return render_template('popup.html')
    return render_template('index.html')
