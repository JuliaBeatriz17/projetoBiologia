let typeCity = ""
const cities = {
  NF: { latitude: -22.293452281514202, longitude: -42.540328928079504 },
  BJ: {
    latitude: -22.1528, longitude: -42.4242
  }
}

function createRecomandacoes(text, srcImagem, title) {
  return (
    `<li>
    <div>
      <img src='../model/img/${srcImagem}.svg'> 
      <h3>${title}</h3>
    </div>
      <p>${text}</p>
  </li>
  `
  )
}

  // grafico
  const needle = document.querySelector('.needle');
  const valueDisplay = document.querySelector('.value');

// Função para atualizar o valor
function updateGauge(value) {
  const max = 10; // Valor máximo do gráfico
  const min = 0; // Valor mínimo
  const degree = (value / 10 - min) / (max - min) * 180; // Converte valor para ângulo
  needle.style.transform = `rotate(${degree - 90}deg)`; // Atualiza a rotação
  valueDisplay.textContent = value; // Exibe o valor
}

function getAirQuality() {
  
  const listInfo = document.querySelector(".list-info");
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"universal_aqi":true,"location":{"latitude":${cities[typeCity].latitude},"longitude":${cities[typeCity].longitude}},"extra_computations":["HEALTH_RECOMMENDATIONS","DOMINANT_POLLUTANT_CONCENTRATION"],"language_code":"pt-br"}`
  };

  // inicia no zero
  updateGauge(0);

  fetch('https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyC5MKt8bVl6hgVuv4wQCxYRjVweWb2_3aQ', options)
  
    .then(response => response.json())
    .then(response => {
      if(!response) return 
      listInfo.innerHTML = ""


      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.athletes, 'athletes', 'Atletas');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.children, 'children', 'Crianças');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.elderly, 'elderly', 'Idosos');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.generalPopulation, 'generalPopulation', 'População Geral');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.heartDiseasePopulation, 'heartDiseasePopulation', 'População com doença cardíaca');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.lungDiseasePopulation, 'lungDiseasePopulation', 'População com doença pulmonar');

      listInfo.innerHTML += createRecomandacoes(response.healthRecommendations.pregnantWomen, 'pregnantWomen', 'Mulheres Grávidas');


      // Atualizar o valor dinamicamente para valor do AQI
      const valueAQI = response.indexes[0].aqi
      setTimeout(() => updateGauge(valueAQI), 2000);

      const qualidadedoArTexto = document.querySelector('.qualityAirText')
      const qualidadedoArResposta = response.indexes[0].category
      qualidadedoArTexto.textContent = qualidadedoArResposta

      const poluenteDominanteTexto = document.querySelector('.poluenteDominanteTexo')
      const poluenteDominanteResposta = response.indexes[0].dominantPollutant
      poluenteDominanteTexto.textContent = poluenteDominanteResposta
    })
    .catch(err => console.error(err));
}

const city = {NF:"Nova Friburgo", BJ:"Bom Jardim"}
const place = document.querySelector(".place");

const search = document.querySelector("#search");
search.addEventListener("click", () => {
  typeCity = document.querySelector("#typeCity").value;
  place.textContent = city[typeCity];
  getAirQuality();
})


