$('#election').change(function(){
    getFilteredAspirants()
})

$('#position').change(function(){
    getFilteredAspirants()
})

function getFilteredAspirants(){

    $.ajax({

        url: '/root/filter_aspirant/',
        type: 'post',
        data:{
            election: $('#election').val(),
            position: $('#position').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            $('#list-body').empty()

            for (var ele in response.data){
                $('#list-body').append(
                    `<tr id="aspirant${response.data[ele].id}">
                        <td> <img src="${response.data[ele].photo}" alt=""> </td>
                        <td>${response.data[ele].full_name}</td>
                        <td>${response.data[ele].election}</td>
                        <td>${response.data[ele].position}</td>
                        <td id=aspir${response.data[ele].id}>
                            <input type="hidden" value="${response.data[ele].id}">

                        </td>
                    </tr>
                    `
                )

                if(response.data[ele].can_view){

                    $(`#aspir${response.data[ele].id}`).append(
                        `<button class="btn btn-sm btn-info view-asp"><i class="mdi mdi-eye"></i> </button>
                        `
                    )
                }

                if(response.data[ele].can_edit){

                    $(`#aspir${response.data[ele].id}`).append(
                        `<a href="${response.data[ele].url}" class="btn btn-sm btn-primary">Edit <i class="mdi mdi-pencil"></i> </a>
                        `
                    )
                    
                }

                if(response.data[ele].can_delete){

                    $(`#aspir${response.data[ele].id}`).append(
                        `<button class="btn btn-sm btn-danger delete-aspirant"> <i class="mdi mdi-delete"></i> </button>
                        `
                    )
                    
                }
            }
        }

    })

}