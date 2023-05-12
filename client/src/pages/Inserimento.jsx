import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inserimento = () => {
    const [title, setTitle] = useState("")
    const [watchDate, setWatchDate] = useState("")
    const [userComment, setUserComment] = useState("")

    const [apiId, setApiId] = useState("")
    const [apiImageUrl, setApiImageUrl] = useState("")
    const [apiTitle, setApiTitle] = useState("")
    const [apiDescription, setApiDescription] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [displayError, setDisplayError] = useState(false)

    const navigate = useNavigate();

    //Fetch dinamico in base al titolo
    useEffect(() => {
        setIsLoading(true);
        const delay = setTimeout(() => {
            fetch("https://imdb-api.com/en/API/Search/k_0e053s4f/" + title)
                .then((response) => response.json())
                .then((data) => {
                    setApiTitle(data.results[0].title);
                    setApiDescription(data.results[0].description);
                    setApiImageUrl(data.results[0].image);
                    setApiId(data.results[0].id)
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500); // Delay of half second

        return () => clearTimeout(delay); // Clear timeout on unmount
    }, [title]);

    const ok = async () => {
        console.log(isLoading)
        if (!isLoading) {
            try {

                const response = await fetch("http://localhost:5000/media/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: apiId,
                        title: apiTitle,
                        imageUrl: apiImageUrl,
                        description: apiDescription,
                        watchDate: watchDate,
                        userComment: userComment
                    })
                });

                if (response.status === 200) {
                    navigate("/account")
                } else {
                    setDisplayError(true)
                }

            } catch (error) {
                console.error(error);
            } finally {
                
            }
        }
    }

    return (
        <div className="bg-gray-800 p-4">
            <form>
                <label className="block mb-2 text-white">Inserisci titolo</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="border rounded-lg py-2 px-4 mb-2 w-full" required></input>
                <label className="block mb-2 text-white">Inserisci data di visione</label>
                <input value={watchDate} onChange={(e) => setWatchDate(e.target.value)} name="watchDate" className="border rounded-lg py-2 px-4 mb-2 w-full" required></input>
                <label className="block mb-2 text-white">Inserisci commento</label>
                <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} name="userComment" className="border rounded-lg py-2 px-4 mb-2 w-full" required></textarea>

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
            <div className="flex justify-end mt-4">
                <button onClick={() => navigate('/account')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
                    Cancel
                </button>
                <button onClick={() => ok}className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    OK
                </button>
            </div>
            {displayError && <p className="text-red-500 mt-4 text-center">Invalid email or password</p>}
        </div>
    );
};

export default Inserimento;