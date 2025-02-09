const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}
//this is simulating a connection to a database to retrieve data.

const getEveryEmployee = (req, resp) => {
    resp.json(data.employees);
}

function addNewEmployee(req, resp) {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return resp.status(400).json({ 'message': "The first name and last name are required" });
    }

    data.setEmployees([...data.employees, newEmployee]);
    resp.json(data.employees);
}

function updateEmployee(req, resp) {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return resp.status(400).json({
            "message": `Employee ID ${req.body.id} was not found in the database`
        });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.firstname = req.body.lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    resp.json(data.employees);
}

const firedEmployee = (req, resp) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return resp.status(400).json({ "message": `Empolyee with ID ${req.body.id} doesn't exist` });
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    resp.json(data.employees);
}

function pickOneEmployee(req, resp) {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return resp.status(400).json({ "message": `No employee with ${req.params.id} found on our database` })
    }
    resp.json(employee);
}

module.exports = {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
}