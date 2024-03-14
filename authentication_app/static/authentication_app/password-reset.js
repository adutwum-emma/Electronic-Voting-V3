$(document).ready(function(){

    $(document).on('submit', '#password-reset', function(e){
        e.preventDefault()

        let data = new FormData($('#password-reset').get(0))

        $.ajax({

            url: $('#password-reset').prop('action'),
            type: 'post',
            contentType: false,
            processData: false,
            data: data,

            beforeSend: function(){

                $('#password-reset').find('input[type=password]').prop('diasbled', true)

                $('#password-reset').find('button').html(
                    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Please wait..</span>`
                ).prop('disabled', true)

            },

            success: function(response){

                if(response.code == 200){
                    successValidator(response.message, 'Success')

                    location.href = response.url
                }
                else{
                    errorValidator(response.message, "Unsuccess")
                }

                $('#password-reset').find('input[type=password]').prop('diasbled', false)

                $('#password-reset').find('button').text(
                    `CHANGE PASSWORD`
                ).prop('disabled', false)

            },
            
            error: function(){

                errorValidator('Something went wrong', "Error")

                $('#password-reset').find('input[type=password]').prop('diasbled', false)

                $('#password-reset').find('button').text(
                    `CHANGE PASSWORD`
                ).prop('disabled', false)

            }

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