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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wileyedge.model.Student;
import com.wileyedge.service.StudentService;
import com.wileyedge.service.UserNotFoundException;

//@RestController = @Controller + @ResponseBody
@RestController
@CrossOrigin
public class StudentController {

	@Autowired
	private StudentService service;
	
	public StudentController() {
		System.out.println("Inside default constructor of StudentController");
	}

	@GetMapping(path = "/student")
	public List<Student> retrieveAllUsers() {
		System.out.println("Inside retrieveAllUsers of StudentController");
		return service.getAllStudents();
	}
	
	@GetMapping(path = "/student/{id}")
	public Student retrieveUser(@PathVariable int id) {
		System.out.println("Inside retrieve of StudentController " + id);
		Student u = service.getStudent(id);
		
		if (u == null) {
			System.out.println("CustomException is being thrown");
			throw new UserNotFoundException("User ID " + id + " not found");
		} //if
		return u;
	}
	
	@GetMapping(path = "/student/{name}/{mobile}")
	public Student retrieveStudentByNameAndMobile(@PathVariable String name,@PathVariable String mobile) {
		System.out.println("Inside retrieveStudentByNameAndMobile of StudentController");
		return service.getUserByNameAndMobile(name, mobile);
	}
	
	@PutMapping(path = "/student/{id}")
	public Student editStudent(@Valid @RequestBody Student s, @PathVariable String id, BindingResult result, Model model) {
		System.out.println("Inside changeStudent of StudentController");
		Student updatedStudent = s;
		s.setId(Integer.parseInt(id));
		System.out.println(updatedStudent);
		return service.updateStudent(s);
	}
	
	@PostMapping(path = "/student")
	public Student createStudent(@Valid @RequestBody Student s, BindingResult result, Model model) {
		System.out.println("Inside createUser of StudentController");
		System.out.println(s);
		return service.saveStudent(s);
	}
	
	@DeleteMapping(path = "/student/{name}/{mobile}")
	public void deleteStudentByNameAndMobile(@PathVariable String name,@PathVariable String mobile) {
		System.out.println("Inside deleteStudentByNameAndMobile of StudentController");
		service.removeStudentByNameAndMobile(name, mobile);
	}
	
	@DeleteMapping(path = "/student/{id}")
	public void deleteStudent(@PathVariable String id) {
		System.out.println("Inside deleteStudent of StudentController");
		service.removeStudent(Integer.parseInt(id));
	}
	
}
