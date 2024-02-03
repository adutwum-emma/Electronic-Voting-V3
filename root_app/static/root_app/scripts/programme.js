$(document).on('submit', '#programme-form', function(e){

    e.preventDefault();

    let data = new FormData($('#programme-form').get(0))

    $.ajax({

        url: $('#programme-form').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#save-prgramme').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>SAVING...</span>`
            ).prop('disabled', true)
        },

        success: function(response){
            if(response.code == 200){
                successValidator(response.message, 'Success')

                if(!$('#is_update').val()){
                    $('#programme-form')[0].reset()
                }
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-prgramme').text('SAVE').prop('disabled', false)
        },

        error: function(){
            successValidator('Something went wrong, please try again', 'Error')
            $('#save-prgramme').text('SAVE').prop('disabled', false)

        }

    })

})

function successValidator(message, title){
    toastr.success(message, title,{
        "positionClass": "toast-bottom-center",
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
        "positionClass": "toast-bottom-center",
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