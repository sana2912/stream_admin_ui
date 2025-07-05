import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;

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
        <div className="flex flex-col m-8 h-[100%]">
            <p className="text-4xl font-semibold">all song list</p>
            <br />
            <div className="min-w-[100%] grid grid-cols-5 text-2xl text-white bg-neutral-700 p-2 gap-6">
                <p>image</p>
                <p>name</p>
                <p>description</p>
                <p>background</p>
                <p>action</p>
            </div>
            <div className="flex-1 flex-col gap-4 mt-6">
                {
                    data.length > 0 ?
                        <>
                            {
                                data.map((item, idx) => {
                                    return (
                                        <div key={idx} className="min-w-[100%] grid grid-cols-5 h-20 text-2xl text-black gap-6 mt-2">
                                            <img className="w-20 h-20 object-cover" src={item.image} />
                                            <p className="text-2xl h-fit self-center">{item.name}</p>
                                            <p className="text-2xl h-fit self-center">{`${item.desc.slice(0, 20)}...`}</p>
                                            <div className="self-center w-20 h-10" style={{ backgroundColor: item.bg_color }}></div>
                                            <p onClick={() => remove_al(item._id)} className="text-2xl text-white h-fit w-fit px-2 self-center cursor-pointer bg-red-500 rounded-[5px] hover:bg-red-400">X</p>
                                        </div>
                                    )
                                })
                            }
                        </>
                        : <div className="w-[100%] h-[100%] m-auto flex justify-center items-center">
                            <div className="h-18 w-18 border-6 border-black border-l-white rounded-full animate-spin"></div>
                        </div>
                }
            </div>
        </div>
    )
}

export default List_album;
