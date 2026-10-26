export const FILAS = 6
export const COLUMNAS = 5

// Crea un tablero vacío: 6 filas de 5 letras en blanco
export function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

// Calcula los colores de la fila completa en dos pasadas
export function calcularEstadosFila(fila, solucion) {
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

// Calcula el mejor estado de cada letra para el teclado en pantalla
export function calcularEstadosLetras(intentos, filaActual, solucion) {
  const estados = {}
  for (let f = 0; f < filaActual; f++) {
    const fila = intentos[f]
    const estadosFila = calcularEstadosFila(fila, solucion)
    for (let c = 0; c < COLUMNAS; c++) {
      const letra = fila[c]
      const actual = estados[letra]
      const nuevo = estadosFila[c]

      if (nuevo === 'correcta') {
        estados[letra] = 'correcta'
      } else if (nuevo === 'presente' && actual !== 'correcta') {
        estados[letra] = 'presente'
      } else if (!actual) {
        estados[letra] = nuevo
      }
    }
  }
  return estados
}

// Decide el color de una letra individual o dentro de una fila
export function estadoDe(letra, columna, solucion, fila = null) {
  if (fila) {
    return calcularEstadosFila(fila, solucion)[columna]
  }
  if (solucion[columna] === letra) return 'correcta'
  if (solucion.includes(letra)) return 'presente'
  return 'ausente'
}
