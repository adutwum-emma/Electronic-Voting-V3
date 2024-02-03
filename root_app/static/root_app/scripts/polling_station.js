$(document).on('submit', '#poll_station', function(e){

    e.preventDefault();

    let data = new FormData( $('#poll_station').get(0) );

    $.ajax({

        url: $('#poll_station').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('#save-station').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Saving...</span>`
            ).prop('disabled', true)

            $('#poll_station').find('input[type=text]').prop('disabled', true)
        },

        success: function(response){

            if(response.code == 200){
                successValidator(response.message, 'Success')

                if(!$('#is_update').val()){
                    $('#poll_station')[0].reset()
                }

            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $('#save-station').text('SAVE').prop('disabled', false)

            $('#poll_station').find('input[type=text]').prop('disabled', false)

        },

        error: function(){
            errorValidator('Something went wrong', 'Error')

            $('#save-station').text('SAVE').prop('disabled', false)

            $('#poll_station').find('input[type=text]').prop('disabled', false)

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
