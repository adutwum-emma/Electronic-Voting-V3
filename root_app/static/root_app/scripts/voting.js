$(document).ready(function(){

    let forms = $('.voting-form')

    let currentForm = 0

    $(forms[currentForm]).show()

    $('#next-but').click(function(){

        if (currentForm < forms.length - 1){

            $(forms[currentForm]).hide()
            currentForm++
            $(forms[currentForm]).show()

            $('#previous-but').prop('disabled', false)

        }
        else{
            $(this).text("Continue")
        }

    })

    $('#previous-but').click(function(){
        
        if(currentForm > 0){

            $(forms[currentForm]).hide()
            currentForm--
            $(forms[currentForm]).show()

            $('#next-but').html(
                `Next <i class="mdi mdi-arrow-right-bold"></i>`
            )
        }
        else{

            $(this).prop('disabled', false)

        }

    })

})