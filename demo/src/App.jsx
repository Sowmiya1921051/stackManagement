import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Data from './components/Data';
import Nav from './components/Nav';
function App() {
  return (
    <div>
        <Nav/>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Data/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App