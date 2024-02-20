$(document).on('submit', '#current-election', function(e){

    e.preventDefault();

    let data = new FormData($('#current-election').get(0))

    $.ajax({

        url: $('#current-election').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#current-election').find('button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Setting...</span>`
            ).prop('disabled', true)
        },

        success: function(response){
            if(response.code == 200){
                successValidator(response.message, "Validated!!")
            }
            else{
                errorValidator(response.message, "Unsuccess") 
            }

            $('#current-election').find('button').text(
                "SAVE"
            ).prop('disabled', false)
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
