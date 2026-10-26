import { describe, expect, test } from 'vitest'
import {
  COLUMNAS,
  FILAS,
  PALABRAS,
  estadoDe,
  estadosDeFila,
  estadosDelTeclado,
  palabraAlAzar,
  tableroVacio,
} from './juego.js'

describe('estadoDe (comprobación unitaria de letra)', () => {
  test('letra en su sitio devuelve correcta', () => {
    expect(estadoDe('P', 0, 'PERRO')).toBe('correcta')
  })

  test('letra en otra posición devuelve presente', () => {
    expect(estadoDe('O', 0, 'PERRO')).toBe('presente')
  })

  test('letra que no está en la solución devuelve ausente', () => {
    expect(estadoDe('Z', 0, 'PERRO')).toBe('ausente')
  })
})

describe('estadosDeFila (algoritmo en dos pasadas con repetidas)', () => {
  test('fila completamente acertada devuelve todas correctas', () => {
    expect(estadosDeFila([...'PERRO'], 'PERRO')).toEqual(
      Array(5).fill('correcta'),
    )
  })

  test('intento RRRRR con PERRO deja en gris la primera, segunda y última erre', () => {
    expect(estadosDeFila([...'RRRRR'], 'PERRO')).toEqual([
      'ausente',
      'ausente',
      'correcta',
      'correcta',
      'ausente',
    ])
  })

  test('letra repetida en otra posición: OOXXX con PERRO', () => {
    expect(estadosDeFila([...'OOXXX'], 'PERRO')).toEqual([
      'presente',
      'ausente',
      'ausente',
      'ausente',
      'ausente',
    ])
  })

  test('intento mixto sin repeticiones extra', () => {
    expect(estadosDeFila([...'PLATO'], 'PERRO')).toEqual([
      'correcta',
      'ausente',
      'ausente',
      'ausente',
      'correcta',
    ])
  })
})

describe('estadosDelTeclado (prioridades de color para teclas)', () => {
  test('el teclado conserva el mejor estado alcanzado de cada letra', () => {
    const intentos = [[...'RRRRR'], [...'PLATO']]
    const teclado = estadosDelTeclado(intentos, 2, 'PERRO')

    expect(teclado.R).toBe('correcta')
    expect(teclado.P).toBe('correcta')
    expect(teclado.O).toBe('correcta')
    expect(teclado.L).toBe('ausente')
    expect(teclado.A).toBe('ausente')
    expect(teclado.T).toBe('ausente')
  })
})

describe('tableroVacio y palabraAlAzar', () => {
  test('el tablero vacío tiene las dimensiones correctas de 6x5', () => {
    const tablero = tableroVacio()
    expect(tablero).toHaveLength(FILAS)
    expect(tablero.every((fila) => fila.length === COLUMNAS && fila.every((c) => c === ''))).toBe(true)
  })

  test('la palabra al azar pertenece a la lista y es distinta de la anterior', () => {
    const palabra = palabraAlAzar('PERRO')
    expect(PALABRAS).toContain(palabra)
    expect(palabra).not.toBe('PERRO')
  })
})
