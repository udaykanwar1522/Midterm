// Uday Kanwar 100412818

// Coordinates of KPU Surrey Library
const kpuSurreyLibraryCoords = { lat: 49.133129, lng: -122.871460 };

// Initialize the map
const map = L.map('map').setView([0, 0], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add marker for KPU Surrey Library
const kpuMarker = L.marker([kpuSurreyLibraryCoords.lat, kpuSurreyLibraryCoords.lng]).addTo(map)
    .bindPopup('KPU Surrey Library')
    .openPopup();

// Function to calculate distance between two points in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Get user's current location
navigator.geolocation.getCurrentPosition((position) => {
    const userCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Set map view to user's location
    map.setView([userCoords.lat, userCoords.lng], 13);

    // Add marker for user's location
    L.marker([userCoords.lat, userCoords.lng]).addTo(map)
        .bindPopup('You are here')
        .openPopup();

    // Calculate and display the distance to KPU Surrey Library
    const distance = calculateDistance(userCoords.lat, userCoords.lng, kpuSurreyLibraryCoords.lat, kpuSurreyLibraryCoords.lng);
    document.getElementById('distance').textContent = `Distance to KPU Surrey Library: ${distance.toFixed(2)} km`;
});
