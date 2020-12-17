import { Button, Typography } from '@material-ui/core';
import React from 'react';
import Questions from './Questions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      result: null,
      error: null,
    };
  }

  componentDidMount() {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('json');
    fetch(myParam)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    var { isLoaded, error, result }  = this.state;

    if(!isLoaded) {
      return(<Typography>Loading ...</Typography>)
    }

    if(error !== null) {
      return(<Typography>There was an error. Please reload and try again.</Typography>)
    }

    return(
      <div>
        <Questions title={result.title} data={result.questions} />
      </div>
    )
  }
}
export default App;
