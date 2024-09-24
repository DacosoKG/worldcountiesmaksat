const totalCountEl = document.getElementById("total-count");
const pageCountEl = document.getElementById("page-count");
const searchEl = document.getElementById("search");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const countriesListEl = document.querySelector(".countries");

const url = "https://restcountries.com/v3.1/all";

let allCountres = [];
let currentPage = 1;
let countriesPerPage = 16;

fetch(url)
  .then((data) => data.json())
  .then((data) => {
    allCountres = data;
    totalCountEl.innerHTML = `${allCountres.length} countries`;
    listOfCountries(allCountres);
  })
  .catch((error) => console.log(error));

// Addition countries to HTML
function listOfCountries(countries) {
  countriesListEl.innerHTML = "";

  const start = (currentPage - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  const paginatedCountires = countries.slice(start, end);

  for (let i = 0; i < paginatedCountires.length; i++) {
    let country = paginatedCountires[i];

    const { name, flags, population, capital } = country;

    const countryHTML = `<div class="single-country">
          <img src="${flags.png}"" alt="country flag" />
          <div><strong>${name.common}</strong></div>
          <div><b>Cap:</b>${capital}</div>
          <div><b>Pop: </b>${population}</div>
        </div>`;
    countriesListEl.innerHTML += countryHTML;
  }
  updatePage();
}

// Event listere for pagination buttons
nextBtn.addEventListener("click", () => {
  searchEl.value = "";
  const maxPage = Math.ceil(allCountres.length / countriesPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    listOfCountries(allCountres);
  }
});

prevBtn.addEventListener("click", () => {
  searchEl.value = "";
  if (currentPage > 1) {
    currentPage--;
    listOfCountries(allCountres);
  }
});

// Page number update
function updatePage() {
  const maxPage = Math.ceil(allCountres.length / countriesPerPage);
  pageCountEl.innerHTML = `Page ${currentPage}/${maxPage}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === maxPage;
}

// Search Function

searchEl.addEventListener("keyup", (event) => {
  const value = event.target.value.trim().toLowerCase();
  let filteredCountry = [];
  if (value !== "") {
    filteredCountry = allCountres.filter((country) => {
      return country.name.common.toLowerCase().includes(value);
    });
    currentPage = 1;
    listOfCountries(filteredCountry);
  } else {
    listOfCountries(allCountres);
  }
});
