import "./App.css"
// import Dashbord from "./components/dashbord";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Details from "./components/Details";
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/> } ></Route>
        <Route path="/Customer/:customer_id" element={<Details/>} ></Route>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
