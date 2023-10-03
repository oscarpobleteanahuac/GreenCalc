/* Óscar Poblete Sáenz */ 

// Variables para manejar la calculadora
let inputActual = ''; 
let operador = '';
let inputPasado = ''; 
let resultado = false; 

// Agregar contenido a la pantalla
function llenarPantalla(valor) {
    if (resultado) {
        inputActual = '';
        resultado = false;
    }
    inputActual += valor; // Agregar el valor al valor actual en pantalla
    document.getElementById('pantalla').value = inputActual; // Actualizar la pantalla
}

// Borrar contenido en pantalla y reiniciar variables
function borrarPantalla() {
    inputActual = '';
    inputPasado = '';
    operador = '';
    document.getElementById('pantalla').value = ''; 
}

// Realizar las operaciones y mostrar el resultado en pantalla
function calcular() {
    // Convertir inputs a numeros
    const num1 = parseFloat(inputPasado); 
    const num2 = parseFloat(inputActual); 

    switch (operador) {
        case '+': inputActual = (num1 + num2).toString(); break;
        case '-': inputActual = (num1 - num2).toString(); break;
        case '×': inputActual = (num1 * num2).toString(); break;
        case '÷': inputActual = (num1 / num2).toString(); break;
        case '%': inputActual = ((num1 / 100) * num2).toString(); break;
        default: return;
    }

    operador = '';
    inputPasado = '';
    resultado = true;
    document.getElementById('pantalla').value = inputActual; 
}

// Manejar clic en botones
function manejarClic(button) {
    const valorBoton = button.textContent; // Obtener el texto del botón

    switch (valorBoton) {
        case '=': calcular(); break; // Realizar el cálculo al presionar "="
        case 'AC': borrarPantalla(); break; // Borrar todo al presionar "AC"
        case '+/−': inputActual = (-parseFloat(inputActual)).toString(); break; // Cambia el signo del número actual
        default:
            if (button.classList.contains('operador')) {
                if (inputPasado !== '') {
                    calcular(); // Realizar cálculo si hay un operador y un número anterior
                }
                operador = valorBoton; // Establecer el operador
                inputPasado = inputActual; // Guardar el número actual como número anterior
                inputActual = ''; // Reiniciar el número actual
            } else {
                llenarPantalla(valorBoton); // Agregar el número o punto al número actual en pantalla
            }
            break;
    }

    document.getElementById('pantalla').value = inputActual; // Actualizar pantalla
}

// Escuchar los clics en todos los botones y manejar los eventos
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        manejarClic(button); // Maneja el clic en un botón
    });
});
