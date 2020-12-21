import { config } from './config.js'

import moment from 'moment'
import axios from 'axios'

import React, { Component } from 'react'
import { StyleSheet, Text, View, Vibration, PermissionsAndroid, Alert } from 'react-native'
import VolumeControl, { VolumeControlEvents } from 'react-native-volume-control'
import MusicControl from 'react-native-music-control'
import MapboxGL from '@react-native-mapbox-gl/maps'
import SendSMS from 'react-native-sms-x'

import Main from './components/Main'
import Metrics from './components/Metrics'
import Window from './components/Window'

MapboxGL.setAccessToken(`${config.API_TOKEN}`)
MapboxGL.setTelemetryEnabled(false)

const ROOT_URL = "https://api.mapbox.com/geocoding/v5"
const SEARCH_ENDPOINT = "mapbox.places"

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      username: '___',
      startTime: new Date(),
      elapsedTime: '00:00:00',
      emergencyMessageSent: false,
      longitude: 0,
      latitude: 0,
      permissionIsGranted: false,
      locality: 'Loading...'
    }
  }

  componentDidMount() {

    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.SEND_SMS],
      {
        title: 'Give Location Permission',
        message: 'App needs location permission to find your position.'
      }
    )
    .then( granted => this.setState({ permissionIsGranted: granted }) )
    .catch( err => console.warn(err) )

    // VolumeControl.change(0.5)

    setInterval(() => {
      axios.get(`${ROOT_URL}/${SEARCH_ENDPOINT}/${this.state.longitude},${this.state.latitude}.json?types=locality&access_token=${config.API_TOKEN}`)
        .then(response => this.setState({ locality: response.data.features[0].text }))
        .catch(err => console.error(`ERROR: ${err}`))
    }, 10000)

    const volumeListener = VolumeControlEvents.addListener("VolumeChanged", (event)=> {
      if ( event.volume <= 0 && !this.state.emergencyMessageSent) {
        this.emergencyEvent()
      }
    })

  }

  componentWillUnmount() {
    volumeListener.remove()
  }

  startNavigation() {
    let counter = 0
    setInterval((counter) => {
      this.setState({ elapsedTime: moment().hour(0).minute(0).second(counter++).format('HH:mm:ss') })
      MusicControl.setNowPlaying({
        title: `${this.state.locality}`,
        artist: `${this.state.elapsedTime}`
      })
    }, 1000)
  }

  emergencyEvent() {

    this.setState({ emergencyMessageSent: true })

    Vibration.vibrate(1000)

    const helpTex = `!!!EMERGENCY SOS!!!
      ${this.state.username} has made an emergency trigger from this approximate location.
      https://www.google.com/maps/@${this.state.latitude},${this.state.longitude},15z
    `

    SendSMS.send(123, "+919630997999", 
      helpTex, (msg)=>{
      Alert.alert('Emergency Alert', 'Message Sent to Emergency Contacts.')
    })

    MusicControl.setNowPlaying({
      title: 'Emergency Message Sent',
      artist: '',
      color: 0xff0000,
    })

  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.map}>
          <MapboxGL.MapView
            style={{flex: 1}}
            styleURL={MapboxGL.StyleURL.Light}
            localizeLabels={true}
            compassEnabled={true}>
            {this.state.permissionIsGranted && 
              <MapboxGL.UserLocation 
                onUpdate={(data)=>{
                  this.setState({ 
                    longitude: data.coords.longitude, 
                    latitude: data.coords.latitude
                  })
                  this.camera.setCamera({
                    centerCoordinate: [data.coords.longitude, data.coords.latitude],
                    zoomLevel: 16,
                    animationDuration: 3000,
                  })
                }}
              />
            }
            <MapboxGL.Camera 
              ref={component => this.camera = component}/>
          </MapboxGL.MapView>
        </View>
        <View style={styles.container}>
          <View style={styles.window}><Window /></View>
          <View style={styles.metrics}>
            <Metrics 
              avgSpeed={22.32}
              maxSpeed={26.92}
              distance={12.56}
              avgSpeed={22.32}
              elapsedTime={this.state.elapsedTime} />
          </View>
          <View style={styles.main}>
            <Main 
              locality={this.state.locality}
              longitude={this.state.longitude}
              latitude={this.state.latitude} 
              startNavigation={this.startNavigation.bind(this)}
              emergencyEvent={this.emergencyEvent.bind(this)}/>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  window: {
    flexGrow: 1
  },
  metrics: {
    marginTop: 10,
    marginBottom: 10
  },
  main: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(241, 243, 241, 1)"
  }
});
