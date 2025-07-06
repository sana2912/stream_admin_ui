import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidbar = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-[240px] bg-neutral-700 text-white">
            <img className="h-[40px] w-[140px] self-center mt-[32px]" src={assets.logo} alt="spotify-logo" />

            <div className="flex flex-col gap-[32px] mt-[32px] w-[80%] self-end">
                <NavLink to={'/add-track'} className="h-[40px] w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-[40px] h-[40px] p-[8px]" src={assets.add_song} />
                </NavLink>
                <NavLink to={'/list-track'} className="h-[40px] w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-[40px] h-[40px] p-[8px]" src={assets.song_icon} />
                </NavLink>
                <NavLink to={'/add-album'} className="h-[40px] w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-[40px] h-[40px] p-[8px]" src={assets.add_album} />
                </NavLink>
                <NavLink to={'/list-album'} className="h-[40px] w-[100%] bg-white shadow-[-6px_6px_0px_-1px_rgba(0,_0,_0,_0.8)]">
                    <img className="w-[40px] h-[40px] p-[8px]" src={assets.album_icon} />
                </NavLink>
            </div>
        </div>
    )
}

export default Sidbar;