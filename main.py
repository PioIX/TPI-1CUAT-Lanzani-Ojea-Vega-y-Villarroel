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

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/comenzar')
def irAComenzar():
  return render_template("comenzar.html", listaUsuarios = devolverUsuarios())

@app.route('/informacion')
def irAInformacion():
  return render_template("informacion.html")

@app.route('/puntajes')
def irAPuntajes():
  return render_template("puntajes.html")

@app.route('/registro')
def irARegistro():
  return render_template("registro.html", listaUsuarios = devolverUsuarios())
                                                                  
@app.route('/juego', methods=['POST'])
def irAJuego():  
  nombreUsuario = request.form['nombre']
  contraseñaUsuario = request.form['contraseña']
  añadirBaseDeDatos(nombreUsuario, contraseñaUsuario)
  return render_template("juego.html")

app.run(host='0.0.0.0', port=81)