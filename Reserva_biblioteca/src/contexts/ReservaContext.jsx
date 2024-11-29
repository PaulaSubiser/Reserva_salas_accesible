import {createContext, useState, useContext, useEffect} from "react"

const ReservaContext = createContext()

export const useReservaContext = () => useContext(ReservaContext)

export const ReservaProvider = ({children}) => {
    const [reservas, setReservas] = useState([])

    useEffect(() => {
        const storedReservas = localStorage.getItem("reservas")

        if (storedReservas) setReservas(JSON.parse(storedReservas))
    }, [])

    useEffect(() => {
        localStorage.setItem('reservas', JSON.stringify(reservas))
    }, [reservas])

    const addToReservas = (reserva) => {
        setFavorites(prev => [...prev, reserva])
    }

    const removeFromReservas = (reservaId) => {
        setFavorites(prev => prev.filter(reserva => reserva.id !== reservaId))
    }
    
    const isReserva = (reservaId) => {
        return reservas.some(reserva => reserva.id === reservaId)
    }

    const value = {
        reservas,
        addToReservas,
        removeFromReservas,
        isReserva
    }

    return <ReservaContext.Provider value={value}>
        {children}
    </ReservaContext.Provider>
}