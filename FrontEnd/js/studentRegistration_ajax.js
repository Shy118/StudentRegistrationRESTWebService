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
                    $('div#registrationMsg').empty().append('<p class="text-success">' + 'Registered Successfully !' + '</p>');
                    
                },
                error: function () {
                    $('div#registrationMsg').empty().append('<p class="text-danger">' + 'Registration Failed !' + '</p>');
                    
                }
            })
        }
        else {
            $('div#registrationMsg').empty().append('<p class="text-danger">' + 'Registration Failed !' + '</p>');
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
                $.each(studentArray, function (index, student) {
                    var studentInfo = '<p>';
                    studentInfo += 'Student ID: ' + student.id+ '<br>';
                    studentInfo += 'Name: ' + student.name + '<br>';
                    studentInfo += 'Age: ' + student.age + '<br>';
                    studentInfo += 'Mobile No: ' + student.mobile + '<br>';
                    studentInfo += 'Address: ' + student.address + '<br>';
                    studentInfo += '</p><hr>';
                
                    $('div#allStudents').append(studentInfo);
                })
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
        var id = $('input#adminFindById').val();
        if (id == '') {
            alert('Please enter a student ID');
        }
        else {
            $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/student/' + id,
            success: function(student) {
                $('td#studentIdAdmin').empty().append(student.id).show();
                $('td#studentNameAdmin').empty().append(student.name).show();
                $('td#studentAgeAdmin').empty().append(student.age).show();
                $('td#studentMobileAdmin').empty().append(student.mobile).show();
                $('td#studentAddressAdmin').empty().append(student.address).show();

                $("table#studentDetailAdmin").show();
                $("button#adminDelete").show();
            },
            error: function() {
                alert('You are not registered as a student, please proceed to submit your registration form');
            }
            })
        }
        
    })
})

$(document).ready(function () {
    $("button#adminDelete").click(function (event) {
        var id = $('td#studentIdAdmin').text();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/student/' + id,
            success: function() {
                $('div#deleteMsg').empty().append('<p class="text-success">' + 'Student ' + id + ' deleted successfully !' + '</p>').show();
                $("button#adminDelete").hide();
                $("table#studentDetailAdmin").hide();
            },
            error: function() {
                $('div#deleteMsg').empty().append('<p class="text-danger">' + 'Failed to delete Student ' + id + ' !' + '</p>').show();
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

                $('input#studentId').empty().val(student.id);
                $('input#studentName').empty().val(student.name);
                $('input#studentAge').empty().val(student.age);
                $('input#studentMobile').empty().val(student.mobile);
                $('input#studentAddress').empty().val(student.address);

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

                $('div#editMsg').empty().append('<p class="text-success">' + 'Edited Successfully !</p>').show();
            },

            error: function() {
                $('div#editMsg').empty().append('<p class="text-danger">' + 'Failed to edit your detail</p>').show();
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
    $("button#studentLogout").click(function (event) {
        $("button#pills-profile-tab").hide();
        $("button#pills-login-tab").show();
        $("button#pills-login-tab").click();
        $('div#editMsg').empty().hide();
    })
})

$(document).ready(function () {
    $("button#adminLogout").click(function (event) {
        $("button#pills-admin-tab").hide();
        $("button#pills-allStudents-tab").hide();
        $("button#pills-login-tab").show();
        $('button#pills-login-tab').click();
    })
})