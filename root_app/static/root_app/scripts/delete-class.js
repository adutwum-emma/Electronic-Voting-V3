
$('.delete-class').click(function(){

    let classID = $(this).parents('td').children('input[type=hidden]').val()
    
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
                deleteProgramme(classID)
            }
          
        }
    )


})

function deleteProgramme(classID){
    $.ajax({
        url: '/root/delete_class/',
        type: 'post',
        data:{
            class_id: classID,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            if(response.code == 200){
                swal(
                    "Deleted !!",
                    response.message,
                    "success"
                );

                $('#class'+classID).fadeOut('slow').empty()
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