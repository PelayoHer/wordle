function Casilla({
  fila,
  columna,
  letra,
  estado = '',
  activa,
  onCambio,
  onTecla,
}) {
  const etiquetaAria = `Fila ${fila}, columna ${columna}${
    letra ? `: ${letra}` : ''
  }${estado ? `, ${estado}` : ''}`

  return (
    <input
      aria-label={etiquetaAria}
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={onTecla}
    />
  )
}

export default Casilla

