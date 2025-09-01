import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { textlimit } from "../assets/utility_func";
const url = import.meta.env.VITE_ENDPOINT;
import { assets } from "../assets/assets";

const List_album = () => {
    const [data, set_data] = useState([]);

    const data_fetching = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.status === 200) {
                set_data(response.data.album_datas);
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

    const remove_al = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id: id });
            if (response.status === 200) {
                toast.success(response.data.message);
                await data_fetching();
            }
        } catch (error) {
            toast.error(`${response.data.message} : ${response.status}`);
            console.error(error);
        }
    }
    useState(() => {
        data_fetching();
    }, []);

    return (
        <div className="flex flex-col h-full w-full p-4 md:p-6">
            <div className="h-1/10 flex items-center">
                <p className="text-lg md:text-2xl">all album list</p>
            </div>
            <div className="h-9/10 ">
                <div className="h-1/10 w-[100%] flex items-center text-[20px] text-black">
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">image</p>
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">name</p>
                    <p className="text-sm w-4/14 sm:w-1/5 sm:text-lg">caption</p>
                    <p className="hidden sm:block w-1/5 text-sm sm:text-lg">theme</p>
                </div>
                <div className="h-9/10 overflow-y-auto flex flex-col gap-2">
                    {
                        data.length > 0 ?
                            <>
                                {
                                    data.map((item, idx) => {
                                        return (
                                            <div key={idx} className="w-full flex items-end text-[20px] text-black">
                                                <div className="w-4/14 sm:w-1/5">
                                                    <img className="size-[60px] sm:[70px] md:size-[80px] object-cover" src={item.image} />
                                                </div>
                                                <p className="text-[14px] w-4/14 sm:w-1/5 sm:text-[20px] md:text-lg h-fit">{textlimit(item.name, 16)}</p>
                                                <p className="pl-1 text-[14px] w-4/14 sm:w-1/5 sm:text-[20px] md:text-lg h-fit">{textlimit(item.desc, 16)}</p>
                                                <div className="hidden sm:block w-1/5 h-fit p-2" >
                                                    <div className="size-8" style={{ backgroundColor: item.bg_color }}></div>
                                                </div>
                                                <div className="flex justify-center pl-2">
                                                    <img className="size-6 sm:size-8 cursor-pointer" onClick={() => remove_al(item._id)} src={assets.remove} />
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

export default List_album;

{/* <div className="sticky top-0 min-w-[100%] grid grid-cols-5 text-[20px] text-white bg-neutral-700 p-[8px] gap-[24px]">
    <p>image</p>
    <p>name</p>
    <p>description</p>
    <p>background</p>
    <p>action</p>
</div> */}

{/* <div key={idx} className="min-w-[100%] grid grid-cols-5 h-[80px] text-[20px] text-black gap-[24px] mt-[8px]">
    <img className="w-[80px] h-[80px] object-cover" src={item.image} />
    <p className="text-[20px] h-fit self-center">{item.name}</p>
    <p className="text-[20px] h-fit self-center">{`${item.desc.slice(0, 20)}...`}</p>
    <div className="self-center w-[80px] h-[40px]" style={{ backgroundColor: item.bg_color }}></div>
    <p onClick={() => remove_al(item._id)} className="text-[18px] text-white h-fit w-fit px-[8px] self-center cursor-pointer bg-red-500 rounded-[5px] hover:bg-red-400">X</p>
</div> */}