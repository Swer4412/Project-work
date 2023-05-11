import React, { useEffect, useState } from 'react';

const Inserimento = () => {
    const [title, setTitle] = useState("")
    const [watchDate, setWatchDate] = useState("")
    const [userComment, setUserComment] = useState("")

    const [apiImageUrl, setApiImageUrl] = useState("")
    const [apiTitle, setApiTitle] = useState("")
    const [apiDescription, setApiDescription] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const delay = setTimeout(() => {
            fetch("https://imdb-api.com/en/API/Search/k_0e053s4f/" + title)
                .then((response) => response.json())
                .then((data) => {
                    setApiTitle(data.results[0].title)
                    setApiDescription(data.results[0].description)
                    setApiImageUrl(data.results[0].image)

                    setIsLoading(false)
                });
        }, 500); // Delay of half second

        return () => clearTimeout(delay); // Clear timeout on unmount
    }, [title]);

    return (
        <div className="bg-gray-800 p-4">
            <form>
                <label className="block mb-2 text-white">Inserisci titolo</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
                <label className="block mb-2 text-white">Inserisci data di visione</label>
                <input value={watchDate} onChange={(e) => setWatchDate(e.target.value)} name="watchDate" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
                <label className="block mb-2 text-white">Inserisci commento</label>
                <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} name="userComment" className="border rounded-lg py-2 px-4 mb-2 w-full"></textarea>

            </form>
            <hr className="my-4" />
            {isLoading && <p className='text-gray-400 text-base'>Loading...</p>}
            <div className="flex items-center">
                <img src={apiImageUrl || "https://fakeimg.pl/400x600"}
                    alt='movie poster'
                    className='w-1/3 max-w-[400px] rounded-lg shadow-lg mr-4' />
                <div>
                    <h3 className='text-xl font-bold mb-2 text-white'>{apiTitle || "TITOLO"}</h3>
                    <p className='text-gray-400 text-base'>{apiDescription || "DESCRIZIONE"}</p>
                </div>
            </div>
        </div>
    );
};

export default Inserimento;