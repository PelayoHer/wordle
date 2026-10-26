const FILAS_TECLADO = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BORRAR'],
]

function Teclado({ estadosLetras = {}, onPulsar }) {
  return (
    <div className="teclado" aria-label="Teclado virtual">
      {FILAS_TECLADO.map((fila, f) => (
        <div className="teclado-fila" key={f}>
          {fila.map((tecla) => (
            <button
              key={tecla}
              type="button"
              className={`tecla ${estadosLetras[tecla] || ''}`}
              onClick={() => onPulsar(tecla)}
            >
              {tecla}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Teclado
