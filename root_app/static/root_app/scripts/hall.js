$(document).on('submit', '#hall', function(e){

    e.preventDefault();

    let data = new FormData($('#hall').get(0))

    $.ajax({

        url: $('#hall').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#save-hall').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Saving...</span>`
            ).prop('disabled', true)

            $('#hall').find('input[type=text]').prop('disabled', true)
        },

        success: function(response){

            if(response.code == 200){
                successValidator(response.message, 'Success')

                if(!$('#is_update').val()){
                    $('#hall')[0].reset()
                }

            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-hall').text('SAVE').prop('disabled', false)

            $('#hall').find('input[type=text]').prop('disabled', false)

        },

        error: function(){
            errorValidator('Something went wrong', 'Error')

            $('#save-hall').text('SAVE').prop('disabled', false)

            $('#hall').find('input[type=text]').prop('disabled', false)

        }

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
