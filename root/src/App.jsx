import { ToastContainer } from "react-toastify"
import Login from "./screen/login/login"
import Register from "./screen/sigin_up/sign_up"
import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import ProfileEdit from "./screen/profile/profile"
import { ProtectedRoute } from "./utils/protected_routes"
import IntroScreen from "./screen/intro/intro"



function App() {

  return (
    <>
     <ToastContainer />
          
     <Router>
       <Routes>
        <Route element={<Login/>} path="/login"/>
        <Route element={<IntroScreen/>} path="/"/>
        <Route element={<Register/>} path="/register"/>
         <Route element = {<ProtectedRoute/>}>
         <Route element={<ProfileEdit/>} path="/profile"/>
         </Route>
       </Routes>
     </Router>
    </>
  )
}

export default App
