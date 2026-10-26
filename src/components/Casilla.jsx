const DESCRIPCIONES_ESTADO = {
  correcta: 'letra correcta',
  presente: 'letra en otra posición',
  ausente: 'letra que no está',
}

function Casilla({
  fila,
  columna,
  letra,
  estado = '',
  activa,
  onCambio,
}) {
  function manejarTecla(evento) {
    if (evento.key === 'Backspace' && letra === '') {
      evento.preventDefault()
      evento.target.previousElementSibling?.focus()
    }
  }

  let etiqueta = `Fila ${fila + 1}, columna ${columna + 1}`
  if (letra) etiqueta += `: ${letra}`
  if (estado && DESCRIPCIONES_ESTADO[estado]) {
    etiqueta += `, ${DESCRIPCIONES_ESTADO[estado]}`
  }

  return (
    <input
      aria-label={etiqueta}
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={manejarTecla}
      onFocus={(evento) => evento.target.select()}
    />
  )
}

export default Casilla
