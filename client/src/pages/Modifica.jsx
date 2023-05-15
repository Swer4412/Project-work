import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../ProtectedRoutes';
import { useLocation } from 'react-router-dom';

const Modifica = () => {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

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
    const token = useContext(TokenContext)

    //Cerco tutti i dati in base al id passato da elenco
    useEffect(() => {
        fetch("http://localhost:5000/media/get/" + id, {
          headers: { authorization: "Bearer " + token }
        })
          .then((response) => response.json())
          .then((data) => {
            setTitle(data.title)
            setWatchDate(data.watchDate)
            setUserComment(data.userComment)
          })
      }, [])

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

    //Quando viene cliccato il bottone update
    const update = async () => {

        //Check che tutti i campi siano pieni
        if (!title || !watchDate || !userComment || !apiTitle) {
            setDisplayError(true);
            return;
          } else {
            setDisplayError(false);
          }
        
        //Controllo che l'api abbia finito di fare il fetch per evitare documenti vuoti
        if (!isLoading) {
            try {

                const response = await fetch("http://localhost:5000/media/update/"+id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization:"Bearer "+ token
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

                //Se l'api mi dice che è ok, ritorna su account per visualizzare i media aggiornati
                response.status === 200 && navigate("/account")

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
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
                <label className="block mb-2 text-white">Inserisci data di visione</label>
                <input value={watchDate} onChange={(e) => setWatchDate(e.target.value)} name="watchDate" type="date" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
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
            <div className="flex justify-end mt-4">
                <button onClick={() => navigate('/account')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
                    Cancel
                </button>
                <button onClick={() => update()}className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Update
                </button>
            </div>
            {displayError && <p className="text-red-500 mt-4 text-right">Inserisci tutti i campi!</p>}
        </div>
    );
};

export default Modifica;