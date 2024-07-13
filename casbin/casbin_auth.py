import re
import casbin

def regex_match(key1: str, key2: str) -> bool:
    return bool(re.match(key2, key1))

e = casbin.Enforcer('./casbin/model.conf','./casbin/policy.csv')
e.add_function("r",regex_match)

sub = "oscar"  
obj = "/protected/gfikwbngfwngfonwg"  
act = "read"


if e.enforce(sub, obj, act):
    print("Access Granted")
else:
    print("Access Denied")
