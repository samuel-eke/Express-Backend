const whitelist = [
    'http://localhost:3500',
    'http://localhost:3000',
    'http://localhost:5173'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('This domain blocked by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;