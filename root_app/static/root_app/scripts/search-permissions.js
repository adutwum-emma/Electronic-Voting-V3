$('#search-bar').keyup(function(){

    $('#permissions').empty()

    $.ajax({
        url: $('#search-form').prop('action'),
        type: 'post',
        data:{
            search_item: $(this).val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){

            for (var data in response.permissions){
                $('#permissions').append(
                    `<option value=${response.permissions[data].id}>${response.permissions[data].name} | ${response.permissions[data].codename}</option>`
                )
            }

        }
    })
    
})