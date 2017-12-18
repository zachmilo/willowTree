import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    brandIcon: PropTypes.string.isRequired,
    attachLink: PropTypes.string,
    altName: PropTypes.string
    };

  static defaultProps = {
    brandIcon: 'BrandIcon',
    link: '',
    altName: ''
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href={ this.props.attachLink }>
            <img src={ this.props.brandIcon } alt={ this.props.altName}/>
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
