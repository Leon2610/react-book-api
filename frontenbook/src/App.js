import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import the components
import ShowBooks from './components/ShowBooks';
import CreateBooks from './components/CreateBooks';
import EditBooks from './components/EditBooks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowBooks/>}></Route>
          <Route path='/create' element={ <CreateBooks/>}></Route>
          <Route path='/edit/:id' element={ <EditBooks/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
