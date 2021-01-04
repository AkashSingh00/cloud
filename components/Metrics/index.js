import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, Image, Alert, Dimensions } from 'react-native'

import Carousel from 'react-native-snap-carousel'
import { round } from '@turf/helpers'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

const Metrics = (props) => {

  const formatDistance = (d) => {
    var distance = round(d * 1000, 1)
    var unit = ""
    if ( distance > 1000 ) {
      unit = "km"
      distance = round(distance / 1000, 1)
    } else unit = "m"
    return `${distance}${unit}`
  }

  const entries = [
    {
      title: "Estimated Time",
      value: `${props.elapsedTime}`,
      img: require('../../assets/schedule_black_48dp/2x/baseline_schedule_black_48dp.png' )
    },
    {
      title: "Avg Speed",
      value: `${props.avgSpeed}m/s`,
      img: require('../../assets/directions_bike_black_48dp/2x/baseline_directions_bike_black_48dp.png' )
    },
    {
      title: "Distance",
      value: `${formatDistance(props.distance)}`,
      img: require('../../assets/theaters_black_48dp/2x/baseline_theaters_black_48dp.png' )
    },
    {
      title: "Max Speed",
      value: `${props.maxSpeed}m/s`,
      img: require('../../assets/electric_bike_black_48dp/2x/baseline_electric_bike_black_48dp.png' )
    }
  ]

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

  return (
    <Carousel
      ref={(c) => { this._carousel = c; }}
      data={entries}
      renderItem={_renderItem}
      sliderWidth={viewportWidth}
      sliderHeight={100}
      itemWidth={200}
    />
  )
}

export default Metrics

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
    fontSize: 20,
    fontWeight: '500'
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
})