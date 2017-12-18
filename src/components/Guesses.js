import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Guesses extends Component {
  static propTypes = {
    isRight: PropTypes.bool,
  };

  static defaultProps = {
    isRight: false,
  };

  /**
   * Displays an x or check for right
   * or wrong answer.
   * @return { Object }
   */
  rightOrWrong() {
    let { isRight } = this.props;
    if(isRight) {
      return <i className="fa fa-check fa-3x" aria-hidden="true"></i>;
    }
    return <i className="fa fa-times fa-3x" aria-hidden="true"></i>;
  }

  render() {
    return (
     <span>
       { this.rightOrWrong() }
     </span>
    );
  }
}

export default Guesses;
