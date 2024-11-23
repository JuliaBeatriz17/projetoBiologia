// Configurações
const googlePlacesKey = "AIzaSyC5MKt8bVl6hgVuv4wQCxYRjVweWb2_3aQ";
const airQualityKey = "AIzaSyC5MKt8bVl6hgVuv4wQCxYRjVweWb2_3aQ";

// Coordenadas das cidades
const locations = [
  { city: "Nova Friburgo", latitude: -22.293452281514202, longitude: -42.540328928079504 },
  { city: "Bom Jardim", latitude: -22.1528, longitude: -42.4242 }
];

// Buscar hospitais com Google Places API
async function fetchHospitals(latitude, longitude) {
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${googlePlacesKey}`;
  const response = await fetch(placesUrl);
  const data = await response.json();
  return data.results.map(hospital => ({
    name: hospital.name,
    address: hospital.vicinity,
    location: hospital.geometry.location
  }));
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyC5MKt8bVl6hgVuv4wQCxYRjVweWb2_3aQ',
    'X-Goog-FieldMask': 'places.displayName'
  },
  body: '{"includedTypes":["hospital"],"maxResultCount":20,"locationRestriction":{"circle":{"center":{"latitude":-22.293452281514202,"longitude":-42.540328928079504},"radius":15000}}}'
};

fetch('https://places.googleapis.com/v1/places:searchNearby', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  
