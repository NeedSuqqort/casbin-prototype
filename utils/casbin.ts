import { newEnforcer } from "casbin";

async function initCasbin() {
  // Initialize the Casbin enforcer
  const enforcer = await newEnforcer('model.conf', 'policy.csv');
  return enforcer;
}

module.exports = initCasbin;