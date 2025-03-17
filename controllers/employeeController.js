const Employees = require("../model/Hire");
//this is simulating a connection to a database to retrieve data.

const getEveryEmployee = async (req, resp) => {
    const employees = await Employees.find();
    if (!employees) return resp.status(204).json({ "msg": "No employees found" });
    resp.json(employees);
}

async function addNewEmployee(req, resp) {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return resp.status(400).json({ "message": "The first name and last name are required" })
    }

    try {
        const resultSave = await Employees.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        resp.status(201).json({ "message": `Account for ${req.body.firstname} ${req.body.lastname} created` });
    } catch (error) {
        console.error(error)
    }

}


async function updateEmployee(req, resp) {
    if (!req?.body?.id) {
        return resp.status(400).json({ "message": "ID parameter is required" });
    }

    const employee = await Employees.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return resp.status(204).json({
            "message": `Employee ID ${req.body.id} was not found in the database`
        });

    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.firstname = req.body.lastname;

    const result = await employee.save();
    resp.json(result);
}

const firedEmployee = async (req, resp) => {
    if (!req.body?.id) return resp.status(400).json({ "message": "Employee ID required" });
    const employee = await Employees.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return resp.status(400).json({ "message": `Empolyee with ID ${req.body.id} doesn't exist` });
    }

    const result = await employee.deleteOne({ _id: req.body.id });
    resp.json(result);
}

async function pickOneEmployee(req, resp) {
    if (!req?.params?.id) return resp.status(400).json({ "message": "Employee ID required" });

    const employee = await Employees.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return resp.status(400).json({ "message": `No employee with ${req.params.id} found on our database` })
    }
    resp.json(employee);
}

module.exports = {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
}