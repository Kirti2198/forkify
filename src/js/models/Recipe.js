import axios from 'axios';

export default class Recipe{
    constructor(id){
      this.id=id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title= res.data.recipe.title;
            this.author= res.data.recipe.publisher;
            this.image= res.data.recipe.image_url;
            this.url= res.data.recipe.source_url;
            this.ingredients= res.data.recipe.ingredients;
            // console.log(res);
        }
        catch(error){
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime(){
        // assuming that each 3ingredients take 15 minutes to cook
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time= periods * 15;
    }

    calcServings(){
        this.servings=4;
    }
}