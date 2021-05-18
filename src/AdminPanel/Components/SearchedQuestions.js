import React, { useState, useEffect } from "react";
import axios from "axios";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import ImagesCarouselModal from "../../Modals/ImagesCarouselModal";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
//Material UI / Dialog Box / Table / Icons
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
//Styles
import { makeStyles } from "@material-ui/core/styles";
import "../css/SearchedQuestions.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    top: "0",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
}));

const Transition2 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SearchedQuestions = (props) => {
  const classes = useStyles();
  const { handleClose, id, open } = props;
  const [rows, setRows] = useState([]);
  const [listLoadStatus, setListLoadStatus] = React.useState("");
  const [questionLoadStatus, setQuestionLoadStatus] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [marks, setMarks] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isTheory, setIsTheory] = useState(false);
  const [imageViewStatus, setImageViewStatus] = React.useState(false);

  useEffect(() => {
    setRows([]);
    setListLoadStatus("");
    if (id && open) {
      axios({
        method: "GET",
        url: `/dashboard/de/questions/${id}`,
      })
        .then((res) => {
          console.log("data: ", res.data);
          setRows(res.data);
          setListLoadStatus("d-none");
        })
        .catch((err) => console.log(err));
    } else {
      handleClose();
    }
  }, [open]);
  useEffect(() => {
    if (rows?.length > 0) {
      loadQuestion(rows[0]?.id);
    }
  }, [rows]);
  const ImageViewClose = () => {
    setImageViewStatus(false);
  };
  const loadQuestion = (rowId) => {
    setQuestionLoadStatus("");
    setImages([]);
    setOptions([]);
    setMarks("");
    setTopics([]);
    setQuestion("");
    setAnswer("");
    axios({
      method: "GET",
      url: `/dashboard/de/question/${rowId}`,
    })
      .then((res) => {
        console.log("questionData: ", res.data);
        setQuestion(res?.data.question);
        if (isTheory) {
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
        setQuestionLoadStatus("d-none");
      })
      .catch((err) => console.log(err));
  };
  const imageAnim = {
    hidden: { x: 1000 },
    show: { x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition2}
        style={{ zIndex: "1" }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={() => {
                handleClose();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Questions
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="questionsContainer">
          <div className="leftSide">
            <br />
            <div className="d-flex justify-content-center">
              <div
                className={`${listLoadStatus} spinner-border`}
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
                      <TableRow
                        key={index}
                        className="onHoverHighlightTextAndCursor"
                        onClick={() => loadQuestion(row.id)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "6rem" }}
                          align="left"
                        >
                          <div className="textContainer">{row.question}</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
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
          </div>
          <div className="rightSide">
            {question === "" ? (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "1rem" }}
              >
                <div
                  className={`${questionLoadStatus} spinner-border`}
                  role="status"
                ></div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="questionField"
                  style={{ flex: images.length > 0 ? "80%" : "100%" }}
                >
                  <div style={{ display: "flex", marginTop: "0.3rem" }}>
                    <h5 className="py-1 text-left">Topics:</h5>
                    <div style={{ margin: "0.5rem 0rem 0rem 1.5rem" }}>
                      {topics.length === 0 ? (
                        <span>This question does not have any topic</span>
                      ) : (
                        topics.map((item, i) => (
                          <span
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
                  <h6 className="py-1 text-left">Marks: {marks}</h6>
                  <div
                    style={{
                      textAlign: "justify",
                      fontSize: "15px",
                      marginTop: "0.5rem",
                      borderRadius: "0.3rem",
                      background: "#f6f6f6",
                    }}
                  >
                    <MathpixLoader>
                      <MathpixMarkdown text={question} />
                    </MathpixLoader>
                  </div>
                  <hr />
                  {isTheory && (
                    <div>
                      <div
                        style={{
                          textAlign: "justify",
                          fontSize: "15px",
                          marginTop: "0.5rem",
                          borderRadius: "0.3rem",
                          background: "#f6f6f6",
                        }}
                      >
                        <h5 className="py-1 text-left">Answer:</h5>
                        <MathpixLoader>
                          <MathpixMarkdown text={answer} />
                        </MathpixLoader>
                      </div>
                      <hr />
                    </div>
                  )}
                  {!isTheory && (
                    <>
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="py-1 text-left">Options:</h5>
                          <div>
                            {options?.map((item, i) => (
                              <div
                                className="pt-3 d-flex"
                                style={{
                                  borderRadius: "0.3rem",
                                  marginBottom: "0.2rem",
                                  background:
                                    item.correct === true
                                      ? "#bcf5bc"
                                      : "#f6f6f6",
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
                </div>
                <br />
                <AnimatePresence>
                  {images.length > 0 && (
                    <motion.div
                      variants={imageAnim}
                      initial="hidden"
                      animate="show"
                      exit={{ x: 1000, duration: "0.5", ease: "easeOut" }}
                      className="imageField"
                      style={{ flex: "20%", position: "relative" }}
                    >
                      <h5>Figures ({images.length})</h5>
                      {images.map((item, i) => {
                        if (item.imageurl) {
                          return (
                            <div
                              className="align-items-center images"
                              style={{
                                cursor: "pointer",
                                position: "sticky",
                                top: "20px",
                              }}
                              onClick={() => {
                                window.activeImageinImageCarousel = i;
                                setImageViewStatus(true);
                              }}
                            >
                              <img
                                alt="Image Error"
                                style={{ height: "120px", width: "100%" }}
                                className="image "
                                src={item.imageurl}
                              />
                            </div>
                          );
                        }
                      })}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SearchedQuestions;
