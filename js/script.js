function conversaoBinario() {
    var input = document.getElementById("valorBinario")
    var valor = input.value
    var decimal_binario = document.getElementById("decimal_binario") //Converte os valores para BINARIO
    var binario_decimal = document.getElementById("binario_decimal") //Converte os valores para DECIMAL
    var tamanho = String(valor)

    var texto = document.getElementById("resultadoBinario")

     // --------------------------------------------------BINARIO PARA DECIMAL

    if(binario_decimal.checked == true)  
    {
        var resultado = 0;

        for(j = 0; j < tamanho.length; j++)
        {
            if(valor[j] < 0 || valor[j] > 1)
            {
               alert('O valor digitado deve conter apenas 1s e 0s!')
               input.value = ''  
               return 1;
            } 
        }

        resultado = parseInt(valor, 2)

        if(isNaN(resultado) == true)
        {
            alert('O valor digitado deve conter apenas 1s e 0s!')
            input.value = ''  
            return 1; 
        }

        texto.innerHTML = `O resultado em decimal é ${resultado}`
    } 

    // --------------------------------------------------DECIMAL PARA BINARIO

    if(decimal_binario.checked == true)
    {
        var num = parseInt(valor, 10)
        var resultado = []
        
        for(i = 0; num > 0; i++)
        {
            resultado.push(num % 2)
            num = Math.floor(num / 2)
        }
        resultado.reverse()
        
        texto.innerHTML = `O resultado em binário é ${resultado.join('')}`
    }

    input.value = ''
    input.focus()  
}

function habilitarBI() {
    var btn = document.getElementById("btnConverterBi")
    btn.disabled = false;
}

function creditoCheck() {
    var valor = document.getElementById('credito');
    var texto = document.getElementById('resultadoCredito');
    var tamanho = String(valor);
    
    var credito = valor.value;
    var caracter = 0;
    var digito; //RECEBERÁ OS DIGITOS QUE IDENTIFICAM A MARCA
    var marca;

    var somaMulti = 0;  //SOMA DOS VALORES MULTIPLICADOS
    var somaRest = 0;   //SOMA DO RESTANTE DOS NUMEROS
    var algarismo = 0;  //VALOR TEMPORARIO DO DIGITO DO CARTÃO

    //VERIFICAR A QUANTIDADE DE CARACTERES PRESENTE NO CARTÃO

    while(credito > 0)
    {
        caracter++;
        credito = parseInt(credito / 10, 10);
    }

    credito = valor.value; //RESETA O VALOR DE CREDITO

    //VERIFICA QUAL A MARCA DO CARTÃO

    if(caracter == 16 && (digito = parseInt(credito / Math.pow(10, 14), 10)) >= 51 && (digito = parseInt(credito / Math.pow(10, 14), 10)) <= 55)
    {
        marca = 'MasterCard'
    }
    else if ((caracter == 13 && (digito = parseInt(credito / Math.pow(10, 12), 10)) == 4) || (caracter == 16 && (digito = parseInt(credito / Math.pow(10, 15), 10)) == 4))
    {
        marca = 'VISA'
    }
    else if(caracter == 15 && ((digito = parseInt(credito / Math.pow(10, 13), 10)) == 34 || (digito = parseInt(credito / Math.pow(10, 13), 10)) == 37))
    {
        marca = 'American Express'
    }
    else
    {
        alert('Número de cartão inválido! Verifique se os números estão corretos ou se não há presença de um "."!');
        valor.value = '';
        return 1;
    }

    //CHECKSUM

    credito = parseInt(credito / 10, 10); //PRA INICIAR A CONTAGEM A PARTIR DO PENULTIMO
    while(credito > 0)
    {
        algarismo = (credito % 10) * 2;

        if(algarismo < 9)
        {   
            somaMulti += algarismo;
            credito = parseInt(credito / 100, 10);
        }
        else
        {
            var x = algarismo % 10;
            algarismo = parseInt(algarismo / 10, 10);
            somaMulti += (x + algarismo)
            credito = parseInt(credito / 100, 10);
        }
    }

    credito = valor.value; //RESETA O VALOR DE CREDITO
    algarismo = 0;   //RESETA ALGARISMO

    while(credito > 0)
    {
        algarismo = credito % 10
        somaRest += algarismo
        credito = parseInt(credito / 100, 10);
    }

    if(((somaRest + somaMulti) % 10) == 0)
    {
        texto.innerHTML = `A bandeira do cartão é ${marca} e é um cartão válido.`
    }
    else
    {
        alert("Cartão de crédito inválido!")
        texto.innerHTML = ' '
    }

    valor.value = ''
    valor.focus()
}

function habilitarCredito() {
    var btn = document.getElementById('verificarCredito');
    btn.disabled = false;
}
