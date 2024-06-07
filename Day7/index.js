const data = {
    "countries": [
      {
        "name": "United States",
        "details": {
          "currency": {
            "name": "United States Dollar",
            "symbol": "$",
            "code": "USD"
          },
          "languages": [
            "English"
          ],
          "population": 331002651
        }
      },
      {
        "name": "Canada",
        "details": {
          "currency": {
            "name": "Canadian Dollar",
            "symbol": "$",
            "code": "CAD"
          },
          "languages": [
            "English",
            "French"
          ],
          "population": 37742154
        }
      },
      {
        "name": "Mexico",
        "details": {
          "currency": {
            "name": "Mexican Peso",
            "symbol": "$",
            "code": "MXN"
          },
          "languages": [
            "Spanish"
          ],
          "population": 128932753
        }
      },
      {
        "name": "Brazil",
        "details": {
          "currency": {
            "name": "Brazilian Real",
            "symbol": "R$",
            "code": "BRL"
          },
          "languages": [
            "Portuguese"
          ],
          "population": 212559417
        }
      },
      {
        "name": "Argentina",
        "details": {
          "currency": {
            "name": "Argentine Peso",
            "symbol": "$",
            "code": "ARS"
          },
          "languages": [
            "Spanish"
          ],
          "population": 45195774
        }
      },
      {
        "name": "United Kingdom",
        "details": {
          "currency": {
            "name": "Pound Sterling",
            "symbol": "£",
            "code": "GBP"
          },
          "languages": [
            "English"
          ],
          "population": 67886011
        }
      },
      {
        "name": "Germany",
        "details": {
          "currency": {
            "name": "Euro",
            "symbol": "€",
            "code": "EUR"
          },
          "languages": [
            "German"
          ],
          "population": 83783942
        }
      },
      {
        "name": "France",
        "details": {
          "currency": {
            "name": "Euro",
            "symbol": "€",
            "code": "EUR"
          },
          "languages": [
            "French"
          ],
          "population": 65273511
        }
      },
      {
        "name": "Italy",
        "details": {
          "currency": {
            "name": "Euro",
            "symbol": "€",
            "code": "EUR"
          },
          "languages": [
            "Italian"
          ],
          "population": 60461826
        }
      },
      {
        "name": "Spain",
        "details": {
          "currency": {
            "name": "Euro",
            "symbol": "€",
            "code": "EUR"
          },
          "languages": [
            "Spanish"
          ],
          "population": 46754778
        }
      },
      {
        "name": "Russia",
        "details": {
          "currency": {
            "name": "Russian Ruble",
            "symbol": "₽",
            "code": "RUB"
          },
          "languages": [
            "Russian"
          ],
          "population": 145934462
        }
      },
      {
        "name": "China",
        "details": {
          "currency": {
            "name": "Renminbi",
            "symbol": "¥",
            "code": "CNY"
          },
          "languages": [
            "Mandarin"
          ],
          "population": 1439323776
        }
      },
      {
        "name": "India",
        "details": {
          "currency": {
            "name": "Indian Rupee",
            "symbol": "₹",
            "code": "INR"
          },
          "languages": [
            "Hindi",
            "English"
          ],
          "population": 1380004385
        }
      },
      {
        "name": "Japan",
        "details": {
          "currency": {
            "name": "Japanese Yen",
            "symbol": "¥",
            "code": "JPY"
          },
          "languages": [
            "Japanese"
          ],
          "population": 126476461
        }
      },
      {
        "name": "South Korea",
        "details": {
          "currency": {
            "name": "South Korean Won",
            "symbol": "₩",
            "code": "KRW"
          },
          "languages": [
            "Korean"
          ],
          "population": 51269185
        }
      },
      {
        "name": "Australia",
        "details": {
          "currency": {
            "name": "Australian Dollar",
            "symbol": "$",
            "code": "AUD"
          },
          "languages": [
            "English"
          ],
          "population": 25499884
        }
      },
      {
        "name": "South Africa",
        "details": {
          "currency": {
            "name": "South African Rand",
            "symbol": "R",
            "code": "ZAR"
          },
          "languages": [
            "Zulu",
            "Xhosa",
            "Afrikaans",
            "English"
          ],
          "population": 59308690
        }
      },
      {
        "name": "Nigeria",
        "details": {
          "currency": {
            "name": "Nigerian Naira",
            "symbol": "₦",
            "code": "NGN"
          },
          "languages": [
            "English",
            "Hausa",
            "Yoruba",
            "Igbo"
          ],
          "population": 206139589
        }
      },
      {
        "name": "Egypt",
        "details": {
          "currency": {
            "name": "Egyptian Pound",
            "symbol": "£",
            "code": "EGP"
          },
          "languages": [
            "Arabic"
          ],
          "population": 102334404
        }
      },
      {
        "name": "Kenya",
        "details": {
          "currency": {
            "name": "Kenyan Shilling",
            "symbol": "KSh",
            "code": "KES"
          },
          "languages": [
            "English",
            "Swahili"
          ],
          "population": 53771296
        }
      }
    ]
  };
  
  // 1. Given a language code, find all countries that speak it
  function findCountriesByLanguage(langCode) {
    return data.countries.filter(country => 
      country.details.languages.includes(langCode)
    ).map(country => country.name);
  }
  
  // 2. Find the top 5 countries by population
  function top5ByPopulation() {
    return data.countries
      .sort((a, b) => b.details.population - a.details.population)
      .slice(0, 5)
      .map(country => ({ name: country.name, population: country.details.population }));
  }
  
  // 3. Find the total population of all countries combined
  function totalPopulation() {
    return data.countries.reduce((sum, country) => sum + country.details.population, 0);
  }
  
  // 4. Given a country name, find its currency details
  function findCurrencyByCountry(countryName) {
    const country = data.countries.find(country => country.name === countryName);
    return country ? country.details.currency : null;
  }
  
  // 5. List all countries and their official languages
  function listCountriesAndLanguages() {
    return data.countries.map(country => ({
      name: country.name,
      languages: country.details.languages
    }));
  }
  
  // Example usage
  console.log(findCountriesByLanguage('English')); // ['United States', 'Canada', 'United Kingdom', 'Australia', 'South Africa', 'Nigeria', 'Kenya']
  console.log(top5ByPopulation()); // [{ name: 'China', population: 1439323776 }, { name: 'India', population: 1380004385 }, { name: 'United States', population: 331002651 }, { name: 'Indonesia', population: 273523615 }, { name: 'Pakistan', population: 220892340 }]
  console.log(totalPopulation()); // 7777721563
  console.log(findCurrencyByCountry('India')); // { name: 'Indian Rupee', symbol: '₹', code: 'INR' }
  console.log(listCountriesAndLanguages()); // [{ name: 'United States', languages: ['English'] }, { name: 'Canada', languages: ['English', 'French'] }, ...]