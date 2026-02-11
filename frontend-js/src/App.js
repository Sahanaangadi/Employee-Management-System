import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8081/employees";

function App() {

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    salary: "",
    department: "",
    location: ""
  });

  const [errors, setErrors] = useState({});

  // LOAD EMPLOYEES
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD EMPLOYEE
  const addEmployee = async () => {

    setErrors({});

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  ...form,
  salary: Number(form.salary)
})

    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrors(errorData);
      return;
    }

    fetchEmployees();
    clearForm();
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async () => {

    setErrors({});

    const response = await fetch(`${API_URL}/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  ...form,
  salary: Number(form.salary)
})

    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrors(errorData);
      return;
    }

    fetchEmployees();
    clearForm();
  };

  // DELETE
  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  // EDIT BUTTON
  const editEmployee = (emp) => {
    setForm(emp);
  };

  const clearForm = () => {
    setForm({
      id: "",
      name: "",
      salary: "",
      department: "",
      location: ""
    });
  };

  return (
    <div className="container">

      <h1>Employee Management System</h1>

      <div className="form">
        <input name="name" placeholder="Enter Name" value={form.name} onChange={handleChange}/>
        <p className="error">{errors.name}</p>

        <input name="salary" placeholder="Enter Salary" value={form.salary} onChange={handleChange}/>
        <p className="error">{errors.salary}</p>

        <input name="department" placeholder="Enter Department" value={form.department} onChange={handleChange}/>
        <p className="error">{errors.department}</p>

        <input name="location" placeholder="Enter Location" value={form.location} onChange={handleChange}/>
        <p className="error">{errors.location}</p>

        <div className="buttons">
          <button onClick={addEmployee}>Add</button>
          <button onClick={updateEmployee}>Update</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Salary</th><th>Department</th><th>Location</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.salary}</td>
              <td>{emp.department}</td>
              <td>{emp.location}</td>
              <td>
                <button onClick={() => editEmployee(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;

