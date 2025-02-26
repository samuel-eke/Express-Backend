const verifyAllRoles = (...allowedRoles) => {
    return (req, resp, next) => {
        if (!req.roles) return resp.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray)
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if (!result) return resp.sendStatus(401);
        next();
    }
}

module.exports = verifyAllRoles;