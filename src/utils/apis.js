const url = 'https://echoless-doorknobs.000webhostapp.com/getKajian.php'

function getEvents(){
  return fetch(url).then(res => res.json())
}

export function getArrayOfLocation(){
  return getEvents()
    .then(res => 
      res.results.map(
        obj => ({
          latitude     : obj.latitude,
          longitude    : obj.longtitude,
          id           : obj.id_kajian,
          gambar_poster: obj.gambar_poster,
          nama_kajian  : obj.nama_kajian,
          lokasi       : obj.alamat_masjid,
          tanggal_event: obj.tanggal_event,
          nama_masjid  : obj.nama_masjid,
          jam_kajian   : obj.jam_kajian,
        })
      )
    )
}