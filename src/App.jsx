import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'
import { obtenerPalabraAleatoria } from './palabras.js'

const FILAS = 6
const COLUMNAS = 5

// Crea un tablero vacío: 6 filas de 5 letras en blanco
function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

// Calcula los colores de la fila completa en dos pasadas
function calcularEstadosFila(fila, solucion) {
  const estados = Array(COLUMNAS).fill('')
  const frecuencias = {}

  for (const letra of solucion) {
    frecuencias[letra] = (frecuencias[letra] || 0) + 1
  }

  // Primera pasada: letras que están en su sitio
  for (let c = 0; c < COLUMNAS; c++) {
    if (fila[c] === solucion[c]) {
      estados[c] = 'correcta'
      frecuencias[fila[c]]--
    }
  }

  // Segunda pasada: letras restantes (presentes o ausentes)
  for (let c = 0; c < COLUMNAS; c++) {
    if (estados[c] === 'correcta') continue
    const letra = fila[c]
    if (frecuencias[letra] > 0) {
      estados[c] = 'presente'
      frecuencias[letra]--
    } else {
      estados[c] = 'ausente'
    }
  }

  return estados
}

// Decide el color de una letra individual (útil para pruebas unitarias)
function estadoDe(letra, columna, solucion, fila = null) {
  if (fila) {
    return calcularEstadosFila(fila, solucion)[columna]
  }
  if (solucion[columna] === letra) return 'correcta'
  if (solucion.includes(letra)) return 'presente'
  return 'ausente'
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(obtenerPalabraAleatoria)
  const [aviso, setAviso] = useState('')

  // El último intento comprobado, como texto: 'PERRO'
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS

  useEffect(() => {
    // Lleva el cursor a la primera casilla en la que se puede escribir
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()
    // Solo aceptamos una letra, o nada si se ha borrado
    if (!/^[A-ZÑ]?$/.test(letra)) return

    if (aviso) setAviso('')

    // Copiamos el tablero, cambiamos la copia y la guardamos
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)

    // Después de escribir una letra, pasamos a la casilla siguiente
    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function manejarTecla(evento) {
    if (evento.key === 'Backspace' && evento.target.value === '') {
      evento.target.previousElementSibling?.focus()
    }
  }

  function comprobar(evento) {
    // Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault()
    if (terminada) return
    // No se puede comprobar una fila incompleta
    if (intentos[filaActual].includes('')) {
      setAviso('Faltan letras')
      return
    }

    setAviso('')
    setFilaActual(filaActual + 1)
  }

  function nuevaPartida() {
    setIntentos(tableroVacio())
    setFilaActual(0)
    setSolucion(obtenerPalabraAleatoria())
    setAviso('')
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                fila={f + 1}
                columna={c + 1}
                letra={letra}
                estado={f < filaActual ? estadoDe(letra, c, solucion, fila) : ''}
                activa={f === filaActual && !terminada}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
                onTecla={manejarTecla}
              />
            ))}
          </div>
        ))}
      </div>
      {aviso && (
        <p className="aviso" role="alert">
          {aviso}
        </p>
      )}
      {terminada ? (
        <>
          <p className="mensaje" role="status">
            {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${solucion}`}
          </p>
          <button className="boton" type="button" onClick={nuevaPartida}>
            Nueva partida
          </button>
        </>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
    </form>
  )
}

export default App
