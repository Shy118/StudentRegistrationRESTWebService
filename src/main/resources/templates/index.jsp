<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Student Registration Form</title>
	
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
	</head>
	
	<body>
		<div class="container">
			<div class="col-xl-3"></div>
			<div class="col-xl-6">
				<table class="table table-bordered">
		       		<thead>
		       			<tr>
		        			<th colspan="3" style="width:auto;text-align:center" >Registration Form</th>
		        		</tr>
		            </thead>
			        <form method='post' action='success' modelAttribute="std">     
			    		<tr>
			                <td colspan="1">
			                	<label for="name">
			                        Enter Name
			                    </label>
			                </td>
			                
			               	<td colspan="2"><input type="text" name="name" /></td>
			            </tr>
			            <tr>
			                <td colspan="1">
			                	<label for="age">
			                        Enter Age
			                    </label>
			                </td>
			                
			                <td colspan="2"><input type="number" name="age" /></td>
			            </tr>
			            <tr>
			                <td colspan="1">
			                	<label for="mobilenum">
			                        Enter Mobile No.
			                    </label>
			                </td>
			                
			                <td colspan="2"><input type="number" name="mobileNum" /></td>
			            </tr>
			            <tr>
			                <td colspan="1">
				                <label for="address">
				                        Enter Address
				                </label>
			                </td>
			                <td colspan="2"><input type="text" name="addr" /></td>
			            </tr>
			            <tr>
			                <td colspan="2">
				                <input type="submit" value="Submit"></input>
				            </td>
			                <td colspan="1"><input type="reset" value="Reset"></input></td>
			            </tr>
			        </form>
			    </table>
			</div>
			<div class="col-xl-3"></div>
		</div>
	</body>
</html>
