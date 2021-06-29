import React, { useState } from "react";
import axios from "axios";
// Components
import { ModelNotification } from "../LazyImports/LocalComponents";
// Material UI
import { Dialog, DialogContent } from "../LazyImports/MaterialUI";
import { DatePicker } from "../LazyImports/React";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogModalMetaData(props) {
  const [open, setOpen] = React.useState(props.DialogStatus);
  const { callUseEffect } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [notificationStatus, setNotificationStatus] = useState(false);
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
  ]);

  const [series] = useState([
    { series: "1" },
    { series: "2" },
    { series: "3" },
    { series: "4" },
    { series: "5" },
    { series: "6" },
  ]);

  const [papers] = useState([
    { paper: "Paper 1" },
    { paper: "Paper 2" },
    { paper: "Paper 3" },
  ]);

  const [paper, setPaper] = useState({
    system: "",
    board: "",
    subject: "",
    date: "",
    series: "",
    paper: "",
  });

  const submit_data = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/dashboard/de/metadata/${props.id}`,
      data: paper,
    })
      .then((res) => {
        props.handleClose();
        callUseEffect();
      })
      .catch((err) => console.log(err));
  };

  const change_input = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "system") {
      if (value === "GCSE") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CCEA" },
        ]);
      } else if (value === "IGCSE") {
        setBoards([{ board: "Edexcel" }, { board: "CIE" }]);
      } else if (value === "AS") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CIE" },
          { board: "Edexcel IAL" },
        ]);
      } else if (value === "A Level") {
        setBoards([
          { board: "Edexcel" },
          { board: "AQA" },
          { board: "OCR" },
          { board: "CIE" },
          { board: "Edexcel IAL" },
        ]);
      } else if (value === "O Level") {
        setBoards([{ board: "CIE" }]);
      } else if (value === "Pre U") {
        setBoards([{ board: "CIE" }]);
      } else if (value === "IB") {
        setBoards([{ board: "No Board", status: "disable" }]);
      } else {
        setBoards([]);
      }
    }
    setPaper({ ...paper, [e.target.name]: value });
  };

  React.useEffect(() => {
    const e = {
      target: { name: "system", value: props.data.system },
    };
    change_input(e);
    setPaper({
      system: props?.data?.system,
      board: props?.data?.board,
      subject: props?.data?.subject,
      date: props?.data?.date,
      series: props?.data?.series,
      paper: props?.data?.paper,
    });
    setOpen(props.DialogStatus);
    if (props.data.date !== undefined) {
      const newDate = new Date(props.data.date);
      setStartDate(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.DialogStatus]);
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
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth="sm"
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="px-5">
          <form
            className="board_form mx-auto"
            onSubmit={submit_data}
            id="myForm"
          >
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
            <div className="form-group justify-content-center d-flex">
              <button type="submit" className="btn px-5 py-2 bg-info mybutton">
                Submit
              </button>
            </div>
          </form>
          <ModelNotification
            DialogStatus={notificationStatus}
            DialogTitle="Notification"
            DialogDesc="Please Select Year and month."
            handleClose={() => setNotificationStatus(false)}
            DialogOk="Ok"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogModalMetaData;
