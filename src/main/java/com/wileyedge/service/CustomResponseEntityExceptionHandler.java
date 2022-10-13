package com.wileyedge.service;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

// Catch exceptions
//@ControllerAdvice
@RestControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public final ExceptionResponse handleAllExceptions(Exception ex, WebRequest req) {
		System.out.println("Inside handleAllExceptions");
		ExceptionResponse expResp = new ExceptionResponse(new Date(),ex.getMessage(), "Detail Description of the Exception");
		return expResp;
//		return new ResponseEntity(expResp, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public final ExceptionResponse handleUserNotFoundException(UserNotFoundException ex, WebRequest req) {
		System.out.println("Inside handleUserNotFoundException");
		ExceptionResponse expResp = new ExceptionResponse(new Date(),ex.getMessage(), "The requested User ID is not present in the system");
		return expResp;
		//		return new ResponseEntity(expResp, HttpStatus.NOT_FOUND);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		System.out.println("handleMethodArgumentNotValid");
		ExceptionResponse expResp = new ExceptionResponse(new Date(), "Validated failed", ex.getBindingResult().toString());
		return new ResponseEntity(expResp, HttpStatus.BAD_REQUEST);
	}
	
}
