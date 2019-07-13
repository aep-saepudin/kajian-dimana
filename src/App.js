import React from 'react';
import Moment from 'moment' 
import './style.scss'

// import './App.css';
import { mapDistanceFromCurrentLocation, getCurrentLocation } from './utils/geolocation';
import { getArrayOfLocation } from './utils/apis';
import { convertDistance } from 'geolib';

const KEY = 'd499aaad313d44a38a97cbb51be4a37d'

class App extends React.Component {
  state = {
    locations : [],
    myLocation : "Loading..",
  }

  async componentDidMount(){
    
    const locations = await getArrayOfLocation()
    const currentLocation = await getCurrentLocation()
    const locationsWithDistance = await mapDistanceFromCurrentLocation(locations)  
    const filterTime =  locationsWithDistance.filter(obj => {
      const time =  Moment(`${obj.tanggal_event} ${obj.jam_kajian}`, 'D MMMM YYYY HH:mm')
      return time.isAfter(Moment())
    })

    const sortedByDistance = filterTime.sort(function(a, b){ return a.distance - b.distance})
    this.setState({locations : sortedByDistance })

    const myLocations = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.latitude}+${currentLocation.longitude}&key=` + KEY).then(res => res.json()) 
    this.setState({myLocation : myLocations.results[0].formatted })
  }

  render(){
    return (
      <div className="App">
        <div> My Location : {this.state.myLocation}</div> 
        <ul>
          {this.state.locations.map(obj => <CardEvent key={obj.id} data ={obj} />)}
        </ul>

        {/* <pre>
          {this.state.locations}
        </pre> */}
        
      </div>
    );
  }
}


class CardEvent extends React.Component {
  render(){
    return(
      <div className = "CardEvent">
        <h5> {this.props.data.nama_kajian} </h5>
        {this.props.showImage ? <img src={'http://180.250.247.5/images/kajian/' + this.props.data.gambar_poster} /> : <img src="https://via.placeholder.com/150x150"/>}
        <div>
          <label><span>Masjid </span> <div className="item"> {this.props.data.nama_masjid} </div>  </label>
          <label><span>lokasi </span> <div className="item"> {this.props.data.lokasi} </div> </label>
          <label><span>Tanggal </span> {this.props.data.tanggal_event} </label>
          <label><span>Jam </span> {this.props.data.jam_kajian} </label>
          <label><span>Distance </span> {convertDistance(this.props.data.distance, 'km') } km </label>
        </div>
      </div>
    )
  }
}


export default App;
