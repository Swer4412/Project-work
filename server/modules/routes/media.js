exports.media = (app, client, database) => {

    const auth = require("../authentication");

    //Endpoint get che fornisce i media della persona loggata
    app.get("/media/get", async (req, res) => {
        
        const authenticate = await auth.authentication(client, database, req)
        
        if (authenticate.status === 200) {
            
            try {

                const collection = await database.collection("data")

                const result = await collection.find({email:authenticate.email}).toArray();

                if (result.length !== 0) {
                    res.send(result);
                } else {
                    res.sendStatus(404);
                }

            } catch (e) {
                console.log(e)
                res.status(400).json(e)
            }
        } else {
            res.status(401).json("Unauthorized")
        }

    })

    //Endpoint post che aggiuge i media all utente loggato
    app.post("/media/add", async (req, res) => {

        const authenticate = await auth.authentication(client, database, req)
        
        if (authenticate.status === 200) {
            
            try {

                const collection = await database.collection("data")

                const result = await collection.updateOne({email:authenticate.email}, {$push:{ media :{
                    id:req.body.id,
                    title:req.body.title,
                    imageUrl:req.body.imageUrl,
                    description:req.body.description,
                    watchDate:req.body.watchDate,
                    userComment:req.body.userComment
                }}})

                res.sendStatus(200)

            } catch (e) {
                console.log(e)
                res.status(400).json(e)
            }
        } else {
            res.status(401).json("Unauthorized")
        }

    })

    //Endpoint delete che elimina un media specificato come parametro
    app.delete("/media/delete/:id", async (req, res) => {
        
        const authenticate = await auth.authentication(client, database, req)
        
        if (authenticate.status === 200) {
            
            try {

                const collection = await database.collection("data")

                //Prendo i dati
                const email = authenticate.email
                const id = req.params.id

                const checkEmail = await collection.find({email:email}).toArray();

                if (checkEmail.length !== 0) {
                    
                    const result = await collection.updateOne({email:email}, {$pull : { media: {
                        id:id
                    }
                    }})

                    res.sendStatus(200)

                } else {

                    res.sendStatus(400).json("Email non trovata nel database!");
                }

            } catch (e) {
                console.log(e)
                res.status(400).json(e)
            }
        } else {
            res.status(401).json("Unauthorized")
        }

    })

}