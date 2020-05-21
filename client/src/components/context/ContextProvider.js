import React, { createContext, useReducer } from "react";

export const ContextBase = createContext();
const initialState = {
  commentForm: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "COMMENT_FORM":
      return {
        ...state,
        commentForm: !state.commentForm,
      };

    default:
      return state;
  }
};
const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextBase.Provider value={{ state, dispatch }}>
      {props.children}
    </ContextBase.Provider>
  );
};

export default ContextProvider;
