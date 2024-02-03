$(document).on('submit', '#edit-electorate-form', function(e){

    e.preventDefault();

    let data = new FormData($('#edit-electorate-form').get(0))


    $.ajax({

        url: $('#edit-electorate-form').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){

            $('#save-electorate-but').html(

                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Updating...</span>`

            ).prop('disabled', true)

            $('#edit-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', true)

        },

        success: function(response){

            if(response.code == 200){
                successValidator(response.message, 'Success')
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-electorate-but').text('SAVE').prop('disabled', false)

            $('#edit-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)

        },

        error: function(){
            errorValidatorValidator('Something went wrong, try again', 'Error')
            $('#save-electorate-but').text('SAVE').prop('disabled', false)

            $('#edit-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)

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