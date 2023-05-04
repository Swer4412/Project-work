exports.users = (app, client, database) => {

    app.get("/users", async (req, res) => {
        
        try {

            const collection = await database.collection("data")

            const result = await collection.find({}).toArray();

            if (result.length !== 0) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            console.log(e)
            res.status(400)
        }

    })
}