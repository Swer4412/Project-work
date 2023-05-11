exports.login = async (app, client, database) => {
    
    app.get("/login", async (req, res) => {
        
        try {
            const collection = await database.collection("data");

            //Controllo che la mail si trovi ne database
            const result = await collection
                .find({ email: req.headers["email"] })
                .toArray();

            const bcrypt = require("bcrypt");
            //Controllo che la passowrd sia giusta

            const compareToken = await bcrypt.compare(
                req.headers["password"],
                result[0].password
            );

            if (compareToken && result.length !== 0) {
                res.status(200).json({msg: "Ok"})
            } else {
                res.status(401).json({msg: "Unauthorized"})
            }

        } catch (e) {
            console.log(e);
            res.status(400).json({msg: "Bad Request"})
        }

    });
};
