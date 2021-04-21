import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

export default function StoreRegister() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.tex}>Dados para acesso</Text>

        <View style={styles.vi1}>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Email"}
            />
          </View>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Senha"}
            />
          </View>
        </View>
        <Text style={styles.tex}>Dados da empresa</Text>
        <View style={styles.vi1}>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Nome da empresa"}
            />
          </View>
          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Telefone"}
            />
          </View>

          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"CPF/CNPJ"}
            />
          </View>

          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Rua"}
            />
          </View>

          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Número"}
            />
          </View>

          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Bairro"}
            />
          </View>

          <View style={styles.vi}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder={"Cidade"}
            />
          </View>
        </View>

        <Text style={styles.tex}>Dados do proprietário</Text>

        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder={"Nome completo"}
          />
        </View>

        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder={"Telefone"}
          />
        </View>

        <View style={styles.vi}>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder={"Senha"}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // navigation.navigate("Mesas");
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}> Cadastrar </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tex: { marginTop: 20, color: "gold" },
  button: {
    padding: 20,
    backgroundColor: "#985EFF",
    width: "90%",
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#985EFF",
    marginTop: 25,
    borderRadius: 10,
  },
  button2: {
    padding: 20,
    backgroundColor: "#7F39FB",
    width: "80%",
    alignItems: "center",
    elevation: 1,
    borderWidth: 1,
    borderColor: "#7F39FB",
    marginTop: 25,
    borderRadius: 10,
  },
  vi2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  im: {
    width: 150,
    height: 150,
  },
  vi1: {
    width: "100%",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 2,
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
  container: {
    flex: 1,
    backgroundColor: "#7F39FB",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});
