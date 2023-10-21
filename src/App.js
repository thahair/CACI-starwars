import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
    <Header/>
    <Home/>
    {/* <Router>
      <Routes>
        <Route path="/" Component={Home}/>
      </Routes>
    </Router> */}
    </div>
  );
}

export default App;
