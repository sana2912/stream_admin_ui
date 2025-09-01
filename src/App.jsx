import React from "react"
import { ToastContainer, toast } from "react-toastify";
// use react toatify to styling your notification in your app
// learn more at : https://deadsimplechat.com/blog/react-toastify-the-complete-guide/
import { Routes, Route } from "react-router-dom";
import Add_track from "./pages/add_track";
import Add_album from "./pages/add_album";
import List_track from "./pages/list_track";
import List_album from "./pages/list_album";
import Sidbar from "./component/sidebar";
function App() {
  const notify = () => toast(<Data />);
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-1/10 w-full">
        <Sidbar />
      </div>
      <div className="h-9/10 w-full">
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Add_track />} />
            <Route path="/add-album" element={<Add_album />} />
            <Route path="/list-track" element={<List_track />} />
            <Route path="/list-album" element={<List_album />} />
          </Routes>
        </div>
      </div>
      <ToastContainer limit={3} position="bottom-center" />
    </div >
  );
}

export default App

{/* 
  <div className="flex-1 flex-col h-screen overflow-auto bg-white">
        
      </div> */}