import React, { useContext, useEffect, useState } from 'react';
import {BiPencil, BiTrash} from "react-icons/bi"
import { TokenContext } from '../ProtectedRoutes';

const Elenco = () => {

    const [data, setData] = useState(undefined);
    const token = useContext(TokenContext)

    //Pendo i dati dal backend appena viene caricata la pagina
    useEffect(() => {
        fetch("http://localhost:5000/media/get", {
          headers:{authorization:"Bearer "+token}
        })
            .then((response) => response.json())
            .then((data) => setData(data))
    }, [])

    const update = () => {

    }
    const del = () => {

    }
    
    return (
        <div className="bg-gray-800 p-4 max-w-screen-md">
            <h1 className="text-white text-3xl font-bold mb-4">Your Media</h1>
            {!data ? (
                <p className='text-gray-400 text-base'>Loading...</p>
            ) : (
                data.map((item) => (
                    item.media.map((media) => (
                      <form key={media.id} className="flex items-start mb-4 bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
                        <div className="mr-4">
                          <img src={media.imageUrl} alt={media.title} className="rounded-lg shadow-lg w-32 h-44 object-cover" />
                          <div className="flex justify-end items-end">
                            <button onClick={() => update(media.id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2">
                              <BiPencil/>
                            </button>
                            <button onClick={() => del(media.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                              <BiTrash/>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold mb-2 text-white">{media.title}</h3>
                            <p className="text-xl font-bold mb-2 text-white">{media.watchDate}</p>
                          </div>
                          <h4 className='font-bold mb-2 text-white'>Description</h4>
                          <p className="text-gray-400 text-base">{media.description}</p>
                          <h4 className='font-bold mb-2 text-white'>Comment</h4>
                          <p className="text-gray-400 text-base">{media.userComment}</p>
                        </div>
                      </form>
                    ))
                  ))
                  
            )}
        </div>
    );
};

export default Elenco;