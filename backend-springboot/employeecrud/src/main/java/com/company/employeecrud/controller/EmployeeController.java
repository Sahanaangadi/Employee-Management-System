package com.company.employeecrud.controller;

import com.company.employeecrud.model.Employee;
import com.company.employeecrud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    // CREATE
    @PostMapping
    public Employee addEmployee(@Valid @RequestBody Employee emp) {
        return service.saveEmployee(emp);
    }

    // READ
    @GetMapping
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable int id) {
        return service.getEmployeeById(id);
    }

    // UPDATE
    // UPDATE EMPLOYEE BY ID
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id,@Valid @RequestBody Employee emp) {

        emp.setId(id);   // VERY IMPORTANT LINE
        return service.updateEmployee(emp);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id) {
        service.deleteEmployee(id);
        return "Employee deleted";
    }

    // DELETE ALL EMPLOYEES
    @DeleteMapping("/all")
    public String deleteAllEmployees() {
        service.deleteAllEmployees();
        return "All employees deleted successfully";
    }
}

    //getemployeebyid
    //deleteall

    //update the salary ->10,000


