import logo from './Argen.jpeg';
import './App.css';
import SignupForm from './SignupForm.js';
function App() {
  return (
    <div className="mainPage">
      <header className="App-header">
''        <img src={logo} className="App-logo" alt="logo" />
        <div className='mainText'>
        <p>
          Fede and Vini's 440 Project
          <SignupForm />
        </p>  
        </div>      
      </header>
          
    </div>
  );
}

export default App;
