import React, { useContext, useEffect, useState } from 'react';
import { BiPencil, BiTrash } from "react-icons/bi"
import { TokenContext } from '../ProtectedRoutes';
import { useNavigate, Link } from 'react-router-dom';

const Elenco = () => {

  const [data, setData] = useState(undefined);
  const [cont, setCont] = useState(0)
  const token = useContext(TokenContext)
  const navigate = useNavigate()

  //Pendo i dati dal backend appena viene caricata la pagina
  useEffect(() => {
    fetch("http://localhost:5000/media/get", {
      headers: { authorization: "Bearer " + token }
    })
      .then((response) => response.json())
      .then((data) => {
        //Imposto lo state data e il contatore di media
        setData(data)
        setCont(data[0].media.length);
      })
  }, [])

  //Quando viene cliccato il bottone modifica
  const update = (id) => {
    navigate("modifica?id="+id)
  }
  //Quando viene cliccato il bottone delete
  const del = (id) => {
    fetch("http://localhost:5000/media/delete/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:"Bearer "+ token
    }
  }).then((response)=> {

    //Se l'api mi risponde ok refresho la pagina altrimenti do un errore
    //Questo perchè è più facile eliminare dal database e refreshare la pagina, rispetto a modificare anche la pagina 
    if (response.status===200) {
      window.location.reload();
    } else {
      alert("Problema nell'eliminazione!")
    }

  })
  }

  return (
    <div className="bg-gray-800 p-4 max-w-screen-md">
      <h1 className="text-white text-3xl font-bold mb-4">Your Media ({cont})</h1>
      {!data || data[0].media.length === 0 ? ( //Guardo se l'api mi ha restituito dei dati e se tali dati contengono qualcosa
        <p className='text-gray-400 text-base'><Link to="inserimento">Non hai media, inserisci qualcosa!</Link></p>
      ) : (
        data[0].media.map((media) => (
            <form key={media.id} className="flex items-start mb-4 bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
              <div className="mr-4">
                <img src={media.imageUrl} alt={media.title} className="rounded-lg shadow-lg w-32 h-44 object-cover" />
                <div className="flex justify-start items-end mt-2">
                  <button onClick={() => update(media.id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2">
                    <BiPencil />
                  </button>
                  <button onClick={() => del(media.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                    <BiTrash />
                  </button>
                </div>
              </div>
              <div className='flex-grow'>
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

      )}
    </div>
  );
};

export default Elenco;