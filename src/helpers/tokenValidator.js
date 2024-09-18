const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Configuración del cliente para el primer pool de usuarios
const clientPool1 = jwksClient({
    jwksUri: 'https://cognito-idp.us-east-1.amazonaws.com/<user-pool-id-pool-1>/.well-known/jwks.json'
});

// Configuración del cliente para el segundo pool de usuarios
const clientPool2 = jwksClient({
    jwksUri: 'https://cognito-idp.us-east-1.amazonaws.com/<user-pool-id-pool-2>/.well-known/jwks.json'
});

// Función para obtener la clave pública para validar el token
const getKey = (client, header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
};

const validateToken = (token, callback) => {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
        return callback(new Error('Invalid token'));
    }

    // Verifica el `iss` para saber de qué pool proviene el token
    const issuer = decodedToken.payload.iss;

    let client;
    if (issuer.includes('<user-pool-id-pool-1>')) {
        client = clientPool1;
    } else if (issuer.includes('<user-pool-id-pool-2>')) {
        client = clientPool2;
    } else {
        return callback(new Error('Unknown issuer'));
    }

    jwt.verify(token, (header, cb) => getKey(client, header, cb), {}, callback);
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    validateToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};