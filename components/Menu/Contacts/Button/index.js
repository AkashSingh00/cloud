import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Button = (props) => {

  return (
    <TouchableOpacity onPress={props.submit}>
      <View style={{
        alignSelf: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 25,
        width: "100%",
        backgroundColor: "#1873FF",
        color: "white"
      }}>
        <Text style={{color: "white"}}>Save</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
