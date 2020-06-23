export const elements={
    searchForm :document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResultPages: document.querySelector('.results__pages')
};

export const elementStrings ={
    loader : 'loader'
};

export const renderLoader =(parent) =>{
    const loader= `
       <div class="${elementStrings.loader}">
           <svg>
              <use href="img/icons.svg#icon-cw"></use>
           </svg>
       </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader =() =>{
    /* we can't just select loader from elements here because when we run this the loader is not yet here 
    so we can't select it what it not there */
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};

