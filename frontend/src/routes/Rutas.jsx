import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Notices from "../screens/Notices";
import Opciones from "../screens/Opciones";


const Rutas =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat/>} />
                <Route path="/notices" element={<Notices/>} />
                <Route path="/opciones" element={<Opciones/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas;