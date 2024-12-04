import React, { useState, useEffect } from "react";
import ReservaCard from "./ReservaCard";

const ReservaList = () => {
    // Estado para las reservas
    const [reservas, setReservas] = useState([]);

    // Cargar reservas desde localStorage al montar el componente
    useEffect(() => {
        const storedReservas = JSON.parse(localStorage.getItem("reservas")) || [];
        setReservas(storedReservas);
    }, []);

    // Función para eliminar una reserva específica
    const handleEliminar = (reservaId, sesionIndex) => {
        // Crear una copia de las reservas
        const nuevasReservas = reservas.map((reserva) => ({
            ...reserva,
            sesiones: reserva.sesiones.filter((_, index) => reserva.id === reservaId ? index !== sesionIndex : true),
        })).filter(reserva => reserva.sesiones.length > 0); // Elimina reservas sin sesiones

        // Actualizar localStorage
        localStorage.setItem("reservas", JSON.stringify(nuevasReservas));

        // Actualizar estado
        setReservas(nuevasReservas);
    };

    return (
        <div>
            <h2 style={{ margin: "2vw" }}>Tus Reservas</h2>
            {reservas.length > 0 ? (
                reservas.map((reserva) =>
                    reserva.sesiones.map((sesion, index) => (
                        <ReservaCard
                            key={`${reserva.id}-${index}`}
                            centro={reserva.centro}
                            fecha={reserva.fecha.slice(0, 10)}
                            sala={sesion.key}
                            hora={sesion.time}
                            onEliminar={() => handleEliminar(reserva.id, index)} // Pasar la función al componente
                        />
                    ))
                )
            ) : (
                <p style={{ margin: "2vw" }}>No tienes reservas actualmente.</p>
            )}
        </div>
    );
};

export default ReservaList;
