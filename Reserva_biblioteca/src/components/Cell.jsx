import React, { useRef, useEffect } from 'react';
import styles from '../css/Cell.module.css'; // Importa el archivo CSS como un módulo

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
  const cellClasses = `
    ${styles['cellwrapper']} 
    ${isSelected ? styles.selected : ''} 
    ${isHovered ? styles.hovered : ''} 
    ${isFocused ? styles.focused : ''}
  `;

  return (
    <div
      ref={cellRef}  // Referencia para el enfoque manual
      className={cellClasses.trim()}  // Usamos las clases CSS
      tabIndex={0}  // Hacerla accesible con tab
      onClick={() => onClick(time)}
      onFocus={() => onFocus(time)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Cell;
