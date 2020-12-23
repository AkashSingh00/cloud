import React, { useRef } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

import Options from '../Options'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

const Window = (props) => {
  const refRBSheet = useRef()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <View style={styles.button}>
          <Image
            style={{ width: "100%", height: "100%", }}
            source={require('../../assets/menu_black_48dp/2x/baseline_menu_black_48dp.png')}/>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={viewportHeight}
        customStyles={{ wrapper: { backgroundColor: "transparent" }, draggableIcon: { backgroundColor: "#000" } }}>
        <Options />
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    zIndex: 10
  }
})

export default Window