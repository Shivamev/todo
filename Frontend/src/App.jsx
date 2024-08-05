import { useNavigate } from 'react-router';
import './App.css'
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/action';



function App() {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  // setTimeout(() => {
  //   navigate("/signup")
  // }, 4000);

  return (
    <>
    <section className='container d-flex flex-column justify-content-center align-items-center' style={{height:"100vh"}}>
         
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
  <div className="wheel" />
  <div className="hamster">
    <div className="hamster__body">
      <div className="hamster__head">
        <div className="hamster__ear" />
        <div className="hamster__eye" />
        <div className="hamster__nose" />
      </div>
      <div className="hamster__limb hamster__limb--fr" />
      <div className="hamster__limb hamster__limb--fl" />
      <div className="hamster__limb hamster__limb--br" />
      <div className="hamster__limb hamster__limb--bl" />
      <div className="hamster__tail" />
    </div>
  </div>
  <div className="spoke" />
</div>
 
<button className='btn btn-outline-success my-5' onClick={()=>navigate("/todo-dashboard")}>Lets Go...

</button>
         
        
    </section>
     
    </> 
  )
}

export default App
