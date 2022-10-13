<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
    <%@ page import="java.util.*" %>
<%@ page import="com.wileyedge.*" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Form submitted Successfully</title>
	
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" 
				  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
				  crossorigin="anonymous">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	        <script src="https://code.jquery.com/jquery-3.6.0.min.js"
	                integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
	                crossorigin="anonymous">
	        </script>
	
	        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
	        		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" 
	        		crossorigin="anonymous">
	        </script>
	        
	        <script src="jquery_ajax.js"></script>
	</head>
	
	<body>
		<h2>Registered Successfully</h2>

		Your name is: <%=request.getParameter("name")%> <br/>
		Age is: <%=request.getParameter("age")%> <br/>
		Mobile number is : <%=request.getParameter("mobileNum")%> <br/>
		Address is: <%=request.getParameter("addr")%> <br/>
	</body>
</html>