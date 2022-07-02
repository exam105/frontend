const theory = (state = [], action) => {
  switch (action.type) {
    case "add_theory":
      if (action.order_number) {
        if (action.order_number > 0 && action.order_number <= state.length) {
          state.splice(action.order_number - 1, 0, {
            question: action.question,
            answer: action.answer,
            marks: action.marks,
            topics: action.topics,
            images: action.images,
          });
          return state;
        }
      }
      return [
        ...state,
        {
          question: action.question,
          answer: action.answer,
          marks: action.marks,
          topics: action.topics,
          images: action.images,
        },
      ];
    case "update_theory":
      let items = [...state];
      let item = { ...items[action.index] };
      item.question = action.question;
      item.answer = action.answer;
      item.marks = action.marks;
      item.topics = action.topics;
      item.images = action.images;
      items[action.index] = item;
      if (action.order_number) {
        if (action.order_number > 0 && action.order_number <= state.length) {
          items.splice(
            action.order_number - 1,
            0,
            items.splice(action.index, 1)[0]
          );
          return items;
        }
      }
      return items;
    case "remove_theory":
      return state.filter((item, index) => action.index !== index);
    case "reset_theory":
      return [];
    default:
      return state;
  }
};

export default theory;
