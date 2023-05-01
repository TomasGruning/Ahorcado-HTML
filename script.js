let palabra_elegida;
let letras_usadas = []; 
let errores_cont = 0, aciertos_cont = 0;
let acerto = false;

const palabras = [
  'aguila',
  'ardilla',
  'armadillo',
  'avetruz',
  'ballena',
  'buho',
  'burro',
  'caballo',
  'cabra',
  'caiman',
  'calamar',
  'cangrejo',
  'castor',
  'ciervo',
  'cocodrilo',
  'condor',
  'conejo',
  'culebra',
  'delfin',
  'elefante',
  'foca',
  'gacela',
  'ganso',
  'gato',
  'gaviota',
  'gorila',
  'grulla',
  'halcon',
  'hipopotamo',
  'iguana',
  'jirafa',
  'lemur',
  'leon',
  'loro',
  'mantis',
  'mapache',
  'marmota',
  'medusa',
  'murcielago',
  'narval',
  'nutria',
  'ornitorrinco',
  'paloma',
  'pantera',
  'pavo',
  'pelicano',
  'perro',
  'pinguino',
  'puma',
  'serpiente',
  'tejon',
  'tiburon',
  'tigre',
  'tortuga',
  'trucha',
  'tucan',
  'unicornio',
  'vaca',
  'yaguarete',
  'zebra',
  'zorro'
];


const atril = document.getElementById('imagen');

//boton 'generar palabra'
const reiniciar = document.getElementById('jugar');
reiniciar.addEventListener('click', iniciar);

function iniciar(event){ 
  atril.src = 'assets/img0.png';
  reiniciar.disabled = true;
  letras_usadas = [];
  errores_cont = 0; aciertos_cont = 0;
  
  //crea los spans para los errores
  const letrasErradas = document.getElementById('errores');
  letrasErradas.innerHTML = '';
  for(let x=0; x < 7; x++) {
    letrasErradas.appendChild(document.createElement('span'));
  }
  
  const parrafo = document.getElementById('palabra_a_adivinar');
  parrafo.innerHTML = '';
  
  //elije una palabra aleatoria
  palabra_elegida = palabras[Math.floor(Math.random() * palabras.length)];
  console.log(palabra_elegida); 

  //crea lo guiones para cada letra de la palabra
  for(let x=0; x < palabra_elegida.length; x++) {
    parrafo.appendChild(document.createElement('span'));
  }
  
  document.addEventListener('keydown', teclaPresionada);
  console.log(palabras);
}



function teclaPresionada(event) {
  acerto = false;
  const spans_palabra = document.querySelectorAll('#palabra_a_adivinar span');
  const spans_errores = document.querySelectorAll('#errores span');

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
  if(acerto == false && tecla.match(/^[a-z]$/) && letras_usadas.indexOf(tecla) == -1) {
    spans_errores[errores_cont].innerHTML = tecla.toUpperCase();
    
    letras_usadas.push(tecla);
    errores_cont++;
    
    atril.src = "assets/img" + errores_cont + ".png";
  }

  if(errores_cont == 7) {
    document.removeEventListener('keydown', teclaPresionada);
    reiniciar.disabled = false;

    //muestra cual era la palabra
    for(let x=0; x < palabra_elegida.length; x++) {
      spans_palabra[x].innerHTML = palabra_elegida[x].toUpperCase();
    }
  }
  else if(aciertos_cont == palabra_elegida.length) {
    atril.src = "assets/win.png";
    document.removeEventListener('keydown', teclaPresionada);
    reiniciar.disabled = false;

  }

}