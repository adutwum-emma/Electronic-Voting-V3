$(document).on('submit', '#edit-election-form', function(e){

    e.preventDefault();

    let data = new FormData($('#edit-election-form').get(0))

    $.ajax({

        url: $('#edit-election-form').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){

            $('#edit-election-form').find('input[type=text], input[type=number], input[type=date], input[type=time], input[type=checkbox], input[type=radio], select').prop('disabled', true)

            $('#edit-election-but').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Updating...</span>`
            ).prop('disabled', true)

        },

        success: function(response){
            
            if(response.code == 200){
                successValidator(response.message, 'Success')
            }
            else{

                errorValidator(response.message, 'Unsuccess')

            }
            $('#edit-election-but').text('SAVE').prop('disabled', false)

            $('#edit-election-form').find('input[type=text], input[type=number], input[type=date], input[type=time], input[type=checkbox], input[type=radio], select').prop('disabled', false)
            
        },

        error: function(){

            errorValidator('Something went wrong, try again', 'Error')

            $('#edit-election-but').text('SAVE').prop('disabled', false)

            $('#edit-election-form').find('input[type=text], input[type=number], input[type=date], input[type=time], input[type=checkbox], input[type=radio], select').prop('disabled', false)

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