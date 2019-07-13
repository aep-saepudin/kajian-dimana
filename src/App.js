import React from 'react';

// import './App.css';
import { mapDistanceFromCurrentLocation } from './utils/geolocation';
import { getArrayOfLocation } from './utils/apis';


class App extends React.Component {
  state = {
    locations : []
  }

  async componentDidMount(){
    const locations = await getArrayOfLocation()
    const locationsWithDistance = await mapDistanceFromCurrentLocation(locations)
    this.setState({locations : JSON.stringify(locationsWithDistance, null, 3)})
  }

  render(){
    return (
      <div className="App">
        <pre>
          {this.state.locations}
        </pre>
      </div>
    );
  }
}

export default App;
