import React, { Component } from 'react';
import List from './list/List'
import Coments from './comments/Comments'

class Layout extends Component {
  render() {
    return (
      <div>
      <h1 align="center">Facebook / React</h1>
      <List comments={this.props.children} />
      </div>
    );
  }
}

export default Layout;