async function fetchCountriesData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch:', error);
        return [];
    }
}

function updateUI(selector, data) {
    const container = document.querySelector(selector);
    container.innerHTML = data.map(item => `<div>${item}</div>`).join('');
}

// 1. Get the top n countries by area
async function getTopCountriesByArea(n) {
    const countries = await fetchCountriesData();
    const sortedByArea = countries.sort((a, b) => b.area - a.area);
    const topCountries = sortedByArea.slice(0, n).map(country => country.name.common);
    updateUI('#area', topCountries);
}

// 2. Get the top n countries by population
async function getTopCountriesByPopulation(n) {
    const countries = await fetchCountriesData();
    const sortedByPopulation = countries.sort((a, b) => b.population - a.population);
    const topCountries = sortedByPopulation.slice(0, n).map(country => country.name.common);
    updateUI('#population', topCountries);
}

// 3. Given a language, get all countries where that language is spoken
async function getCountriesByLanguage(language) {
    const countries = await fetchCountriesData();
    const filteredByLanguage = countries.filter(country => {
        return country.languages && Object.values(country.languages).includes(language);
    });
    const resultCountries = filteredByLanguage.map(country => country.name.common);
    updateUI('#language', resultCountries);
}

// 4. Given a currency, find all countries where that particular currency is accepted
async function getCountriesByCurrency(currency) {
    const countries = await fetchCountriesData();
    const filteredByCurrency = countries.filter(country => {
        return country.currencies && Object.keys(country.currencies).includes(currency);
    });
    const resultCountries = filteredByCurrency.map(country => country.name.common);
    updateUI('#currency', resultCountries);
}

// 5. Get all landlocked countries
async function getLandlockedCountries() {
    const countries = await fetchCountriesData();
    const landlockedCountries = countries.filter(country => country.landlocked);
    const resultCountries = landlockedCountries.map(country => country.name.common);
    updateUI('#landlocked', resultCountries);
}

// 6. Find the country with the highest Gini index
async function getCountryWithHighestGini() {
    const countries = await fetchCountriesData();
    const countriesWithGini = countries.filter(country => country.gini);
    const highestGiniCountry = countriesWithGini.reduce((max, country) => {
        const giniValue = Math.max(...Object.values(country.gini));
        return giniValue > max.gini ? { name: country.name.common, gini: giniValue } : max;
    }, { name: '', gini: 0 });
    document.querySelector('#gini').innerHTML = `<div>${highestGiniCountry.name}: ${highestGiniCountry.gini}</div>`;
}

// 7. Get all countries in a specific subregion
async function getCountriesBySubregion(subregion) {
    const countries = await fetchCountriesData();
    const filteredBySubregion = countries.filter(country => country.subregion === subregion);
    const resultCountries = filteredBySubregion.map(country => country.name.common);
    updateUI('#subregion', resultCountries);
}

// 8. Find all countries that use a specific timezone
async function getCountriesByTimezone(timezone) {
    const countries = await fetchCountriesData();
    const filteredByTimezone = countries.filter(country => country.timezones.includes(timezone));
    const resultCountries = filteredByTimezone.map(country => country.name.common);
    updateUI('#timezone', resultCountries);
}

// Execute all functions to populate the UI
getTopCountriesByArea(5);
getTopCountriesByPopulation(5);
getCountriesByLanguage('Portuguese');
getCountriesByCurrency('USD');
getLandlockedCountries();
getCountryWithHighestGini();
getCountriesBySubregion('Middle Africa');
getCountriesByTimezone('UTC+01:00');