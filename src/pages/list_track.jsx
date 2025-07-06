import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;
const List_track = () => {
    const [data, set_data] = useState([]);

    const data_fetching = async () => {
        try {
            const response = await axios.get(`${url}/api/track/list`);
            if (response.status === 200) {
                set_data(response.data.track_data);
            }
            else {
                toast.error(`${response.data.message} : ${response.status}`);
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error(`${response.data.message} : ${response.status}`);
            console.error(error)
        }
    }

    useEffect(() => {
        data_fetching();
    }, [])

    const remove_track = async (id) => {
        try {
            const response = await axios.post(`${url}/api/track/remove`, { id: id });
            if (response.status === 200) {
                toast.success(response.data.message);
                await data_fetching();
            }
        } catch (error) {
            toast.error(`${response.data.message} : ${response.status}`);
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col m-[32px] h-full overflow-auto">
            <p className="text-[40px] font-semibold">all song list</p>
            <br />
            <div className="sticky top-0 min-w-[100%] grid grid-cols-5 text-[20px] text-white bg-neutral-700 p-[8px] gap-6">
                <p>image</p>
                <p>name</p>
                <p>album</p>
                <p>duration</p>
                <p>action</p>
            </div>
            <div className="flex-1 flex-col gap-[16px] mt-[24px]">
                {
                    data.length > 0 ?
                        <>
                            {
                                data.map((item, idx) => {
                                    return (
                                        <div key={idx} className="min-w-[100%] grid grid-cols-5 h-[80x] text-[20px] text-black gap-[24px] mt-[8px]">
                                            <img className="w-[80px] h-[80px] object-cover" src={item.image} />
                                            <p className="text-[20px] h-fit self-center">{item.name}</p>
                                            <p className="text-[20px] h-fit self-center">{item.album}</p>
                                            <p className="text-[20px] h-fit self-center">{item.duration}</p>
                                            <p onClick={() => remove_track(item._id)} className="text-[18px] text-white h-fit w-fit px-[8px] self-center cursor-pointer bg-red-500 rounded-[5px] hover:bg-red-400">X</p>
                                        </div>
                                    )
                                })
                            }
                        </>
                        : <div className="w-[100%] h-[100%] m-auto flex justify-center items-center">
                            <div className="h-[72px] w-[72px] border-[6px] border-black border-l-white rounded-full animate-spin"></div>
                        </div>
                }
            </div>
        </div>
    )
}
export default List_track;