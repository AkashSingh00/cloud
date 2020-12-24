import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Button = (props) => {

  const [toggleState, setToggleState] = useState("Start")
  const [bgColor, setBgColor] = useState("#1873FF")
  const [borderColor, setBorderColor] = useState("#1873FF")
  const [textColor, setTextColor] = useState("white")
  const [icon, setIcon] = useState(require("../../assets/baseline_navigation_white_48dp.png"))

  const toggle = () => {
    props.toggleNavigation()
    setToggleState(toggleState === "Start" ? "End" : "Start")
    setBgColor(bgColor === "#1873FF" ? "rgba(255, 255, 255, 0.8)" : "#1873FF")
    setBorderColor(borderColor === "#1873FF" ? "rgba(0, 0, 0, 0.3)" : "#1873FF")
    setTextColor(textColor === "white" ? "black" : "white")
    setIcon(icon === require("../../assets/baseline_navigation_white_48dp.png") ? require("../../assets/check_circle.png") : require("../../assets/baseline_navigation_white_48dp.png"))
  }

  return (
    <TouchableOpacity onPress={toggle}>
      <View style={{
        backgroundColor: `${bgColor}`,
        alignSelf: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        borderColor: `${borderColor}`,
        borderRadius: 25,
        borderWidth: 2
      }}>
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: 5
          }}
          source={icon}/>
        <Text style={{color: `${textColor}`, marginRight: 5}}>{toggleState}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
