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
import NavBar from "./component/navbar";
function App() {
  const notify = () => toast(<Data />);
  return (
    <div className="flex h-screen items-start">
      <ToastContainer limit={3} position="bottom-center" />
      <Sidbar />
      <div className="flex-1 flex-col h-screen overflow-auto bg-white">
        <NavBar />
        <div className="flex-1 h-[85%]">
          <Routes>
            <Route path="/add-track" element={<Add_track />} />
            <Route path="/add-album" element={<Add_album />} />
            <Route path="/list-track" element={<List_track />} />
            <Route path="/list-album" element={<List_album />} />
          </Routes>
        </div>
      </div>
    </div >
  );
}

export default App
