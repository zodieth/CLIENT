import * as ActionTypes from "../ActionTypes";

export const Questions = (
  state = {
    isLoading: true,
    errMess: null, 
    allQuestions: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.QUESTIONS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allQuestions: action.payload,
      };

    case ActionTypes.QUESTION_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allQuestions: state.allQuestions.concat(action.payload),
      };

    case ActionTypes.QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.QUESTION_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case ActionTypes.QUESTION_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allQuestions: state.allQuestions.map((question:any) => {
          if(question._id === action.payload._id)
            return action.payload;
          return question;
        }),
      };

    default:
      return state;
  }
};
