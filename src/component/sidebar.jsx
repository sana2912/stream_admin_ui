import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidbar = () => {
    return (
        <div className="flex h-full w-full gap-2 md:gap-6 px-4 md:px-8 bg-neutral-900 text-white">
            <p className="self-center text-[30px] md:text-[42px]">admin</p>
            <div className="flex gap-4 md:gap-6 self-center">
                <NavLink to={'/'} className="flex justify-center items-center size-[36px] md:size-[50px] rounded-full bg-white hover:bg-pink-100">
                    <img className="size-[60%] hover:size-[65%]" src={assets.add_song} />
                </NavLink>
                <NavLink to={'/list-track'} className="flex justify-center items-center size-[36px] md:size-[50px] rounded-full bg-white hover:bg-pink-100">
                    <img className="size-[60%] hover:size-[65%]" src={assets.song_icon} />
                </NavLink>
                <NavLink to={'/add-album'} className="flex justify-center items-center size-[36px] md:size-[50px] rounded-full bg-white hover:bg-pink-100">
                    <img className="size-[60%] hover:size-[65%]" src={assets.add_album} />
                </NavLink>
                <NavLink to={'/list-album'} className="flex justify-center items-center size-[36px] md:size-[50px] rounded-full bg-white hover:bg-pink-100">
                    <img className="size-[60%] hover:size-[65%]" src={assets.album_icon} />
                </NavLink>
            </div>
        </div>
    )
}

export default Sidbar;