package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;



import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Employee;

import java.util.List;

public interface EmployeeService {

	public List<Employee> findAll();
	
	public Employee findById(int theId);
	
	public void save(Employee theEmployee);
	
	public void deleteById(int theId);

	public List<Employee> searchBy(String theName);
	
}
