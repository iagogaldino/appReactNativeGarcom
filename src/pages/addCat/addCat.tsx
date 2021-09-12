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
import { BotaoDelsuc } from "../componentes/botao";

export default class Addcat extends Component {
    state = {
        loaderItensManuStatus: false,
    };
    navigation: any;
    acao = false;
    categoria = { id: '', nome: '' };
    acaoMenu = 'addcat';
    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.acao = props.route.params.addItem; // Se true = ADD item

        if (!this.acao) {
            this.acaoMenu = 'removerCategoria';
            this.categoria = props.route.params.categoria; // Se true = ADD item
        }
        console.log(this.categoria)
    }

    async componentDidMount() {
        console.log('ajdiasjdiasdj')
    }



    render() {
        return (
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <View style={styles.vi}>
                    <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder={"Nome da categoria"}
                        defaultValue={this.categoria.nome}
                        onChangeText={
                            (text: any) => {
                                this.categoria.nome = text;
                            }
                        }
                    />
                </View>




                <TouchableOpacity style={[styles.bt, { backgroundColor: 'black', marginTop: 10 }]}
                    onPress={() => {
                        console.log('onPress')
                        this.setState({ loaderItensManuStatus: true })
                        orderApp.serviceCat(this.categoria, this.acaoMenu, (res: any) => {
                            console.log(res)
                            this.setState({ loaderItensManuStatus: false })
                            if (res.erro) { alert(res.mensagem); return; }
                            orderApp.appState.statusConsultaCardapio = false;
                            this.navigation.navigate('Catálogo')
                            console.log(res)
                        })
                    }}>
                    {this.state.loaderItensManuStatus && (
                        <ProgressBarAndroid
                            styleAttr="SmallInverse"
                            color="white"
                            indeterminate={true}
                            progress={0}
                        />
                    )}
                    {this.acao && (<Text style={{ color: 'white' }}>Adicionar categoria</Text>)}
                    {!this.acao && (<Text style={{ color: 'white' }}>Salvar categoria</Text>)}

                </TouchableOpacity>


                {!this.acao && (
                    this.botaoRemover()
                )}


            </ScrollView>
        )
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
        return <TouchableOpacity style={[styles.bt, { backgroundColor: 'red', marginTop: 10 }]} 
        onPress={() => {
            console.log('onPress')
            this.setState({ loaderItensManuStatus: true })
            orderApp.serviceCat(this.categoria, this.acaoMenu, (res: any) => {
                this.setState({ loaderItensManuStatus: false })
                if (res.erro) { alert(res.mensagem); return; }
                orderApp.appState.statusConsultaCardapio = false;
                this.navigation.navigate('Catálogo')
                console.log(res)
            })
        }}
        >
            <Text style={{ color: 'white' }}>Remover categoria</Text>
        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    vi: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        padding: 15,
        width: "80%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 6,
        color: "black",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    button: {
        padding: 5,
        alignItems: "center",
        marginTop: 5,
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
});

