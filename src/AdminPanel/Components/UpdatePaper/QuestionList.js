import React from "react";
import axios from "axios";
// Components
import {
  ConfirmDialog,
  EditQuestions,
  AddQuestion,
  SeeQuestion,
} from "../LazyImports/LocalComponents";
// Material UI
import {
  Dialog,
  Toolbar,
  Typography,
  CloseIcon,
  Table,
  TableBody,
  TableContainer,
  Paper,
  DeleteIcon,
  Fab,
  RefreshIcon,
  AddIcon,
} from "../LazyImports/MaterialUI";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
// Styles
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { MdModeEdit } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition2 = React.forwardRef(function Transition2(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function QuestionList(props) {
  const classes = useStyles();
  const { open, metadata, onClose, id, is_theory } = props;
  const [rows, setRows] = React.useState([]);
  const [openSeeDialog, setOpenSeeDialog] = React.useState(false);
  const [confirmDialogStatus, setConfirmDialogStatus] = React.useState(false);
  const [getQuestions, setGetQuestions] = React.useState(false);
  const [editQuestionsStatus, setEditQuestionsStatus] = React.useState(false);
  const [progressBarStatus, setProgressBarStatus] = React.useState("");
  const [openAddQuestion, setOpenAddQuestion] = React.useState(false);

  const getAllQuestions = () => {
    if (getQuestions === false) {
      setGetQuestions(true);
    } else {
      setGetQuestions(false);
    }
  };

  const handleCloseDialogBox = () => {
    onClose(false);
  };

  React.useEffect(() => {
    setRows([]);
    setProgressBarStatus("");
    if (id.length === 1) {
      axios({
        method: "GET",
        url: is_theory
          ? `/dashboard/de/questions/theory/${id}`
          : `/dashboard/de/questions/${id}`,
      })
        .then((res) => {
          if (!metadata.subject) {
            onClose(false);
          }
          console.log("data: ", res.data);
          setRows(res.data);
          setProgressBarStatus("d-none");
        })
        .catch((err) => console.log(err));
    } else {
      onClose(false);
    }
    return () => {
      setRows([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getQuestions]);

  const deleteQuestion = () => {
    if (window.DeleteQuestionsId !== "") {
      if (id.length !== 0) {
        axios({
          method: "DELETE",
          url: is_theory
            ? `/dashboard/de/question/theory/${window.DeleteQuestionsId}/meta/${id}`
            : `/dashboard/de/question/${window.DeleteQuestionsId}/meta/${id}`,
        })
          .then((res) => {
            setConfirmDialogStatus(false);
            getAllQuestions();
            window.DeleteQuestionsId = "";
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("Something went wrong. Please Try Again...");
      setConfirmDialogStatus(false);
    }
  };

  const openConfirmDialog = (Qid) => {
    window.DeleteQuestionsId = Qid;
    setConfirmDialogStatus(true);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDialogBox}
        TransitionComponent={Transition2}
        style={{ zIndex: "1" }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Update Questions
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialogBox}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="d-flex justify-content-center">
          <div
            className={`${progressBarStatus} spinner-border`}
            role="status"
          ></div>
        </div>
        <TableContainer component={Paper}>
          <Table className={`${classes.table}`} aria-label="simple table">
            {rows?.map((row, index) => {
              var bg;
              if (index % 2 === 0) {
                bg = "#F6F6F6";
              } else {
                bg = "white";
              }
              return (
                <TableBody
                  key={index}
                  className="p-0 border"
                  style={{ background: bg }}
                >
                  <tr>
                    <td>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-10 p-0 d-flex align-items-center">
                            {/* <TableCell className="onHoverBoldText" onClick={() => { window.SeeQuestionId = row.id; setOpenSeeDialog(true) }} style={{ cursor: 'pointer' }}>{(row.questions.length >= 130) ? row.questions.slice(0, 130)+'...' : row.questions }</TableCell> */}
                            <p
                              className="seeSomeText onHoverBoldText px-3"
                              onClick={() => {
                                window.SeeQuestionId = "";
                                window.SeeQuestionIndex = "";
                                window.SeeQuestionId = row.id;
                                window.SeeQuestionIndex = index;
                                setOpenSeeDialog(true);
                              }}
                            >
                              {row.question}
                            </p>
                          </div>
                          <div className="col-2">
                            <div className="d-flex">
                              <Tooltip title="Delete this question" arrow>
                                <IconButton
                                  aria-label="Delete Question"
                                  onClick={() => openConfirmDialog(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit this question" arrow>
                                <IconButton
                                  aria-label="Edit Question"
                                  onClick={() => {
                                    window.EditQuestionId = row.id;
                                    setEditQuestionsStatus(true);
                                  }}
                                >
                                  <MdModeEdit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Open this question" arrow>
                                <IconButton
                                  aria-label="See Question"
                                  onClick={() => {
                                    window.SeeQuestionId = "";
                                    window.SeeQuestionIndex = "";
                                    window.SeeQuestionId = row.id;
                                    window.SeeQuestionIndex = index;
                                    setOpenSeeDialog(true);
                                  }}
                                >
                                  <BsFillEyeFill />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </TableBody>
              );
            })}
            <tbody>
              <tr>
                <td>
                  <Fab
                    color="primary"
                    style={{
                      position: "fixed",
                      bottom: "100px",
                      right: "50px",
                    }}
                    aria-label="refresh"
                    onClick={getAllQuestions}
                  >
                    <RefreshIcon />
                  </Fab>

                  <Fab
                    color="primary"
                    style={{
                      position: "fixed",
                      bottom: "30px",
                      right: "50px",
                    }}
                    aria-label="add"
                    onClick={() => {
                      window.AddQuestionId = setOpenAddQuestion(true);
                    }}
                  >
                    {/* <Tooltip
                      TransitionComponent={AddQuestion}
                      title="Add a new question to this paper"
                    > */}
                    <AddIcon />
                  </Fab>
                  {/* Add Question Dialog */}
                  <span>
                    <AddQuestion
                      getAllQuestions={getAllQuestions}
                      id={id}
                      is_theory={is_theory}
                      open={openAddQuestion}
                      handleClose={() => setOpenAddQuestion(false)}
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </TableContainer>
      </Dialog>

      {/* Confirm Modal Dialog */}
      <ConfirmDialog
        delete_mcq_by_id={deleteQuestion}
        ConfirmDialog={confirmDialogStatus}
        ConfirmDesc="Are you sure you want to delete this Question?"
        handleClose={() => setConfirmDialogStatus(false)}
      />

      {/* Edit Questions Modal Dialog */}
      <EditQuestions
        metadata={metadata}
        open={editQuestionsStatus}
        getAllQuestions={getAllQuestions}
        is_theory={is_theory}
        onClose={() => {
          window.EditQuestionId = undefined;
          setEditQuestionsStatus(false);
        }}
      />
      {/* See Quesion Modal Dialog */}
      <SeeQuestion
        open={openSeeDialog}
        data={rows}
        metadata={metadata}
        is_theory={is_theory}
        handleClose={() => setOpenSeeDialog(false)}
        id={id}
        getAllQuestions={() => {
          getAllQuestions();
        }}
      />
    </div>
  );
}

export default QuestionList;
