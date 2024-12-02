import React, { useState } from 'react';
import styles from '../css/ScheduleSelector.module.css'; // Importa el archivo CSS
import Cell from './Cell'; // Componente Cell actualizado

const ScheduleSelector = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [focusedTime, setFocusedTime] = useState(null);

  const handleCellClick = (time) => {
    // Alternar el estado de selección
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleKeyDown = (e, currentTime) => {
    const times = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`); // Horas de 9 a 21
    const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']; // Salas

    // Separar sala y hora de `currentTime`
    const [room, time] = currentTime.split('-');
    const timeIndex = times.indexOf(time);
    const roomIndex = rooms.indexOf(room);

    let newFocusedTime = currentTime;

    // Navegación mediante teclado
    switch (e.key) {
      case 'ArrowUp':
        if (timeIndex > 0) {
          newFocusedTime = `${rooms[roomIndex]}-${times[timeIndex - 1]}`;
        }
        break;
      case 'ArrowDown':
        if (timeIndex < times.length - 1) {
          newFocusedTime = `${rooms[roomIndex]}-${times[timeIndex + 1]}`;
        }
        break;
      case 'ArrowLeft':
        if (roomIndex > 0) {
          newFocusedTime = `${rooms[roomIndex - 1]}-${time}`;
        }
        break;
      case 'ArrowRight':
        if (roomIndex < rooms.length - 1) {
          newFocusedTime = `${rooms[roomIndex + 1]}-${time}`;
        }
        break;
      default:
        return;
    }

    e.preventDefault(); // Prevenir el comportamiento por defecto del navegador
    setFocusedTime(newFocusedTime); // Actualizar el estado de foco
  };

  const times = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`); // Horas de 9 a 21
  const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']; // Salas

  return (
    <div className={styles.wrapper}>
      {/* Encabezado con las salas */}
      <div className={styles.timelabel}></div> {/* Espacio vacío en la esquina superior izquierda */}
      {rooms.map((room, roomIndex) => (
        <div className={styles.daylabel} key={roomIndex}>
          {room}
        </div>
      ))}

      {/* Horas y celdas */}
      {times.map((time) => (
        <React.Fragment key={time}>
          <div className={styles.timelabel}>{time}</div> {/* Etiqueta de la hora */}
          {rooms.map((room) => {
            const currentTime = `${room}-${time}`;
            const isSelected = selectedTimes.includes(currentTime);
            const isFocused = focusedTime === currentTime;
            

            return (
              <Cell
                key={currentTime}
                time={currentTime}
                onClick={handleCellClick}
                onFocus={() => setFocusedTime(currentTime)}
                onKeyDown={handleKeyDown}
                isSelected={isSelected}
                isFocused={isFocused}
                status={'Disponible'}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScheduleSelector;
