import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TablesS from "./../tables/tables.service";

export default class AddTable extends Component{

  props: any;
  tableName = '';
  
  constructor(props: any) {
    super(props);
  }

  onClickADDTable() {
  const resp = TablesS.addTablesArray(this.tableName, 0, 'Disponível', 0)

   console.log('resp', resp)
   if (resp) {
      this.props.navigation.navigate("Mesas");
   } else {} 
  }

  setNameTValue(value: string) {
    this.tableName = value;
  }

 

  render() { return(
    <View style={styles.container}>
       <View style={styles.vi}>
          <TextInput onChangeText={text => this.setNameTValue(text)} placeholderTextColor = "black" style={styles.input} placeholder={"Nome da mesa"} />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>{ this.onClickADDTable(); }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Adicionar</Text>
      </TouchableOpacity> 
    </View>);
  };
}


const styles = StyleSheet.create({
    vi: {
        width: "100%",
        alignItems: "center",
        marginTop: 10
      },
      input: {
        padding: 15,
        width: "80%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 6,
        color: 'black',
         
      },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    padding: 12,
    backgroundColor: 'black',
    width: '80%',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 6
  },
});
