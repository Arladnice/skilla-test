const defaultState = {
  calls: [],
};

export const SET_CALLS = 'SET_CALLS';
export const FETCH_CALLS = 'FETCH_CALLS';

export function callsReduser(state = defaultState, action: any) {
  switch(action.type) {
    case SET_CALLS:
      return {...state, calls: action.payload}
    default: return state;  
  }
};

export function setCalls(payload: any) {
    return {
      type: SET_CALLS,
      payload
    }
  };

  export function fetchCalls() {
    return {
      type: FETCH_CALLS,
    }
  };