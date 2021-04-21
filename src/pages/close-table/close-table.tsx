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
import { useNavigation } from "@react-navigation/core";

export default function TableDetails() {
  const navigation = useNavigation();

  const itensPayTable = [
    { name: "Dinheiro", value: 10 },
    { name: "Cartão", itemSelecionado: "Visa", value: 10.2 },
    { name: "Cartão", itemSelecionado: "Master Card", value: 13 },
    { name: "Dinheiro", value: 15 },
    { name: "Dinheiro", value: 15 },
    { name: "Dinheiro", value: 15 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cont1}>
        <Text style={styles.f1}>Mesa 1</Text>
        <Text style={styles.f2}>Total: R$150,00</Text>
      </View>
      <View style={{ height: 80, backgroundColor: "gold", padding: 10 }}>
        <TouchableOpacity style={styles.buttonADD}>
          <Text style={{ color: "gold", fontSize: 15 }}>
            Adicionar forma de pagamento
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ScrollView}>
        {itensPayTable.map((item, l) => (
          <View style={styles.itempay}>
            <View style={{ width: 70, height: 70 }}>
              <Image
                style={styles.im}
                source={require("../../../assets/pay.png")}
              />
            </View>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.f11}>{item.name}</Text>
              <Text style={styles.f22}>Valor: R${item.value}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height:70, elevation: 1, width: '100%', padding: 10}}>
      <TouchableOpacity style={styles.buttonADD}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Fechar mesa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: '#B287FE',
  },

  im: {
    width: 70,
    height: 70,
  },
  cont1: {
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  itempay: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingBottom: 10,
    flex: 1,
    elevation: 2,
    height: 120,
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 1,
    backgroundColor: '#7F39FB',
  },
  f11: {
    fontSize: 20,
    color: "white",
  },
  f22: {
    fontSize: 30,
    color: "white",
  },
  f1: {
    fontSize: 50,
    color: "white",
  },
  f2: {
    fontSize: 20,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#7F39FB",
  },

  buttonADD: {
    backgroundColor: "#7F39FB",
    height: 50,
    width: "100%",
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});
