import React, {Component} from "react";
import "./css/home-game-display.css";
import DataService from "../services/data-service";
import NotificationService, {NOTIF_WISHLIST_CHANGED} from "../services/notification-service";

let ds = new DataService();
let ns = new NotificationService();

class HomeGameDisplay extends Component{

  constructor(props){
    super(props);

    this.state = {onWishList: ds.checkItemOnWishList(this.props.game._id)}

    //Bind functions
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.onWishListChanged = this.onWishListChanged.bind(this);
  }

  componentDidMount(){
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged)
}

componentWillUnmount(){
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
}

onWishListChanged() {
        this.setState({onWishList: ds.checkItemOnWishList(this.props.game._id)});
}

  onButtonClicked = () =>{
    if(this.state.onWishList){
      ds.removeWishListItem(this.props.game._id);
    }else{
      ds.addWishListItem(this.props.game);
    }
  }

    render(){
      let imgUrl = "http://localhost:4000/covers/cover-"+this.props.game.cover;
      let addClassName;
      let theText;
      if(this.state.onWishList){
        addClassName = "btn btn-danger";
        theText = "Remove from WishList";
      }else{
        addClassName = "btn btn-primary";
        theText = "Add to Wishlist";
      }
        return (
            <div className="card game-card">
  <img className="card-img-top img-fluid game-image" src={imgUrl} alt="Game-Img"></img>
  <h4 className="card-title">{this.props.game.title}</h4>
  <div className="card-body">
    <p className="card-text">Price: Ksh. {this.props.game.price}</p>
    <div className="row">
      <div className="col-6">
        <p className="card-text">Year: {this.props.game.year}</p>
      </div>
      <div className="col-6">
      <p className="card-text">Rated: {this.props.game.rating}/5</p>
      </div>
    </div>
    <a href="#" onClick={() => this.onButtonClicked()} className={addClassName}>{theText}</a>
  </div>
</div>
        );
    }
}

export default HomeGameDisplay;