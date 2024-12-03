import NavBar from '../components/Navbar.jsx'
import ScheduleSelector from '../components/ScheduleSelector.jsx'


function Home2(){
    return (
        <>
        <NavBar></NavBar>
        <h1> Selecciona sala y hora </h1>
        <ScheduleSelector />
        </>
    )
}
export default Home2;