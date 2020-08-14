
let map;
let service;
let infowindow;

let lat = -36.843427;
let long = 174.756992;

function initMap() {

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
    })
  }

  const location = new google.maps.LatLng(lat, long);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.querySelector(".map"), {
    center: location,
    zoom: 15
  });

  const requests = {
    requests: []
  }
  sources.sources.forEach(source => {
    const request = {
      query: source,
      fields: ["name", "geometry"]
    };
    requests.requests.push(request);
    
  })
  service = new google.maps.places.PlacesService(map);
  requests.requests.forEach(request => {
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  })
  
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}