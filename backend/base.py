from flask import Flask, request, render_template, session
import werkzeug as werk
from flask_cors import CORS, cross_origin
import json
import os

template_dir = os.path.abspath('/mnt/c/Users/nvg-1/shopsi/extension')
api = Flask(__name__, template_folder=template_dir)
api.config['CORS_HEADERS'] = 'Content-Type'
api.secret_key = 'butteredpopcornjellybellyismyfavorite'
CORS(api, headers=['Content-Type'])

def updateMeas(measurement, user, number):
    users = {}
    with open('users.json', 'r') as f:
        users = json.load(f)
    if users[user]['measurements'][measurement] != number:
        users[user]['measurements'][measurement] = number
    with open('users.json', 'w') as f:
        json.dump(users, f)
    
@api.route('/numUsers')
def getUsers():
    users = {}
    with open('users.json', 'r') as f:
        users = json.load(f)
    return { 'number' : users.__len__()}

@api.route('/profile')
def my_profile():
    users = {}
    with open('users.json', 'r') as f:
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
            if os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0:
                users[0] = request.json
                session['user'] = request.json
                with open('users.json', 'w') as f:
                    json.dump(users, f)
                return {'Status' : 'Successful Signup!'}
            else:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                if request.json in users.values():
                    return {'Status' : 'Existing User'}
                else:
                    num = users.__len__()
                    users[num] = request.json
                    with open('users.json', 'w') as f:
                        json.dump(users, f)
                    session['user'] = request.json
                    return {'Status' : 'Successful Signup!'}  
    return {'Maybe this works too?': 'meh'}

@api.route('/loginLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def loginLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            if os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                if request.json in users.values():
                    session['user'] = request.json
                    return {'Status' : 'Successful Login'}
                else:
                    return {'Status' : 'User does not exist'}  
    return {'Maybe this works too?': 'meh'}

@api.route('/measureLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def measureLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            if os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                if 'user' in session:
                    if session['user'] == request.json:
                        for user in users.keys():
                            if users[user]['username'] == request.json['username'] and users[user]['password'] == request.json['password']:
                                updateMeas('Waist', user, request.json['Waist'])
                                updateMeas('Bust/Chest', user, request.json['Bust/Chest'])
                                updateMeas('Inseam', user, request.json['Inside Leg'])
                                updateMeas('Arm Length', user, request.json['Arm Length'])
                                updateMeas('Neckline', user, request.json['Neckline'])
                                updateMeas('Low Hip', user, request.json['Low Hip'])
                                return {'Status' : 'Updated Measurements'}
                        return {'Status' : 'User not logged in'}
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
        if (os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0):
            return render_template("signup.html")
        else:
            with open('users.json', 'r') as f:
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
        if (os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0):
            users[0]['username'] = username
            users[0]['password'] = password
            users[0]['measurements'] = {}
            with open('users.json', 'w') as f:
                json.dump(users, f)
            session['user'] = username + " " + password
            return render_template('index.html')

        else:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if (users[user]["username"] == username and users[user]["password"] == password):
                    return render_template('popup.html')
            num = users.__len__()
            users[num]['username'] = username
            users[num]['password'] = password
            users[num]['measurements'] = {}
            with open('users.json', 'w') as f:
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
        with open('users.json', 'r') as f:
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