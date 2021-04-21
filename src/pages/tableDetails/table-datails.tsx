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
import { Feather } from "@expo/vector-icons";

export default function TableDetails(params: any) {
  const navigation = params.navigation;

  const tables = [
    {
      name: "01",
      descricao: "Observação",
    },
    {
      name: "02",
      descricao: "Observação",
    },
    {
      name: "03",
      descricao: "Observação",
    },
    {
      name: "04",
      descricao: "Observação",
    },
    {
      name: "06",
      descricao: "Observação",
    },
    {
      name: "07",
      descricao: "Observação",
    },
    {
      name: "08",
      descricao: "Observação",
    },
    {
      name: "09",
      descricao: "Observação",
    },
    {
      name: "10",
      descricao: "Observação",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.cont1}>
        <Text style={styles.f1}>Mesa 1</Text>
        <Text style={styles.f2}>Total: R$150,00</Text>
      </View>
      <View
        style={{
          height: 60,
          padding: 10,
          flexDirection: "row",
          borderRadius: 30,
        }}
      >
        <View style={{ width: "50%" }}>
          <TouchableOpacity style={styles.button1}>
            <Text style={{ color: "white", fontSize: 15 }} onPress={ ()=> { closeTable(); } }>Fechar Mesa</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "50%", marginLeft: 2 }}>
          <TouchableOpacity
            style={[styles.buttonADD, { backgroundColor: "red" }]}
          >
            <Text style={{ color: "white" }}>Remover Mesa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.ScrollView}>
        {tables.map((item, l) => (
          <View key={l} style={[styles.tableItem]}>
            <View style={{ width: 132, height: "100%" }}>
              <Image
                resizeMethod={"auto"}
                style={styles.imgit}
                source={require("./../../../assets/item.png")}
              ></Image>
            </View>
            <View style={styles.areaDataItem}>
              <Text style={styles.nameItem}>Nome do produto</Text>
              <Text style={styles.descriptionItem}>{item.descricao} </Text>
              <Text style={styles.priceItem}>R$10,00</Text>
              <View style={{marginTop: 30}}>
                <TouchableOpacity style={styles.btRem}>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    <Feather name="trash-2" size={26} color="white" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 70, elevation: 1, width: "100%", padding: 10 }}>
        <TouchableOpacity style={styles.buttonADD}   onPress={ ()=>{  console.log(params); navigation.navigate('Catálogo'); } }>
          <Text style={{ color: "white", fontSize: 15 }}>
            Adicionar produto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function closeTable() {
    navigation.navigate('Conta fechada');
  }

}

const styles = StyleSheet.create({
  tableItem: {
    width: "100%",
    marginBottom: 1,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  priceItem: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },

  nameItem: {
    fontSize: 19,
    color: "black",
  },

  descriptionItem: {
    fontSize: 12,
    color: "black",
  },

  areaDataItem: {
    paddingLeft: 5,
    paddingRight: 15,
    width: "70%",
  },

  imgit: {
    width: 132,
    height: 162,
    backgroundColor: "red",
  },

  ScrollView: {
    backgroundColor: "black",
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
    backgroundColor: "#7F39FB",
  },
  f11: {
    fontSize: 20,
    color: "white",
  },
  f22: {
    fontSize: 30,
    color: "black",
  },
  f1: {
    fontSize: 50,
    color: "black",
  },
  f2: {
    fontSize: 20,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button1: {
    backgroundColor: "green",
    height: 20,
    width: "100%",
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  btRem: {
    backgroundColor: "red",
    height: 50,
    width: 50,
    elevation: 3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  buttonADD: {
    backgroundColor: "black",
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