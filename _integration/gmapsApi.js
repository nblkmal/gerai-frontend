// Your Google Maps share URL
const shareUrl = 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic'

{/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script> */}
// AIzaSyBEZlVVz7FqWgLdHu6FrpfU-3otaEXK3l4

// Check if google.maps is defined (API is loaded)
if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
  // Create a new instance of the Geocoder
  const geocoder = new google.maps.Geocoder();

  // Initialize an empty JSON object to store the address
  const addressData = {};

  // Extract the place ID from the URL
  const placeId = shareUrl.split("/").pop();

  // Geocode the place using the place ID
  geocoder.geocode({ placeId: placeId }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        // Extract the formatted address
        const formattedAddress = results[0].formatted_address;

        // Add the formatted address to the JSON object
        addressData.address = formattedAddress;

        // Convert the JSON object to a JSON string
        const jsonAddress = JSON.stringify(addressData);

        // Output the JSON data (you can do whatever you want with it)
        console.log(jsonAddress);
      } else {
        console.error("No results found");
      }
    } else {
      console.error("Geocoder failed due to: " + status);
    }
  });
} else {
  // Handle the case where the Google Maps API is not yet loaded
  console.error("Google Maps API is not loaded.");
}