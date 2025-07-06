import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";

const url = import.meta.env.VITE_ENDPOINT;
const Add_track = () => {
    const [image, setimage] = useState(false);
    const [audio, setaudio] = useState(false);
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [album, setalbum] = useState(null);
    const [loading, setloading] = useState(false);
    const [albumData, setalbumData] = useState([]);
    console.log(url);
    const onsubmit_handler = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const form_data = new FormData();
            form_data.append('name', name);
            form_data.append('desc', desc);
            form_data.append('image', image);
            form_data.append('audio', audio);
            form_data.append('album', album);
            const response = await axios.post(`${url}/api/track/add`, (form_data));
            if (response.status === 200) {
                setname('');
                setdesc('');
                setimage(false);
                setaudio(false);
                setalbum(null);
                setloading(false);
                toast.success(response.data.message);
            }
            else {
                setloading(false);
                toast.error(`${response.data.message} : ${response.status}`);
                throw new Error('can not upload your data');
            }

        } catch (err) {
            setloading(false);
            toast.error(`${response.data.message} : ${response.status}`);
            console.error(err);
        }
    }

    const load_album_option = async () => {
        try {
            setloading(true);
            const response = await axios.get(`${url}/api/album/list`);
            if (response.status === 200) {
                setalbumData(response.data.album_datas);
                setloading(false);
            }
        } catch (error) {
            toast.error(`${response.data.message} : ${response.status}`);
            setalbumData([]);
            setloading(false)
            console.log(err);
        }
    }
    useEffect(() => {
        load_album_option();
    }, [])
    return loading ? (
        <div className="min-h-[100%] w-[100%] flex justify-center items-center">
            <div className="w-[72px] h-[72px] border-solid border-black border-b-white border-[6px] rounded-full animate-spin"></div>
        </div>
    )
        : (
            <div>
                <h2 className="text-[32px] text-neutral-900 mt-[24px] mx-[24px]">adding your new track info</h2>
                <p className="text-[16px] text-neutral-600 px-[24px] mt-[20px]">all field is required</p>
                <form onSubmit={onsubmit_handler} className="flex flex-col items-start bg-white" action="">
                    <div className="flex gap-[32px] m-[24px]">
                        <div className="flex flex-col gap-[32px]">
                            <input onChange={(e) => setimage(e.target.files[0])} type="file" name="image" id="image" accept="image/*" hidden required />
                            < label className="w-[120px] h-[120px] cursor-pointer" htmlFor="image" > <img className="w-[120px] h-[120px] object-cover" src={image ? URL.createObjectURL(image) : assets.upload_song} /></label >
                        </div >
                        <div className="flex flex-col gap-[32px]">
                            <input onChange={(e) => setaudio(e.target.files[0])} type="file" name="audio" id="audio" accept="audio/*" hidden required />
                            <label className="w-[120px] h-[120px] cursor-pointer" htmlFor="audio"><img className="w-[120px] h-[120px] object-cover" src={audio ? assets.upload_added : assets.upload_area} /></label>
                        </div>
                    </div >
                    <div className="flex flex-col m-[24px] gap-[20px]">
                        <div className="flex flex-col gap-[4px]">
                            <label htmlFor="name">track name</label>
                            <input onChange={(e) => setname(e.target.value)} value={name} className="p-[4px] border-[2px] border-solid border-neutral-500 w-[600px] focus:outline-[2px] focus:outline-black" type="text" name="name" id="name" required />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label htmlFor="desc">description</label>
                            <input onChange={(e) => setdesc(e.target.value)} value={desc} className="p-[4px] border-[2px] border-solid border-neutral-500 w-[600px] focus:outline-[2px] focus:outline-black" type="text" name="desc" id="desc" required />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[8px] mx-[24px]">
                        <label htmlFor="album">select your album</label>
                        <select onChange={(e) => setalbum(e.target.value)} defaultValue={album} className="bg-transparent p-[4px] outline-1 outline-neutral-500 text-base align-middle" name="album" id="album">
                            <option value="none">None</option>
                            {albumData.map((item, idx) => {
                                return (
                                    <option key={idx} value={item.name}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button className="text-[20px] text-white bg-neutral-600 px-[20px] py-[4px] mx-[24px] my-[32px] cursor-pointer hover:bg-black">create track</button>
                </form >
            </div >
        )
}

export default Add_track;