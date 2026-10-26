const FILAS_TECLADO = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM']

function Teclado({ estados = {}, onLetra, onBorrar }) {
  return (
    <div className="teclado" aria-label="Teclado en pantalla">
      {FILAS_TECLADO.map((fila) => (
        <div className="fila-teclado" key={fila}>
          {[...fila].map((letra) => (
            <button
              key={letra}
              type="button"
              className={`tecla ${estados[letra] || ''}`}
              onClick={() => onLetra(letra)}
            >
              {letra}
            </button>
          ))}
          {fila === 'ZXCVBNM' && (
            <button
              type="button"
              className="tecla tecla-ancha"
              aria-label="Borrar letra"
              onClick={onBorrar}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Teclado
