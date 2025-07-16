document.getElementById("locateBtn").addEventListener("click", function () {
  const company = document.getElementById("company").value;
  const bay = document.getElementById("bay").value.trim();
  const message = document.getElementById("message");

  if (!company || !bay) {
    message.textContent = "Please select a rental company and enter your spot number.";
    return;
  }

  // Example coordinates for demonstration
  const coordinatesMap = {
    Enterprise: {
      "101": { lat: 47.6588, lng: -117.4260 },
      "102": { lat: 47.6590, lng: -117.4262 },
    },
    National: {
      "201": { lat: 47.6601, lng: -117.4271 },
    },
    Alamo: {
      "301": { lat: 47.6612, lng: -117.4282 },
    },
    Hertz: {
      "401": { lat: 47.6623, lng: -117.4293 },
    },
    Budget: {
      "501": { lat: 47.6634, lng: -117.4304 },
    },
    Avis: {
      "601": { lat: 47.6645, lng: -117.4315 },
    }
  };

  const companyCoords = coordinatesMap[company];
  if (!companyCoords || !companyCoords[bay]) {
    message.textContent = "Location not found. Please check your spot number.";
    return;
  }

  const { lat, lng } = companyCoords[bay];
  const mapsUrl = `https://www.google.com/maps/place/${lat},${lng}`;

  window.open(mapsUrl, "_blank");
});
