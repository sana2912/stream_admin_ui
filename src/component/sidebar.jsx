import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidbar = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-60 bg-neutral-700 text-white">
            <img className="h-10 w-35 self-center mt-8" src={assets.logo} alt="spotify-logo" />

            <div className="flex flex-col gap-8 mt-8 w-[80%] self-end">
                <NavLink to={'/add-track'} className="h-10 w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-10 h-10 p-2" src={assets.add_song} />
                </NavLink>
                <NavLink to={'/list-track'} className="h-10 w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-10 h-10 p-2" src={assets.song_icon} />
                </NavLink>
                <NavLink to={'/add-album'} className="h-10 w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-10 h-10 p-2" src={assets.add_album} />
                </NavLink>
                <NavLink to={'/list-album'} className="h-10 w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-10 h-10 p-2" src={assets.album_icon} />
                </NavLink>
            </div>
        </div>
    )
}

export default Sidbar;