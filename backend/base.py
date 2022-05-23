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

def convertUnit(dicts, user):
    users = {}
    with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
        users = json.load(f)
    for measure in dicts:
        dicts[measure] = dicts[measure]*2.54
    users[user]['measurements'] = dicts
    with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
        json.dump(users, f)

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
            if userL['username'] == '' or userL['password'] == '':
                return {'Status' : 'need to enter more'}
            else:
                if os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0:
                    users[0] = request.json
                    users[0]['logged'] = userL['username']
                    session['user'] = userL
                    with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                        json.dump(users, f)
                    return {'Status' : 'Successful Signup!'}
                else:
                    with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                        users = json.load(f)
                    contains = False
                    for user in users:
                        if users[user]['password'] == userL['password'] or users[user]['username'] == userL['username']:
                            contains = True
                    if contains:
                        return {'Status' : 'User already exists'}
                    else:
                        num = users.__len__()
                        users[num] = userL
                        users[num]['logged'] = userL['username']
                        with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                            json.dump(users, f)
                        session['user'] = userL
                        return {'Status' : 'Successful Signup!'}
    else:
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
                        users[user]['logged'] = userL['username']
                        with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                            json.dump(users, f)
                        session['user'] = userL
                        return {'Status' : 'Successful Login'}
                return {'Status' : 'User does not exist'}
    return {'Maybe this works too?': 'meh'}

@api.route('/measureLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def measureLP():
    print(request.method)
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            userL = request.json
            if 'get' in userL.keys():
                print("req", request.json)
                with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                    users = json.load(f)
                for user in users:
                    if users[user]['username'] == userL['username'] and users[user]['password'] == userL['password']:
                        return users[user]['measurements']
                return {'Status' : 'User does not exist'}
            elif os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
                    users = json.load(f)
                for user in users:
                    uzer = userL['curr']
                    if users[user]['logged'] == uzer:
                        updateMeas('Waist', user, userL['Waist'])
                        updateMeas('Bust/Chest', user, userL['Bust/Chest'])
                        updateMeas('Inseam', user, userL['Inside Leg'])
                        updateMeas('Arm Length', user, userL['Arm Length'])
                        updateMeas('Neckline', user, userL['Neckline'])
                        updateMeas('Low Hip', user, userL['Low Hip'])
                        if userL['unit'] == 'in':
                            convertUnit(users[user]['measurements'], user)
                        return {'Status' : 'Updated Measurements', 'Gender' : users[user]['gender']}
                return {'Status' : 'User does not exist'}
    else:
        return {'Maybe this works too?': 'meh'}

@api.route('/logoutLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def logoutLP():
    if request.method == 'POST':
        stat = request.json
        users = {}
        with open('/home/anastatiaD/shopsi/backend/users.json', 'r') as f:
            users = json.load(f)
        if stat['Status'] == 'logout':
            for user in users:
                uzer = users[user]['username']
                if users[user]['logged'] == uzer:
                    users[user]['logged'] = 'false'
                    with open('/home/anastatiaD/shopsi/backend/users.json', 'w') as f:
                        json.dump(users, f)
                    return {'Status' : 'Logged Out'}
            return {'Status' : 'No users logged in'}
        return {'Status' : 'no clue how this happened'}
    return {'Status' : 'request method isnt post'}
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
        if (os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0):
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
        if (os.stat("/home/anastatiaD/shopsi/backend/users.json").st_size == 0):
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