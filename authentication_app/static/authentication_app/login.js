
$(document).ready(function(){
    let username = localStorage.getItem('username')

    $('#username').val(username)

    localStorage.removeItem('username')
})

$(document).on('submit', '#login', function(e){

    e.preventDefault();

    if( $('#username').val() == "" ){
        errorValidator('Username required', 'Required field')
    }
    else if ( $('#password').val() == "" ){
        errorValidator('Password required', 'Required field')
    }
    else{
        login()
    }

})

function login(){

    let data = new FormData($('#login').get(0))

    $.ajax({
        
        url: $('#login').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#login-button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Please wait..</span>`
            ).prop('disabled', true)
        },

        success: function(response){

            if (response.code == 200){
                location.href = response.url
            }
            else{
                errorValidator(response.message, 'Unsuccess')

                $('#login-button').text('SIGN IN').prop('disabled', false)
            }

        },

        error: function(){
            errorValidator('Something went wrong', 'Error')
            $('#login-button').text('SIGN IN').prop('disabled', false)
        }

    })

}


function successValidator(message, title){
    toastr.success(message, title,{
        "positionClass": "toast-top-center",
        timeOut: 5000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false

    })
}

function errorValidator(message, title){
    toastr.error(message, title,{
        "positionClass": "toast-top-center",
        timeOut: 5000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false

    })

}
