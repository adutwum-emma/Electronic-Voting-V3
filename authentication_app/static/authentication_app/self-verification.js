$(document).on('submit', '#self-verification', function(e){

    e.preventDefault();

    let data = new FormData($('#self-verification').get(0))

    $.ajax({

        url: $('#self-verification').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#self-verification').find('button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Sending code...</span>`
            ).prop('disabled', true)
        },

        success: function(response){
            if(response.code ==200){
                localStorage.setItem('username', $('#username').val())
                successValidator(response.message, 'Success')

                setTimeout(function(){
                    location.href = response.url
                }, 2000)
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#self-verification').find('button').text("SEND CODE").prop('disabled', false)
        },

        error: function(){
            errorValidator("Something went wrong, try again", "Error")

            $('#self-verification').find('button').text("SEND CODE").prop('disabled', false)

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