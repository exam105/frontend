const singleMcq = (state = [], action) => {
  switch (action.type) {
    case "add_single_mcq":
      return [
        ...state,
        {
          question: action.question,
          marks: action.marks,
          options: action.options,
          topics: action.topics,
        },
      ];
    case "reset_single_mcq":
      return [];
    default:
      return state;
  }
};
export default singleMcq;
