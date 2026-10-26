export const PALABRAS = [
  'PERRO',
  'GATOS',
  'PLAYA',
  'LIBRO',
  'BARCO',
  'VERDE',
  'SOLAR',
  'CAMPO',
  'MONTE',
  'PLAZA',
  'FUEGO',
  'AGUAS',
  'CIELO',
  'NORTE',
  'BRAVO',
  'DULCE',
  'TIGRE',
  'RATON',
  'FLORA',
  'LUCES',
  'MANGO',
  'PIANO',
  'RADIO',
  'RELOJ',
  'SILLA',
  'MANDO',
  'TABLA',
  'TORRE',
  'VALLE',
  'ZORRO',
]

export function obtenerPalabraAleatoria() {
  const indice = Math.floor(Math.random() * PALABRAS.length)
  return PALABRAS[indice]
}
