import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PeopleCard extends Component {

  static propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string,
    name: PropTypes.string,
    setColor: PropTypes.string,
    cardIndex: PropTypes.number,
    isSelected: PropTypes.bool,
    selectedEvent: PropTypes.func
  };

  static dedaultProps = {
    url: 'http://via.placeholder.com/350x150',
    caption:'place holder',
    name: 'Image title',
    setColor: '',
    cardIndex: 0,
    isSelected: false,
    selectedEvent:()=>{},
  };

  /**
   * Handles the cards click event.
   * @param { Object } event 
   */
  cardEvent(event) {
    let{ isSelected } = this.props; 
    if(typeof(this.props.selectedEvent) !== 'function' || isSelected) return;
    this.props.selectedEvent(this);
  }

  render() {
    let { isSelected, name } = this.props;
    return (
      <div onClick = {(e)=> { this.cardEvent(e) } } className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img src = {this.props.url } alt = { this.props.caption } />
        </figure>
      </div>
      <div className={`card-content ${this.props.setColor}`}>
        <div className='media'>
          <div className='media-content'>
            <p className='title is-4'>{ isSelected ? name: '' }</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PeopleCard;
