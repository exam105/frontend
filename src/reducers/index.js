import { combineReducers } from "redux";
import mcq from "./mcq";
import board from "./Board";
import setLogin from "./LoginAndLogout";
import theory from "./theory";
import singleTheory from "./singleTheory";
import singleMcq from "./singleMcq";

const allReducers = combineReducers({
  mcqReducer: mcq,
  boardReducer: board,
  loginReducer: setLogin,
  theoryReducer: theory,
  singleTheoryReducer: singleTheory,
  singleMcqReducer: singleMcq,
});

export default allReducers;
