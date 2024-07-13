import re
def regex_match(key1: str, key2: str) -> bool:
    return bool(re.match(key2, key1))