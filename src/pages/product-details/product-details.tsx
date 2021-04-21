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

export default function ProductDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        resizeMethod={"auto"}
        style={styles.imgit}
        source={require("./../../../assets/item.png")}
      ></Image>
      <View
        style={{
          width: "100%",
          marginTop: 0,
          height: 140,
          
          padding: 10
        }}
      >
          <ScrollView>
        <View>
          <Text style={styles.pname}>Nome do produto</Text>
          <Text style={styles.pdesc}>
            Pão, 2 Carnes artesanais (150g), Ovo, Bacon, 2x Queijo, Tomate,
            Cebola, Alface e Molho especial da casa.{" "}
          </Text>
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
            placeholderTextColor="white"
            style={styles.input}
            placeholder={"R$10,00"}
          />
        </View>
        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="white"
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
            <Text style={{ fontSize: 25 }}> 1 </Text>
          </View>

          <TouchableOpacity style={styles.buttonr} onPress={() => {}}>
            <Feather style={styles.iconbt} name="plus" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.buttonADD}>
            <Text style={{ color: "black", fontSize: 15 }}>
              Adicionar produto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pdesc: {
      fontSize: 13,
      color: 'gold',
  },

  pname: {
    fontSize: 25,
    color: 'white'
  },

  cbts: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonADD: {
    backgroundColor: "gold",
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
    color: "black",
  },
  buttonl: {
    padding: 20,
    backgroundColor: "gold",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#985EFF",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonr: {
    padding: 20,
    backgroundColor: "gold",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#985EFF",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  button: {
    padding: 10,
    backgroundColor: "gold",
    width: 60,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#985EFF",
    borderRadius: 10,
  },
  vi: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    padding: 15,
    width: "90%",
    backgroundColor: "#7F39FB",
    borderColor: "#7F39FB",
    elevation: 5,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
    color: "white",
  },
  imgit: {
    width: "100%",
    height: 300,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#7F39FB",
    alignItems: "center",
  },
});
