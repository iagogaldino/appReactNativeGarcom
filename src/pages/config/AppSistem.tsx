const ConfigApp = {
    mascaraDinheiro: (valor: any) => {
        try {
            return 'R$' + valor.toFixed(2).replace(".", ",");
        } catch (e) { 
            return 'R$' + valor.replace(".", ","); 
        }
    }

}


export default ConfigApp;