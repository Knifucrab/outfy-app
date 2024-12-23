const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };
    case "SET_USER_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
