import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import DashBoard from "./pages/Home/DashBoard";
import EditResume from "./pages/ResumeUpdate/EditResume";


export default function App() {
  return (
    <>
    <div>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route  path="/" element={<LandingPage/>}/>

          <Route  path="/login" element={<Login/>}/>
          <Route  path="/signUp" element={<SignUp/>}/>
          <Route  path="/dashboard" element={<DashBoard/>}/>
          <Route  path="/resume/:resumeId" element={<EditResume/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster toastOptions={{
      className:"",
      style:{
        fontSize: "13px",
      },
    }}/>
    </>
  )
}
