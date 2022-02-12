const singleTheory = (state = [], action) => {
  switch (action.type) {
    case "add_single_theory":
      return [
        ...state,
        {
          question: action.question,
          answer: action.answer,
          marks: action.marks,
          topics: action.topics,
        },
      ];
    case "reset_single_theory":
      return [];
    default:
      return state;
  }
};
export default singleTheory;
