import re
import casbin
from helper import regex_match

e = casbin.Enforcer('./casbin/model.conf','./casbin/policy.csv')
e.add_function("r",regex_match)

sub = "oscar"  
obj = "/protected/gfikwbngfwngfonwg"  
act = "read"


if e.enforce(sub, obj, act):
    print("Access Granted")
else:
    print("Access Denied")
