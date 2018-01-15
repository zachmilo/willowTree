import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from './axiosConfig';

import Header from './components/Header';
import PeopleCard from './components/PeopleCard';
import Guesses from './components/Guesses';

class App extends Component {
  static propTypes = {
    numOfCards: PropTypes.number,
  };

  static defaultProps = {
    numOfCards: 0,
  };

  constructor() {
    super();
    this.state = {
      profiles: [],
      cardsToAdd: [],
      totalguess: [],
      isCorrect: false,
      toFind: 0,
    };
    this.wrong = this.wrong.bind(this);
  }

  /**
   * Makes call to api to fetch
   * profiles.
   */
  componentDidMount() {
    axios.get('/api/v1.0/profiles')
    .then((result)=> {
      let { data } = result;
      this.setState({ profiles:data },()=>{
        this.initGame();
      })
    })
    .catch((err)=> {
      console.log(err);
    })    
  }

  /**
   * Handles initializing game and
   * setting the state of the game.
   */
  initGame() {
    let { numOfCards } = this.props;
    let { profiles } = this.state;
    let profilesRandom = this.randomProfiles(profiles);
    let nameToFind = Math.floor((Math.random() * numOfCards));

    this.setState({isCorrect:false });
    this.setState({cardsToAdd: profilesRandom });
    this.setState({ toFind: nameToFind });  
    this.setState({totalguess: [] })        
  }

  /**
   * Randomizes profiles and doesn't 
   * allow duplicate.
   * @param { Array } profiles 
   * @return { Array }
   */
  randomProfiles(profiles) {
    const { numOfCards } = this.props;
    let randomInts = []
    let result = [];
    let newNumber = 0;

    while(result.length < numOfCards) {
      try {
        newNumber = Math.floor((Math.random() * profiles.length-1));
        let hasUrl = profiles[newNumber].headshot.url;
        if(!randomInts.includes(newNumber) && hasUrl) {
          result.push(Object.assign({},profiles[newNumber]));
          randomInts.push(newNumber)
        }
      }
      catch(err){
        randomInts.push(newNumber)
      }
    }
    return result;
  }

  /**
   * Changes the view to display
   * when correct is found.
   * @return { Object }
   */
  isGameOver() {
    let{ isCorrect, toFind, cardsToAdd } = this.state;
    if(isCorrect) {
      let found = cardsToAdd[toFind];
      return (
        <div className='column is-half is-offset-one-quarter'>
          <section className="hero is-link customHero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Correct!!!
                </h1>
              </div>
            </div>
          </section>
          <section>
          <PeopleCard 
            url = { found.headshot.url } 
            caption = { found.slug } 
            name = { `${found.firstName} ${found.lastName}` }
            setColor = 'right'
            isSelected = { true }
          />
          </section>
          <a onClick ={()=>{this.initGame()}} className="button is-dark is-rounded customButton">Play Again</a>
        </div>
      )
    }
    return this.cardList();
  }

  /**
   * Creates a list of PeopleCards.
   * @return {Array.<PeopleCard>} 
   */
  cardList(){
    let { cardsToAdd } = this.state;
    return ( 
      cardsToAdd.map((card,index) => {
        return (
          <div key = { index } className='column'>
            <PeopleCard 
              url = { card.headshot.url } 
              caption = { card.slug } 
              name = { `${card.firstName} ${card.lastName}` }
              selectedEvent = { this.wrong }
              cardIndex = { index }
              isSelected = { card.isSelected } 
              setColor = { card.setColor || ''}
            />
          </div>
        )
      })
    )
  }

  /**
   * Checks if the card selected 
   * was wrong or right.
   */
  wrong(selectedCard) {
    let { cardIndex } = selectedCard.props;
    let { cardsToAdd, toFind, totalguess, profiles } = this.state;
    if(cardIndex === toFind) {
      totalguess.push(true);
      this.setState({isCorrect: true});
      this.setState({totalguess: totalguess });
    }
    else {
      let cardData = cardsToAdd[cardIndex];
      console.log(cardData);
      console.log(profiles)
      cardData.setColor = 'wrong';
      cardData.isSelected = true;
      //cardsToAdd[cardIndex] = cardData; 

      totalguess.push(false);
      this.setState({totalguess: totalguess });
     // this.setState({cardsToAdd: cardsToAdd })
    }
  }

  render() {
    let { cardsToAdd, toFind, totalguess } = this.state;
    return (
      <div>
      <Header brandIcon = 'https://willowtreeapps.com/img/logo-black.png'  altName = 'willowIcon' />
      <h1 className='title has-text-centered'>{ cardsToAdd[toFind] ? `${cardsToAdd[toFind].firstName} ${cardsToAdd[toFind].lastName}`:''}</h1>
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            { this.isGameOver() }
          </div>
          {
            totalguess.map((guess,index)=> {
              return ( 
                <Guesses 
                  className= 'has-text-centered' 
                  isRight = { guess } 
                  key = { index }/>
              )
            })
          }
        </div>
      </section>
    </div>
    );
  }
}

export default App;
