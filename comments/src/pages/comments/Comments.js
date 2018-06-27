import React, { Component } from 'react';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: [],
      reviewComments: []
    };
  }

  componentDidMount() {
    const { number } = this.props.location.state;
    fetch("https://api.github.com/repos/facebook/react/issues/" + number + "/comments?access_token=e4ed75825d2ad3ffbe2bc88e403b6ed9dcdc62e0")
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          isLoaded: true,
          comments: result
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
    fetch("https://api.github.com/repos/facebook/react/pulls/" + number + "/comments?access_token=e4ed75825d2ad3ffbe2bc88e403b6ed9dcdc62e0")
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          isLoaded: true,
          reviewComments: result
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
    const comments = this.state.comments.map((comment, index) =>
      <li key={index}>
        {comment.body}</li>
    )
    const reviewComments = this.state.comments.map((reviewComment, index) =>
    <li key={index}>
      {reviewComment.body}</li>
  )
    return (
      <div> {comments}
      {reviewComments}</div>
    );
  }
}

export default Comments;