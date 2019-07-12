import React, {Component} from 'react'


// install google map first
export default class Maps extends Component {
  google = null
  
  componentDidMount(){
    if ('google' in window) {
      this.google = window.google
    } else {
      window.addEventListener('jsLoaded', function (e) { 
        this.google = window.google
      }, false);
    }

    this.forceUpdate()
  }

  render(){

    if (this.r_map) {
      new this.google.maps.Map(this.r_map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
    }

    function createMarkup() {
      return {__html: `<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="591" id="gmap_canvas" src="https://maps.google.com/maps?q=sumedang&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.org">how to reduce google map embed size</a></div><style>.mapouter{position:relative;text-align:right;height:591px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:591px;width:600px;}</style></div>`};
    }

    // return <div ref={r => this.r_map = r} style={{minWidth:'100%', minHeight:300}}></div>
    return <div dangerouslySetInnerHTML={createMarkup()} />
  }
}