
$('.unverify-electorate').click(function(){

    let uvID = $(this).parents('td').children('input[type=hidden]').val()

    
    swal(
        {
          title: "Are you sure you want unverify this user?",
          text: "Unverified users can be verified again!!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, unverify!!",
          closeOnConfirm: false,
        },
        function (isConfirm) {

            if(isConfirm){
                deleteUser(uvID)
            }
          
        }
    )


})

function deleteUser(uvID){
    $.ajax({
        url: '/root/unverify_electorate/',
        type: 'post',
        data:{
            uv_id: uvID,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            if(response.code == 200){
                swal(
                    "Unverified !!",
                    response.message,
                    "success"
                );

                $('#electorate'+uvID).fadeOut('slow').empty()
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