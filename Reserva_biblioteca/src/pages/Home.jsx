import NavBar from '../components/Navbar.jsx'
import HomeForm from '../components/HomeForm.jsx'


function Home(){
    return (
        <>
        <NavBar></NavBar>
        <h1 style={{margin:"1vw"}}> HOME: Realiza una reserva </h1>
        <HomeForm />
        </>
    )
}
export default Home;