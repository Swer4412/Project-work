import React, { useEffect, useState } from 'react';

const Elenco = () => {

    const [data, setData] = useState(undefined);

    //Pendo i dati dal backend appena viene caricata la pagina
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((response) => response.json())
            .then((data) => setData(data))
    }, [])

    const update = () => {

    }
    const del = () => {

    }
    //CAMBIA COLORE E POSIZIONE DI BOTTONI, METTI SPAZIO E DIVISORE TRA UN FORM E L'ALTRO
    return (
        <div className="bg-gray-800 p-4 max-w-screen-md">
            <h1 className="text-white text-3xl font-bold mb-4">Your Media</h1>
            {!data ? (
                <p>Caricamento...</p>
            ) : (
                data.map((item) => (
                    item.media.map((media) => (
                        <form key={media.id} className="flex items-start mb-4">
                            <div className="mr-4">
                                <img src={media.imageUrl} alt={media.title} className="rounded-lg shadow-lg w-32 h-44 object-cover" />
                                <div className="flex justify-end items-end">
                                    <button onClick={() => update(media.id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2">
                                        Update
                                    </button>
                                    <button onClick={() => del(media.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">{media.title}</h3>
                                <p className="text-gray-400 text-base">{media.description}</p>
                                <p className="text-gray-400 text-base">{media.watchDate}</p>
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