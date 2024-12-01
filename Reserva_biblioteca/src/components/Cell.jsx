import React, { useRef, useEffect } from 'react';
import '../css/Cell.css'; // Importa el archivo CSS

const Cell = ({ time, onClick, onFocus, onKeyDown, isSelected, isHovered, isFocused }) => {
  const cellRef = useRef(null);

  useEffect(() => {
    if (isFocused && cellRef.current) {
      // Si la celda está enfocada, enfocarla manualmente
      cellRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e) => {
    // Si se presiona Enter, ejecutamos el onClick
    if (e.key === 'Enter') {
      onClick(time);
    }
    // Manejo de otras teclas
    if (onKeyDown) {
      onKeyDown(e, time);
    }
  };

  // Construir las clases dinámicas
  let cellClasses = 'cell-wrapper';
  if (isSelected) cellClasses += ' selected';
  if (isHovered) cellClasses += ' hovered';
  if (isFocused) cellClasses += ' focused';

  return (
    <div
      ref={cellRef}  // Referencia para el enfoque manual
      className={cellClasses}  // Usamos las clases CSS
      tabIndex={0}  // Hacerla accesible con tab
      onClick={() => onClick(time)}
      onFocus={() => onFocus(time)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Cell;
