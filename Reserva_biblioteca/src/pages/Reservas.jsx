import NavBar from '../components/Navbar.jsx'
import Card_reserva  from '../components/Reserva_card.jsx';

function Reservas() {
    return (
        <>
            <NavBar />
            <h1 style={{ margin: "2vw" }}> Consulta tus reservas </h1>
            <Card_reserva centro="UPS Leganes" fecha="12/02/2024" sala="Sala 6" hora="9:00" />

        </>
    )
}
export default Reservas;