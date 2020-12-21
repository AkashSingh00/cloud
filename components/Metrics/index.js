import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, Image, Alert, Dimensions } from 'react-native'

import Carousel from 'react-native-snap-carousel'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class Metrics extends Component {

  constructor() {
    super()
    this.state = {
      entries: [
        {
          title: "Avg Speed",
          value: '22.32km/hr',
          img: require('../../assets/directions_bike_black_48dp/2x/baseline_directions_bike_black_48dp.png' )
        },
        {
          title: "Distance",
          value: '12.56km',
          img: require('../../assets/theaters_black_48dp/2x/baseline_theaters_black_48dp.png' )
        },
        {
          title: "Estimated Time",
          value: '00:28:04',
          img: require('../../assets/schedule_black_48dp/2x/baseline_schedule_black_48dp.png' )
        },
        {
          title: "Max Speed",
          value: '26.92km/hr',
          img: require('../../assets/electric_bike_black_48dp/2x/baseline_electric_bike_black_48dp.png' )
        },
      ]
    }
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          style={styles.icon}
          source={ item.img }/>
        <View style={styles.info}>
          <Text style={styles.value}>{ item.value }</Text>
          <Text style={styles.title}>{ item.title }</Text>
        </View>
      </View>
    )
  }
 
  render () {
    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={viewportWidth}
        sliderHeight={100}
        itemWidth={200}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  slide: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  info: {},
  title: {},
  value: {
    fontSize: 20
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
})