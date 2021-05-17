function getResult() {
    // Recibir valor del input
    var decimal = document.getElementById('decimal').value;

    var binario = [];
    var ipv4 = [];

    var vec1 = []; var vec3 = [];
    var vec2 = []; var vec4 = [];

    console.log("Decimal: " + decimal);

    do {
        let residuo = Number.parseInt(decimal) % 2; // Obtener residuo (0 o 1) para poder agregarlo al array que interpretare como el binario
        binario.push(residuo);

        if (residuo == 1) { // Convertir a par y así usar números que no den decimales al dividir entre dos
            decimal--;
        }
        decimal /= 2; // Ir disminuyendo el decimal hasta 0
    } while (decimal != 0);

    binario = validarLongitud(binario);
    /* Si no se cumplia la codición de que el numero ingresado fuera de 32 bits y fuera menos llamamos
    a esta función que me permite añadirle 0's y asi poder tratarlo como lo haria normalmente */

    let band = -1; // Nada más comenzar al dividir el 0 daria 0 y aumentaria...

    for (let i = 0; i < 32; i++) {
        if ((i % 8) == 0) {
            band++;
            // Me permitio aumentar el contador cada que pase de los 8 bits y asi agregar a otro vector
            // Que tomare como otro octeto.
        }

        switch (band) {
            case 0: vec1.push(binario.pop()); // El pop para sacarlo de manera inversa que es como se necesita para el binario
                break;
            case 1: vec2.push(binario.pop());
                break;
            case 2: vec3.push(binario.pop());
                break;
            case 3: vec4.push(binario.pop());
                break;
        }
    }

    /* Cada octeto sera convertido a decimal para despues imprimirlo como se muestra abajo */
    ipv4[0] = convertirDecimal(vec1);
    ipv4[1] = convertirDecimal(vec2);
    ipv4[2] = convertirDecimal(vec3);
    ipv4[3] = convertirDecimal(vec4);

    console.log("IPv4: " + ipv4.join('.'));
}

function convertirDecimal(vec) {
    let acum = 0; // Guardara el acumulado de todo aquel 1 que exista para elevar el 2 a la potencia del iterador

    for (let i = 0; i < 8; i++) {
        if (vec[i] == 1) {
            acum += Math.pow(2, 7 - i);
        }
    }

    return acum.toString();
}

function validarLongitud(binario) {
    if (binario.length < 32) {
        let long = 32 - binario.length;
        for (let i = 0; i < long; i++) {
            binario.push(0);
        }
    }

    return binario;
}