import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const ContactButton = (props) => {

  return (
    <TouchableOpacity onPress={props.addSection()}>
      <View style={{
        alignSelf: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        borderColor: "black",
        borderRadius: 25,
        borderWidth: 1,
        width: "100%"
      }}>
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: 5
          }}
          source={require("../../../../assets/baseline_add_circle_black_48dp.png")}/>
        <Text style={{color: "black", marginRight: 5}}>Add New Contact</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ContactButton
