from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

def añadirBaseDeDatos(nom, con):
  conn = sqlite3.connect('baseDeDatos.db')
  q = f"""SELECT id FROM Personas WHERE nombre = '{nom}' AND contraseña = '{con}'"""
  resu = conn.execute(q)
  if resu.fetchone():
    pass
  else:
    q = f"""INSERT INTO Personas (nombre, contraseña, puntaje) VALUES ('{nom}', '{con}', 0)"""
    conn.execute(q)
    conn.commit()
  conn.close()

def devolverUsuarios():
  conn = sqlite3.connect('baseDeDatos.db')
  q = f"""SELECT nombre, contraseña FROM Personas"""
  resu = conn.execute(q)
  listaUsuarios = {}
  for linea in resu:
    listaUsuarios[linea[0]] = linea[1]
  conn.close()
  return listaUsuarios

def obtenerPreguntasYRespuestas():
  conn = sqlite3.connect('baseDeDatos.db')
  q = f"""SELECT id, pregunta FROM Preguntas"""
  r = f"""SELECT id, correctaIncorrecta, respuesta, preguntaCorrespondiente FROM Respuestas"""
  preg = conn.execute(q)
  resp = conn.execute(r)
  listaPreguntas = {}
  listaRespuestas = {}
  for linea in preg:
    listaPreguntas[linea[0]] = linea[1]
  for linea in resp:
    listaRespuestas[linea[0]] = [linea[1], linea[2], linea[3]]
  conn.close()
  return [listaPreguntas, listaRespuestas]

def obtenerPuntajeAnteriorDeJugador(situacion, nombre, puntaje):
  #Actualizar puntaje
  if situacion == "nuevo":
    conn = sqlite3.connect('baseDeDatos.db')
    q = f"""SELECT nombre, puntaje FROM Personas WHERE nombre = '{nombre}'"""
    resu = conn.execute(q)
    lista = []
    for linea in resu:
      lista.append(linea)
    conn.close()
    if int(puntaje) > int(lista[0][1]):
      nuevoPuntaje = int(puntaje)
      conn = sqlite3.connect('baseDeDatos.db')
      q = f"""UPDATE Personas SET puntaje = {nuevoPuntaje} WHERE nombre = '{nombre}'"""
      conn.execute(q)
      conn.commit()
      conn.close()

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/comenzar')
def irAComenzar():
  return render_template("comenzar.html", listaUsuarios = devolverUsuarios())

@app.route('/informacion')
def irAInformacion():
  return render_template("informacion.html")

@app.route('/puntajes/<situacion>/<nombre>/<puntaje>')
def irAPuntajes(situacion, nombre, puntaje):
  #Actualizar lista
  obtenerPuntajeAnteriorDeJugador(situacion, nombre, puntaje)
  #Obtener 10 mejores
  conn = sqlite3.connect('baseDeDatos.db')
  q = f"""SELECT * FROM Personas ORDER BY puntaje DESC"""
  resu = conn.execute(q)
  listaPersonas = []
  for linea in resu:
    listaPersonas.append(linea)
  conn.close()
  cantidadPersonas = len(listaPersonas)
  return render_template("puntajes.html", listaPersonas = listaPersonas, cantidadPersonas = cantidadPersonas)

@app.route('/registro')
def irARegistro():
  return render_template("registro.html", listaUsuarios = devolverUsuarios())
                                                                  
@app.route('/juego', methods=['POST'])
def irAJuego():
  nombreUsuario = request.form['nombre']
  contraseñaUsuario = request.form['contraseña']
  añadirBaseDeDatos(nombreUsuario, contraseñaUsuario)
  return render_template("juego.html", nombreUsuario = [nombreUsuario], preguntasRespuestas = obtenerPreguntasYRespuestas())
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=81)