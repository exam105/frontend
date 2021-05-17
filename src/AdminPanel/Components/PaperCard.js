import React, { useEffect } from "react";
import SearchedQuestions from "./SearchedQuestions";
//Styles
import "../css/PaperCard.css";

const PaperCard = ({ id, month, year, subject, system, board, setZindex }) => {
  const [questionsList, setQuestionsList] = React.useState(false);
  useEffect(() => {
    if (questionsList) {
      setZindex(false);
    } else {
      setZindex(true);
    }
  }, [questionsList]);
  return (
    <div className="paperContainer" onClick={() => setQuestionsList(true)}>
      <div className="lineOne">
        <div className="system">{system}</div>
        <div className="board">{board}</div>
        <div className="subject">{subject}</div>
        <div className="monthYear">
          {month}/{year}
        </div>
      </div>
      <SearchedQuestions
        handleClose={() => setQuestionsList(false)}
        open={questionsList}
        id={id}
      />
    </div>
  );
};

export default PaperCard;
