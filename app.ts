type Country = {
  name: { common: string };
  capital: string[];
  population: number;
  flags: { png: string };
};

const fetchCountry = async () => {
  const input = document.getElementById("countryInput") as HTMLInputElement;
  const countryName = input.value.trim();
  const resultDiv = document.getElementById("result") as HTMLDivElement;

  if (!countryName) {
    resultDiv.innerHTML = "<p>Por favor insira o nome do País.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!response.ok) throw new Error("País não encontrado");

    const data: Country[] = await response.json();
    const country = data[0];

    resultDiv.innerHTML = `
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital[0]}</p>
    <p>População: ${country.population.toLocaleString()}</p>
    <img class="flag" src="${country.flags.png}" alt="Bandeira de ${
      country.name.common
    }">
`;
  } catch (error) {
    const errorMessage = (error as Error).message;
    resultDiv.innerHTML = `<p>Erro ao buscar país: ${errorMessage}</p>`;
  }
};
