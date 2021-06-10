import React, { useState } from "react";
import axios from "axios";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import "react-datepicker/dist/react-datepicker.css";
import magnifier from "../images/magnifier.svg";
import LinearProgressWithLabel from "./LinearProgressBarWithLabel";
import { DatePicker } from "./LazyImports/React";
import {
  AppBar,
  Toolbar,
  Backdrop,
  Select,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Zoom,
  KeyboardArrowUpIcon,
  Fab,
  Container,
  Box,
} from "./LazyImports/MaterialUI";
import { PaperCard, ModelNotification } from "./LazyImports/LocalComponents";
//Styles
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuItem from "@material-ui/core/MenuItem";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "../css/AdminSearchComponent.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appBar: {
    // position: "relative",
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  firstLineChild: {
    flex: "10%",
  },
  btnSearch: {
    marginLeft: "0.2rem",
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    overflow: "hidden",
    border: "none",
    cursor: "pointer",
    outline: "none",
  },
  papersContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    marginLeft: "2rem",
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const AdminSearchComponent = (props) => {
  const classes = useStyles();
  const [zindex, setZindex] = useState(true);
  const [result, setResult] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [rangeStartDate, setRangeStartDate] = useState(new Date());
  const [rangeEndDate, setRangeEndDate] = useState(new Date());
  const [isDateRange, setIsDateRange] = useState(false);
  const [boards, setBoards] = useState([]);
  // Dialog Hooks
  const [DialogStatus, setDialogStatus] = useState(false);
  const [DialogDesc, setDialogDesc] = useState("Are you Sure?");
  const [DialogTitle] = useState("Notification");
  const [progressBarStatus, setProgressBarStatus] = React.useState(false);
  const [progress] = useState(10);
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
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: "",
  });
  const [subjects] = useState([
    { subject: "Math" },
    { subject: "Physics" },
    { subject: "Biology" },
  ]);
  const [rows, setRows] = useState([]);

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
  const submit_data = (e) => {
    e.preventDefault();
    if (!paper.date) {
      setNotificationStatus(true);
    } else {
      console.log("This is paper: ", paper);
      setRows([]);
      setProgressBarStatus(true);
      axios({
        method: "POST",
        url: "/dashboard/de/search/date",
        data: paper,
      })
        .then((res) => {
          setProgressBarStatus(false);
          if (res.data === null) {
            setResult(true);
          } else {
            setRows(res.data);
            setResult(false);
            console.log("This is result: ", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setProgressBarStatus(false);
          setDialogDesc("Something went wrong. Please try Again.");
          setDialogStatus(true);
        });
    }
  };
  const change_start_month_and_year = (date) => {};
  const change_end_month_and_year = (date) => {};
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
    setDate(newDate);
    setPaper({ ...paper, date: newDate });
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        style={{ zIndex: zindex ? "1" : "-1" }}
      >
        <Toolbar>
          <form onSubmit={submit_data} style={{ width: "100%" }} id="myForm">
            <div className={classes.firstLine}>
              <FormControl
                color="secondary"
                className={(classes.formControl, classes.firstLineChild)}
                style={{ marginRight: "1rem" }}
              >
                <InputLabel style={{ color: "#fff" }} id="system-label">
                  System
                </InputLabel>
                <Select
                  labelId="system-label"
                  id="system"
                  name="system"
                  value={paper.system}
                  style={{ color: "#fff" }}
                  onChange={change_input}
                  required
                >
                  {systems.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.system}>
                        {item.system}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                color="secondary"
                style={{ marginRight: "1rem" }}
                className={(classes.formControl, classes.firstLineChild)}
              >
                <InputLabel style={{ color: "#fff" }} id="board-label">
                  Board
                </InputLabel>
                <Select
                  labelId="board-label"
                  id="board"
                  name="board"
                  value={paper.board}
                  style={{ color: "#fff" }}
                  onChange={change_input}
                  required
                >
                  {boards.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.board}>
                        {item.board}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                color="secondary"
                style={{ marginRight: "1rem" }}
                className={(classes.formControl, classes.firstLineChild)}
              >
                <InputLabel style={{ color: "#fff" }} id="subject-label">
                  Subject
                </InputLabel>
                <Select
                  labelId="subject-label"
                  id="subject"
                  name="subject"
                  style={{ color: "#fff" }}
                  value={paper.subject}
                  onChange={change_input}
                  required
                >
                  {subjects.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.subject}>
                        {item.subject}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                size="small"
                component="fieldset"
                style={{
                  flex: "20%",
                }}
                className={classes.firstLineChild}
              >
                <FormLabel
                  style={{ fontWeight: "300", color: "#fff" }}
                  component="legend"
                ></FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="date"
                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      value="date"
                      control={
                        <Radio
                          color="secondary"
                          required
                          onChange={(e) =>
                            e.target.checked ? setIsDateRange(false) : ""
                          }
                        />
                      }
                      label="Date"
                    />
                    <FormControlLabel
                      value="dateRange"
                      control={
                        <Radio
                          color="secondary"
                          required
                          onChange={(e) =>
                            e.target.checked ? setIsDateRange(true) : ""
                          }
                        />
                      }
                      label="Date Range"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
              {!isDateRange && (
                <div
                  style={{
                    flex: "20%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                  className={(classes.firstLineChild, "form-group")}
                >
                  <label
                    htmlFor=""
                    style={{
                      color: "#fff",
                      margin: "0.3rem 0.3rem 0rem 0rem",
                    }}
                  >
                    Year And Month{" "}
                  </label>

                  <DatePicker
                    className="w-100"
                    selected={date}
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
              )}
              {isDateRange && (
                <div
                  style={{
                    flex: "20%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                  className={(classes.firstLineChild, "form-group")}
                >
                  <label
                    htmlFor=""
                    style={{
                      color: "#fff",
                      margin: "0.3rem 0.3rem 0rem 0rem",
                    }}
                  >
                    Start Date{" "}
                  </label>

                  <DatePicker
                    className="w-100"
                    selected={startDate}
                    showMonthYearPicker
                    peekNextMonth
                    onChangeRaw={(e) => e.preventDefault()}
                    onFocus={(e) => e.preventDefault()}
                    onKeyDown={(e) => e.preventDefault()}
                    disabledKeyboardNavigation
                    dateFormat="MMMM yyyy"
                    onChange={change_start_month_and_year}
                  />
                  <label
                    htmlFor=""
                    style={{
                      color: "#fff",
                      margin: "0.3rem 0.3rem 0rem 0rem",
                    }}
                  >
                    End Date{" "}
                  </label>

                  <DatePicker
                    className="w-100"
                    selected={endDate}
                    showMonthYearPicker
                    peekNextMonth
                    onChangeRaw={(e) => e.preventDefault()}
                    onFocus={(e) => e.preventDefault()}
                    onKeyDown={(e) => e.preventDefault()}
                    disabledKeyboardNavigation
                    dateFormat="MMMM yyyy"
                    onChange={change_end_month_and_year}
                  />
                </div>
              )}
              <div
                style={{ marginRight: "auto" }}
                className={
                  (classes.firstLineChild,
                  "form-group justify-content-center d-flex")
                }
              >
                <button
                  className={classes.btnSearch}
                  type="submit"
                  /*className="btn  px-5 py-2 bg-info mybutton"*/
                >
                  <img src={magnifier} alt="search" />
                </button>
              </div>
            </div>
          </form>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container
        style={{
          margin: "0rem",
          width: "100vw",
          height: "100vh",
          padding: "0",
        }}
      >
        <Box my={2} className={classes.papersContainer}>
          {rows && rows.length > 0 ? (
            rows.map((row) => (
              <PaperCard
                year={new Date(row.date).getFullYear()}
                month={new Date(row.date).toLocaleString("default", {
                  month: "long",
                })}
                system={row.system}
                board={row.board}
                subject={row.subject}
                id={row.id}
                key={row.id}
                setZindex={setZindex}
                zindex={zindex}
              />
            ))
          ) : result ? (
            <div style={{ margin: "auto" }}>
              <h1>Oops!</h1>
              <h4>
                We didn't find any papers matching your criteria. Please try
                again by changing the parameters.
              </h4>
            </div>
          ) : (
            <div style={{ margin: "auto" }}>
              Select from parameters and a date to search the past papers data
            </div>
          )}
          {/* Progress Bar */}
          <Backdrop className={classes.backdrop} open={progressBarStatus}>
            <LinearProgressWithLabel value={progress} />;
          </Backdrop>
          <ModelNotification
            DialogStatus={notificationStatus}
            DialogTitle="Notification"
            DialogDesc="Please Select Year and month."
            handleClose={() => setNotificationStatus(false)}
            DialogOk="Ok"
          />
          {/* Dialog Box */}
          <ModelNotification
            DialogStatus={DialogStatus}
            DialogTitle={DialogTitle}
            DialogDesc={DialogDesc}
            handleClose={() => setDialogStatus(false)}
            DialogOk="Ok"
          />
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default AdminSearchComponent;
