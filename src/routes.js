import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Filme from "./pages/FIlme";
import Header from "./components/Header";

export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:id" element={<Filme/>}/>
            </Routes>
        </BrowserRouter>
    )
}