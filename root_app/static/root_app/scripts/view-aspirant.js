$(document).ready(function(){

    $('.view-asp').click(function(){

        let aspirantID = $(this).parents('td').children('input[type=hidden]').val()
    
        $.ajax({
    
            url: '/root/view_aspirant/',
            type: 'post',
            data:{
                aspirant_id: aspirantID,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
    
            success: function(response){
    
                $('#photo').prop('src', response.photo)
    
                $('#table-view').empty().html(
                    `
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>${response.full_name}</td>
                        </tr>
                        <tr>
                            <td>Election</td>
                            <td>${response.election}</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            <td>${response.position}</td>
                        </tr>
                        <tr>
                            <td>Ballot number</td>
                            <td><strong>${response.ballot_number}</strong></td>
                        </tr>
                        <tr>
                            <td>Date added</td>
                            <td>${response.date_added}</td>
                        </tr>
                    </tbody>`
                )
    
            }
    
        })
    
        $('#view-asp-modal').modal('show')
    
    })

})