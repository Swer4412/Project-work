import React, { useEffect, useState } from 'react';

const Elenco = () => {

    const [data, setData] = useState(undefined);

    //Pendo i dati dal backend appena viene caricata la pagina
    useEffect(()=> {
        fetch("http://localhost:5000/users")
        .then((response) => response.json())
        .then((data) => setData(data))
    }, [])

    return (
        <>
            {!data ? 
            <p>Caricamento...</p>
            : 
            data.map((item)=> (
                <div>
                <p>{item.title}</p>
                <p>{item.description}</p>
                </div>
            ))    
        }
        </>
    );
};

export default Elenco;