const mcq = (state = [], action) => {
  switch (action.type) {
    case "add_mcq":
      if (action.order_number) {
        if (action.order_number > 0 && action.order_number <= state.length) {
          state.splice(action.order_number - 1, 0, {
            question: action.question,
            marks: action.marks,
            options: action.options,
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
          marks: action.marks,
          options: action.options,
          topics: action.topics,
          images: action.images,
        },
      ];
    case "remove_mcq":
      return state.filter((item, index) => action.index !== index);
    case "update_mcq":
      let items = [...state];
      let item = { ...items[action.index] };
      item.question = action.question;
      item.marks = action.marks;
      item.options = action.options;
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
    case "reset_mcq":
      return [];
    default:
      return state;
  }
};

export default mcq;
