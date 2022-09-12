import NotificationService, {NOTIF_WISHLIST_CHANGED} from "./notification-service";

let ns = new NotificationService();

let instance = null;
var wishlist = [];

class DataService{
    constructor(){
        if(!instance){
            instance = this;
        }

        return instance;
    }

    checkItemOnWishList = (theId) =>{
        for(let i = 0; i<wishlist.length; i++){
            if(wishlist[i]._id === theId){
                return true;
            }
        }
        return false;
    }

    addWishListItem = (item) =>{
        wishlist.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
    }

    removeWishListItem = (theId) =>{
        for(let x = 0; x< wishlist.length; x++){
            if(wishlist[x]._id === theId){
                wishlist.splice(x, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
                break;
            }
        }
    }
}

export default DataService;