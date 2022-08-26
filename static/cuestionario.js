function obtenerDatosCuestionario(preguntas, respuestas, nombreUsuario){
  juegoTerminado = 0;
  numeroPregunta = 1;
  preguntasCuestionario = preguntas;
  respuestasCuestionario = respuestas;
  nombreUsuarioActual = nombreUsuario[0];
  actualizarDatosCuestionario(numeroPregunta);
  
  /* Contador */
  tiempo = 300 // 5 minutos, 300 segundos
  function temporizador() {
    if (tiempo > 0 && juegoTerminado == 0) {
      tiempo --;
      document.getElementById("temporizador").innerHTML = `<p>Tiempo Restante:<br>${tiempo}</p>`;
    } 
    else {
      terminarJuego(tiempo);
    }
  }
  setInterval(temporizador, 1000)

}

function establecerOrdenRespuestas(preguntaActual){
  preguntasDisponibles = [];
  for (let i = 1; i < Object.keys(respuestasCuestionario).length; i ++){
    if (respuestasCuestionario[i][2] == preguntaActual){
      preguntasDisponibles.push(respuestasCuestionario[i][1]);
    }
  }
  preguntasDisponibles.sort(() => Math.random() - 0.5);
  return preguntasDisponibles;
}

htmlBotonesBase = `
  <button id="botonOpcionUno" class="btn btn-secondary" type="submit" onclick="verificarRespuestaBotones(0)"></button>
  <button id="botonOpcionDos" class="btn btn-secondary" type="submit" onclick="verificarRespuestaBotones(1)"></button>
  <button id="botonOpcionTres" class="btn btn-secondary" type="submit" onclick="verificarRespuestaBotones(2)"></button>
  <button id="botonOpcionCuatro" class="btn btn-secondary" type="submit" onclick="verificarRespuestaBotones(3)"></button>
`;

htmlEscribirBase = `
  <input id="inputRespuesta" class="input is-large" type="text" style="width:300px;" placeholder="Escribí acá la palabra faltante" autofocus="" required>
  <br>
  <input type="button" value="Responder" onclick="verificarRespuestaInputsImagenes()">
`;

function actualizarDatosCuestionario(preguntaActual){
  switch (preguntaActual){
    case 1:
    case 4:
    case 7:
    case 10:
    case 13:
      document.getElementById("sectionBotones").innerHTML = htmlBotonesBase;
      document.getElementById("numeroPregunta").innerHTML = `Pregunta N°${preguntaActual}`;
      document.getElementById("pregunta").innerHTML = preguntasCuestionario[preguntaActual];
      document.getElementById("espacioImagenes").innerHTML = "";
      preguntasOrdenadas = establecerOrdenRespuestas(preguntaActual);
      document.getElementById("botonOpcionUno").innerHTML = preguntasOrdenadas[0];
      document.getElementById("botonOpcionDos").innerHTML = preguntasOrdenadas[1];
      document.getElementById("botonOpcionTres").innerHTML = preguntasOrdenadas[2];
      document.getElementById("botonOpcionCuatro").innerHTML = preguntasOrdenadas[3];
      break;
    case 2:
    case 5:
    case 8:
    case 11:
    case 14:
      document.getElementById("sectionBotones").innerHTML = htmlEscribirBase;
      document.getElementById("numeroPregunta").innerHTML = `Pregunta N°${preguntaActual}`;
      document.getElementById("pregunta").innerHTML = preguntasCuestionario[preguntaActual];
      document.getElementById("espacioImagenes").innerHTML = "";
      break;
    case 3:
    case 6:
    case 9:
    case 12:
    case 15:
      document.getElementById("sectionBotones").innerHTML = htmlEscribirBase;
      document.getElementById("numeroPregunta").innerHTML = `Pregunta N°${preguntaActual}`;
      document.getElementById("pregunta").innerHTML = preguntasCuestionario[preguntaActual];
      document.getElementById("espacioImagenes").innerHTML = `
        <br>
        <img src="static/img/cuatroFotosUnaPalabra/${preguntaActual}.jpg">
      `;
      break;
    case 16:
      juegoTerminado = 1;
      document.getElementById("espacioImagenes").innerHTML = "";
      terminarJuego(tiempo);
      break;
  }
  switch (preguntaActual){
    case 1:
      document.body.style.backgroundImage = `https://www.agoraes.com.br/images/noticias/10196/e7d6fcb26640249fc1fe755ffaac0bd0.jpeg')`;
      break;
    case 2:
      document.body.style.backgroundImage = `url('https://solunion.com/wp-content/uploads/2021/09/ODS-1.jpg.webp')`;
      break;
    case 3:
      document.body.style.backgroundImage = `url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Redsquare.png/600px-Redsquare.png')`;
      break;
    case 4:
      document.body.style.backgroundImage = `url('https://d500.epimg.net/cincodias/imagenes/2019/10/30/companias/1572463796_636886_1572464256_sumario_normal.jpg')`;
      break;
    case 5:
      document.body.style.backgroundImage = `url('https://i0.wp.com/adnoticias.mx/wp-content/uploads/2022/01/uaemex-investigaciones-1-1.jpeg?fit=1200%2C628&ssl=1')`;
      break;
    case 6:
      document.body.style.backgroundImage = `url('https://cdn.webshopapp.com/shops/66605/files/264151307/oracal-631-verde-amarillento-estera.jpg')`;
      break;
    case 7:
      document.body.style.backgroundImage = `url('https://www.elagoradiario.com/wp-content/uploads/2020/03/Foto12-1140x600.jpg')`;
      break;
    case 8:
      document.body.style.backgroundImage = `url('https://www.ahora.com.pe/wp-content/uploads/2019/05/20180505-drinkingwater.jpg')`;
      break;
    case 9:
      document.body.style.backgroundImage = `url('https://engie-energia.pe/wp-content/uploads/2022/05/Rectangulo-Celeste-Degradado-e1617119688275.png')`;
      break;
    case 10:
      document.body.style.backgroundImage = `url('https://globalenergy.mx/wp-content/uploads/2018/12/energias-renovables-mejores-b-655x368.jpg')`;
      break;
    case 11:
      document.body.style.backgroundImage = `url('https://ecoinnovar.es/wp-content/uploads/electricidad-768x512.jpg')`;
      break;
    case 12:
      document.body.style.backgroundImage = `url('https://cdn.webshopapp.com/shops/66605/files/264154061/oracal-651-amarillo.jpg')`;
      break;
    case 13:
      document.body.style.backgroundImage = `url('https://www.esan.edu.pe/images/blog/2016/10/28/xtrabajadoresprincipal.jpg.pagespeed.ic.KWf7eUEZFT.webp')`;
      break;
    case 14:
      document.body.style.backgroundImage = `url('https://cdn.diferenciador.com/imagenes/diferencia-entre-amistad-y-companerismo-og.jpg')`;
      break;
    case 15:
      document.body.style.backgroundImage = `url('https://lumen.com.mx/Content/Images/productPics/cartulina-astrobrights-de-176-g-58x89-cm-marca-neenah-sku-225713002.jpg')`;
      break;
  }
}

