/* Ajax Call */
$(document).ready(function () {
    $("button#submit").click(function (event) {
        if ($('input#name').val() && $('input#age').val() && $('input#mobile').val() && $('input#address').val() != "") {
            
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/student',
                data: JSON.stringify({
                    name: $('input#name').val(),
                    age: $('input#age').val(),
                    mobile: $('input#mobile').val(),
                    address: $('input#address').val(),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },'dataType': 'json',
                success: function() {
                    $('div#registrationMsg').empty().append('<div class="alert alert-success" role="alert">Registered Successfully !</div>');                    
                },
                error: function () {
                    $('div#registrationMsg').empty().append('<div class="alert alert-danger" role="alert">Registration Failed !</div>');                    
                }
            })
        }
        else {
            $('div#registrationMsg').empty().append('<div class="alert alert-danger" role="alert">Registration Failed !</div>');  
        }
    });
})

$(document).ready(function () {
    $("button#pills-allStudents-tab").click(function (event) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/student',
            success: function(studentArray) {
                $('div#allStudents').empty();
                var studentInfo = '<table class="table table-bordered table-striped table-hover"> <tr> <th>ID</th> <th>Name</th> <th>Age</th> <th>Mobile No</th> <th>Address</th> </tr>';
                $.each(studentArray, function (index, student) {
                    
                    studentInfo += '<tr> <td>' + student.id + '</td>';
                    studentInfo += '<td>' + student.name + '</td>';
                    studentInfo += '<td>' + student.age + '</td>';
                    studentInfo += '<td>' + student.mobile + '</td>';
                    studentInfo += '<td>' + student.address + '</td> </tr>';
                
                });
                $('div#allStudents').append(studentInfo);
            },
            error: function() {
                alert('Error fetching students detail');
            }
        })
    });
})

$(document).ready(function () {
    $("button#login").click(function (event) {
        var uname = $('input#username').val();
        var pw = $('input#password').val();

        if (uname == 'admin' && pw == 'admin') {
            $("button#pills-admin-tab").show();
            $("button#pills-allStudents-tab").show();
            $("button#pills-form-tab").show();
            $("button#pills-login-tab").hide();
            $("button#pills-profile-tab").hide();
            $('button#pills-admin-tab').click();
        }

        else {
            $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/student/' + uname + '/' + pw,
            success: function(student) {

                if (student.id != undefined) {
                $("button#pills-profile-tab").show();
                $("button#pills-login-tab").hide();
                $('button#pills-profile-tab').click();

                $('input#studentId').empty().val(student.id);
                $('input#studentName').empty().val(student.name);
                $('input#studentAge').empty().val(student.age);
                $('input#studentMobile').empty().val(student.mobile);
                $('input#studentAddress').empty().val(student.address);
                }

                else {
                    alert('You have entered an incorrect username/password');
                }
                

            },

            error: function() {
                alert('You have entered an incorrect username/password');
            }
            })
        }
    })
})


$(document).ready(function () {
    $("button#adminSearch").click(function (event) {
        $('div#deleteMsg').empty().hide();
        $('div#adminEditMsg').empty().hide();
        var id = $('input#adminFindById').val();
        if (id == '') {
            alert('Please enter a student ID');
        }
        else {
            $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/student/' + id,
            success: function(student) {

                $("input#studentIdAdmin").empty().val(student.id);
                $("input#studentNameAdmin").empty().val(student.name);
                $("input#studentAgeAdmin").empty().val(student.age);
                $("input#studentMobileAdmin").empty().val(student.mobile);
                $("input#studentAddressAdmin").empty().val(student.address);

                $("table#studentDetailAdmin").show();
                $("button#adminDelete").show();
                $("button#adminEdit").show();
            },
            error: function() {
                alert('Student ID ' + id + ' not found !');
            }
            })
        }
        
    })
})

$(document).ready(function () {
    $("button#adminDelete").click(function (event) {
        var id = $('input#studentIdAdmin').val();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/student/' + id,
            success: function() {
                $('div#deleteMsg').empty().append('<div class="alert alert-success" role="alert">Deleted successfully !</div>').show();                    
                $("button#adminDelete").hide();
                $("button#adminEdit").hide();
                $("table#studentDetailAdmin").hide();
                $('div#adminEditMsg').hide();
            },
            error: function() {
                $('div#deleteMsg').empty().append('<div class="alert alert-danger" role="alert">Failed to delete Student !</div>').show();                    
            }
        })
    })
})

