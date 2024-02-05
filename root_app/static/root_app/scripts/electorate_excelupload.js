$(document).on('submit', '#excel-data-form', function(e){

    e.preventDefault();

    let data = new FormData($('#excel-data-form').get(0))

    $.ajax({

        url: $('#excel-data-form').prop('ation'),
        type: 'post',
        processData: false,
        contentType: false,
        data: data,

        beforeSend: function(){

            $("#excel-data-form").find('select, button, input[type=file]').prop('disabled', true)

            $('#excel-data-form').find('button').html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Uploading</span>`
            )
        },

        success: function(response){

            if (response.code == 200){

                if (response.response_length > 0){

                    $("#excel-datatable").find('thead').html(
                        `<tr id=heads>  

                        </tr>`
                    )

                    $('#heads').empty()

                    $('#heads').html(
                        `   <th>Error Message</th>
                            <th>Index Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Other Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        `
                    )
                    
                    $("#excel-datatable").find('tbody').empty();

                    for(var data in response.response_data){
                        $("#excel-datatable").find('tbody').append(
                            `<tr>
                                <td style=color:red>${response.response_data[data].response_message}</td>
                                <td>${response.response_data[data].index_number}</td>
                                <td>${response.response_data[data].first_name}</td>
                                <td>${response.response_data[data].last_name}</td>
                                <td>${response.response_data[data].other_name}</td>
                                <td>${response.response_data[data].email}</td>
                                <td>${response.response_data[data].phone_number}</td>
                            </tr>`
                        )
                    }
                    
                    warningValidator(response.data_report, "Warning")
                }
                else{
                    $('#excel-data-form')[0].reset()

                    $('#heads').empty()

                    $("#excel-datatable").find('tbody').empty()

                    successValidator(response.message, 'Success')
                }

            }
            else{
                errorValidator(response.message, "Unsuccess")
            }

            $("#excel-data-form").find('select, button, input[type=file]').prop('disabled', false)

            $('#excel-data-form').find('button').text('SAVE')
        },

        error: function(){

            errorValidator('Something went wrong, try again')

            $("#excel-data-form").find('select, button, input[type=file]').prop('disabled', false)

            $('#excel-data-form').find('button').text('SAVE')

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

function warningValidator(message, title){
    toastr.warning(message, title,{
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