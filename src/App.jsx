import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'
import Teclado from './components/Teclado.jsx'
import {
  COLUMNAS,
  FILAS,
  calcularEstadosLetras,
  estadoDe,
  tableroVacio,
} from './juego.js'
import { obtenerPalabraAleatoria } from './palabras.js'

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(obtenerPalabraAleatoria)
  const [aviso, setAviso] = useState('')

  // El último intento comprobado, como texto: 'PERRO'
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS
  const estadosLetras = calcularEstadosLetras(intentos, filaActual, solucion)

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

  function pulsarTeclaVirtual(tecla) {
    if (terminada) return

    if (tecla === 'ENVIAR') {
      if (intentos[filaActual].includes('')) {
        setAviso('Faltan letras')
        return
      }
      setAviso('')
      setFilaActual(filaActual + 1)
      return
    }

    if (tecla === 'BORRAR') {
      if (aviso) setAviso('')
      let ultimoLleno = -1
      for (let c = COLUMNAS - 1; c >= 0; c--) {
        if (intentos[filaActual][c] !== '') {
          ultimoLleno = c
          break
        }
      }
      if (ultimoLleno !== -1) {
        const copia = intentos.map((fila) => [...fila])
        copia[filaActual][ultimoLleno] = ''
        setIntentos(copia)
      }
      return
    }

    if (aviso) setAviso('')
    const primerVacio = intentos[filaActual].findIndex((letra) => letra === '')
    if (primerVacio !== -1) {
      const copia = intentos.map((fila) => [...fila])
      copia[filaActual][primerVacio] = tecla
      setIntentos(copia)
    }
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
      <Teclado estadosLetras={estadosLetras} onPulsar={pulsarTeclaVirtual} />
    </form>
  )
}

export default App
