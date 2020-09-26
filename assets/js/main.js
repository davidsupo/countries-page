import { getAllCountries, getCountriesByRegionalBloc, getCountriesByName } from './countries.js';
import { debouncerSearch } from './helpers.js';

const inputSearch = document.getElementById('search');
const countriesContent = document.getElementById('countries');
const modalElement = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const bodyElement = document.getElementsByTagName('body')[0];
const errorElement = document.getElementById('error');

let countries = [];

const renderCountries = (countries)=>{
  let html = ``;
  countries.forEach(country => {
    html += `<article class="card">
      <div class="card__header">
        <p onclick="handleOpenModal('${country.alpha2Code}')" class="card__title--link">${country.name}</p>
        <img class="card__flag" src="${country.flag}" alt="${country.name}">
      </div>
      <div class="card__body">
        <p class="card__subtitle"> <span>CAPITAL: </span> ${country.capital} </p>
        <p class="card__subtitle"> <span>POPULATION: </span> ${country.population} </p>
      </div>
    </article>`
  })
  countriesContent.innerHTML = html;
}

window.handleOpenModal = (alpha2Code) => {
  const findCountry = countries.find(itemCountry => itemCountry.alpha2Code === alpha2Code );
  modalTitle.innerHTML = `<p class="modal__title">${findCountry.name}</p>`
  modalContent.innerHTML = `<p class="modal__subtitle">REGION<p> <p class="modal__subtitle--info">${findCountry.region}<p>`
  modalElement.classList.add('open');
  bodyElement.classList.add('modal-open');
}

window.removeModal = () =>{
  modalElement.classList.remove('open');
  bodyElement.classList.remove('modal-open');
}

const get12Countries =  async () =>{
  errorElement.innerHTML = '';
  countries = await getCountriesByRegionalBloc();
  countries = countries.slice(0,12);
  renderCountries(countries);
}

const errorHandler = (error, countrySearch) => {
  if(error.status === 404){
    errorElement.innerHTML = `Not found countries for '${countrySearch}'`;
  }
}

const init = async ()=>{
  await get12Countries();

  inputSearch.addEventListener('input', (event) => {
    if(event.target.value === ''){ return get12Countries()}
    debouncerSearch(async ()=>{
      try{
        countries = await getCountriesByName(event.target.value);
        if(countries.status && countries.status === 404 ){
          errorHandler(countries,event.target.value);
        }else{
          errorElement.innerHTML = '';
          renderCountries(countries);
        }
      }catch(error){
        console.log(error);
      }
    })
  })


  modalElement.addEventListener('click',(event)=>{
    if(event.target.classList.contains('modal')){
      removeModal();
    }
  })
}
init();

