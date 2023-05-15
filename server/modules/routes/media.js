exports.media = (app, client, database) => {
    const auth = require("../authentication");

    //Endpoint get che fornisce i media della persona loggata
    app.get("/media/get", async (req, res) => {
        const authenticate = await auth.authentication(client, database, req);

        if (authenticate.status === 200) {
            try {
                const collection = await database.collection("data");

                const result = await collection
                    .find({ email: authenticate.email })
                    .toArray();

                if (result.length !== 0) {
                    res.send(result);
                } else {
                    res.sendStatus(404);
                }
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
        } else {
            res.status(401).json("Unauthorized");
        }
    });

    //Endpoint get che fornisce un media della persona loggata in base all'id
    app.get("/media/get/:id", async (req, res) => {
        const authenticate = await auth.authentication(client, database, req);

        if (authenticate.status === 200) {
            const id = req.params.id;

            try {
                const collection = await database.collection("data");

                const result = await collection
                    .find({ email: authenticate.email, "media.id": id })
                    .toArray();

                if (result.length !== 0) {
                    result[0].media.forEach((media) => {
                        if (media.id === id) {
                            res.send(media);
                        }
                    });
                } else {
                    res.sendStatus(404);
                }
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
        } else {
            res.status(401).json("Unauthorized");
        }
    });

    //Endpoint post che aggiuge i media all utente loggato
    app.post("/media/add", async (req, res) => {
        const authenticate = await auth.authentication(client, database, req);

        if (authenticate.status === 200) {
            try {
                const collection = await database.collection("data");

                const result = await collection.updateOne(
                    { email: authenticate.email },
                    {
                        $push: {
                            media: {
                                id: req.body.id,
                                title: req.body.title,
                                imageUrl: req.body.imageUrl,
                                description: req.body.description,
                                watchDate: req.body.watchDate,
                                userComment: req.body.userComment,
                            },
                        },
                    }
                );

                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
        } else {
            res.status(401).json("Unauthorized");
        }
    });

    //Endpoint update che aggiorna un media in base al id
    app.put("/media/update/:id", async (req, res) => {
        const authenticate = await auth.authentication(client, database, req);

        //Controllo autenticazione
        if (authenticate.status === 200) {
            try {
                const collection = await database.collection("data");

                //GESTIONE DATI
                const email = authenticate.email;
                const id = req.params.id;

                const checkId = await collection
                    .find({ email: email, "posts.id": id })
                    .toArray();

                //Se c'è l'id nel database
                if (checkId !== 0) {
                    //Per elementi composti basta metterli tra le virgolette
                    const result = await collection.updateOne(
                        { email: email, "media.id": id },
                        {
                            $set: {
                                "media.$.id": req.body.id,
                                "media.$.title": req.body.title,
                                "media.$.imageUrl": req.body.imageUrl,
                                "media.$.description": req.body.description,
                                "media.$.watchDate": req.body.watchDate,
                                "media.$.userComment": req.body.userComment,
                            },
                        }
                    );

                    res.sendStatus(200);
                } else {
                    res.status(404).send("Id non trovato");
                }
            } catch (error) {
                console.log(error);
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(401);
        }
    });

    //Endpoint delete che elimina un media specificato come parametro
    app.delete("/media/delete/:id", async (req, res) => {
        const authenticate = await auth.authentication(client, database, req);

        if (authenticate.status === 200) {
            try {
                const collection = await database.collection("data");

                //Prendo i dati
                const email = authenticate.email;
                const id = req.params.id;

                const checkEmail = await collection.find({ email: email }).toArray();

                if (checkEmail.length !== 0) {
                    const result = await collection.updateOne(
                        { email: email },
                        {
                            $pull: {
                                media: {
                                    id: id,
                                },
                            },
                        }
                    );

                    res.sendStatus(200);
                } else {
                    res.sendStatus(400).json("Email non trovata nel database!");
                }
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
        } else {
            res.status(401).json("Unauthorized");
        }
    });
};
