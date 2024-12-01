import React, { useState } from 'react';
import '../css/ScheduleSelector.css';  // Importa el archivo CSS
import Cell from './Cell'; // Componente de celda

const ScheduleSelector = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [focusedTime, setFocusedTime] = useState(null);

  const handleCellClick = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleCellFocus = (time) => {
    setFocusedTime(time);
  };

  const handleCellHover = (time) => {
    setHoveredTime(time);
  };

  const handleKeyDown = (e, currentTime) => {
    const times = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`); // Horas de 9 a 21
    const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']; // Las salas

    // Desglosamos el `currentTime` en sala y hora
    const [room, time] = currentTime.split('-');
    const timeIndex = times.indexOf(time); // Índice de la hora
    const roomIndex = rooms.indexOf(room); // Índice de la sala

    let newFocusedTime = currentTime;

    switch (e.key) {
      case 'ArrowUp':
        if (timeIndex > 0) {
          // Subir una fila (hora anterior)
          newFocusedTime = `${rooms[roomIndex]}-${times[timeIndex - 1]}`;
        }
        break;
      case 'ArrowDown':
        if (timeIndex < times.length - 1) {
          // Bajar una fila (hora siguiente)
          newFocusedTime = `${rooms[roomIndex]}-${times[timeIndex + 1]}`;
        }
        break;
      case 'ArrowLeft':
        if (roomIndex > 0) {
          // Mover a la izquierda (sala anterior)
          newFocusedTime = `${rooms[roomIndex - 1]}-${time}`;
        }
        break;
      case 'ArrowRight':
        if (roomIndex < rooms.length - 1) {
          // Mover a la derecha (sala siguiente)
          newFocusedTime = `${rooms[roomIndex + 1]}-${time}`;
        }
        break;
      default:
        return;
    }

    // Evitar que el navegador haga un scroll accidental
    e.preventDefault();

    // Actualizar el `focusedTime` con el nuevo valor calculado
    setFocusedTime(newFocusedTime);
  };

  // Crear una lista de horas y salas
  const times = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`); // Horas de 9 a 21
  const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']; // Salas

  return (
    <div className="wrapper">
      {/* Encabezado de la Tabla con las Salas */}
      <div className="time-label"></div> {/* Celda vacía en la esquina superior izquierda */}
      {rooms.map((room, roomIndex) => (
        <div className="day-label" key={roomIndex}>{room}</div>
      ))}

      {/* Filas de las Horas */}
      {times.map((time, timeIndex) => (
        <React.Fragment key={timeIndex}>
          <div className="time-label">{time}</div> {/* Hora en la primera columna */}
          {rooms.map((room, roomIndex) => {
            const currentTime = `${room}-${time}`;
            const isSelected = selectedTimes.includes(currentTime);
            const isFocused = focusedTime === currentTime;
            const isHovered = hoveredTime === currentTime;

            return (
              <Cell
                key={currentTime}
                time={currentTime}
                onClick={handleCellClick}
                onFocus={() => handleCellFocus(currentTime)}
                onKeyDown={handleKeyDown}  // Aquí pasamos la función para manejar las teclas
                isSelected={isSelected}
                isHovered={isHovered}
                isFocused={isFocused}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScheduleSelector;
