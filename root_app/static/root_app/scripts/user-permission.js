$(document).on('submit', '#add-group-form', function(e){

    e.preventDefault();

    let data = new FormData($('#add-group-form').get(0))

    $.ajax({

        url: $('#add-group-form').prop('action'),
        type: 'post',
        data:data,
        contentType: false,
        processData: false,

        beforeSend: function(){
            $('#save-user-perm').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>SAVING...</span>`
            ).prop('disabled', true)
        },

        success: function(response){
            if(response.code == 200){
                successValidator(response.message, 'Success')
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-user-perm').text('SAVE').prop('disabled', false)
        },

        error: function(){
            errorValidator('Something went wrong, try again', 'Error')
            $('#save-user-perm').text('SAVE').prop('disabled', false)
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