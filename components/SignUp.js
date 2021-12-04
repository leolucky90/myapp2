import { useNavigation } from "@react-navigation/native";
import React from "react"
import{ View, Text, StyleSheet, Button} from "react-native";


export function Signup(props){
    const navigation = useNavigation()
    return(
        <View>
            <Text>Sign up</Text>
            <Button title="Click Here to Sign In" onPress={()=>navigation.navigate("Signin")}></Button>
        </View>
    )
}