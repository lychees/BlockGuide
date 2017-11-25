/**
 * INITIAL VERSION, NOT USED ANYMORE. Please see /mini folder for our latest code
 */
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const STARTING_POINT = [121.375433, 31.176205]
class App extends Component {
  componentDidMount() {
    var map = new window.AMap.Map('map-container', {
      center: STARTING_POINT,
      zoom: 16,
    })
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">TechCrunch Shanghai 2017</p>
        <section>
          <div id="map-container" style={{ width: 'auto', height: 800 }} />
        </section>
      </div>
    )
  }
}

export default App
