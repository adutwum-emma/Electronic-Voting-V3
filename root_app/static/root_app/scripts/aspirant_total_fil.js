$('#election').change(function(){

    $.ajax({

        url: '/root/getting_totalaspirants/',
        type: 'post',
        data: {
            election: $(this).val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            $('#t-asp-var').text(response.total_aspirants)
        }

    })

})