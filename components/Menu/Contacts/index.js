import React, { useEffect, useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Dimensions, 
  TextInput,
} from 'react-native'

const { width: viewportWidth } = Dimensions.get('window')

const Section = ({contact}) => {
  const { id } = contact
  const [name, onChangeName] = useState(contact.name)
  const [number, onChangeNumber] = useState(contact.number)

  return (
    <View style={styles.section}>
      <Text style={styles.header}>Contact #{id}</Text>
      <View style={styles.body}>
        <View style={styles.input}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeName(text)}
            value={name}
          />
        </View>
        <View style={styles.input}>
          <Text>Number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeNumber(text)}
            value={number}
          />
        </View>
      </View>
    </View>
  )
}

const Contacts = (props) => {
  const contacts = [
    { 
      id: 1,
      name: 'Aniruddha',
      number: '+919630997999',
    },
    { 
      id: 2,
      name: '',
      number: '',
    }
  ]


  // const addSection = () => {
  //   console.log('addSection')
  //   contacts.push({ 
  //     id: contacts.length + 1, 
  //     data: [ { title: 'Name', value: '' }, { title: 'Number', value: '' } ]
  //   })
  // }

  return (
    <View style={[styles.container, {width: viewportWidth}]}>
      {contacts.map(contact => <Section key={contact.id} contact={contact} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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