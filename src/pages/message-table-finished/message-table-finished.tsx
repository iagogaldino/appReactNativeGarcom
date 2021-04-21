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

      <TouchableOpacity style={styles.button} onPress={ () => { params.navigation.navigate('Mesas'); }}>
        <Text style={styles.tb}> Conta finalizada com sucesso! </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  f1: { fontSize: 60, color: 'gold' },
  f2: { fontSize: 25, color: 'white' },

  vi: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    padding: 15,
    width: "80%",
    backgroundColor: "#7F39FB",
    borderColor: "#7F39FB",
    elevation: 5,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#7F39FB",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#03DAC5",
    width: 360,
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
    fontSize: 40,
    textAlign: 'center'
  },
});
