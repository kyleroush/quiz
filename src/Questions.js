import { Button, ButtonGroup, Card, Container, Fab, Grid, Typography } from '@material-ui/core';
import React from 'react';

class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      phase: "READY",
      correct: 0,
      selected: -1,
    };
  }

  centerTypography = {
    "text-align": "center"
  }

  renderStart = () => {

    return (
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} >
          <Typography style={this.centerTypography} variant="h4" >{this.props.title}</Typography>
        </Grid>
        <Grid item xs={12} >

          <Button fullWidth={true} fullWidth variant="contained" color="primary" onClick={() => { this.setState({phase: "QUESTION"}) }} >Start</Button>
        </Grid>
      </Grid>
    )

  } 

  renderQuestion = () => {
    var { question } = this.state;

    var { image, desc } = this.props.data[question];
    const divStyle = {
      maxWidth: 450
    };
    return (
      <div>
        <div>
          <div style={divStyle}>
            <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} >
              <Typography style={this.centerTypography} variant="h5" >{question+1}) {desc}</Typography>
              </Grid>
              <Grid item xs={12} >
                <img src={image} width={500} height={500} />
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.renderAnswerButtons(0)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.renderAnswerButtons(1)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.renderAnswerButtons(2)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.renderAnswerButtons(3)}
              </Grid>
              <Grid item xs={12} justify="center" alignItems="center">
                <Button fullWidth={true} fullWidth variant="contained" color="primary" onClick={() => { this.setState({phase: "ANSWER"}) }} >Submit</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  } 

  renderAnswerButtons = (num) => {
    var { question, selected } = this.state;
    var { answers } = this.props.data[question];

    return(<Button fullWidth variant="contained" color={num==selected? "primary": ""} onClick={() => { this.setState({selected: num}) }} >{answers[num]}</Button>)
  }

  submitAnswer = () => {
    var { question, selected } = this.state;
    var { correct } = this.props.data[question];
    var phase = question + 1 === this.props.data.length ? "REPORT" : "QUESTION";

    var isCorrect = correct == selected ? 1:0;

    console.log(selected)
    console.log(correct)
    console.log(correct == selected ?   "CORRECT": "WRONG")
    this.setState({
      correct: this.state.correct + isCorrect,
      selected: -1,
      question: question + 1,
      phase: phase
    });
  }

  renderAnswer = (num) => {
    var { question, selected } = this.state;
    var { answers, correct } = this.props.data[question];

    return(
      <div>
        <Typography style={this.centerTypography} variant="h5" >You were {(correct == selected ? "CORRECT": "WRONG")}</Typography>
        <Typography style={this.centerTypography} variant="h5" >The answer is {answers[correct]}</Typography>
        <Button fullWidth={true} fullWidth variant="contained" color="primary" onClick={this.submitAnswer} >
          Next
        </Button>
      </div>
    );
  }

  renderReport = () => {
    var { question, correct } = this.state;

    return(<Typography style={this.centerTypography} variant="h5" >You got {correct} out of {question}.</Typography>)
  }

  renderPhase = (phase) => {
    if (phase === "READY") {
      return this.renderStart();
    }
    if (phase === "QUESTION") {
      return this.renderQuestion();
    }
    if (phase === "ANSWER") {
      return this.renderAnswer();
    }
    if (phase === "REPORT") {
      return this.renderReport();
    }
    return(<Typography>You shouldn't be here.</Typography>)

  }

  render() {
    
    var {phase} = this.state;

    const divStyle = {
      maxWidth: 500
    };
    return(<div style={divStyle}>
      {this.renderPhase(phase)}
    </div>)

  }
}
export default Questions;
