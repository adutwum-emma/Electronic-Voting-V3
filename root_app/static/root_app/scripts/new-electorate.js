$(document).on('submit', '#new-electorate-form', function(e){

    e.preventDefault();

    let data = new FormData($('#new-electorate-form').get(0))


    $.ajax({

        url: $('#new-electorate-form').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){

            $('#save-electorate-but').html(

                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Saving...</span>`

            ).prop('disabled', true)

            $('#new-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', true)

        },

        success: function(response){

            if(response.code == 200){
                successValidator(response.message, 'Success')
                $('#new-electorate-form')[0].reset()
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-electorate-but').text('SAVE').prop('disabled', false)

            $('#new-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)

        },

        error: function(){
            errorValidatorValidator('Something went wrong, try again', 'Error')
            $('#save-electorate-but').text('SAVE').prop('disabled', false)

            $('#new-electorate-form').find('input[type=text], input[type=email], input[type=number], select').prop('disabled', false)

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