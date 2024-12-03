import React, { useState, useEffect } from 'react';
import styles from '../css/ScheduleSelector.module.css'; // Importa el archivo CSS
import Cell from './Cell'; // Componente Cell actualizado
import { useNavigate } from "react-router-dom";
import "../css/Button.css";

const ScheduleSelector = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [focusedTime, setFocusedTime] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]); // Estado para celdas no disponibles
  const navigate = useNavigate();

  // Obtener la lista de diccionarios de localStorage y filtrar por fecha y centro
  useEffect(() => {
    let storedSchedules = JSON.parse(localStorage.getItem('reservas')) || [];
    const ultimaSeleccion = storedSchedules.pop();
    if (!ultimaSeleccion) {
      console.warn("No se encontró ninguna selección activa.");
      return;
    }
    const { fecha, centro } = ultimaSeleccion;
  
    const unavailable = storedSchedules
      .filter(schedule => schedule.fecha.slice(0, 10) === fecha.slice(0, 10) && schedule.centro === centro)
      .flatMap(schedule => schedule.sesiones)
      .map(sesion => `${sesion.key}-${sesion.time}`);
  
    setUnavailableTimes(unavailable);
  }, []);

  const handleCellClick = (time) => {
    if (unavailableTimes.includes(time)) {
      return;
    }
  
    setSelectedTimes((prev) => {
      const updatedTimes = prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time];
  
      const [newRoom, newTime] = time.split('-');
      const selectedTimesOnly = updatedTimes.map((t) => t.split('-')[1]);
  
      if (selectedTimesOnly.filter((t) => t === newTime).length > 1) {
        console.warn('No se puede seleccionar más de una celda en el mismo horario:', newTime);
        return prev;
      }
  
      if (updatedTimes.length > 2) {
        console.warn('Solo puedes tener 2 celdas seleccionadas.');
        return prev;
      }
  
      return updatedTimes;
    });
  };

  const handleClickVolver = () => {
    let storedSchedules = JSON.parse(localStorage.getItem('reservas')) || [];
    storedSchedules.pop();
    localStorage.setItem("reservas", JSON.stringify(storedSchedules));
    navigate("/Home");
  };
  
  const handleClickAceptar = () => {
    let storedSchedules = JSON.parse(localStorage.getItem('reservas')) || [];
    let seleccion = storedSchedules.pop();
  
    if (selectedTimes.length > 0) {
      const sesiones = selectedTimes.map((time) => {
        const [key, horario] = time.split('-');
        return { key, time: horario };
      });
  
      const nuevaReserva = {
        id: seleccion.id,
        fecha: seleccion.fecha,
        centro: seleccion.centro,
        sesiones,
      };
  
      storedSchedules.push(nuevaReserva);
      localStorage.setItem('reservas', JSON.stringify(storedSchedules));
      alert('Reserva guardada exitosamente');
      navigate('/Reservas');
    } else {
      alert('Debes seleccionar al menos una celda antes de confirmar.');
    }
  };

  const handleKeyDown = (e, currentTime) => {
    const times = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`); // Horas de 9 a 21
    const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']; // Salas
  
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
    <div role='row'>
      <div className="button-container">
      <button className="ak-button ak-button-default" onClick={handleClickVolver}>Volver</button>
      <button className="ak-button ak-button-default" onClick={handleClickAceptar}>Aceptar</button>
      </div>
      <div className={styles.wrapper} id="schedule" role='grid'>
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
              const isUnavailable = unavailableTimes.includes(currentTime);

              return (
                <Cell
                  key={currentTime}
                  time={currentTime}
                  onClick={handleCellClick}
                  onFocus={() => setFocusedTime(currentTime)}
                  onKeyDown={(e) => handleKeyDown(e, currentTime)}
                  isSelected={isSelected}
                  isFocused={isFocused}
                  status={isUnavailable ? 'No disponible' : 'Disponible'}
                  tabIndex={isUnavailable ? -1 : 0} // Añadir tabIndex para que solo se pueda tabular por celdas disponibles
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSelector;

