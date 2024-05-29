import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Data from './components/Data';
import Nav from './components/Nav';
import ViewItems from './components/ViewItems';
function App() {
  return (
    <div>
        <Nav/>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Data/>}/>
            <Route path='viewItems' element={<ViewItems/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App