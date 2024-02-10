$(document).on('submit', '#add-aspirant', function(e){

    e.preventDefault();

    let data = new FormData($("#add-aspirant").get(0))

    $.ajax({

        url: $('#add-aspirant').prop('action'),
        type: 'post',
        contentType: false,
        processData: false,
        data: data,

        beforeSend: function(){
            $('.asp-button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Saving...</span>`
            ).prop('disabled', true)
            $('#add-aspirant').find('input[type=text], select').prop('disabled', true)
        },

        success: function(response){

            if(response.code == 200){

                successValidator(response.message, "Success")

                $("#add-aspirant")[0].reset()

                $('#image').prop('src', window.thumbnail)

                $("#filter_ballotnumber").empty()

                $('#position').empty()

                $('#position').html(
                    `<option>Choose Position</option>`
                )

            }
            else{

                errorValidator(response.message, "Unsuccess")
            }

            $('.asp-button').text("SAVE").prop('disabled', false)
            $('#add-aspirant').find('input[type=text], select').prop('disabled', false)

        },

        error: function(){
            errorValidator("Something went wrong, try again", "Error")
            $('.asp-button').text("SAVE").prop('disabled', false)
            $('#add-aspirant').find('input[type=text], select').prop('disabled', false)
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


$('#election').change(function(){

    $.ajax({

        url: '/root/position_filter/',
        type: 'post',
        data:{
            election: $('#election').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){

            $('#position').empty()

            $('#position').html(
                `<option>Choose Position</option>`
            )

            for (var data in response.data){
                $('#position').append(
                    `<option value=${response.data[data].id}>${response.data[data].position_name}</option>`
                )
            }

            $("#filter_ballotnumber").empty()

        }

    })

})


$("#position").change(function(){

    $.ajax({

        url: '/root/filter_ballotnumber/',
        type: 'post',
        data: {
            position: $(this).val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            $("#filter_ballotnumber").empty()

            for (var ele in response.data){
                $("#filter_ballotnumber").append(
                    `<option value=${response.data[ele]}>${response.data[ele]}</option>`
                )
            }
        }

    })

})