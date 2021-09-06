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

export default class AddItem extends Component {
    state = {
        loaderItensManuStatus: false,
        cats: [{ nome: "", itens: [] }],
    };
    navigation: any;
    statusCatalogoCarregado = false;
    mostrarTelaAviso = false;
    categoriasSelecionadas: Array<any> = [];
    product: any;
    itens = []
    acao = 'add';

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.state.cats = [];

        if (props.route.params && props.route.params.addItem) {
            this.product.imagem = '';
            this.product.nome = '';
            this.product.descricao = '';
            this.product.preco = '';
            this.product.categoria = [];
        } else {
            this.product = props.route.params.product;
            this.acao = 'editar';
        }
    }

    async componentDidMount() {
        this.consultaCardapio()
    }

    render() {
        return (

            <ScrollView style={{ width: "100%", flex: 1 }}>


                <View style={{ flexDirection: 'row', backgroundColor: 'red', width: '100%' }}>

                    <View style={styles.imagemProd}>
                        <Image
                            resizeMethod={"auto"}
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: this.product.imagem }}
                        ></Image>
                    </View>

                    <View style={{ backgroundColor: 'green', width: '100%' }}>
                        <TextInput
                            placeholderTextColor="black"
                            style={styles.input}
                            placeholder={"Nome do produto"}
                            value={this.product.nome}
                            onChangeText={(text) => { }}
                        />

                        <TextInput
                            placeholderTextColor="black"
                            style={styles.input}
                            placeholder={"Preço R$0,00"}
                            value={this.product.preco}
                            onChangeText={(text) => { }}
                        />

                    </View>


                </View>

                <View>
                    <TextInput
                        placeholderTextColor="black"
                        style={[styles.input, { width: '100%' }]}
                        placeholder={"Descrição"}
                        value={this.product.descricao}
                        onChangeText={(text) => { }}
                    />
                </View>



                <Text style={{ paddingLeft: 10, borderTopWidth: 1, paddingTop: 15, paddingBottom: 15, backgroundColor: 'white', color: '#bcbcbc', fontSize: 18 }}>
                    Categoria
                </Text>

                <View>
                    {this.state.cats.map((item: any, l) => (
                        <TouchableOpacity onPress={() => { this.selecionarItem(item) }} style={[styles.itemC, { backgroundColor: this.getCatSelecionado(item) }]}>
                            <Text>{item.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {this.verificaBT()}

            </ScrollView>
        );
    }

    verificaBT() {
        if (this.acao == 'add') {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: CoresApp.botao }]} onPress={() => { this.salvar() }}>
                <Text>Adicionar</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: CoresApp.botao }]} onPress={() => { this.salvar() }}>
                <Text>Editar</Text>
            </TouchableOpacity>
        }
    }

    verificaCats() {
        this.product.categoria.forEach((element: any) => {
            // console.log('Produto:' + element.nome, element.id)
            this.state.cats.forEach((categoriaBACK: any) => {
                if (categoriaBACK.id == element.id && element.status == 'true') {
                    console.log('SERVER:' + categoriaBACK.nome, categoriaBACK.id)
                    this.selecionarItem(categoriaBACK);
                }
            });
        });
    }

    getCatSelecionado(x: any) {
        if (x.selecionado)
            return 'gold'
        else
            return 'white'
    }

    selecionarItem(x: any) {

        if (x.selecionado) {

            this.removeItemFp(x);

            x.selecionado = false;

        } else {

            x.selecionado = true;
            this.categoriasSelecionadas.push({ id: x.id, nome: x.nome })

        }

        this.setState({
            itens: this.itens
        })

        console.log(this.categoriasSelecionadas);
    }

    removeItemFp(item: any) {
        let indeArray: any;
        for (const x in this.categoriasSelecionadas) {
            if (this.categoriasSelecionadas[x].id === item.id) {
                indeArray = x;
                console.log('remover >>', this.categoriasSelecionadas[x].nome)
            }
        }
        this.categoriasSelecionadas.splice(indeArray, 1);
    }

    salvar() {
        orderApp.addProd({ id: 0, nome: 'Teste', descricao: 'Descrição', preco: 21 }, this.categoriasSelecionadas, (res: any) => {
            console.log(res)
            if (res.erro == true) {
                alert(res.mensagem)
            } else {
                this.navigation.navigate('Catálogo');
            }
        });
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

                this.verificaCats();


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

}



const styles = StyleSheet.create({
    itemCat: {
        height: 50,
        backgroundColor: CoresApp.paleta01,
        width: 150,
        marginRight: 1,
        borderRadius: 2,
    },
    input: {
        elevation: 1, height: 75, textAlign: 'center', backgroundColor: '#F0F0F0', borderTopColor: 'black', borderTopWidth: 1, width: '62%'
    },
    itemC: {
        backgroundColor: 'gold',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        margin: 1,
        elevation: 1,
        borderRadius: 1,
        paddingLeft: 10
    },
    bt: {
        backgroundColor: 'gold',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        margin: 1,
        elevation: 1,
        borderRadius: 1,
        paddingLeft: 10
    },
    imagemProd: {
        backgroundColor: 'white',
        height: 150,
        width: 150,
        borderWidth: 1,

    },

});
