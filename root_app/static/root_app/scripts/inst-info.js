$(document).ready(function(){

    $(document).on('submit', '#inst-info', function(e){

        e.preventDefault();

        let data = new FormData($('#inst-info').get(0))

        $.ajax({

            url: $('#inst-info').prop('action'),
            type: 'post',
            contentType: false,
            processData: false,
            data: data,

            beforeSend: function(){
                $('#save-info-but').html(
                    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Saving...</span>`
                ).prop('disabled', true)
            },

            success: function(response){
                if(response.code == 200){
                    successValidator(response.message, 'Success')
                }
                else{
                    errorValidator(response.message, 'Unsuccess')
                }

                $('#save-info-but').text('SAVE').prop('disabled', false)
            },

            error: function(){
                errorValidator("Something went wrong, try again", "Error")
                $('#save-info-but').text('SAVE').prop('disabled', false)

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
    

})