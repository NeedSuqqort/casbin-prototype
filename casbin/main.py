# main.py
from flask import Flask, request, jsonify
from casbin import Enforcer
from casbin.util import key_match2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
enforcer = Enforcer('./casbin/model.conf', './casbin/policy.csv')
enforcer.add_named_matching_func("g", key_match2)

@app.route('/api/access-control', methods=['POST'])
def check_access():
    data = request.get_json()
    username = data.get('username')
    resource = data.get('resource')

    if enforcer.enforce(username, resource, 'read'):
        return jsonify({'granted': True})
    else:
        return jsonify({'granted': False})

if __name__ == '__main__':
    app.run(debug=True)