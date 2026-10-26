import { describe, expect, test } from 'vitest'
import {
  calcularEstadosFila,
  calcularEstadosLetras,
  estadoDe,
  tableroVacio,
} from './juego.js'

describe('estadoDe', () => {
  test('letra en su sitio', () => {
    expect(estadoDe('P', 0, 'PERRO')).toBe('correcta')
  })

  test('letra en otra posición', () => {
    expect(estadoDe('O', 0, 'PERRO')).toBe('presente')
  })

  test('letra que no está en la solución', () => {
    expect(estadoDe('X', 0, 'PERRO')).toBe('ausente')
  })
})

describe('calcularEstadosFila con letras repetidas (algoritmo en dos pasadas)', () => {
  test('intento RRRRR frente a PERRO marca en gris la primera, segunda y última erre', () => {
    const intento = ['R', 'R', 'R', 'R', 'R']
    const estados = calcularEstadosFila(intento, 'PERRO')
    expect(estados).toEqual([
      'ausente',
      'ausente',
      'correcta',
      'correcta',
      'ausente',
    ])
  })

  test('palabra con acierto total', () => {
    const intento = ['P', 'E', 'R', 'R', 'O']
    const estados = calcularEstadosFila(intento, 'PERRO')
    expect(estados).toEqual([
      'correcta',
      'correcta',
      'correcta',
      'correcta',
      'correcta',
    ])
  })

  test('palabra con letras desordenadas y no repetidas de más', () => {
    const intento = ['O', 'R', 'E', 'J', 'A']
    const estados = calcularEstadosFila(intento, 'PERRO')
    expect(estados).toEqual([
      'presente',
      'presente',
      'presente',
      'ausente',
      'ausente',
    ])
  })
})

describe('calcularEstadosLetras para el teclado', () => {
  test('acumula estados priorizando correcta sobre presente', () => {
    const intentos = [
      ['R', 'O', 'T', 'O', 'R'],
      ['P', 'E', 'R', 'R', 'O'],
    ]
    const estadosLetras = calcularEstadosLetras(intentos, 2, 'PERRO')
    expect(estadosLetras['P']).toBe('correcta')
    expect(estadosLetras['E']).toBe('correcta')
    expect(estadosLetras['R']).toBe('correcta')
    expect(estadosLetras['O']).toBe('correcta')
    expect(estadosLetras['T']).toBe('ausente')
  })
})

describe('tableroVacio', () => {
  test('inicializa 6 filas de 5 cadenas vacías', () => {
    const tablero = tableroVacio()
    expect(tablero).toHaveLength(6)
    tablero.forEach((fila) => {
      expect(fila).toHaveLength(5)
      expect(fila.every((celda) => celda === '')).toBe(true)
    })
  })
})
