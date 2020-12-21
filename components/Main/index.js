import React from 'react'
import { View, StyleSheet, Text, Button, Image, Alert } from 'react-native'
import Slider from 'react-native-unlock-slider'

const Main = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <View style={styles.direction}>
          <View style={styles.street}>
            <Text style={{fontFamily: 'Roboto', fontSize: 25}}>{props.locality}</Text>
          </View>
          <View style={styles.coordinates}>
            <Text style={{color: '#5E5F61', fontSize: 13}}>{props.latitude}° N, {props.longitude}° E</Text>
          </View>
        </View>
        <View style={styles.start}>
          <View style={styles.button}>
            <Image
              style={{
                width: 20,
                height: 20,
                marginRight: 5
              }}
              source={require('../../assets/navigation_white_48dp/2x/baseline_navigation_white_48dp.png')}/>
            <Text style={{color: 'white', marginRight: 6}}>Start</Text>
          </View>
        </View>
      </View>
      <View style={styles.emergency}>
        <Slider
          isLeftToRight={true}
          childrenContainer={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
          slideOverStyle={{ backgroundColor: '#F64C46' }}
          onEndReached={() => {
            Alert.alert('Emergency Alert', 'Message Sent to Emergency Contacts.')
          }}
          isOpacityChangeOnSlide={true}
          containerStyle={{
            backgroundColor: 'rgba(255,255,255,0.0)',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderColor: '#F64C46',
            borderWidth: 1
          }}
          thumbElement={
            <Image
                style={{
                  width: 45,
                  height: 45,
                  margin: 4,
                  borderRadius: 100,
                  backgroundColor: '#F64C46',
                }}
                source={require('../../assets/error_outline_white_48dp/2x/outline_error_outline_white_48dp.png')}
            />
          }
        >
          <Text style={{fontWeight: '700', color: '#F64C46'}}>{'Slide for Emergency'}</Text>
        </Slider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  navigator: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
  },
  direction: {
    flex: 2,
  },
  start: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#1873FF",
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  emergency: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
})

export default Main


        // <TouchableOpacity style={styles.button} onPress={this.sendSMSFunction.bind(this)}>
        //   <Text>Send SMS</Text>
        // </TouchableOpacity>