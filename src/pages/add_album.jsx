import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;

const Add_album = () => {

    const [image, set_image] = useState(false);
    const [name, set_name] = useState('');
    const [desc, set_desc] = useState('');
    const [bg_color, setbg_color] = useState('#ffffff');
    const [loading, setloading] = useState(false);

    const al_submit_handler = async (e) => {
        e.preventDefault();
        const albaum_data = new FormData();
        albaum_data.append('album_img', image);
        albaum_data.append('name', name);
        albaum_data.append('desc', desc);
        albaum_data.append('bg_color', bg_color);
        try {
            setloading(true);
            const response = await axios.post(`${url}/api/album/add`, albaum_data);
            if (response.status === 200) {
                set_image(false);
                set_name('');
                set_desc('');
                setbg_color('#ffffff');
                setloading(false);
                toast.success(response.data.message);

            }
            else {
                set_image(false);
                set_name('');
                set_desc('');
                setbg_color('#ffffff');
                setloading(false);
                toast.error(`${response.data.message} : ${response.status}`);
                throw new Error('can not upload your data');
            }
        } catch (error) {
            setloading(false);
            toast.error(`${response.data.message} : ${response.status}`);
            console.error(error);
        }
    }

    return loading ? (
        <div className="min-h-[100%] w-[100%] flex justify-center items-center">
            <div className="w-[72px] h-[72px] border-solid border-black border-b-white border-[6px] rounded-full animate-spin"></div>
        </div>)
        :
        (
            <div className="flex flex-col max-w-full max-h-full p-2 md:p-6">
                <h2 className="text-lg md:text-2xl text-neutral-900">adding your new album info</h2>
                <p className="text-[14px] text-neutral-600">all field is required</p>
                <form onSubmit={al_submit_handler} className="flex flex-col p-2 gap-2 md:gap-4 md:p-6 max-h-full text-neutral-600 overflow-auto" action="">
                    <div className="flex flex-col w-full gap-2 md:gap-4">
                        <p className="text-[14px] text-neutral-600">upload your album poster</p>
                        <input onChange={(e) => set_image(e.target.files[0])} type="file" name="album_img" id="album_img" accept="image/*" hidden required />
                        <label className="w-[120px] h-[120px] cursor-pointer" htmlFor="album_img"><img className="w-[120px] h-[120px] object-cover" src={image ? URL.createObjectURL(image) : assets.upload_song} /></label>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-4 text-sm md:text-lg">
                        <div className="flex flex-col">
                            <label htmlFor="name">track name</label>
                            <input onChange={(e) => set_name(e.target.value)} value={name} className="px-[4px] border-[2px] border-solid border-neutral-400 w-full md:w-8/10 focus:outline-none" type="text" name="name" id="name" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="desc">description</label>
                            <input onChange={(e) => set_desc(e.target.value)} value={desc} className="px-[4px] border-[2px] border-solid border-neutral-400 w-full md:w-8/10 focus:outline-none" type="text" name="desc" id="desc" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="bg_color" className="text-sm md:text-lg">set your album background color</label>
                            <input onChange={(e) => setbg_color(e.target.value)} value={bg_color} className="h-[40px] w-[80px]" type="color" name="desc" id="bg_color" />
                        </div>
                    </div>
                    <button className="text-sm md:text-lg text-white bg-neutral-600 mt-4 py-1 cursor-pointer hover:bg-black">create album</button>
                </form >
            </div >
        )
}

export default Add_album;