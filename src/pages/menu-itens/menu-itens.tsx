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
  Linking,
} from "react-native";

import React, { Component } from "react";
import orderApp from "../../service/order";
import { CoresApp } from "../componentes/cores";

export default class MenuItensClass extends Component {
  state = {
    loaderItensManuStatus: false,
    itens: [{ nome: "", imagem: "", descricao: "", preco: '' }],
    cats: [{ nome: "", itens: [] }],
  };
  addItem = false;
  navigation: any;
  statusCatalogoCarregado = false;
  mostrarTelaAviso = false;

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
    this.state.cats = [];
    this.state.itens = [];
    try {
      this.addItem = props.route.params.addItem;
    } catch (e) { }
  }

  async componentDidMount() {
    if (!orderApp.appState.statusConsultaCardapio) {

      console.log('Consulta carda');
      this.consultaCardapio();

    } else {

      console.log('Nao consulta carda');

      this.setState({
        cats: orderApp.appState.cardapio,
        itens: orderApp.appState.cardapio[0].itens,
        loaderItensManuStatus: false,
      });

    }
  }

  consultaCardapio() {
    console.log('consultaCardapio')
    this.setState({ loaderItensManuStatus: true });
    orderApp.consultaCardardapio((response: any) => {

      this.statusCatalogoCarregado = true;


      try {

        orderApp.appState.cardapio = response.catalogo;


        response.catalogo.forEach((categoria: any) => {
          categoria.itens.forEach((element: any) => {
            orderApp.appState.qntProdutosEmpresa++;
          });
        });
        console.log('Qnt produtos empresa: ' + orderApp.appState.qntProdutosEmpresa);

        this.setState({
          cats: response.catalogo,
          itens: response.catalogo[0].itens,
          loaderItensManuStatus: false,
        });

        if (orderApp.appState.qntProdutosEmpresa > 0) {
          orderApp.appState.statusConsultaCardapio = true;
        }

      } catch (e) {

        console.log('ERRO');
        orderApp.appState.cardapio = [];
        orderApp.appState.statusConsultaCardapio = false;
        orderApp.appState.qntProdutosEmpresa = 0;
        this.setState({
          cats: [],
          itens: [],
          loaderItensManuStatus: false,
        });
      }


    }, {});
  }

  progress() {
    if (!this.state.loaderItensManuStatus) { return; }
    return <ProgressBarAndroid
      styleAttr="SmallInverse"
      color="black"
      indeterminate={this.state.loaderItensManuStatus}
      progress={0}
      style={{ marginTop: 5, marginBottom: 5 }}
    />
  }

  itens() {

    if (this.state.loaderItensManuStatus) { return; }
    if (orderApp.appState.qntProdutosEmpresa == 0) {
      return this.telaAviso();
    }
    return (

      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >

        {this.state.itens.map((item, l) => (
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

        <TouchableOpacity style={{ borderRadius: 7, marginBottom: 20, marginTop: 20, backgroundColor: 'white', marginLeft: 20, marginRight: 20, padding: 10, borderWidth: 1, borderColor: '#d3d3d3' }} onPress={() => { this.consultaCardapio() }}>
          <Text style={{ textAlign: 'center', color: '#d3d3d3' }}>Atualizar cardápio</Text>
        </TouchableOpacity>

      </ScrollView>

    );
  }

  onclickCat(itensCat: any): void {
    if (!itensCat.itens) { alert('Essa categoria não tem produtos ativos'); return; }
    this.selecionarCat(itensCat);
    this.setState({
      itens: itensCat.itens,
    });
  }

  catsList() {
    if (this.state.loaderItensManuStatus) { return; }
    if (this.state.cats.length == 0) { return; }
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
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
          {this.state.cats.map((item: any, l) => (
            <TouchableOpacity
              key={l}
              style={[styles.itemCat, this.checaSelecionadoCat(item.selecionado)]}
              onPress={() => { this.onclickCat(item); }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  height: "100%",
                }}
              >
                <Text style={{ textAlign: "center", width: "100%", color: CoresApp.corTextoPaletaLeve01 }}>
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
        {this.itens()}

      </View>
    );
  }

  telaAviso() {
    return (
      <>
        <TouchableOpacity style={{ borderRadius: 7, marginTop: 5, backgroundColor: 'gold', marginLeft: 20, marginRight: 20, padding: 20 }} onPress={() => { Linking.openURL('https://admin.juadelivery.site/login'); }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Nenhum produto ativo.</Text>
          <Text style={{ textAlign: 'center' }}>Para configurar os produtos acesse o dashboard da empresa.</Text>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Clique aqui para acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ borderRadius: 7, marginTop: 20, backgroundColor: 'white', marginLeft: 20, marginRight: 20, padding: 10, borderWidth: 1, borderColor: '#d3d3d3' }} onPress={() => { this.consultaCardapio() }}>
          <Text style={{ textAlign: 'center', color: '#d3d3d3' }}>Atualizar cardápio</Text>
        </TouchableOpacity>
      </>
    )
  }


  selecionarCat(item: any) {
    console.log(item.id)
    this.state.cats.forEach((element: any) => {
      element.selecionado = false;
    });

    item.selecionado = true;

    this.setState({
      cats: this.state.cats
    });
  }

  checaSelecionadoCat(status: boolean) {
    let x;
    switch (status) {
      case true: { x = styles.itemCatSelecionado };
    }
    console.log(x)
    return x;
  }
}

const styles = StyleSheet.create({
  itemCat: {
    height: 50,
    backgroundColor: CoresApp.paleta01,
    width: 150,
    marginRight: 1,
    borderRadius: 2,
  },

  itemCatSelecionado: {
    height: 50,
    backgroundColor: CoresApp.paleta02,
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
    fontSize: 15,
    color: "black",
    marginTop: 8
  },

  descriptionItem: {
    fontSize: 12,
    color: CoresApp.corFracaTexto,
  },

  areaDataItem: {
    paddingLeft: 5,
    paddingRight: 15,
    width: "70%",
  },

  imgit: {
    width: 110,
    height: 110,
    borderRadius: 0,
    backgroundColor: 'white'
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
    paddingBottom: 1
  },

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
