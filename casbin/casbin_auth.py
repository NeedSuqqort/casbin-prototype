import re
import casbin

e = casbin.Enforcer('./casbin/model.conf','./casbin/policy.csv')

sub = "oscar"  
obj = "/protected/content"  
act = "read"


if e.enforce(sub, obj, act):
    print("Access Granted")
else:
    print("Access Denied")
