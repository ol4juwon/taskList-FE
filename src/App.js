
import socketIO from 'socket.io-client';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Tasks from './components/Tasks';
var option = {
  reconnect: false,
  'try multiple transports': false,
  trabsports: ['websocket']
}
const socket = socketIO.connect('http://localhost:5454', option);
function App() {
  useEffect(()=>{
   
  })
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/" element={ <Home socket={socket} />}/>
      <Route path="/tasks" element={<Tasks socket={socket} />} />
    </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
