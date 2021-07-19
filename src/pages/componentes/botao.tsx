import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ProgressBarAndroid } from 'react-native';
import { CoresApp } from './cores';

export interface ConfigBotao {
    cor?: string;
    label: string
    bgColor?: string;
    mostrarBotao?: boolean;
    onPress?: () => void;
}


export class BotaoDelsuc extends Component<ConfigBotao, any> {

    private nomeBotao: string = this.props.label;

    constructor(props: any) {
        super(props);
        this.props.onPress;
    }

    render() {
        return (
            <View style={{ height: 45, minWidth: 200, backfaceVisibility: 'hidden', backgroundColor: 'rgba(52, 52, 52, alpha)' }}>
                {!this.props.mostrarBotao && (
                    <TouchableOpacity onPress={this.props.onPress} style={styles.botaoConfirmar}>
                        <Text style={styles.btCor}>{this.nomeBotao}</Text>
                    </TouchableOpacity>
                )}
                {this.props.mostrarBotao && (
                    <View style={[styles.botaoConfirmar, styles.botaoCarregando]}>
                        <ProgressBarAndroid
                            styleAttr="SmallInverse"
                            color="white"
                            indeterminate={true}
                            progress={0}
                        />
                    </View>
                )}
            </View>

        )
    }

}


const styles = StyleSheet.create({
    botaoCarregando: {
        opacity: 0.8,
        backgroundColor: CoresApp.botao
    },
    botaoConfirmar: {
        flex: 1,
        backgroundColor: CoresApp.botao,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 2
    },
    btCor: {
        color: 'white',
        fontSize: 18
    }
});
