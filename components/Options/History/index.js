import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

const History = (props) => {
  return (
    <View style={[styles.container, {width: viewportWidth}]}>
      <Text>History</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: 'red'
  }
})

export default History