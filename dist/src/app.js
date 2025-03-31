"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = document.getElementById("countryInput");
    const countryName = input.value.trim();
    const resultDiv = document.getElementById("result");
    if (!countryName) {
        resultDiv.innerHTML = "<p>Por favor insira o nome do País.</p>";
        return;
    }
    try {
        const response = yield fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok)
            throw new Error("País não encontrado");
        const data = yield response.json();
        const country = data[0];
        resultDiv.innerHTML = `
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital[0]}</p>
    <p>População: ${country.population.toLocaleString()}</p>
    <img class="flag" src="${country.flags.png}" alt="Bandeira de ${country.name.common}">
`;
    }
    catch (error) {
        const errorMessage = error.message;
        resultDiv.innerHTML = `<p>Erro ao buscar país: ${errorMessage}</p>`;
    }
});
