exports.users = async (app, client, database) => {

    const auth = require("../authentication");

    app.get("/users", async (req, res) => {
        
        const authenticate = auth.authentication(client, database, req)

        if (authenticate.status === 200) {

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
        } else {
            res.status(401).json("Unauthorized")
        }

    })
}