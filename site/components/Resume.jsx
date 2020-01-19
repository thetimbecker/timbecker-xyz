import React, { PureComponent } from 'react';

import Markdown from 'react-markdown';

class Resume extends PureComponent {
  state = {
    resume: ""
  };

  componentDidMount() {
    const resumePath = require("../resources/resume.md");

    fetch(resumePath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          resume: text
        })
      })
  }

  render() {
    return (
      <div className="resume">
        <Markdown source={this.state.resume} />
      </div>
    );
  }
}

export default Resume

