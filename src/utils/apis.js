const url = 'https://echoless-doorknobs.000webhostapp.com/getKajian.php'

function getEvents(){
  return fetch(url).then(res => res.json())
}

export function getArrayOfLocation(){
  return getEvents()
    .then(res => 
      res.results.map(
        obj => ({
          latitude  : obj.latitude,
          longitude: obj.longtitude,
          id        : obj.id_kajian
        })
      )
    )
}