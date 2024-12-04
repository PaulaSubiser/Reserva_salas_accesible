import NavBar from '../components/Navbar.jsx'
// import Card_reserva  from '../components/Reserva_card.jsx';
import ReservaList from '../components/ReservaList.jsx';

function Reservas() {
    return (
        <>
            <NavBar />
            <h1 style={{ margin: "2vw" }}> Consulta tus reservas </h1>
            <ReservaList /> 
        </>
    )
}
export default Reservas;