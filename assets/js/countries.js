const BASE_ENDPOINT = 'https://restcountries.eu/rest/v2';

export const getAllCountries = async () => {
  try{
    const response = await fetch(`${BASE_ENDPOINT}/all`);
    const data = await response.json();
    return data;
  }catch(error){
    throw new Error(error);
  }
};

export const getCountriesByName = async(name) => {
  try{
    const response = await fetch(`${BASE_ENDPOINT}/name/${name}`);
    const data = await response.json();
    return data;
  }catch(error){
    throw new Error(error);
  }
}

export const getCountriesByRegionalBloc = async (regionalBloc = 'usan') => {
  try{
    const response = await fetch(`${BASE_ENDPOINT}/regionalbloc/${regionalBloc}`);
    const data = await response.json();
    return data;
  }catch(error){
    throw new Error(error);
  }
}