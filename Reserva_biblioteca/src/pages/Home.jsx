import NavBar from '../components/Navbar.jsx'
import HomeForm from '../components/HomeForm.jsx'
import ScheduleSelector from '../components/ScheduleSelector.jsx'


function Home(){
    return (
        <>
        <NavBar></NavBar>
        <h1> Realiza una reserva </h1>
        <HomeForm />
        <ScheduleSelector/>
        </>
    )
}
export default Home;