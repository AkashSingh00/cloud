import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

import History from './History'
import Contacts from './Contacts'

const Options = (props) => {

  const [active, setActiveState] = useState("historyActive")
  const [newScreenPos, setScreenState] = useState(viewportWidth)
  const toggleActiveState = () => {
    setActiveState(active === "historyActive" ? "contactsActive" : "historyActive")
    setScreenState(newScreenPos === viewportWidth ? 0 : viewportWidth)
    this.ScrollView.scrollTo({x: newScreenPos, animated: true})
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsTitle}>
      <TouchableOpacity onPress={toggleActiveState}>
        <Text style={
          [styles.title, {color: `${active === "historyActive" ? "black" : "#dedede"}`}]
        }>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleActiveState}>
        <Text style={
          [styles.title, {color: `${active === "contactsActive" ? "black" : "#dedede"}`}]
        }>Contacts</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.optionsScene}>
        <ScrollView 
          ref={ref => this.ScrollView = ref}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
          <History/>
          <Contacts/>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  optionsTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 30,
    fontWeight: "700",
  },
  optionsScene: {
    flexGrow: 1,
    backgroundColor: "yellow"
  },
})

export default Options