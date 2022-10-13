package com.wileyedge.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wileyedge.model.Student;

@Repository(value = "dataJpa")
public interface StudentJpaRepository extends JpaRepository<Student, Integer> {
	
	public Student findByNameAndMobile(String name, String mobile);

	public void deleteByNameAndMobile(String name, String mobile);
	
	@Modifying
    @Query("UPDATE student s SET s.name = ?2, s.age = ?3, s.mobile = ?4, s.address = ?5 WHERE s.id = ?1") //JPQL
	public void updateById(int id, String name, String age, String mobile, String address);
}
