import NavBar from '../components/Navbar.jsx'
import ScheduleSelector from '../components/ScheduleSelector.jsx'


function Home2(){
    return (
        <>
        <NavBar></NavBar>
        <h1 style={{margin:"1vw"}}>  HOME: Selecciona sala y hora </h1>
        <ScheduleSelector />
        </>
    )
}
export default Home2;