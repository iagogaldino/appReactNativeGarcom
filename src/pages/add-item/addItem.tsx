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
    product = { id: 0, imagem: 'https://sandriniarcondicionado.com.br/produtos/semfoto.jpg', nome: '', preco: '0', descricao: '', categoria: [] };
    itens = []
    acao = false;

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.state.cats = [];
        this.acao = props.route.params.addItem; // Se true = ADD item

        if (this.acao) {
            console.log('Adicionar produto')

            this.product.nome = '';
            this.product.descricao = '';
            this.product.preco = '';
            this.product.categoria = [];

        } else {
            console.log('Editar produto')

            this.product.id = props.route.params.product.id;
            this.product.categoria = props.route.params.product.categoria;
            this.product.descricao = props.route.params.product.descricao;
            this.product.imagem = props.route.params.product.imagem;
            this.product.nome = props.route.params.product.nome;
            this.product.preco = props.route.params.product.preco;

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
                            defaultValue={this.product.nome}
                            onChangeText={
                                (text) => { this.product.nome = text; }
                            }
                        />

                        <TextInput
                            placeholderTextColor="black"
                            style={styles.input}
                            placeholder={"Preço R$0,00"}
                            defaultValue={this.product.preco}
                            onChangeText={
                                (text) => { this.product.preco = text; }
                            }
                        />

                    </View>


                </View>

                <View>
                    <TextInput
                        placeholderTextColor="black"
                        style={[styles.input, { width: '100%' }]}
                        placeholder={"Descrição"}
                        defaultValue={this.product.descricao}
                        onChangeText={
                            (text) => { this.product.descricao = text; }
                        }
                    />
                </View>



                <Text style={{ paddingLeft: 10, borderTopWidth: 1, borderColor: '#ede6e6', paddingTop: 15, paddingBottom: 15, backgroundColor: 'white', color: '#bcbcbc', fontSize: 18 }}>
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
                {this.botaoRemover()}


            </ScrollView>
        );
    }

    setNameTValue(text: any) {
        this.product.nome = text;
    }

    verificaBT() {
        if (this.state.loaderItensManuStatus) {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: CoresApp.botao }]} onPress={() => { this.salvar('add_item_cardapio') }}>
                <ProgressBarAndroid
                    styleAttr="SmallInverse"
                    color="white"
                    indeterminate={true}
                    progress={0}
                />
            </TouchableOpacity>
        }
        if (this.acao) {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: CoresApp.botao }]} onPress={() => { this.salvar('add_item_cardapio') }}>
                <Text style={{color: 'white'}}>Adicionar</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: CoresApp.botao }]} onPress={() => { this.salvar('att_item_cardapio') }}>
                <Text style={{ color: 'white' }}>Salvar</Text>
            </TouchableOpacity>
        }
    }

    botaoRemover() {
        if (this.acao) {
            return;
        }
        if (this.state.loaderItensManuStatus) {
            return <TouchableOpacity style={[styles.bt, { backgroundColor: 'red', marginTop: 10 }]}>
                <Text style={{ color: 'white' }}>
                    <ProgressBarAndroid
                        styleAttr="SmallInverse"
                        color="white"
                        indeterminate={true}
                        progress={0}
                    />
                </Text>
            </TouchableOpacity>
        }
        return <TouchableOpacity style={[styles.bt, { backgroundColor: 'red', marginTop: 10 }]} onPress={() => {
            this.setState({
                loaderItensManuStatus: true
            })
            orderApp.removerProduto(this.product.id, (resp: any) => {
                this.setState({loaderItensManuStatus: false })
                if (!resp.erro) {
                    this.navigation.navigate('Catálogo')
                    alert(`${this.product.nome} removido do catálogo`)
                } else { alert('Erro ao tentar remover este item'); }
            })
        }}>
            <Text style={{ color: 'white' }}>Remover produto</Text>
        </TouchableOpacity>
    }

    verificaCats() {
        this.product.categoria.forEach((element: any) => {
            // console.log('Produto:' + element.nome, element.id)
            this.state.cats.forEach((categoriaBACK: any) => {
                if (categoriaBACK.id == element.id && element.status == 'true') {
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

    }

    removeItemFp(item: any) {
        let indeArray: any;
        for (const x in this.categoriasSelecionadas) {
            if (this.categoriasSelecionadas[x].id === item.id) {
                indeArray = x;
            }
        }
        this.categoriasSelecionadas.splice(indeArray, 1);
    }

    salvar(ac: string) {

        this.setState({
            loaderItensManuStatus: true
        })

        orderApp.addProd(this.product, this.categoriasSelecionadas, (res: any) => {
            console.log(res)
            if (res.erro == true) {
                alert(res.mensagem)
            } else {
                orderApp.appState.statusConsultaCardapio = false;
                this.navigation.navigate('Catálogo');
            }

            this.setState({
                loaderItensManuStatus: false
            })

        }, ac);

    }

    consultaCardapio() {
        this.setState({ loaderItensManuStatus: true });
        orderApp.consultaCardardapio((response: any) => {

            this.statusCatalogoCarregado = true;


            try {

                orderApp.appState.cardapio = response.catalogo;


                response.catalogo.forEach((categoria: any) => {
                    if (categoria.itens)
                        categoria.itens.forEach((element: any) => {
                            orderApp.appState.qntProdutosEmpresa++;
                        });
                });

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
                console.log(e);

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
        elevation: 1, height: 75, textAlign: 'center', backgroundColor: 'white', borderTopColor: '#ede6e6', borderTopWidth: 1, width: '62%'
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
        margin: 20,
        elevation: 1,
        borderRadius: 7,
        paddingLeft: 10,
    },
    imagemProd: {
        backgroundColor: 'white',
        height: 150,
        width: 150,
        borderWidth: 1,
        borderColor: '#ede6e6',
        borderBottomWidth: 0,
        elevation: 10,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingTop: 5
    },

});
