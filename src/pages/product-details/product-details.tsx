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
import { Feather } from "@expo/vector-icons";
import tablesService from "./../tables/tables.service";
import orderApp from "../../service/order";
import api from "../../service/api";

export default class ProductDetails extends Component {
  product: any;
  navigation: any;
  observaco = "";
  focusListener: any;
  state = {
    statusLoaderAdd: false,
  };

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
    try {
      this.product = props.route.params.product;
    } catch (e) {
      console.warn("Error when trying to open product...!");
    }

    this.product.qnt = 1;
  }

  componentDidMount() {
    console.log("#Product Details  -> componentDidMount");
    this.focusListener = this.navigation.addListener("focus", () => { });
  }

  addProduct(product: any) {

    if (this.state.statusLoaderAdd) {
      console.log('awaiting for api response');
      return;
    }

    this.setState({
      statusLoaderAdd: true,
    });

    this.product.observacao = this.observaco;

    tablesService.addProduct(
      tablesService.getTable(),
      product,
      (response: any) => {
        if (response.erro == true) {
          this.setState({
            statusLoaderAdd: false,
          });
          alert(response.detalhes);
        } else {
          this.navigation.navigate("Detalhes da mesa");
        }
      }
    );
  }

  ammountADD() {
    this.product.qnt += 1;

    this.setState({
      product: this.product,
    });
  }

  ammountREM() {
    if (this.product.qnt === 1) {
      return;
    }
    this.product.qnt -= 1;

    this.setState({
      product: this.product,
    });
  }

  setObs(value: string) {
    this.observaco = value;
  }

  setValue(value: string) {
    this.product.preco = value;
  }

  textBt() {
    if (!this.state.statusLoaderAdd) {
      return (
        <Text style={{ color: "white", fontSize: 15 }}>Adicionar produto</Text>
      );
    } else {
      return (
        <Text style={{ color: "white", fontSize: 15 }}>Carregando ...</Text>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            resizeMethod={"auto"}
            style={styles.imgit}
            source={{ uri: this.product.imagem }}
          ></Image>
          <View
            style={{
              width: "100%",
              marginTop: 0,
              height: 140,

              padding: 10,
            }}
          >
            <View>
              <Text style={styles.pname}>{this.product.nome}</Text>
              <Text style={styles.pdesc}>{this.product.descricao}</Text>
              <Text style={styles.preco}>R${this.product.preco}</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 70,
              height: 130,
            }}
          >
            <View style={styles.vi}>
              <TextInput
                placeholderTextColor="black"
                style={styles.input}
                placeholder={"Observação para o produto"}
                onChangeText={(text) => this.setObs(text)}
              />
            </View>
          </View>

          <View style={styles.cbts}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonl}
                onPress={() => {
                  this.ammountREM();
                }}
              >
                <Feather name="minus" style={styles.iconbt} />
              </TouchableOpacity>

              <View style={[styles.button, { borderRadius: 0 }]}>
                <Text style={{ fontSize: 25, color: "white" }}>
                  {this.product.qnt}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.buttonr}
                onPress={() => {
                  this.ammountADD();
                }}
              >
                <Feather style={styles.iconbt} name="plus" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonADD}
                onPress={() => {
                  this.addProduct(this.product);
                }}
              >
                {this.textBt()}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pdesc: {
    fontSize: 13,
    color: "black",
  },

  preco: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold'
  },


  pname: {
    fontSize: 25,
    color: "black",
  },

  cbts: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonADD: {
    backgroundColor: "black",
    width: 200,
    height: 55,
    elevation: 1,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconbt: {
    fontSize: 12,
    color: "white",
  },
  buttonl: {
    padding: 20,
    backgroundColor: "red",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonr: {
    padding: 20,
    backgroundColor: "red",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  button: {
    padding: 10,
    backgroundColor: "red",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderRadius: 10,
  },
  vi: {
    alignItems: "center",
    marginTop: 60
  },
  input: {
    padding: 15,
    width: "90%",
    backgroundColor: "white",
    elevation: 5,
    marginTop: 5,
    borderRadius: 6,
  },
  imgit: {
    width: "100%",
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
