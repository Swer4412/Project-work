import React, { useEffect, useState } from 'react';

const Elenco = () => {

    const [data, setData] = useState(undefined);

    useEffect(()=> {
        fetch("localhost:5000/users")
        .then((response) => response.json())
        .then((data) => setData(data))
    }, [])

    return (
        <main>
            {!data ? 
            <p>Loading...</p>
            : 
            data.map((item)=> (
                <p>{item.title}</p>,
                <img src={item.imageUrl}></img>,
                <p>{item.description}</p>,
                <p>{item.watchDate}</p>,
                <p>{item.userComment}</p>
            ))    
        }
        </main>
    );
};

export default Elenco;