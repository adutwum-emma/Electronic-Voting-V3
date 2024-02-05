$('#check-all').change(function(){

    if($(this).prop('checked')){
        $('tbody :checkbox').each(function(){
            $(this).prop('checked', true)
        })
    }
    else{
        $('tbody :checkbox').each(function(){
            $(this).prop('checked', false)
        })
    }

})

let selected_ids = []

$('#delete-button').click(function(){

    selected_ids = []

    $('tbody :checkbox:checked').each(function(id){

        selected_ids.push($(this).val())

    })
    
    if (selected_ids.length <= 0){
        errorValidator('No electorate is seleted', "Error")
    }else{

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
                    deleteSelectedElectorates()
                }
              
            }
        )

    }

})

function deleteSelectedElectorates(){

    $.ajax({

        url: '/root/delete_bulkelectorates/',
        type: 'post',
        data: {
            ids: selected_ids,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },

        success: function(response){
            if (response.code == 200){

                swal(
                    "Deleted !!",
                    response.message,
                    "success"
                );

                for(var data in selected_ids){
                    $(`#electorate${selected_ids[data]}`).fadeOut('slow').empty()
                }

            }
            else{

                swal(
                    "Unsuccess !!",
                    response.message,
                    "error"
                );

            }
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