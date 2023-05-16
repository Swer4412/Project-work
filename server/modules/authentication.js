exports.authentication = async (client, database, req) => {
    
    const jwt = require('jsonwebtoken');
    //Carica il contenuto di .env (il file di questo progetto) nella proprietà process.env
    require('dotenv').config()

    var status = 401
    var role = "r"
    var email = ""

    try {
        
        //Prendo il token e lo decodifico
        const token = req.headers.authorization.split(" ")[1];

        //decoded contiene il payload decodificato del jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        email = decoded.email
        status = 200
        
    } catch (e) {

        status = 401
    }
    
    return {status:status, role:role, email:email}

}