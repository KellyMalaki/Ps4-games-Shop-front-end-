import React, {Component} from "react";
import "./wishlist.css";
import ProductCondesed from "../product-condesed/product-condesed";
import NotificationService, {NOTIF_WISHLIST_CHANGED} from "../services/notification-service";

let ns = new NotificationService();

class Wishlist extends Component{

    constructor(props){
        super(props);

        this.state = {wishlist: []}

        //Bind functions
        this.createWishList = this.createWishList.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged)
    }

    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
            this.setState({wishlist: newWishList});
    }


    showAdd = () =>{
        return (
            <p>No Item Added. Click on Add to Wishlist on an item to add it.</p>
        )
    }

    createWishList = () =>{
        const list = this.state.wishlist.map((game) =>
        <ProductCondesed product={game} key={game.id} />
        ); 
        return (list);
    }
    render(){
        let itemAdded;
        if(this.state.wishlist.length === 0){
            itemAdded = this.showAdd();
        }else{
            itemAdded = this.createWishList();
        }
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-group">
                        {itemAdded}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Wishlist;