$(document).ready(function () {
    $("button#studentConfirm").click(function (event) {
        var id = $("input#studentId").val();

        if ($('input#studentName').val().length != 0) {
            var name = $("input#studentName").val();
        }

        else {
            var name = $("input#studentName").attr('placeholder');
        }

        if ($('input#studentAge').val().length != 0) {
            var age = $("input#studentAge").val();
        }

        else {
            var age = $("input#studentAge").attr('placeholder');
        }

        if ($('input#studentMobile').val().length != 0) {
            var mobile = $("input#studentMobile").val();
        }

        else {
            var mobile = $("input#studentMobile").attr('placeholder');
        }

        if ($('input#studentAddress').val().length != 0) {
            var address = $("input#studentAddress").val();
        }

        else {
            var address = $("input#studentAddress").attr('placeholder');
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/student/' + id,
            data: JSON.stringify({
                name: name,
                age: age,
                mobile: mobile,
                address: address,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },'dataType': 'json',
            success: function(student) {

                $("input#studentId").empty().val(student.id);
                $("input#studentName").empty().val(student.name);
                $("input#studentAge").empty().val(student.age);
                $("input#studentMobile").empty().val(student.mobile);
                $("input#studentAddress").empty().val(student.address);

                $("input#studentName").attr("readonly", true)
                $("input#studentName").attr("placeholder", $("input#studentName").val());
                $("input#studentName").attr("style","border-style: none;");

                $("input#studentAge").attr("readonly", true)
                $("input#studentAge").attr("placeholder", $("input#studentAge").val());
                $("input#studentAge").attr("style","border-style: none;");

                $("input#studentMobile").attr("readonly", true)
                $("input#studentMobile").attr("placeholder", $("input#studentMobile").val());
                $("input#studentMobile").attr("style","border-style: none;");

                $("input#studentAddress").attr("readonly", true)
                $("input#studentAddress").attr("placeholder", $("input#studentAddress").val());
                $("input#studentAddress").attr("style","border-style: none;");

                $("button#studentConfirm").hide();
                $("button#studentCancel").hide();
                $("button#studentEdit").show();
                $("button#studentLogout").show();

                $("div#editMsg").empty().append('<div class="alert alert-success" role="alert">Edited Successfully !</div>').show();                    
            },

            error: function() {
                $("div#editMsg").empty().append('<div class="alert alert-danger" role="alert">Failed to edit your detail !</div>').show();                    
            }
        })
    })
})

$(document).ready(function () {
    $("button#adminConfirm").click(function (event) {
        var id = $("input#studentIdAdmin").val();

        if ($('input#studentNameAdmin').val().length != 0) {
            var name = $("input#studentNameAdmin").val();
        }

        else {
            var name = $("input#studentNameAdmin").attr('placeholder');
        }

        if ($('input#studentAgeAdmin').val().length != 0) {
            var age = $("input#studentAgeAdmin").val();
        }

        else {
            var age = $("input#studentAgeAdmin").attr('placeholder');
        }

        if ($('input#studentMobileAdmin').val().length != 0) {
            var mobile = $("input#studentMobileAdmin").val();
        }

        else {
            var mobile = $("input#studentMobileAdmin").attr('placeholder');
        }

        if ($('input#studentAddressAdmin').val().length != 0) {
            var address = $("input#studentAddressAdmin").val();
        }

        else {
            var address = $("input#studentAddressAdmin").attr('placeholder');
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/student/' + id,
            data: JSON.stringify({
                name: name,
                age: age,
                mobile: mobile,
                address: address,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },'dataType': 'json',
            success: function(student) {

                $("input#studentIdAdmin").empty().val(student.id);
                $("input#studentNameAdmin").empty().val(student.name);
                $("input#studentAgeAdmin").empty().val(student.age);
                $("input#studentMobileAdmin").empty().val(student.mobile);
                $("input#studentAddressAdmin").empty().val(student.address);

                $("input#studentNameAdmin").attr("readonly", true)
                $("input#studentNameAdmin").attr("placeholder", $("input#studentNameAdmin").val());
                $("input#studentNameAdmin").attr("style","border-style: none;");

                $("input#studentAgeAdmin").attr("readonly", true)
                $("input#studentAgeAdmin").attr("placeholder", $("input#studentAgeAdmin").val());
                $("input#studentAgeAdmin").attr("style","border-style: none;");

                $("input#studentMobileAdmin").attr("readonly", true)
                $("input#studentMobileAdmin").attr("placeholder", $("input#studentMobileAdmin").val());
                $("input#studentMobileAdmin").attr("style","border-style: none;");

                $("input#studentAddressAdmin").attr("readonly", true)
                $("input#studentAddressAdmin").attr("placeholder", $("input#studentAddressAdmin").val());
                $("input#studentAddressAdmin").attr("style","border-style: none;");

                $("button#adminConfirm").hide();
                $("button#adminCancel").hide();
                $("button#adminEdit").show();
                $("button#adminLogout").show();

                $('div#adminEditMsg').empty().append('<div class="alert alert-success" role="alert">Edited Successfully !</div>').show();                    
            },

            error: function() {
                $('div#adminEditMsg').empty().append('<div class="alert alert-danger" role="alert">Edit Failed !</div>').show();                    
            }
        })
    })
})

