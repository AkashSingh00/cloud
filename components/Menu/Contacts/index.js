import React, { useEffect, useState, useRef } from 'react'
import { 
  View, 
  StyleSheet, 
  Text,
  Dimensions, 
  TextInput,
  Alert,
} from 'react-native'

import SubmitButton from './Button'

import isPhoneNumber from 'is-phone'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width: viewportWidth } = Dimensions.get('window')

const Section = (props) => {
  const [name, onChangeName] = useState("")
  const [number, onChangeNumber] = useState("")
  const [contact, onChangeContact] = useState(props.contact)

  const onChangeText = (id, type, text) => {
    if ( type == "name" ) onChangeContact( contact => { return { ...contact, id: id, name: text } })
    else if ( type == "number" ) onChangeContact( contact => { return { ...contact, id: id, number: text } })
  }

  useEffect(()=>props.onNewEntry(contact))

  return (
    <View style={styles.section}>
      <Text style={styles.header}>Contact #{contact.id}</Text>
      <View style={styles.body}>
        <View style={styles.input}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeText(contact.id, "name", text)}
            value={contact.name}
          />
        </View>
        <View style={styles.input}>
          <Text>Number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeText(contact.id, "number", text)}
            value={contact.number}
          />
        </View>
      </View>
    </View>
  )
}

const Contacts = (props) => {

  const contacts = props.contacts
  const submit = () => {
    console.log('submit')
    const value = JSON.stringify(contacts)
    try {
      AsyncStorage
        .setItem('contacts', value)
        .then(() => {
          console.log(value)
          Alert.alert('Contact Saved!')
        })
    } catch (e) {
      Alert.alert('Error', `${e}`)
    }
  }

  const onNewEntry = (contact) => {
    console.log(`${contact.name}, ${contact.number}`)
    if (isPhoneNumber(contact.number)) {
      console.log(`is number`)
      contacts[contact.id] = {
        id: contact.id,
        name: contact.name,
        number: contact.number
      }
    }
  }

  return (
    <View style={[styles.container, {width: viewportWidth}]}>
      <View style={styles.main}>
        {props.contacts.map(contact => <Section key={contact.id} contact={contact} onNewEntry={onNewEntry} />)}
      </View>
      <SubmitButton 
        title="Save"
        submit={submit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10
  },
  header: {
    fontSize: 25,
    fontWeight: '500',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    color: 'gray',
  }
})

export default Contacts