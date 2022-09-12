import React, {Component} from "react";
import "./product-condesed.css";
import DataService from "../services/data-service";

let ds = new DataService();

class ProductCondesed extends Component{

    constructor(props){
        super(props);
        //Bind
        this.removeItemFromWishlist = this.removeItemFromWishlist.bind(this);
    }

    removeItemFromWishlist = () =>{
        ds.removeWishListItem(this.props.product._id)
}
    render(){
        return (
            <li className="list-group-item pc-condesed">
                <a className="btn btn-outline-danger" href="#" onClick={() => this.removeItemFromWishlist()}>X</a>
                {this.props.product.title} | <b>Ksh. {this.props.product.price}</b>
            </li>
        );
    }
}

export default ProductCondesed;