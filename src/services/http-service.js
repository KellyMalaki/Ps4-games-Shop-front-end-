import "whatwg-fetch";

class HttpService{
    getGames= () => {
        var promise = new Promise((resolve, rej) =>{
            fetch("http://127.0.0.1:4000/games/")
        .then(res =>{
            resolve(res.json());
        });
        });
        return promise;
    } 
}

export default HttpService;