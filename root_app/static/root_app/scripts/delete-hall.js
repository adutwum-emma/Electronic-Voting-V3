
$('.delete-hall').click(function(){

    let hallID = $(this).parents('td').children('input[type=hidden]').val()
    
    swal(
        {
          title: "Are you sure to delete ?",
          text: "You will not be able to recover deleted items !!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it !!",
          closeOnConfirm: false,
        },
        function (isConfirm) {

            if(isConfirm){
                deleteHall(hallID)
            }
          
        }
    )


})

function deleteHall(hallID){
    $.ajax({
        url: '/root/delete_hall/',
        type: 'post',
        data:{
            hall_id: hallID,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            if(response.code == 200){
                swal(
                    "Deleted !!",
                    response.message,
                    "success"
                );

                $('#hall'+hallID).fadeOut('slow').empty()
            }
            else{
                swal(
                    "Unsuccess !!",
                    response.message,
                    "error"
                );
            }
        },

        error: function(){
            errorValidator('Something went wrong, try again', 'Error')
        }
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