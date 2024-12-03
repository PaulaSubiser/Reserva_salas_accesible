import React, { useRef, useEffect, memo} from 'react';
import styles from '../css/Cell.module.css'; // Importa el archivo CSS como un módulo

const Cell = memo(({ time, status, onClick, onFocus, onKeyDown, isSelected, isHovered, isFocused }) => {
  const cellRef = useRef(null);

  useEffect(() => {
    if (isFocused && cellRef.current) {
      // Enfocar la celda automáticamente si está marcada como "focused"
      cellRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e) => {
    // Ejecutar `onClick` al presionar Enter
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevenir scrolling al presionar la barra espaciadora
      onClick(time);
    }
    // Pasar el evento a `onKeyDown` si existe
    if (onKeyDown) {
      onKeyDown(e, time);
    }
  };

  // Construcción de clases CSS dinámicas
  const cellClasses = [
    styles.cellwrapper,
    isSelected && styles.selected,
    isHovered && styles.hovered,
    isFocused && styles.focused,
    status === 'No disponible' && styles.disabled, // Aplicar estilo "disabled" si corresponde
  ]
    .filter(Boolean) // Filtrar valores nulos o falsos
    .join(' '); // Combinar en una sola cadena

    return (
      <div
        ref={cellRef} // Referencia para manejar el foco
        className={cellClasses} // Aplicar las clases dinámicas
        role="gridcell" // Rol de accesibilidad
        aria-selected={isSelected} // Indicar si está seleccionada
        tabIndex={0} // Todas las celdas son accesibles con Tab
        onClick={() => onClick(time)} // Llamar al manejador de clic
        onFocus={() => onFocus(time)} // Manejar el foco
        onKeyDown={handleKeyDown} // Manejar las teclas
        aria-label={`Celda de ${time}`} // Etiqueta para lectores de pantalla
      >
        {status && <span className={styles.statusText}>{status}</span>} {/* Renderizar el estado */}
      </div>
    );    
});

export default Cell;
