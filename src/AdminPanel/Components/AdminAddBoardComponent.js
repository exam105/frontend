import React, { useState } from "react";
// import "../css/AdminAddmcqs.css"; if any problem occurs with the UI of this component, then pls try uncommenting this line and comment the line below it
import "../css/AdminAddBoard.css";
import { add_board, reset_mcq, reset_theory } from "../../action/index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DatePicker } from "./LazyImports/React";
import "react-datepicker/dist/react-datepicker.css";
import {
  ConfirmDialog,
  ModelNotification,
} from "./LazyImports/LocalComponents";
import { useSelector } from "react-redux";

function AdminAddBoardComponent(props) {
  const history = useHistory();
  const mcqReducer = useSelector((data) => data.mcqReducer);
  const theoryReducer = useSelector((data) => data.theoryReducer);
  const [startDate, setStartDate] = useState(new Date());
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [confirmDialogStatus, setConfirmDialogStatus] = useState(false);
  const [systems] = useState([
    { system: "GCSE" },
    { system: "IGCSE" },
    { system: "AS" },
    { system: "A Level" },
    { system: "O Level" },
    { system: "Pre U" },
    { system: "IB" },
  ]);
  const [boards, setBoards] = useState([]);

  const [subjects] = useState([
    { subject: "Math" },
    { subject: "Physics" },
    { subject: "Biology" },
    { subject: "Chemistry" },
    { subject: "Economics" },
    { subject: "Design and Technology" },
  ]);

  const [series] = useState([
    { series: "0" },
    { series: "1" },
    { series: "2" },
    { series: "3" },
    { series: "4" },
    { series: "5" },
    { series: "6" },
  ]);

  const [papers] = useState([
    { paper: "Paper 0" },
    { paper: "Paper 1" },
    { paper: "Paper 2" },
    { paper: "Paper 3" },
    { paper: "Paper 4" },
    { paper: "Paper 5" },
    { paper: "Paper 6" },
  ]);
  const [notes] = useState([
    { note: "Core" },
    { note: "Extended" },
    { note: "Practical" },
    { note: "Alt to Practical" },
  ]);

  const [paper, setPaper] = useState({
    system: "",
    board: "",
    subject: "",
    date: "",
    series: "",
    paper: "",
    reference: "",
    notes: "",
  });

  React.useEffect(() => {
    if (mcqReducer.length !== 0 || theoryReducer.length !== 0) {
      setConfirmDialogStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit_data = (e) => {
    e.preventDefault();
    if (!paper.date) {
      setNotificationStatus(true);
    } else {
      props.add_board(paper);
      history.push("/admin/panel/add/");
    }
  };

  const change_input = (e) => {
    if (e.target.name === "system") {
      if (e.target.value === "GCSE") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CCEA" },
        ]);
      } else if (e.target.value === "IGCSE") {
        setBoards([{ board: "Edexcel" }, { board: "CIE" }]);
      } else if (e.target.value === "AS") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CIE" },
          { board: "Edexcel IAL" },
        ]);
      } else if (e.target.value === "A Level") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CIE" },
          { board: "Edexcel IAL" },
        ]);
      } else if (e.target.value === "O Level") {
        setBoards([{ board: "CIE" }]);
      } else if (e.target.value === "Pre U") {
        setBoards([{ board: "CIE" }]);
      } else if (e.target.value === "IB") {
        setBoards([{ board: "No Board", status: "disable" }]);
      }
    }
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  const change_month_and_year = (date) => {
    let monthNumber = date.getMonth();
    monthNumber = monthNumber + 1;
    const year = date.getFullYear();
    let m;
    if (monthNumber < 10) {
      m = `0${monthNumber}`;
    } else {
      m = `${monthNumber}`;
    }
    let newDate = new Date(`${year}-${m}-01T00:00:00Z`);
    setStartDate(newDate);
    setPaper({ ...paper, date: newDate });
  };

  return (
    <section className="add_board_main">
      <div className="add_board_child px-md-5 px-4">
        <h1 className="text-center board_titile py-3"> Paper Meta Data </h1>
        <form className="board_form mx-auto" onSubmit={submit_data} id="myForm">
          {/* System Field */}
          <div className="form-group">
            <label htmlFor="system">Select System : </label>
            <select
              value={paper.system}
              id="system"
              name="system"
              onChange={change_input}
              // id="grouped-select"
              className="form-control form-select"
              required
            >
              <option>None</option>
              {systems.map((item, i) => {
                return (
                  <option key={i} value={item.system}>
                    {item.system}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Board Field */}
          <div className="form-group">
            <label htmlFor="">Select Board : </label>
            <select
              value={paper.board}
              name="board"
              onChange={change_input}
              id="board"
              className="form-control form-select"
              required
            >
              <option value="">None</option>
              {boards.map((item, i) => {
                return (
                  <option key={i} value={item.board}>
                    {item.board}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="">Select Subject :</label>
            <select
              value={paper.subject}
              name="subject"
              onChange={change_input}
              id="subject"
              className="form-control form-select"
              required
            >
              <option value="">None</option>
              {subjects.map((item, i) => {
                return (
                  <option key={i} value={item.subject}>
                    {item.subject}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Date Field */}
          <div className="form-group datepicker_main">
            <label htmlFor="">Select Year And Month :</label>
            <br />
            <DatePicker
              className="form-control w-100"
              selected={startDate}
              showMonthYearPicker
              peekNextMonth
              onChangeRaw={(e) => e.preventDefault()}
              onFocus={(e) => e.preventDefault()}
              onKeyDown={(e) => e.preventDefault()}
              disabledKeyboardNavigation
              dateFormat="MMMM yyyy"
              onChange={change_month_and_year}
            />
          </div>
          {/* Series Field */}
          <div className="form-group">
            <label htmlFor="">Select Series : </label>
            <select
              value={paper.series}
              name="series"
              onChange={change_input}
              id="series"
              className="form-control form-select"
              required
            >
              <option value="">None</option>
              {series.map((item, i) => {
                return (
                  <option key={i} value={item.series}>
                    {item.series}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Paper No Field */}
          <div className="form-group">
            <label htmlFor="">Select Paper :</label>
            <select
              value={paper.paper}
              name="paper"
              onChange={change_input}
              id="paper"
              className="form-control form-select"
              required
            >
              <option value="">None</option>
              {papers.map((item, i) => {
                return (
                  <option key={i} value={item.paper}>
                    {item.paper}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Reference Field */}
          <div className="form-group">
            <label htmlFor="reference">Enter Reference Number :</label>
            {/* add an input field to save input in paper.reference */}
            <input
              type="text"
              name="reference"
              value={paper.reference}
              onChange={change_input}
              className="form-control"
              placeholder="Reference Number"
              required
            />
          </div>
          {/* Notes Field */}
          <div className="form-group">
            <label htmlFor="notes">{`Select Notes (optional):`}</label>
            <select
              value={paper.notes}
              name="notes"
              onChange={change_input}
              id="notes"
              className="form-control form-select"
            >
              <option value="">None</option>
              {notes.map((item, i) => {
                return (
                  <option key={i} value={item.note}>
                    {item.note}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group justify-content-center d-flex">
            <button type="submit" className="btn px-5 py-2 bg-info mybutton">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ModelNotification
        DialogStatus={notificationStatus}
        DialogTitle="Notification"
        DialogDesc="Please Select Year and month."
        handleClose={() => setNotificationStatus(false)}
        DialogOk="Ok"
      />{" "}
      {/* Modal For Confirmation */} {/* Confirm Modal Dialog Status */}
      <ConfirmDialog
        // theoryButton={
        //   theoryReducer.length !== 0 ? "Continue with Theory Paper" : undefined
        // }
        // mcqButton={
        //   mcqReducer.length !== 0 ? "Continue with Mcq Paper" : undefined
        // }
        // openMCQ={() => history.push("/admin/panel/add/mcqs")}
        // openTheory={() => history.push("/admin/panel/add/theory")}
        ConfirmDialog={confirmDialogStatus}
        delete_mcq_by_id={() => {
          if (mcqReducer.length !== 0) {
            history.push("/admin/panel/add/mcqs");
          }
          if (theoryReducer.length !== 0) {
            history.push("/admin/panel/add/theory");
          }
        }}
        okButton="Continue"
        ConfirmDesc="There is already a paper in progress. Do you want to 'Continue' with the last unsaved paper or 'Cancel' to start adding a new paper. 'Cancel' will permanently delete the unsaved papers."
        handleClose={() => {
          setConfirmDialogStatus(false);
          props.reset_theory();
          props.reset_mcq();
        }}
      />{" "}
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_board: (data) => {
      dispatch(add_board(data));
    },
    reset_mcq: () => {
      dispatch(reset_mcq());
    },
    reset_theory: () => {
      dispatch(reset_theory());
    },
  };
};

export default connect(null, mapDispatchToProps)(AdminAddBoardComponent);
