import { getDistance } from 'geolib';

export function getCurrentLocation (){
  return  new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      resolve({latitude : pos.coords.latitude , longitude:pos.coords.longitude } )
    })
  })
}

export async function mapDistanceFromCurrentLocation(arrayLocation){
  const res = await getCurrentLocation();
  const filteredLocation = arrayLocation.filter(obj => obj.latitude != null);
  
  return filteredLocation.map(obj => {
    const temp = obj;
    temp['distance'] = getDistance({ latitude: res.latitude, longitude: res.longitude }, { latitude: obj.latitude, longitude: obj.longitude });
    return temp;
  });
}
