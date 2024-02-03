$("#add-permission").click(function(){

    let options = $('#permissions').find('option:checked')

    for(var data = 0; data < options.length; data++){
        $('#added-permissions').append(`
            <option value=${$(options[data]).prop('value')}>${$(options[data]).text()}</option>
        `)
    }

    $(options).remove()

})

$('#remove-permission').click(function(){

    let options = $('#added-permissions').find('option:checked')

    for(var data = 0; data < options.length; data++){
        $('#permissions').append(`
            <option value=${$(options[data]).prop('value')}>${$(options[data]).text()}</option>
        `)
    }

    $(options).remove()

})


$('#save-perm').click(function(){

    let options = $('#added-permissions').find('option')

    let selected = []

    for(var data = 0; data < options.length; data++){
        selected.push($(options[data]).prop('value'))
    }

    $.ajax({

        url: $('#select-form').prop('action'),
        type: 'post',
        data: {
            perm_ids: selected,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        beforeSend: function(){
            $('#save-perm').html(
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

            $('#save-perm').text('SAVE').prop('disabled', false)
        },

        error: function(){
            errorValidator('Something went weong, try again', 'Error')

            $('#save-perm').text('SAVE').prop('disabled', false)

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