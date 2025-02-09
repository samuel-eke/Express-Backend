const whitelist = ['https://www.thewebsitedomain.com', 'http://devwebsite:portnumber', 'http://localhost:3500', 'https://claude.ai'];
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