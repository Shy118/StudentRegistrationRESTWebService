# StudentRegistrationRESTWebService
Basic REST API Web Service performing CRUD operation using JpaRepository via Ajax call

url: 'http://localhost:8080/'

Datasource: jdbc:mysql://localhost:3306/student
Entity: student

## Landing page: Login
### Admin login

* username: admin | password: admin (In memory verification)
* Able to perform 'Get' 'PUT' 'POST' 'DELETE' ajax call on students data

###Student login
* username: name | password: mobile (Databse Verification)
* Able to perform only 'GET' 'PUT' ajax call on its own data