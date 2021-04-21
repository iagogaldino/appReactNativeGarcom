import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import api from "./../../service/api";
import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";

export default class MenuItensClass extends Component {
  state = {
    loaderItensManuStatus: false,
    tables: [{ nome: "", imagem: "", descricao: "" }],
    cats: [{ nome: '', itens: [] }],
  };
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    console.log("#componentDidMount");
    const response: any = await api.post("?acao=empresas-especifica", null, {
      params: {
        token: "",
        api: "apiCliente",
        ident: "24",
      },
    });
    console.log("OK");
    this.setState({
      cats: response.data.empresas[0].categorias,
    });
  }

  itens() {
    return (
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {this.state.tables.map((item, l) => (
          <TouchableOpacity key={l} style={[styles.tableItem]}>
            <View style={{ width: 110, height: "100%" }}>
              <Image
                resizeMethod={"auto"}
                style={styles.imgit}
                source={{ uri: item.imagem }}
              ></Image>
            </View>
            <View style={styles.areaDataItem}>
              <Text style={styles.nameItem}>{item.nome}</Text>
              <Text style={styles.descriptionItem}>{item.descricao}</Text>
              <Text style={styles.priceItem}>R$10,00</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  onclickCat(itensCat: any): void {
    console.log(itensCat);
    this.setState({
      tables: itensCat
    });
  }

  catsList() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.cats.map((item, l) => (
            <TouchableOpacity key={l} style={[styles.itemCat]} onPress={ ()=>{ this.onclickCat(item.itens); } }>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  height: "100%",
                }}
              >
                <Text style={{ textAlign: "center", width: "100%" }}>
                  {item.nome}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

 

  render() {
    return (
      <View style={{ width: "100%", height: 70, flex: 1 }}>
        {this.catsList()}
        {this.itens()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemCat: {
    height: 50,
    backgroundColor: "white",
    width: 150,
    marginRight: 1,
    borderRadius: 10,
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
    width: 110,
    height: 110,
  },

  tables: {
    width: "100%",
    backgroundColor: "black",
  },

  f1: {
    color: "white",
    fontSize: 20,
  },

  tableItem: {
    width: "100%",
    marginBottom: 1,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
