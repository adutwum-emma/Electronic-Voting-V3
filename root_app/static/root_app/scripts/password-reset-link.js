$(document).ready(function(){

    $('#link-button').click(function(){

        $.ajax({
            url: '/root/send_password_link/',
            type: 'post',
            data: {
                user_id:$('#user_id').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },

            beforeSend: function(){
                $('#link-button').html(
                    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Sending link...</span>`
                ).prop('disabled', true)
            },

            success: function(response){
                if(response.code == 200){
                    successValidator(response.message, 'Success')
                }
                else{
                    errorValidator(response.message, 'Unsuccess')
                }

                $('#link-button').text("Send password reset link").prop('disabled', false)
            }
        })

    })

})


function successValidator(message, title){
    toastr.success(message, title,{
        "positionClass": "toast-bottom-right",
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
        "positionClass": "toast-bottom-right",
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