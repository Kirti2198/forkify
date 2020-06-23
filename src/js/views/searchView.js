import { elements } from './base';

// export using named export
export const getInput= () => elements.searchInput.value;

// for clearing the text in the input
 export const clearInput= () => {
    elements.searchInput.value='';
 };
//  for clearing the results from previous input
export const clearResults= () => {
    elements.searchResultList.innerHTML='';
    elements.searchResultPages.innerHTML='';
}
/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
const limitRecipeTitle =(title, limit=17) => {
    const newTitle = [];
           if(title.length >limit){
               title.split(' ').reduce((acc, cur)=>{
                     if(acc + cur.length <= limit){
                        newTitle.push(cur);
                     }
                     return acc + cur.length;
               },0);
            // return the result
            return `${newTitle.join(' ')} ...`;
           }
           return title;
}
// for receiving the recipes on UI
const renderRecipe = recipe => {
    // copied from result_list li from index.html
    const markup=
               //  remove  "results__link--active"   class after copying
                `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
        // this will add the recipes after 1,2,3 until 30 recipes if we use after end then 30,29,28.. like this
        elements.searchResultList.insertAdjacentHTML('beforeend', markup) ;             
};
// type here is for go back or next // type: 'prev' or 'next'
// we only need to write markup for the button so we use template string only
const createButtons= (page , type) =>`
        <button class="btn-inline results__btn--${type}" data-goto= ${type === 'prev' ? page-1 : page+1 }>
          <span>Page ${type === 'prev' ? page-1 : page+1 }</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
            </svg>
            
        </button>
        `

const renderButtons =(page, numResults, resPerPage)=>{
    // if 4.5 it will be 5 Math.ceil method
     const pages=Math.ceil(numResults/resPerPage);
     let button;
    //  bcz we want to reassign it
     if(page === 1 && pages > 1){
        //  we only need to write for next page
        button=createButtons(page, 'next');
     }
     else if(page < pages){
        //  we need both prev and next button page
        button= `
           ${createButtons(page, 'prev')}
           ${createButtons(page, 'next')}
        `;
     }
     else if(page === pages && pages >1){
        //  we only need to write prev page
        button=createButtons(page, 'prev');
     }
     elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}


export const renderResults= (recipes, page=1,resPerPage=10) => {
    /* recipes.forEach(element => {
         renderRecipe(element);
     });
     below the short form this function it will loop through all the recipes
     */

    //  for pagination of results (render results of current page)
    const start= (page-1)*resPerPage;
    const end= page*resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

