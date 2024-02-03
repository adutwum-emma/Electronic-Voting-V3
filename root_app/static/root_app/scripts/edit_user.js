$(document).on('submit', '#edit-user', function(e){

    e.preventDefault();

    editUser();

})

function editUser(){

    let data = new FormData($('#edit-user').get(0))

    $.ajax({

        url: $('#edit-user').prop('action'),
        type: 'post',
        processData: false,
        contentType: false,
        data: data,

        beforeSend: function(){
            $('#save-button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Saving...</span>`
            ).prop('disabled', true)

            $('#edit-user').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', true)
        },

        success: function(response){
            if(response.code == 200){
                successValidator(response.message, 'Success')
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-button').text('SAVE CHANGES').prop('disabled', false)

            $('#edit-user').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)            
        },

        error: function(){

            errorValidator('Something went wrong', 'Error')

            $('#save-button').text('SAVE').prop('disabled', false)

            $('#new-user').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)

        }

    })

}


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
