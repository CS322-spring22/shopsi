from flask import Flask, request, render_template, jsonify
import json
import os

template_dir = os.path.abspath('/mnt/c/Users/nvg-1/shopsi/extension/templates')
api = Flask(__name__, template_folder=template_dir)

#need a method to retrieve size
def getSize(measurements, clothing, gender, store):
    filename = gender + store
    with open (filename, 'r') as f:
        lots = json.load(f)
    guide = {}
    for dict in lots:
        if (clothing in dict['Title']):
            guide = dict['SizeGuide']
            break
    for size in guide.keys():
        for measurement in measurements.keys():
            if(measurements[measurement] in size[measurement]):
                return size
    return "Can't Find Size"

@api.route('/')
def something():
    response_body = 'This is the home page?'
    return response_body

@api.route('/extension', methods=['GET', 'POST'])
def loginEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        if (os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0):
            return render_template("logFail.html")
        else:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for user in users.keys():
                if(users[user]["Username"] == username and users[user]["Password"] == password):
                    return render_template('successlog.html')
            return render_template('logFail.html')
    return render_template("popup.html")

@api.route('/extensionfail', methods=['GET', 'POST'])
def failEXT():
    users = {}
    if request.method == 'POST':
        username = request.form.get('fname')
        password = request.form.get('lname')
        if (os.stat("/mnt/c/Users/nvg-1/shopsi/backend/users.json").st_size == 0):
            users[0] = {}
            users[0]["Username"] = username
            users[0]["Password"] = password
            users[0]["Measurements"] = {}
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
            users[num] = {}
            users[num]["Username"] = username
            users[num]["Password"] = password
            users[num]["Measurements"] = {}
            with open('users.json', 'w') as f:
                json.dump(users, f)
            return render_template('successlog.html')
    return render_template("logFail.html")

@api.route('/extensionmeasurements', methods=['GET', 'POST'])
def userAddMeaurements():
    users = {}
    if request.method == 'POST':
        return 'not ready yet, this is tricky'
    return render_template('entermeasure.html')

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    api.run(threaded=True, host='0.0.0.0', port=port)