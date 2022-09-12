import logo from './logo.svg';
import './App.css';

//Components
import HomeGameDisplay from '../game/home-game-display';
import Wishlist from '../wishlist/wishlist';

//Services
import HttpService from '../services/http-service';
import React, {Component} from 'react';

const http = new HttpService();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {games:[]};
  }

  componentDidMount(){
    //Bind functions
  this.loadData = this.loadData.bind(this);
  this.htmlInstance = this.htmlInstance.bind(this);
  this.htmlInstance2 = this.htmlInstance2.bind(this);
  this.allProducts = this.allProducts.bind(this);

  this.oneProduct  = this.oneProduct.bind(this);
  this.twoProducts = this.twoProducts.bind(this);
  this.threeProducts = this.threeProducts.bind(this);

  this.loadData();
  }

loadData = () => {
  var savedThis = this;
  http.getGames().then(dataFromDatabase => {
    savedThis.setState({games: dataFromDatabase})
  }, err => {

  });
}

htmlInstance2 = () =>{
  const colInstance = this.state.games.map((oneGame) =>
  <div className='col-4' key={oneGame._id}>
              <HomeGameDisplay game = {oneGame} imgUrl = "http://localhost:4000/covers/cover-last%20of%20us%20part%202.jpg" />
              </div>);

              return (colInstance);
}

htmlInstance = (theGame) =>{
  return(
  <div className='col-4' key = {theGame._id}>
              <HomeGameDisplay game = {theGame} />
              </div>);
}

allProducts = () =>{
  return (
    <div className='row'>
      {this.htmlInstance2()}
          </div>
  );
}

threeProducts = (completeRow, theKey) =>{
  return (
    <div className='row' key={theKey}>
      {completeRow[0]}
      {completeRow[1]}
      {completeRow[2]}
          </div>
  );
}

twoProducts = (completeRow, theKey) =>{
  return (
    <div className='row' key={theKey}>
      {completeRow[0]}
      {completeRow[1]}
          </div>
  );
}

oneProduct = (lastOne, theKey) =>{
  return (
    <div className='row' key={theKey}>
      {lastOne}
          </div>
  );
}

gamesArrangedList = () =>{
  let allGamesRendered = [];
  const allGames = this.state.games.map((thatGame) => this.htmlInstance(thatGame));
  const gamesCount = allGames.length;
  console.log(gamesCount)
  let incompleteRows = gamesCount % 3;
  let completeRows;
  if(incompleteRows === 0){
    completeRows = gamesCount / 3;
  }else{
    completeRows = (gamesCount-incompleteRows)/3;
  }
  let gameIndex = 0;
  for(let i = 0; i<completeRows; i++){
      allGamesRendered.push(this.threeProducts([allGames[gameIndex++], allGames[gameIndex++], allGames[gameIndex++]], i));
  }
  if(incompleteRows != 0){
    if(incompleteRows === 2){
      allGamesRendered.push(this.twoProducts([allGames[gamesCount-2], allGames[gamesCount-1]], gamesCount-2));
    }else{
      allGamesRendered.push(this.oneProduct(allGames[gamesCount-1], gamesCount-1));
    }
  }

  return(allGamesRendered);
}
  render() {
    return (
      <div className="App">
        

        <div className='App-main container-fluid'>
          <div className='row'>
            <div className='col-8'>
            {this.gamesArrangedList()}
            </div>
            <div className='col-4'>
              <Wishlist />
            </div>
          </div>
          </div>
        </div>
    );
  }
}
export default App;
