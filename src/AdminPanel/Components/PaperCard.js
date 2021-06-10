import React from "react";
import { SearchedQuestions } from "./LazyImports/LocalComponents";
// Styles
import "../css/PaperCard.css";
// Images
import paper from "../images/paper.svg";

const PaperCard = ({
  id,
  month,
  year,
  subject,
  system,
  board,
  setZindex,
  zindex,
}) => {
  const [questionsList, setQuestionsList] = React.useState(false);

  return (
    <div
      className="paperContainer"
      onClick={() => {
        if (zindex === true) {
          setQuestionsList(true);
          setZindex(false);
        }
      }}
    >
      <div className="lineOne">
        <div>
          <img src={paper} alt="Paper" />
        </div>
        <h5>{system}</h5>
        <h5>{board}</h5>
        <h5>{subject}</h5>
        <h5>
          {month}/{year}
        </h5>
      </div>
      <SearchedQuestions
        handleClose={() => {
          setZindex(true);
          setQuestionsList(false);
        }}
        open={questionsList}
        id={id}
        key={id}
      />
    </div>
  );
};

export default PaperCard;
