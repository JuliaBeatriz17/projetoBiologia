const mapeamentoHospital = document.querySelector(".mapeamentoHospi");
let typeCity = ""
const cities = {
  NF: { latitude: -22.293452281514202, longitude: -42.540328928079504 },
  BJ: {
    latitude: -22.1528, longitude: -42.4242
  }
}

function createHospital(text) {
  return (
    `<li>
      <p>${text}</p>
  </li>
  `
  )
}

function getAirQuality(){

    const optionsHospital = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyC5MKt8bVl6hgVuv4wQCxYRjVweWb2_3aQ',
        'X-Goog-FieldMask': 'places.displayName'
      },
      body: `{"includedTypes":["hospital"],"maxResultCount":20,"locationRestriction":{"circle":{"center":{"latitude":${cities[typeCity].latitude},"longitude":${cities[typeCity].longitude}},"radius":5000}}}`
    };
    
    fetch('https://places.googleapis.com/v1/places:searchNearby', optionsHospital)
      .then(response => response.json())
      .then(response => {
        if(!response ||
           !response.places.lenght < 0) return 
           mapeamentoHospital.innerHTML = ''

        response.places.forEach(hospital => {
          console.log(hospital);
          mapeamentoHospital.innerHTML += createHospital(hospital.displayName.text)
        });
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


