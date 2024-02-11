$('#election').change(function(){

    $.ajax({

        url: '/root/position_filter/',
        type: 'post',
        data:{
            election: $('#election').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            $('tbody').empty()
            let counter = 0
            for (var ele in response.data){
                counter++
                $('tbody').append(
                    `<tr id=hall${response.data[ele].id}>
                        <td>${counter}</td>
                        <td>${response.data[ele].position_name}</td>
                        <td>${response.data[ele].election}</td>
                    </tr>`
                )

                if(response.data[ele].can_change){
                    $(`#hall${response.data[ele].id}`).append(
                        `<a href="${response.data[ele].url}"class="btn btn-sm btn-primary me-3"> Edit <i class="mdi mdi-pencil"></i></a>
                        `
                    )
                }

                if(response.data[ele].can_delete){
                    $(`#hall${response.data[ele].id}`).append(
                        `<button class="btn btn-sm ms-3 btn-danger delete-post"><i class="mdi mdi-delete"></i></button>
                        `
                    )
                }
            }
        }

    })

})