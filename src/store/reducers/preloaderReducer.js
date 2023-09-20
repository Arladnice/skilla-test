const defaultState = {
  preload: false,
};
const PRELOAD = "PRELOAD";

export function preloaderReducer(state = defaultState, action) {
  switch (action.type) {
    case PRELOAD:
      return { ...state, preload: action.payload };
    default:
      return state;
  }
}

export function setPreload(payload) {
  return {
    type: PRELOAD,
    payload,
  };
}
