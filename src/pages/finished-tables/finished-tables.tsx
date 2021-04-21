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

export default function FinishedTables() {
  const tables = [
    {
      name: "01",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "02",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "03",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "04",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Disponível",
      status: 0,
    },
    {
      name: "05",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 1,
    },
    {
      name: "06",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "07",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "08",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "09",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
    {
      name: "10",
      value: 150.55,
      info: "19/04/2021 às 10:44",
      statusName: "Finalizadas",
      status: 0,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ height:135, paddingBottom: 20, borderWidth: 0, elevation: 1}}>
        <View style={styles.wq}>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              placeholder={"ID pedido"}
            />
          </View>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              placeholder={"Data"}
            />
          </View>
        </View>
        <View style={{paddingLeft:0}}>
            <Text style={styles.f3}> Quantidade de pedido: 0 </Text>
            <Text style={styles.f3}> Total: R$ 500,00 </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tables}>
          {tables.map((item, l) => (
            <TouchableOpacity key={l} style={[styles.tableItem]}>
              <Text style={styles.f1}>{item.info + " " + item.statusName}</Text>
              <Text style={{ color: "black", fontSize: 55 }}> {item.name} </Text>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <Text style={styles.f2}> R$ {item.value} </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

    f3: {
        fontSize: 20,
        color: 'black',
        paddingLeft: 13
    },

  vi: {
    width: "50%",
    alignItems: "center",
    height: 50,
  },
  input: {
    padding: 15,
    width: "80%",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "white",
  },
  wq: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    flex: 1,
    paddingTop: 5
  },

  buttonADD: {
    backgroundColor: "#3700B3",
    height: 50,
    width: "100%",
    elevation: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  tables: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center", // if you want to fill rows left to right
    justifyContent: "center",
    marginTop: 50,
  },

  f1: {
    color: "black",
    fontSize: 15,
    margin: 10
  },
  f2: {
    color: "black",
    fontSize: 20,
    backgroundColor: 'gold',
    width: 120,
    textAlign: 'center'
  },

  tableItem: {
    width: 350,
    height: 150,
    backgroundColor: "white",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "flex-start",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
