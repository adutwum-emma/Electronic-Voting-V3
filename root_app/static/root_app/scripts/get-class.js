$('#programme').change(function(){

    getClasses()

})

function getClasses(){

    $.ajax({

        url: '/root/get_class/',
        type: 'post',
        data:{
            programme_id: $('#programme').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){

            $('#year_class').empty().append(
                `<option value="">Choose Class</option>`
            )

            for(var data in response.class){
                $('#year_class').append(
                    `<option value=${response.class[data].id}>${response.class[data].class_name}</option>`
                )
            }

        }

    })

}