const GOOGLE_API_KEY = "AIzaSyAJauLSutURZlSxCGMHUplHtpVnp0JB3c4";

// export async function getUserAddress(coords){
//     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`)
//        if(!response.ok){
//         throw new Error("Something went wrong!")
//     }
//     const data = await response.json();
//     if(data.error_message){
//         throw new Error(data.error_message);
//     }
//     const address = data.results[0].formatted_address;
//     return address
// }
export async function getUserLocation(address){
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`)
    if(!response.ok){
        throw new Error("Something went wrong!")
    }
    const data = await response.json();
    if(data.error_message){
        throw new Error(data.error_message);
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}