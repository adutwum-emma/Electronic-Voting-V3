$(document).ready(function(){

    let forms = $('.voting-form')

    let currentForm = 0

    let selected_ids

    $(forms[currentForm]).show()

    $('#next-but').click(function(){

        if (currentForm < forms.length - 1){

            $(forms[currentForm]).hide('slow')
            currentForm++
            $(forms[currentForm]).show('slow')

            $('#previous-but').prop('disabled', false)

            if(currentForm >= forms.length - 1){
                $(this).text("Continue")
            }
            
            $('html, body').animate({scrollTop: 0}, 800)

        }
        else{
            $('#confirmation-modal').modal('show')

            getSelectedAsps()
        }

    })

    $('#previous-but').click(function(){
        
        if(currentForm > 0){

            $(forms[currentForm]).hide('slow')
            currentForm--
            $(forms[currentForm]).show('slow')

            $('#next-but').html(
                `Next <i class="mdi mdi-arrow-right-bold"></i>`
            ).prop('disabled', false)

            if(currentForm <= 0){
                $(this).prop('disabled', true)
            }

            $('html, body').animate({scrollTop: 0}, 800)

        }

    })

    $('#confirm').click(function(){
        submitVote()
    })


    function getSelectedAsps(){

        selected_ids = []

        $('.card-body :radio:checked').each(function(){
            selected_ids.push($(this).val())
        })

        $.ajax({
    
            url: '/root/get_selected_aspirants/',
            type: 'post',
            data: {
                asp_ids: selected_ids,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
    
            success: function(response){

                $('tbody').empty()

                for (var ele in response.data){
                    $('tbody').append(
                        `<tr>
                            <td>${response.data[ele].position}</td>
                            <td><img src=${response.data[ele].passport_picture}></td>
                            <td>${response.data[ele].full_name}</td>
                            <td>${response.data[ele].ballot_number}</td>
                        </tr>`
                    )
                }
            }
    
        })
    }

    function submitVote(){
        $.ajax({

            url: $(forms[currentForm]).prop('action'),
            type: 'post',
            data:{
                asp_ids: selected_ids,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },

            beforeSend: function(){
                $('#confirm').html(
                    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Submitting...</span>`
                ).prop('disabled', true)
            },

            success: function(response){
                if(response.code == 200){

                    successValidator(response.message, "Vote Casted")

                    setTimeout(function(){
                        location.href = response.url
                    }, 2000)

                }
                else{

                    errorValidator(response.message, "Unsuccessfull")

                }

                
                $('#confirm').html(
                    "Confirm"
                ).prop('disabled', false)
            },

            error: function(){

                errorValidator('Something went wrong, try again', 'Error')

                $('#confirm').html(
                    "Confirm"
                ).prop('disabled', false)
            }

        })
    }

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

