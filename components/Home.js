import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList ,TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import Constants from 'expo-constants'
import { Item } from './Item';
export function Home ( props ) {
  const navigation = useNavigation()
  const [ listData, setListData ] = useState()
  const [ validInput, setValidInput ] = useState(false)
  const [ input, setInput ] = useState()
  const [ appInit, setAppInit ] = useState( true )


  useEffect( () => {
   if(!props.auth) {
    navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
   }
   console.log( props.user )
  }, [props.auth])

  useEffect( () => {
    setListData( props.data )
  }, [props.data])

  const onTextChange = (value) => {
    setInput( value )
    if( value.length >= 3 ) 
    { 
      setValidInput(true)
    }
    else
    {
      setValidInput(false)
    }
  }
  
  const onSubmit = ( event ) => {
    const id = new Date().getTime().toString()
    const item = { id: id, name: input, status: false }
    
    
    setInput(null)
    setValidInput( false )
  }

  const data = { time: new Date().getTime(), user: Math.random() * 100 }

  const onClick = (item) => {
    console.log( item.id )
    navigation.navigate('Detail', {id: item.id, time: item.time, user: item.user } )
  }

  const renderItem = ({item}) => (
    <View style={styles.item} >
      <Text onPress={ () => onClick(item) }>
        time: {item.time}
        id: {item.id}
      </Text>
    </View>
  )

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
            style={styles.input} 
            onChangeText={ onTextChange } 
            placeholder="min 3 characters" 
            value={input}
          />
          <TouchableOpacity 
            style={ (validInput) ? styles.button : styles.buttonDisabled } 
            disabled={ (validInput) ? false : true }
            onPress={onSubmit}
          >
            <Text style={styles.buttonText}>Add to list</Text>
          </TouchableOpacity>
      </View>
      <FlatList data={ listData } renderItem={ renderItem} keyExtractor={item => item.id} />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  button: {
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'white',
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: "lightgray"
  },
})