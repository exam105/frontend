import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import {
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  makeStyles,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImagesCarouselModal from "../../../Modals/ImagesCarouselModal";
// Components
import EditQuestions from "./EditQuestions";
import ConfirmDialog from "../../../Modals/ConfirmDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: "1",
  },
}));

export default function SeeQuestion(props) {
  const classes = useStyles();
  const { getAllQuestions, id, handleClose, open, is_theory, metadata } = props;
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [marks, setMarks] = React.useState("");
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
  const [imageViewStatus, setImageViewStatus] = React.useState(false);
  const [editQuestionId, setEditQuestionId] = React.useState("");
  const [deleteQuestionId, setDeleteQuestionId] = React.useState("");
  const [confirmDialogStatus, setConfirmDialogStatus] = React.useState(false);
  const [editQuestion, setEditQuestion] = React.useState(false);

  const ImageViewClose = () => {
    setImageViewStatus(false);
  };

  React.useEffect(() => {
    if (window.SeeQuestionId !== undefined) {
      if (window.SeeQuestionIndex !== undefined) {
        setActiveQuestionIndex(window.SeeQuestionIndex);
      }
      setEditQuestionId(window.SeeQuestionId);
      setDeleteQuestionId(window.SeeQuestionId);
      getQuestion(window.SeeQuestionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.SeeQuestionId]);

  React.useEffect(() => {
    if (props.data) {
      const SeeQuestionId = props.data[activeQuestionIndex];
      if (SeeQuestionId !== undefined) {
        setEditQuestionId(SeeQuestionId.id);
        setDeleteQuestionId(SeeQuestionId.id);
        getQuestion(SeeQuestionId.id);
      } else {
        console.log("not See Question id found");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuestionIndex]);

  const getQuestion = (id) => {
    setOptions([]);
    setMarks("");
    setTopics([]);
    setQuestion("");
    setAnswer("");
    setImages([]);
    axios({
      method: "GET",
      url: is_theory
        ? `/dashboard/de/question/theory/${id}`
        : `/dashboard/de/question/${id}`,
    })
      .then((res) => {
        setQuestion(res?.data.question);
        if (is_theory) {
          console.log("this is isTheory: ", is_theory);
          setAnswer(res?.data.answer);
        } else {
          setOptions(res?.data.options);
        }
        setMarks(res?.data.marks);
        if (res?.data.images) {
          setImages(res.data.images);
        } else {
          setImages([]);
        }
        if (res?.data.topics) {
          setTopics(res.data.topics);
        } else {
          setTopics([]);
        }
      })
      .catch((err) => console.log(err));
  };
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
            if (
              props.data[activeQuestionIndex - 1] === undefined &&
              props.data[activeQuestionIndex + 1] === undefined
            ) {
              setOptions([]);
              setTopics([]);
              setQuestion("");
              setAnswer("");
              setImages([]);
              setMarks("");
              handleClose();
            } else if (props.data[activeQuestionIndex + 1] === undefined) {
              const SeeQuestionId = props.data[activeQuestionIndex - 1];
              setEditQuestionId(SeeQuestionId.id);
              setDeleteQuestionId(SeeQuestionId.id);
              getQuestion(SeeQuestionId.id);
              setActiveQuestionIndex(activeQuestionIndex - 1);
            } else {
              const SeeQuestionId = props.data[activeQuestionIndex + 1];
              setEditQuestionId(SeeQuestionId.id);
              setDeleteQuestionId(SeeQuestionId.id);
              getQuestion(SeeQuestionId.id);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("Something went wrong. Please Try Again...");
      setConfirmDialogStatus(false);
    }
  };
  const onCloseEditQuestion = () => {
    window.EditQuestionId = undefined;
    setEditQuestion(false);
    const SeeQuestionId = props.data[activeQuestionIndex];
    if (SeeQuestionId !== undefined) {
      setEditQuestionId(SeeQuestionId.id);
      setDeleteQuestionId(SeeQuestionId.id);
      getQuestion(SeeQuestionId.id);
    }
  };
  const editCurrentQuestion = () => {
    console.log("edit triggered");
    window.EditQuestionId = editQuestionId;
    setEditQuestion(true);
  };
  const deleteCurrentQuestion = () => {
    console.log("delete triggered");
    window.DeleteQuestionsId = deleteQuestionId;
    setConfirmDialogStatus(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        fullScreen
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        style={{ zIndex: "2" }}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              See Question
            </Typography>
            <Button color="inherit" onClick={editCurrentQuestion}>
              Edit
            </Button>
            <Button
              onClick={deleteCurrentQuestion}
              style={{ marginRight: "2rem" }}
              color="inherit"
            >
              Delete
            </Button>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOptions([]);
                setTopics([]);
                setQuestion("");
                setAnswer("");
                setImages([]);
                setMarks("");
                window.SeeQuestionId = undefined;
                handleClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {question === "" ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "50vh" }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <DialogContent>
            {props.data[activeQuestionIndex - 1] === undefined ? (
              <IconButton
                disabled
                aira-label="Previous Question"
                style={{ outline: "none", position: "fixed", bottom: "50%" }}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton
                aira-label="Previous Question"
                style={{ outline: "none", position: "fixed", bottom: "50%" }}
                onClick={() => {
                  setActiveQuestionIndex(activeQuestionIndex - 1);
                }}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            )}
            <div className="mx-auto" style={{ width: "80%" }}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8" style={{ display: "flex" }}>
                    <h5 className="py-1 simple-header-font font-italic font-weight-bold text-left">
                      Topics:
                    </h5>
                    <div style={{ margin: "0.5rem 0rem 0rem 1.5rem" }}>
                      {topics.length === 0 ? (
                        <span>This question does not have any topic</span>
                      ) : (
                        topics.map((item, i) => (
                          <span
                            key={i}
                            className="pt-1 d-inline"
                            style={{
                              borderBottom: "1px solid rgba(0,0,0,0.3)",
                            }}
                          >
                            <span>
                              {" "}
                              &nbsp;{item.topic}
                              {topics.length > 1 && i !== topics.length - 1
                                ? ","
                                : ""}
                            </span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h5
                      className="py-1 simple-header-font font-italic text-right"
                      style={{
                        textDecoration: "underline",
                        textUnderlinePosition: "under",
                      }}
                    >
                      Marks: {marks}
                    </h5>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "15px", marginTop: "1.5rem" }}>
                <h5 className="py-1 simple-header-font font-italic font-weight-bold text-left">
                  Question:
                </h5>
                <MathpixLoader>
                  <MathpixMarkdown text={question} />
                </MathpixLoader>
              </div>
              <hr />
              {is_theory && (
                <div>
                  <div style={{ fontSize: "15px", marginTop: "1.5rem" }}>
                    <h5 className="py-1 simple-header-font font-italic font-weight-bold text-left">
                      Answer:
                    </h5>
                    <MathpixLoader>
                      <MathpixMarkdown text={answer} />
                    </MathpixLoader>
                  </div>
                  <hr />
                </div>
              )}

              <div className="container-fluid">
                {!is_theory && (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <h5 className="py-3 simple-header-font font-italic font-weight-bold shadow text-center">
                          Options
                        </h5>
                        <div>
                          {options?.map((item, i) => (
                            <div
                              key={i}
                              className="pt-3 d-flex"
                              style={{
                                borderBottom: "1px solid rgba(0,0,0,0.3)",
                              }}
                            >
                              {item.correct === true ? (
                                <CheckCircleIcon className="text-success" />
                              ) : (
                                <CancelIcon className="text-danger" />
                              )}
                              <p> &nbsp;{item.option}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <br />
                <div className="row">
                  <h5 className="col-12 simple-header-font font-italic font-weight-bold shadow text-center py-3">
                    Related Images ({images.length})
                  </h5>
                  {images.length === 0 ? (
                    <div className="col-12">
                      <h5 className="text-center">
                        This question does not have any image
                      </h5>
                    </div>
                  ) : (
                    images.map((item, i) => {
                      if (item.imageurl) {
                        return (
                          <div
                            key={i}
                            className="position-relative p-2 d-flex align-items-center col-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.activeImageinImageCarousel = i;
                              setImageViewStatus(true);
                            }}
                          >
                            <img
                              alt="Error"
                              style={{ height: "120px", width: "100%" }}
                              className="img-fluid px-1"
                              src={item.imageurl}
                            />
                          </div>
                        );
                      }
                      return null;
                    })
                  )}
                  {/* Images View Carousel Dialog */}
                  {images.length === 0 ? (
                    <div></div>
                  ) : (
                    <ImagesCarouselModal
                      open={imageViewStatus}
                      handleClose={ImageViewClose}
                      data={images}
                    />
                  )}
                </div>
              </div>
            </div>
            {props.data[activeQuestionIndex + 1] === undefined ? (
              <IconButton
                disabled
                aira-label="Next Question"
                style={{
                  outline: "none",
                  position: "fixed",
                  right: "30px",
                  bottom: "50%",
                }}
              >
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton
                aira-label="Next Question"
                style={{
                  outline: "none",
                  position: "fixed",
                  right: "30px",
                  bottom: "50%",
                }}
                onClick={() => {
                  setActiveQuestionIndex(activeQuestionIndex + 1);
                }}
              >
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            )}
          </DialogContent>
        )}
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
        open={editQuestion}
        getAllQuestions={getAllQuestions}
        is_theory={is_theory}
        onClose={() => {
          onCloseEditQuestion();
        }}
      />
    </div>
  );
}
