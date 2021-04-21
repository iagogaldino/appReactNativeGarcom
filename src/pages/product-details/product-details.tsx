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
import tablesService from './../tables/tables.service'


export default class ProductDetails extends Component {

  product: any;
  navigation: any;
  

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
    try {
      this.product = props.route.params.product;
    } catch (e) { console.warn('Error when trying to open product...!');  }
    
  }

  addProduct(product: any) {
    console.log(' ADd product to table');
     tablesService.addProduct(tablesService.getTable(), product);
     
     this.navigation.navigate("Detalhes da mesa");
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMethod={"auto"}
          style={styles.imgit}
          source={{uri: this.product.imagem}}
        ></Image>
        <View
          style={{
            width: "100%",
            marginTop: 0,
            height: 140,

            padding: 10,
          }}
        >
          <ScrollView>
            <View>
              <Text style={styles.pname}>{this.product.nome}</Text>
              <Text style={styles.pdesc}>{this.product.descricao}</Text>
            </View>
          </ScrollView>
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
              placeholder={"R$10,00"}
            />
          </View>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              placeholder={"Observação para o produto"}
            />
          </View>
        </View>

        <View style={styles.cbts}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonl} onPress={() => {}}>
              <Feather name="plus" style={styles.iconbt} />
            </TouchableOpacity>

            <View style={[styles.button, { borderRadius: 0 }]}>
              <Text style={{ fontSize: 25, color: 'white' }}> 1 </Text>
            </View>

            <TouchableOpacity style={styles.buttonr} onPress={() => {}}>
              <Feather style={styles.iconbt} name="plus" />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonADD} onPress={()=>{this.addProduct(this.product)}}>
              <Text style={{ color: "white", fontSize: 15 }}>
                Adicionar produto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pdesc: {
    fontSize: 13,
    color: "black",
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
    width: "100%",
    alignItems: "center",
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
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
