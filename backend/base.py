from flask import Flask, Response, request, render_template, jsonify
from flask_cors import CORS, cross_origin
import json
import os

template_dir = os.path.abspath('/home/anastatiaD/templates')
api = Flask(__name__, template_folder=template_dir)
api.config['CORS_HEADERS'] = 'Content-Type'
CORS(api, headers=['Content-Type'])

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

#THIS IS FOR THE LANDING PAGE!
@api.route('/signupLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def signupLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            if os.stat("/home/anastatiaD/users.json").st_size == 0:
                users[0] = request.json
                with open('users.json', 'w') as f:
                    json.dump(users, f)
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
                    return {'Status' : 'Successful Signup!'}
    return {'Maybe this works too?': 'meh'}

@api.route('/loginLP', methods=['POST', 'GET'])
@cross_origin(allow_headers='*', supports_credentials=True, always_send=True, automatic_options=True)
def loginLP():
    if request.method == 'POST':
        if (request.json != {}):
            users = {}
            if os.stat("/home/anastatiaD/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                if request.json in users.values():
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
            if os.stat("/home/anastatiaD/users.json").st_size == 0:
                return {'Status' : 'User does not exist'}
            else:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                for user in users:
                    if user['Username'] == request.json['username']:
                        return user['Measurements']
                return {'Status' : 'User does not exist'}
    return {'Maybe this works too?': 'meh'}


#THIS IS FOR THE EXTENSION!
@api.route('/loginEXT', methods=['GET', 'POST'])
def loginEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        if (os.stat("/home/anastatiaD/users.json").st_size == 0):
            return render_template("logFail.html")
        else:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if(users[user]["Username"] == username and users[user]["Password"] == password):
                    return render_template('successlog.html')
            return render_template('logFail.html')
    return render_template("popup.html")

@api.route('/signupEXT', methods=['GET', 'POST'])
def signupEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get('fname')
        password = request.form.get('lname')
        if (os.stat("/home/anastatiaD/users.json").st_size == 0):
            users[0]['username'] = username
            users[0]['password'] = password
            users[0]['measurements'] = {}
            with open('users.json', 'w') as f:
                json.dump(users, f)
            return render_template('successlog.html')

        else:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if (users[user]["Username"] == username and users[user]["Password"] == password):
                    return render_template('successlog.html')
            num = users.__len__()
            users[num]['username'] = username
            users[num]['password'] = password
            users[num]['measurements'] = {}
            with open('users.json', 'w') as f:
                json.dump(users, f)
            return render_template('successlog.html')
    return render_template("logFail.html")

@api.route('/measureEXT', methods=['GET', 'POST'])
def measureEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get('user')
        password = request.form.get('pass')
        waist = request.form.get('waist')
        bust = request.form.get('bust')
        inseam = request.form.get('inseam')
        with open('users.json', 'r') as f:
            json.dump(users, f)
        for user in users:
            if user['Username'] == username and user['Password'] == password:
                user['Measurements']['Waist'] = waist
                user['Measurements']['Bust'] = bust
                user['Measurements']['Inseam'] = inseam
                #return {'Status' : 'Successful Update'}
        #return {'Status' : 'User does not exist'}
    #return {'Maybe this works' : 'something'}