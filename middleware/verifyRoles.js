const verifyAllRoles = (...allowedRoles) => {
    return (req, resp, next) => {
        if (!req.roles) return resp.status(401).json({ "message": "role not in request" });
        const rolesArray = [...allowedRoles];
        console.log(`all roles are ${rolesArray}`)
        console.log(`role sent in ${req.roles}`);
        const result = req.roles.map(role => rolesArray.includes(role))
        // .find(val => val === true);

        if (!result) return resp.status(401).json({ "error": "role not found" });
        next();
    }
}

module.exports = verifyAllRoles;