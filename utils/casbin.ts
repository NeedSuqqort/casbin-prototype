import { Enforcer, newEnforcer, newModel } from 'casbin';
import { NextRequest } from 'next/server';
let enforcer: Enforcer;

async function initCasbin() {
  enforcer = await newEnforcer('./utils/model.conf', './utils/policy.csv');
}

initCasbin();

export async function getSession(req: NextRequest) {
  return {
    user: {
      role: "a"
    },
  };
}

// Export the Casbin enforcer
export { enforcer };