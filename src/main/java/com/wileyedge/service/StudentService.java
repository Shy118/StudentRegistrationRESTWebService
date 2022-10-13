package com.wileyedge.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.wileyedge.dao.StudentJpaRepository;
import com.wileyedge.model.Student;

@Service
public class StudentService {

	@Autowired
	@Qualifier(value = "dataJpa")
	private StudentJpaRepository dao;
	
	public StudentService() {
		System.out.println("Inside default constructor of UserService");
	}
	
	public List<Student> getAllStudents() {
		System.out.println("Inside getAllUsers of UserService");
		return dao.findAll();
	}
	
	public Student getStudent(int id) {
		System.out.println("Inside getUser of UserService");
		Optional<Student> s = dao.findById(id);
		if (s.isPresent()) {
			return s.get();
		}
		return null;
	}
	
	public Student saveStudent(Student s) {
		System.out.println("Inside saveUser method of userService");
		return dao.save(s);
	}
	
	@Transactional
	public Student updateStudent(Student s) {
		System.out.println("Inside updateStudent method of userService");
//		Student sInDB = getUserByNameAndMobile(s.getName(), s.getMobile()).stream().findAny().orElse(null);
		dao.updateById(s.getId(), s.getName(), s.getAge(), s.getMobile(), s.getAddress());
		return getStudent(s.getId());
	}
	
	@Transactional
	public void removeStudentByNameAndMobile(String name, String mobile) {
		System.out.println("Inside removeStudentByNameAndMobile of userService");
		dao.deleteByNameAndMobile(name, mobile);
	}
	
	@Transactional
	public void removeStudent(int id) {
		System.out.println("Inside removeStudentByNameAndMobile of userService");
		dao.deleteById(id);
	}
	
	public Student getUserByNameAndMobile(String name, String mobile) {
		System.out.println("Inside getUserByName of userService");
		return dao.findByNameAndMobile(name, mobile) ;
	}
}
