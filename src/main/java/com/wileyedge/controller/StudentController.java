package com.wileyedge.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wileyedge.model.Student;
import com.wileyedge.service.StudentService;
import com.wileyedge.service.StudentNotFoundException;

//@RestController = @Controller + @ResponseBody
@RestController
@CrossOrigin
public class StudentController {

	@Autowired
	private StudentService service;
	
	public StudentController() {

	}

	@GetMapping(path = "/student")
	public List<Student> retrieveAllUsers() {
		return service.getAllStudents();
	}
	
	@GetMapping(path = "/student/{id}")
	public Student retrieveUser(@PathVariable int id) {
		Student u = service.getStudent(id);
		if (u == null) {
			throw new StudentNotFoundException("User ID " + id + " not found");
		} //if
		return u;
	}
	
	@GetMapping(path = "/student/{name}/{mobile}")
	public Student retrieveStudentByNameAndMobile(@PathVariable String name,@PathVariable String mobile) {
		return service.getUserByNameAndMobile(name, mobile);
	}
	
	@PutMapping(path = "/student/{id}")
	public Student editStudent(@Valid @RequestBody Student s, @PathVariable String id, BindingResult result, Model model) {
		Student updatedStudent = s;
		s.setId(Integer.parseInt(id));
		return service.updateStudent(s);
	}
	
	@PostMapping(path = "/student")
	public Student createStudent(@Valid @RequestBody Student s, BindingResult result, Model model) {
		return service.saveStudent(s);
	}
	
	@DeleteMapping(path = "/student/{name}/{mobile}")
	public void deleteStudentByNameAndMobile(@PathVariable String name,@PathVariable String mobile) {
		service.removeStudentByNameAndMobile(name, mobile);
	}
	
	@DeleteMapping(path = "/student/{id}")
	public void deleteStudent(@PathVariable String id) {
		service.removeStudent(Integer.parseInt(id));
	}
	
}
