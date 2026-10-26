function Casilla({ letra, estado = '', activa, onCambio, onTecla }) {
  return (
    <input
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