$(document).ready(function () {
    $("button#studentEdit").click(function (event) {
        
        $("button#studentLogout").hide();
        $("button#studentEdit").hide();
        $("button#studentConfirm").show();
        $("button#studentCancel").show();
        $('div#editMsg').empty().hide();

        $("input#studentName").attr("readonly", false)
        $("input#studentName").attr("placeholder", $("input#studentName").val());
        $("input#studentName").attr("style","border-style: solid 1px;");

        $("input#studentAge").attr("readonly", false)
        $("input#studentAge").attr("placeholder", $("input#studentAge").val());
        $("input#studentAge").attr("style","border-style: solid 1px;");

        $("input#studentMobile").attr("readonly", false)
        $("input#studentMobile").attr("placeholder", $("input#studentMobile").val());
        $("input#studentMobile").attr("style","border-style: solid 1px;");

        $("input#studentAddress").attr("readonly", false)
        $("input#studentAddress").attr("placeholder", $("input#studentAddress").val());
        $("input#studentAddress").attr("style","border-style: solid 1px;");

    })
})

$(document).ready(function () {
    $("button#adminEdit").click(function (event) {
        
        $("button#adminLogout").hide();
        $("button#adminEdit").hide();
        $("button#adminConfirm").show();
        $("button#adminCancel").show();
        $('div#adminEditMsg').empty().hide();

        $("input#studentNameAdmin").attr("readonly", false)
        $("input#studentNameAdmin").attr("placeholder", $("input#studentNameAdmin").val());
        $("input#studentNameAdmin").attr("style","border-style: solid 1px;");

        $("input#studentAgeAdmin").attr("readonly", false)
        $("input#studentAgeAdmin").attr("placeholder", $("input#studentAgeAdmin").val());
        $("input#studentAgeAdmin").attr("style","border-style: solid 1px;");

        $("input#studentMobileAdmin").attr("readonly", false)
        $("input#studentMobileAdmin").attr("placeholder", $("input#studentMobileAdmin").val());
        $("input#studentMobileAdmin").attr("style","border-style: solid 1px;");

        $("input#studentAddressAdmin").attr("readonly", false)
        $("input#studentAddressAdmin").attr("placeholder", $("input#studentAddressAdmin").val());
        $("input#studentAddressAdmin").attr("style","border-style: solid 1px;");

    })
})

$(document).ready(function () {
    $("button#studentCancel").click(function (event) {
        $("button#studentCancel").hide();
        $("button#studentConfirm").hide();
        $("button#studentLogout").show();
        $("button#studentEdit").show();

        $("input#studentName").attr("readonly", true)
        $("input#studentName").val($("input#studentName").attr('placeholder'));
        $("input#studentName").attr("style","border: none;");


        $("input#studentAge").attr("readonly", true)
        $("input#studentAge").val($("input#studentAge").attr('placeholder'));
        $("input#studentAge").attr("style","border: none;");


        $("input#studentMobile").attr("readonly", true)
        $("input#studentMobile").val($("input#studentMobile").attr('placeholder'));
        $("input#studentMobile").attr("style","border: none;");


        $("input#studentAddress").attr("readonly", true)
        $("input#studentAddress").val($("input#studentAddress").attr('placeholder'));
        $("input#studentAddress").attr("style","border: none;");

    })
})

$(document).ready(function () {
    $("button#adminCancel").click(function (event) {
        $("button#adminCancel").hide();
        $("button#adminConfirm").hide();
        $("button#adminLogout").show();
        $("button#adminEdit").show();

        $("input#studentNameAdmin").attr("readonly", true)
        $("input#studentNameAdmin").val($("input#studentNameAdmin").attr('placeholder'));
        $("input#studentNameAdmin").attr("style","border: none;");


        $("input#studentAgeAdmin").attr("readonly", true)
        $("input#studentAgeAdmin").val($("input#studentAgeAdmin").attr('placeholder'));
        $("input#studentAgeAdmin").attr("style","border: none;");


        $("input#studentMobileAdmin").attr("readonly", true)
        $("input#studentMobileAdmin").val($("input#studentMobileAdmin").attr('placeholder'));
        $("input#studentMobileAdmin").attr("style","border: none;");


        $("input#studentAddressAdmin").attr("readonly", true)
        $("input#studentAddressAdmin").val($("input#studentAddressAdmin").attr('placeholder'));
        $("input#studentAddressAdmin").attr("style","border: none;");

    })
})

$(document).ready(function () {
    $("button#studentLogout").click(function (event) {
        $("button#pills-profile-tab").hide();
        $("button#pills-login-tab").show();
        $("button#pills-login-tab").click();
        $("div#editMsg").empty().hide();
    })
})

$(document).ready(function () {
    $("button#adminLogout").click(function (event) {
        $("table#studentDetailAdmin").hide();
        $("input#adminFindById").val("");
        $("div#adminEditMsg").empty();
        $("div#deleteMsg").empty();
        $("button#adminEdit").hide();
        $("button#adminDelete").hide();
        $("button#pills-admin-tab").hide();
        $("button#pills-allStudents-tab").hide();
        $("button#pills-form-tab").hide();
        $("button#pills-login-tab").show();
        $("button#pills-login-tab").click();
        
    })
})