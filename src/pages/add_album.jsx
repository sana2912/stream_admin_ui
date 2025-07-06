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
            <div>
                <h2 className="text-[32px] text-neutral-900 mt-[24px] mx-[24px]">adding your new album info</h2>
                <p className="text-[16px] text-neutral-600 px-[24px] mt-[20px]">all field is required</p>
                <form onSubmit={al_submit_handler} className="flex flex-col items-start bg-white" action="">
                    <div className="flex flex-col m-[24px] gap-[8px]">
                        <p htmlFor="name">upload your album poster</p>
                        <input onChange={(e) => set_image(e.target.files[0])} type="file" name="album_img" id="album_img" accept="image/*" hidden required />
                        <label className="w-[120px] h-[120px] cursor-pointer" htmlFor="album_img"><img className="w-[120px] h-[120px] object-cover" src={image ? URL.createObjectURL(image) : assets.upload_song} /></label>
                    </div>
                    <div className="flex flex-col m-[26px] gap-[20px]">
                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="name">track name</label>
                            <input onChange={(e) => set_name(e.target.value)} value={name} className="p-[4px] border-[2px] border-solid border-neutral-500 w-[600px] focus:outline-[2px] focus:outline-black" type="text" name="name" id="name" required />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="desc">description</label>
                            <input onChange={(e) => set_desc(e.target.value)} value={desc} className="p-[4px] border-[2px] border-solid border-neutral-500 w-[600px] focus:outline-[2px] focus:outline-black" type="text" name="desc" id="desc" required />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="bg_color">set your album background color</label>
                            <input onChange={(e) => setbg_color(e.target.value)} value={bg_color} className="h-[40px] w-[80px]" type="color" name="desc" id="bg_color" />
                        </div>
                    </div>
                    <button className="text-[20px] text-white bg-neutral-600 px-[40px] py-[4px] mx-[24px] cursor-pointer hover:bg-black">create album</button>
                </form >
            </div >
        )
}

export default Add_album;