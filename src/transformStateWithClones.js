'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateFinish = [];
  let currentState = { ...state };

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        stateFinish.push({ ...currentState });
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => delete currentState[key]);
        stateFinish.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};
        stateFinish.push({ ...currentState });
        break;
    }
  }

  return stateFinish;
}

module.exports = transformStateWithClones;
