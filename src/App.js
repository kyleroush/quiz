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
    fetch("https://gist.githubusercontent.com/kyleroush/529059cf8980b6e0876dc65d26ce4c07/raw/89659527ee75942661b397a74388c584df423ef3/gistfile1.json")
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
