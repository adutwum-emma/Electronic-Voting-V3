const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

$(document).on('submit', '#verification-form', function(e){

    e.preventDefault()

    let data = new FormData($("#verification-form").get(0))

    $.ajax({

        url: $("#verification-form").prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $("#verification-form").find('button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Verifying...</span>`
            ).prop('disabled', true)
        },

        success: function(response){

            if(response.code == 200){
                successValidator(response.message, 'Success')

                $('#detail-area').html(
                    `<h5 class="card-title">User Details</h5>
                    <table class="table table-striped">
                        <tr>
                            <td>Full name</td>
                            <td>${response.user_detail.full_name}</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>${response.user_detail.year_class}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>${response.user_detail.password}</td>
                        </tr>
                    </table>`
                )

                $("#verification-form")[0].reset()
                
                speak(response.message)
                
            }
            else{
                errorValidator(response.message, 'Unsuccess')
            }

            $("#verification-form").find('button').text(
                "VERIFY"
            ).prop('disabled', false)

        },

        error: function(){
            errorValidator('Something went wrong', "Error")

            $("#verification-form").find('button').text(
                "VERIFY"
            ).prop('disabled', false)
        }

    })

})

function speak(message) {
    utterance.text = message;
    synth.speak(utterance);
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