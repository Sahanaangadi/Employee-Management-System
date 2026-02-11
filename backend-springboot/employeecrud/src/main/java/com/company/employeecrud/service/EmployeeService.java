package com.company.employeecrud.service;

import com.company.employeecrud.model.Employee;
import com.company.employeecrud.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public Employee saveEmployee(Employee emp) {
        return repo.save(emp);
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee updateEmployee(Employee emp) {
        return repo.save(emp);
    }

    public void deleteEmployee(int id) {
        repo.deleteById(id);

    }
    public Employee getEmployeeById(int id) {
        return repo.findById(id).orElse(null);
    }
    public void deleteAllEmployees() {
        repo.deleteAll();
    }


}

