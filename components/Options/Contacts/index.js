import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

const Contacts = (props) => {
  return (
    <View style={[styles.container, {width: viewportWidth}]}>
      <Text>Contacts</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: 'green'
  }
})

export default Contacts