function redirigirAPuntajes(){
  window.location.href=`https://tpi-1cuat-lanzani-ojea-vega-y-villarroel.catalinavega6.repl.co/puntajes/nuevo/${nombreUsuarioActual}/${tiempo}`
}

function terminarJuego(){
  document.getElementById("numeroPregunta").outerHTML = `<h1>¡FIN DEL JUEGO!</h1>`;
  if (tiempo > 0){
    document.getElementById("pregunta").outerHTML = `<h3>Conseguiste terminar el juego en ${300-tiempo} segundos</h3>`;
  }
  else{
    document.getElementById("pregunta").outerHTML = `<h3>Te quedaste sin tiempo</h3>`;
  }
  document.getElementById("espacioImagenes").innerHTML = "";
  document.getElementById("sectionBotones").innerHTML = `<input type="button" value="Ver puntajes" onclick="redirigirAPuntajes()">`;
}

function restarDiezSegundos(){
  tiempo -= 10;
}

function verificarRespuestaBotones(numeroDeBoton){
  numeroDeBoton == 0 ? idDeBoton = "botonOpcionUno" : numeroDeBoton == 1 ? idDeBoton = "botonOpcionDos" : numeroDeBoton == 2 ? idDeBoton = "botonOpcionTres" : idDeBoton = "botonOpcionCuatro";
  preguntaVerificar = document.getElementById(idDeBoton).innerHTML;
  for (let i = 1; i < Object.keys(respuestasCuestionario).length; i ++){
    if (respuestasCuestionario[i][2] == numeroPregunta){
      if (respuestasCuestionario[i][1] == preguntaVerificar){
        if (respuestasCuestionario[i][0] == "correcta"){
          numeroPregunta += 1;
          actualizarDatosCuestionario(numeroPregunta);
        }
        else{
          document.getElementById(idDeBoton).outerHTML = "";
          restarDiezSegundos();
        }
      }
    }
  }
}

function verificarRespuestaInputsImagenes(){
  preguntaVerificar = document.getElementById("inputRespuesta").value;
  for (let i = 1; i < Object.keys(respuestasCuestionario).length + 1; i ++){
    if (respuestasCuestionario[i][2] == numeroPregunta){
      if (respuestasCuestionario[i][1] == preguntaVerificar){
        numeroPregunta += 1;
        actualizarDatosCuestionario(numeroPregunta);
      }
      else{
        document.getElementById("inputRespuesta").value = "";
      }
    }
  }
}