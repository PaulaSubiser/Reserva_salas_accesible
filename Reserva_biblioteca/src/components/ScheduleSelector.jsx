import React, { useState, useEffect } from 'react';
import styles from '../css/ScheduleSelector.module.css'; // Importa el archivo CSS
import Cell from './Cell'; // Componente Cell actualizado

const ScheduleSelector = ({ fecha, centro }) => {  // Recibir fecha y centro como props
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [focusedTime, setFocusedTime] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]); // Estado para celdas no disponibles

  // Obtener la lista de diccionarios de localStorage y filtrar por fecha y centro
  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem('reservas')) || [];
    const unavailable = storedSchedules
      .filter(schedule => schedule.fecha === fecha && schedule.centro === centro) // Filtramos por fecha y centro
      .map(schedule => `${schedule.key}-${schedule.time}`); // Obtenemos la combinación key-time
    
    console.log(unavailable);
   setUnavailableTimes(unavailable);  // Guardamos las celdas no disponibles
  }, [fecha, centro]);  // Dependencias para actualizar cuando cambian fecha o centro

  const handleCellClick = (time) => {
    // Verificar si la celda está en la lista de no disponibles
    if (unavailableTimes.includes(time)) {
      return; // No hacer nada si la celda está no disponible
    }

    // Alternar el estado de selección solo si está disponible
    setSelectedTimes((prev) => {
      const updatedTimes = prev.includes(time)
        ? prev.filter((t) => t !== time) // Si ya está seleccionada, eliminarla
        : [...prev, time]; // Si no está seleccionada, añadirla

      // Log para ver el estado de selectedTimes después de cada cambio
      console.log('Selected Times Updated:', updatedTimes);
      return updatedTimes; // Devolver el nuevo estado
    });
  };

  useEffect(() => {
    console.log('Selected Times Changed:', selectedTimes);
  }, [selectedTimes]); // Se ejecuta cada vez que selectedTimes cambia
  

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

            // Determinar si la celda está no disponible
            const isUnavailable = unavailableTimes.includes(currentTime);

            return (
              <Cell
                key={currentTime}
                time={currentTime}
                onClick={handleCellClick}
                onFocus={() => setFocusedTime(currentTime)}
                onKeyDown={handleKeyDown}
                isSelected={isSelected}
                isFocused={isFocused}
                status={isUnavailable ? 'No disponible' : 'Disponible'} // Cambiar el estado según disponibilidad
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScheduleSelector;
