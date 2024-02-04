$('#excel_file').change(function(){

    let data = new FormData($('#excel-data-form').get(0)) 

    $.ajax({
        url: '/root/get_excel_data/',
        type: 'post',
        contentType: false,
        processData: false,
        data: data,
            
        beforeSend: function(){

            $("#excel-data-form").find('select, button').prop('disabled', true)

            $("#excel-loading-box").html(
                `<span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span>Loading excel data ...</span>`
            )

        },

        success: function(response){

            $("#excel-datatable").find('thead').html(
                `<tr id=heads>  

                </tr>`
            )
            
            $('#heads').empty()

            for (var data in response.headers){
                $('#heads').append(
                    `<th>${response.headers[data]}</th>`
                )
            }

            $("#excel-datatable").find('tbody').empty()

            for (var ele in response.all_data){

                $("#excel-datatable").find('tbody').append(
                    `<tr id=datarow${ele}>
                    
                    </tr>`
                )

                for (var data in response.all_data[ele]){

                    $(`#datarow${ele}`).append(
                        `<td>${response.all_data[ele][data]}</td>`
                    )

                }
            }

            $("#excel-loading-box").empty()
            $("#excel-data-form").find('select, button').prop('disabled', false)


        },

        error: function(){
            $("#excel-loading-box").empty()
        }
    })

})