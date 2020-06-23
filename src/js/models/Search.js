// import the HTTP request library axios
import axios from 'axios';

export default class Search{
    constructor(query){
        this.query=query;
    }
    // for search query method(we copied it from the index.js)
    // change it to aync method by removeing const 
    async getResults() {
        // now use axios to do our Ajax call
        // that's how we handle promises with async await 
        try{
            //after making getResults a method and removing the parameter we will use this.query in result other than 'query'
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); 
            this.result= res.data.recipes;
            // console.log(this.result); 
        }
        catch(err){
            alert(err);
        }      
    }
}