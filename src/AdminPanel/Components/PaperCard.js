import React from "react";
import SearchedQuestions from "./SearchedQuestions";
//Styles
import "../css/PaperCard.css";

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
        <div className="system">{system}</div>
        <div className="board">{board}</div>
        <div className="subject">{subject}</div>
        <div className="monthYear">
          {month}/{year}
        </div>
      </div>
      <SearchedQuestions
        handleClose={() => {
          setZindex(true);
          setQuestionsList(false);
        }}
        open={questionsList}
        id={id}
      />
    </div>
  );
};

export default PaperCard;
