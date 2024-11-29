import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-links">
            <Link to="/Home" className="nav-link">Home</Link>
            <Link to="/Reservas" className="nav-link">Reservas</Link>
            <Link to="/" className="nav-link">Cerrar sesión</Link>
        </div>
    </nav>
}

export default NavBar