import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function MessageTableFinshed(params: any) {

  return (
    <View style={styles.container}>
      <View style={styles.vi}>
        <Text style={styles.f1}>Mesa 1</Text>
        <Text style={styles.f2}>Total R$ 150,00</Text>
      </View>

      <View style={styles.cont}>
        <View style={styles.cont01}></View>
        <Text style={styles.f3}>Forma de pagamento</Text>
        <View style={styles.cont01}></View>
      </View>

      <TouchableOpacity style={styles.botaoConfirmar} onPress={ () => { params.navigation.navigate('Mesas'); }}>
        <Text style={styles.tb}> Conta finalizada com sucesso! </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  f1: { fontSize: 35, color: 'black' },
  f2: { fontSize: 25, color: 'black' },
  f3: { fontSize: 17, fontWeight: 'bold', color: 'black' },

  cont: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
  },

  cont01: {
    backgroundColor: '#F1F2F5',
    paddingTop: 5,
    paddingBottom: 5,
  },

  vi: {
    marginTop: 10,

  },
  input: {
    padding: 15,
    backgroundColor: "#7F39FB",
    elevation: 5,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "white",
  },
  container: {
    flex: 1,
    padding: 0
  },
  button: {
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#985EFF",
    marginTop: 25,
    borderRadius: 70,
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    padding: 25
  },
  tb: {
    color: "white",
    fontSize: 18,
    textAlign: 'center'
  },
  botaoConfirmar: {
    backgroundColor: "red",
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 8
},

});
