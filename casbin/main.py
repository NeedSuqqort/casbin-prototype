from flask import Flask, request, jsonify
from casbin import Enforcer
from helper import regex_match

app = Flask(__name__)
enforcer = Enforcer('./casbin/model.conf', './casbin/policy.csv')
enforcer.add_function("r",regex_match)

@app.route('/api/access-control', methods=['POST'])

def check_access():
    data = request.get_json()
    username = data.get('username')
    resource = data.get('resource')
    action = data.get('action')

    if enforcer.enforce(username, resource, action):
        return jsonify({'granted': True})
    else:
        return jsonify({'granted': False})

if __name__ == '__main__':
    app.run()