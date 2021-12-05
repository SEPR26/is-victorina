import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './components/home/Home';
import {LeadersBoards} from './components/leaderBoards/LeadersBoards';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/records" element={<LeadersBoards/>}/>
            </Routes>
        </div>
    );
}

export default App;
