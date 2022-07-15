function confirmarCuentaRepetida(lista){
  nom = document.getElementById("nombreElegido").value;
  con = document.getElementById("contraseñaElegida").value;
  usuarioEncontrado = 0;
  for (let i = 0; i < Object.keys(lista).length; i ++){
    if (Object.keys(lista)[i] === nom){
      usuarioEncontrado = 1;
    }
  }
  if (usuarioEncontrado == 1){
    alert(`El nombre "${nom}" ya fue tomado por otro usuario :(`)
  }
  else{
    document.getElementById("formRegistro").submit();
  }
}

function validar(lista){
  nom = document.getElementById("nom").value;
  con = document.getElementById("con").value;
  usuarioEncontrado = 0;
  for (let i = 0; i < Object.keys(lista).length; i ++){
    if (Object.keys(lista)[i] === nom && Object.values(lista)[i] === con){
      usuarioEncontrado = 1;
      document.getElementById("formIniciarSesion").submit();
    }
  }
  if (usuarioEncontrado == 0){
    alert("El usuario o contraseña ingresados son incorrectos");
  }
}