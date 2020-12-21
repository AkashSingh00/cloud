import React from 'react'
import { View, StyleSheet, Text, Button, Image, Alert } from 'react-native'

const Window = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={require('../../assets/menu_black_48dp/2x/baseline_menu_black_48dp.png')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center'
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 15,
    marginLeft: 15,
  }
})

export default Window