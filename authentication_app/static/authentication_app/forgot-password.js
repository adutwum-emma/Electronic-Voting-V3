$(document).ready(function(){

    $(document).on('submit', '#forgot-password', function(e){

        e.preventDefault();

        let data = new FormData($('#forgot-password').get(0))

        $.ajax({

            url: $('#forgot-password').prop('action'),
            type: 'post',
            contentType: false,
            processData: false,
            data: data,

            beforeSend: function(){
                $('#forgot-password').find('input[type=text]').prop('disabled', true)

                $('#forgot-password').find('button').html(
                    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Please wait..</span>`
                ).prop('disabled', true)
            },

            success: function(response){
                if (response.code == 200){
                    successValidator(response.message, "Success")
                }
                else{
                    errorValidator(response.message, "Unsuccess")
                }

                $('#forgot-password').find('input[type=text]').prop('disabled', false)

                $('#forgot-password').find('button').text(
                    `CONTINUE`
                ).prop('disabled', false)
            },

            error: function(){

                errorValidator("Something went wrong, try again. Contact administrator if problem persist.", "Error")

                $('#forgot-password').find('input[type=text]').prop('disabled', false)

                $('#forgot-password').find('button').text(
                    `CONTINUE`
                ).prop('disabled', false)
            },

        })

    })


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

})