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

	}
	
	public List<Student> getAllStudents() {
		return dao.findAll();
	}
	
	public Student getStudent(int id) {
		Optional<Student> s = dao.findById(id);
		if (s.isPresent()) {
			return s.get();
		}
		return null;
	}
	
	public Student saveStudent(Student s) {
		return dao.save(s);
	}
	
	@Transactional
	public Student updateStudent(Student s) {
		dao.updateById(s.getId(), s.getName(), s.getAge(), s.getMobile(), s.getAddress());
		return getStudent(s.getId());
	}
	
	@Transactional
	public void removeStudentByNameAndMobile(String name, String mobile) {;
		dao.deleteByNameAndMobile(name, mobile);
	}
	
	@Transactional
	public void removeStudent(int id) {
		dao.deleteById(id);
	}
	
	public Student getUserByNameAndMobile(String name, String mobile) {
		return dao.findByNameAndMobile(name, mobile) ;
	}
}
