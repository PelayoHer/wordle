export const FILAS = 6
export const COLUMNAS = 5

// Diccionario de palabras de cinco letras en mayúsculas y sin tildes
export const PALABRAS = [
  'PERRO',
  'GATOS',
  'PLATO',
  'RELOJ',
  'MONTE',
  'LIBRO',
  'CAMPO',
  'NUBES',
  'FRESA',
  'PIANO',
  'TIGRE',
  'VERDE',
  'PLAYA',
  'CARTA',
  'MUNDO',
  'BARCO',
  'SOLAR',
  'PLAZA',
  'FUEGO',
  'AGUAS',
]

// Crea un tablero inicial vacío con 6 filas de 5 cadenas vacías
export function tableroVacio() {
  return Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(''))
}

// Elige una palabra al azar asegurando que no se repita con la actual
export function palabraAlAzar(anterior = '') {
  const disponibles = anterior
    ? PALABRAS.filter((palabra) => palabra !== anterior)
    : PALABRAS
  const indice = Math.floor(Math.random() * disponibles.length)
  return disponibles[indice]
}

// Comprueba una letra individual (útil para pruebas unitarias)
export function estadoDe(letra, columna, solucion) {
  if (solucion[columna] === letra) return 'correcta'
  if (solucion.includes(letra)) return 'presente'
  return 'ausente'
}

// Evalúa una fila completa en dos pasadas respetando frecuencias de letras repetidas
export function estadosDeFila(fila, solucion) {
  const estados = Array(fila.length).fill('ausente')
  const disponibles = {}

  // 1ª pasada: aciertos en posición exacta (verde / 'correcta')
  for (let c = 0; c < fila.length; c++) {
    if (fila[c] === solucion[c]) {
      estados[c] = 'correcta'
    } else {
      const letraSol = solucion[c]
      disponibles[letraSol] = (disponibles[letraSol] || 0) + 1
    }
  }

  // 2ª pasada: letras en otra posición (amarillo / 'presente')
  for (let c = 0; c < fila.length; c++) {
    if (estados[c] === 'correcta') continue
    const letra = fila[c]
    if (disponibles[letra] > 0) {
      estados[c] = 'presente'
      disponibles[letra]--
    }
  }

  return estados
}

// Determina el mejor estado conocido de cada letra para colorear el teclado
export function estadosDelTeclado(intentos, filasComprobadas, solucion) {
  const PRIORIDAD = { ausente: 1, presente: 2, correcta: 3 }
  const resultado = {}

  for (let f = 0; f < filasComprobadas; f++) {
    const fila = intentos[f]
    const estados = estadosDeFila(fila, solucion)

    fila.forEach((letra, c) => {
      if (!letra) return
      const previo = resultado[letra]
      const nuevo = estados[c]
      if (!previo || PRIORIDAD[nuevo] > PRIORIDAD[previo]) {
        resultado[letra] = nuevo
      }
    })
  }

  return resultado
}
