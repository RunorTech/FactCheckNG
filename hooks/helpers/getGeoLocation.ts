export async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data.address as locationResponseProps

    // return {
    //   city: data.address.city || data.address.town || data.address.village || 'Unknown',
    //   state: data.address.state || 'Unknown',
    //   country: data.address.country || 'Unknown',
    // };
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    return { city: 'Unknown', state: 'Unknown', country: 'Unknown' };
  }
}