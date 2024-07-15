from flask import Flask, request, jsonify
import casbin
from flask_cors import CORS
import re


app = Flask(__name__)
CORS(app)

def regex_match(key1: str, key2: str) -> bool:
    return bool(re.match(key2, key1))

# Initialize Casbin enforcer
e = casbin.Enforcer('model.conf', 'policy.csv')
e.add_function("r", regex_match)

def regex_match(key1: str, key2: str) -> bool:
    return bool(re.match(key2, key1))

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello World!'

@app.route('/verify_role', methods=['GET'])
def verify_role():
    """
    Endpoint to verify user role for access control.
    
    The frontend can make a GET request to this endpoint with the following parameters:
    - subject: The user or subject to be verified.
    - object: The resource or object the user is trying to access.
    - action: The action the user is trying to perform on the object.
    
    The endpoint will return a JSON response with the following structure:
    {
        "allowed": true|false,
        "error": null|"error message"
    }
    """
    subject = request.args.get('subject')
    obj = request.args.get('object')
    action = request.args.get('action')
    
    try:
        allowed = e.enforce(subject, obj, action)
        return jsonify({
            "allowed": allowed
        })
    except:
        return jsonify({
            "allowed": "error"
        })

if __name__ == '__main__':
    app.run(host='localhost', port=9000, debug=True)