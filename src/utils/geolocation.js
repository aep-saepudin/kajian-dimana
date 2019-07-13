import { findNearest, getDistance } from 'geolib';

function getCurrentLocation (){
  return  new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      resolve({latitude : pos.coords.latitude , longitude:pos.coords.longitude } )
    })
  })
}

function getNearestFromCurrentLocation(arrayLocation){
  return getCurrentLocation().then(res => {
    return findNearest(res, arrayLocation)
  })
  
}

export function mapDistanceFromCurrentLocation(arrayLocation){
  return getCurrentLocation().then(res => {
    const filteredLocation = arrayLocation.filter(obj => obj.latitude != null)  
    return filteredLocation
      .map(obj => {
        const temp = obj
        temp['distance'] = getDistance(
          { latitude: res.latitude, longitude: res.longitude },
          { latitude: obj.latitude, longitude: obj.longitude }
        )
      return temp
    })
  })
}
