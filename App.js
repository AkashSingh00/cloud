import { config } from './config.js'

import moment from 'moment'

import React, { Component } from 'react'
import { StyleSheet, Text, View, Vibration, PermissionsAndroid, Alert } from 'react-native'
import VolumeControl, { VolumeControlEvents } from 'react-native-volume-control'
import MusicControl from 'react-native-music-control'
import MapboxGL from '@react-native-mapbox-gl/maps'
import SendSMS from 'react-native-sms-x'

MapboxGL.setAccessToken(`${config.API_TOKEN}`)
MapboxGL.setTelemetryEnabled(false)

import Main from './components/Main'
import Metrics from './components/Metrics'
import Window from './components/Window'

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      isPlaying: true,
      startTime: new Date(),
      elapsedTime: '00:00:00',
      emergencyMessageSent: false,
      street: 'Vijay Nagar',
      longitude: 0.1278,
      latitude: 51.5074,
      permissionIsGranted: false
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

    let counter = 0

    setInterval(() => {

      this.setState({ 
        elapsedTime: moment().hour(0).minute(0).second(counter++).format('HH:mm:ss')
      })

      if ( this.state.emergencyMessageSent ) {
        MusicControl.setNowPlaying({
          title: 'Emergency Message Sent',
          artist: '',
          color: 0xff0000,
        })
      } else {
        MusicControl.setNowPlaying({
          title: `${this.state.street}`,
          artist: `${this.state.elapsedTime}`
        })
      }

    }, 1000)

    const volumeListener = VolumeControlEvents.addListener("VolumeChanged", (event)=> {
      if ( event.volume <= 0 && !this.state.emergencyMessageSent) {
        this.setState({ emergencyMessageSent: true })
        Vibration.vibrate(1000)
        SendSMS.send(123, "+919630997999", "test", (msg)=>{
          Alert.alert('Emergency Alert', 'Message Sent to Emergency Contacts.')
        })
      }
    })

  }

  componentWillUnmount() {
    volumeListener.remove()
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
          <View style={styles.metrics}><Metrics /></View>
          <View style={styles.main}><Main /></View>
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
