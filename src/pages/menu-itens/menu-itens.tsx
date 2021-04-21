import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ProgressBarAndroid,
} from "react-native";

import api from "./../../service/api";
import React, { Component } from "react";

export default class MenuItensClass extends Component {
  state = {
    loaderItensManuStatus: false,
    tables: [{ nome: "...", imagem: "...", descricao: "...", preco: '...' }],
    cats: [{ nome: "", itens: [] }],
  };
  addItem = false;
  navigation: any;

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;

    try {
      this.addItem = props.route.params.addItem;
    } catch (e) {}
  }

  async componentDidMount() {
    console.log("#componentDidMount");
    this.setState({
      loaderItensManuStatus: true,
    });
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
      tables: response.data.empresas[0].categorias[0].itens,
      loaderItensManuStatus: false,
    });
  }

  progress() {
   if (!this.state.loaderItensManuStatus) { return; }
   return <ProgressBarAndroid
    styleAttr="Horizontal"
    color="black"
    indeterminate={this.state.loaderItensManuStatus}
    progress={0}
  />
  }

  itens() {
    
    if (this.state.loaderItensManuStatus) { return; }
    return (

      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {this.state.tables.map((item, l) => (
          <TouchableOpacity
            key={l}
            style={[styles.tableItem]}
            onPress={() => {
              this.openItemDetails(item);
            }}
          >
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
              <Text style={styles.priceItem}>R${item.preco}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    );
  }

  onclickCat(itensCat: any): void {
    this.setState({
      tables: itensCat,
    });
  }

  catsList() {
    if (this.state.loaderItensManuStatus) { return; }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: 0,
          paddingBottom: 1,
          height: 55,
          elevation: 10,
          backgroundColor: 'black'
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'white'}}>
          {this.state.cats.map((item, l) => (
            <TouchableOpacity
              key={l}
              style={[styles.itemCat]}
              onPress={() => {
                this.onclickCat(item.itens);
              }}
            >
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

  openItemDetails(item: any) {
    if (!this.addItem) {
      console.log("just see menu...");
      return;
    }
    console.log("Open details product...");
    this.navigation.navigate("Produto", { addItem: true, product: item });
  }

  render() {
    return (
      
      <View style={{ width: "100%", flex: 1 }}>
        {this.progress()}
        
        {this.catsList()}
        { this.itens()}

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
    borderRadius: 2,
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
    borderRadius: 0
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
