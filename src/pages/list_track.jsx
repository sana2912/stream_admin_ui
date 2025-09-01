import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { textlimit } from "../assets/utility_func";
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
        <div className="flex flex-col h-full w-full p-4 md:p-6">
            <div className="h-1/10 flex items-center">
                <p className="text-lg md:text-2xl">all song list</p>
            </div>
            <div className="h-9/10 ">
                <div className="h-1/10 w-[100%] flex items-center text-[20px] text-black">
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">image</p>
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">name</p>
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">album</p>
                    <p className="hidden sm:block w-1/5 text-sm sm:text-lg">duration</p>
                </div>
                <div className="h-9/10 overflow-y-auto flex flex-col gap-2">
                    {
                        data.length > 0 ?
                            <>
                                {
                                    data.map((item, idx) => {
                                        return (
                                            <div key={idx} className="w-[100%] flex items-end text-[20px] text-black">
                                                <div className="w-4/14 sm:w-1/5">
                                                    <img className="size-[60px] sm:[70px] md:size-[80px] object-cover" src={item.image} />
                                                </div>
                                                <p className="text-[14px] w-4/14 sm:w-1/5 sm:text-[20px] md:text-lg h-fit">{textlimit(item.name, 16)}</p>
                                                <p className="pl-1 text-[14px] w-4/14 sm:w-1/5 sm:text-[20px] md:text-lg h-fit">{textlimit(item.album, 16)}</p>
                                                <p className="hidden sm:block w-1/5 sm:text-[20px] md:text-lg h-fit">{item.duration}</p>
                                                <div className="flex justify-center pl-2">
                                                    <img className="size-6 sm:size-8 cursor-pointer" onClick={() => remove_track(item._id)} src={assets.remove} />
                                                </div>
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
        </div>
    )
}
export default List_track;