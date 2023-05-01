let palabra_elegida;
let letras_usadas = []; 
let errores_cont = 0, aciertos_cont = 1;

const palabras = [
  'manzana',
  'banana',
  'pera',
  'mandarina',
  'melocoton',
  'almendra',
  'naranja'
];

const letrasErradas = document.getElementById('errores');

const atril = document.getElementById('imagen');

//boton 'generar palabra'
const reiniciar = document.getElementById('jugar');
iniciar();reiniciar.addEventListener('click', iniciar);

function iniciar(event){ 
  atril.src = 'assets/img0.png';
  reiniciar.disabled = true;
  errores_cont = 0; aciertos_cont = 0;

  const parrafo = document.getElementById('palabra_a_adivinar');
  parrafo.innerHTML = '';
  letrasErradas.innerHTML = '';
  document.getElementById('resultado').innerHTML = '';

  //elije una palabra aleatoria
  palabra_elegida = palabras[Math.floor(Math.random() * palabras.length)];
  console.log(palabra_elegida);

  //crea lo guiones para cada letra de la palabra
  for(let x=0; x < palabra_elegida.length; x++) {
    parrafo.appendChild(document.createElement('span'));
  }

  document.addEventListener('keydown', teclaPresionada);
}

let acerto = false;

function teclaPresionada(event) {
  acerto = false;
  const spans_palabra = document.querySelectorAll('#palabra_a_adivinar span');

  //si la letra esta en la palabra
  let tecla = event.key.toLowerCase(); 
  for(let x=0; x < palabra_elegida.length; x++) {
    if(tecla == palabra_elegida[x]) {
      acerto = true;
      aciertos_cont++;
      spans_palabra[x].innerHTML = tecla.toUpperCase();
    }
  }

  //si la letra no esta en la palabra
  const spans_errores = document.querySelectorAll('#errores span');
  if(acerto == false && tecla.match(/^[a-z]$/) && letras_usadas.indexOf(tecla) == (-1)) {
    letras_usadas.push(tecla);
    letrasErradas.appendChild(document.createElement('span'));
    spans_errores[errores_cont].innerHTML = tecla.toUpperCase();
    console.log(letras_usadas[errores_cont] + " : " + errores_cont);
    errores_cont++;

    atril.src = "assets/img" + errores_cont + ".png";
  }

  if(errores_cont == 7) {
    document.getElementById('resultado').innerHTML = "Perdiste, la palabra era " + palabra_elegida;
    document.removeEventListener('keydown', teclaPresionada);
    reiniciar.disabled = false;
  }
  else if(aciertos_cont == palabra_elegida.length) {
    atril.src = "assets/win.png";
    document.getElementById('resultado').innerHTML = "Ganaste !";
    document.removeEventListener('keydown', teclaPresionada);
    reiniciar.disabled = false;
  }

}