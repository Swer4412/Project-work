import React from 'react';

const Inserimento = () => {



    return (
        <div className="bg-gray-800 p-4">
            <form>
                <label className="block mb-2 text-white">Inserisci titolo</label>
                <input name="title" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
                <label className="block mb-2 text-white">Inserisci data di visione</label>
                <input name="watchDate" className="border rounded-lg py-2 px-4 mb-2 w-full"></input>
                <label className="block mb-2 text-white">Inserisci commento</label>
                <textarea name="userComment" className="border rounded-lg py-2 px-4 mb-2 w-full"></textarea>

            </form>
            <hr className="my-4"/>
            <div className="flex items-center">
            <img src='https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg'
            alt='movie poster'
            className='w-1/3 rounded-lg shadow-lg mr-4'/>
            <div>
            <h3 className='text-xl font-bold mb-2 text-white'>(Titolo)</h3>
            <p className='text-gray-400 text-base'>(Descrizione)</p>
            </div>
            </div>
        </div>
    );
};

export default Inserimento;