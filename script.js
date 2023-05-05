let palabra_elegida;
let letras_usadas = []; 
let errores_cont = 0, aciertos_cont = 0;
let acerto = false;
let palabras = []; 

async function logJSONData(comp) {
  const response = await fetch("palabras/" + comp.id + ".json");
  return await response.json();
}

logJSONData().then((response) => {
  palabras = response;  console.log(palabras);
  const atril = document.getElementById('imagen');

  //boton 'Generar Palabra'
  const reiniciar = document.getElementById('jugar');

  //inicia y reinicia el juego si se presiona enter o el boton 'Generar Palabra'
  iniciar(); reiniciar.addEventListener('click', iniciar); 

  function iniciar(event){ 
    //evita que se pueda generar otra palabra hasta que termine el juego
    reiniciar.disabled = true;
    document.removeEventListener('keydown', iniciar);

    //reinicia las variables
    atril.src = 'assets/img0.png';
    letras_usadas = [];
    errores_cont = 0; aciertos_cont = 0;
  
    const parrafo = document.getElementById('palabra_a_adivinar');
    parrafo.innerHTML = '';
  
    //crea los spans para los errores
    const letrasErradas = document.getElementById('errores');
    letrasErradas.innerHTML = '';
    for(let x=0; x < 7; x++) {
      letrasErradas.appendChild(document.createElement('span'));
    }
  
   //elije una palabra aleatoria
   palabra_elegida = palabras[Math.floor(Math.random() * palabras.length)];

   //crea lo guiones para cada letra de la palabra
    for(let x=0; x < palabra_elegida.length; x++) {
      parrafo.appendChild(document.createElement('span'));
    }
  
    document.addEventListener('keydown', teclaPresionada);
  }


  function teclaPresionada(event) {
    acerto = false;
    const spans_palabra = document.querySelectorAll('#palabra_a_adivinar span');
    const spans_errores = document.querySelectorAll('#errores span');

    //si la letra esta en la palabra
    let tecla = event.key.toLowerCase(); 
    for(let x=0; x < palabra_elegida.length; x++) {
      if(tecla == palabra_elegida[x] || tecla == palabra_elegida[x].toLowerCase()) {
        acerto = true;
        aciertos_cont++;
        spans_palabra[x].innerHTML = tecla.toUpperCase();
      }
    }

    //si la letra no esta en la palabra
    if(acerto == false && tecla.match(/^[a-z]$/) && letras_usadas.indexOf(tecla) == -1) {
      spans_errores[errores_cont].innerHTML = tecla.toUpperCase();
    
      letras_usadas.push(tecla);
      errores_cont++;
    
      atril.src = "assets/img" + errores_cont + ".png";
    }

    if(errores_cont == 7) {
    
      //muestra cual era la palabra
      for(let x=0; x < palabra_elegida.length; x++) {
        spans_palabra[x].innerHTML = palabra_elegida[x].toUpperCase();
      }
      habilitarVolverJugar();
    }
    else if(aciertos_cont == palabra_elegida.length) {
      atril.src = "assets/win.png";
      habilitarVolverJugar();
    }

  }

  function habilitarVolverJugar() {
    document.removeEventListener('keydown', teclaPresionada);
    document.addEventListener('keydown', iniciar);
    reiniciar.disabled = false;
  }
})