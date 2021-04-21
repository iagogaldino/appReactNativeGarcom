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
import { Feather } from "@expo/vector-icons";
import  serviceTables  from "./tables.service";

export default class Tables extends Component {
  props: any;

  state = {
    tables: [
      {
        name: "01",
        itens: [],
        value: 150,
        statusName: "Disponível",
        status: 0,
      },
    ],
  };
  
  constructor(params: any) {
    super(params);
    this.props = params.params;
   
  }

  componentDidMount(){
    console.log('#componentDidMount');
    this.setState({
      tables: serviceTables.getTablesArray,
    });
}

  openTable(tableData: any) {
    serviceTables.setTable(tableData);
    this.props.navigation.navigate("Detalhes da mesa");
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tables}>
            {this.state.tables.map((item, l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.tableItem,
                  item.status ? styles.tableItemOFF : styles.tableItem,
                ]}
                onPress={() => {
                  this.openTable(item);
                }}
              >
                <Text style={styles.f1}> {item.statusName} </Text>
                <Text style={{ color: "white", fontSize: 70 }}>
                  {" "}
                  {item.name}{" "}
                </Text>
                <Text style={styles.f1}> R$ {item.value} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            padding: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonADD}
            onPress={() => {
              this.props.navigation.navigate("Adicionar mesa");
            }}
          >
            <Feather name="plus" size={26} color="white" />
            <Text style={{ color: "white", fontSize: 15 }}>ADICIONAR MESA</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    color: "white",
    fontSize: 20,
  },

  tableItem: {
    width: 165,
    height: 150,
    backgroundColor: "#58DE65",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "center",
  },

  tableItemOFF: {
    width: 165,
    height: 150,
    backgroundColor: "#D91136",
    elevation: 12,
    borderRadius: 3,
    margin: 2,
    alignItems: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
