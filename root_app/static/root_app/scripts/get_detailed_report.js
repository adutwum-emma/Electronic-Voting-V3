$(document).ready(function(){

    $(document).on('submit', '#report-form', function(e){

        e.preventDefault();

        let date = new Date()

        let data = new FormData($('#report-form').get(0))

        $.ajax({

            url: '#report-form',
            type: 'post',
            data: data,
            contentType: false,
            processData: false,

            beforeSend: function(){
                $('#details-body').html(
                    `<div class="card-body text-center">
                        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                        <span class=text-muted>Please wait while getting data ...</span>
                    </div>`
                )
            },

            success: function(response){
                if(response.code == 200){
                    $('#details-body').html(
                        `<div class="card-body">
                            <h6 class="text-muted">User Details</h6> <hr>
                            <div class="row mb-3">
                                <div class="col-sm-2">Full name :</div>
                                <div class="col-sm-8"> ${response.details.full_name} </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-2">Email : </div>
                                <div class="col-sm-8"> ${response.details.email} </div>
                            </div>
            
                            <div class="row mb-3">
                                <div class="col-sm-2">Date added : </div>
                                <div class="col-sm-8"> ${response.details.time_stamp} </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-sm-2">Last login : </div>
                                <div class="col-sm-8"> ${response.details.last_login} </div>
                            </div>
            
                            <h6 class="mt-3 text-muted">Other Details</h6> <hr>
                            <div class="row mb-3">
                                <div class="col-sm-2">Programme : </div>
                                <div class="col-sm-8"> ${response.details.programme} </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-2">Class : </div>
                                <div class="col-sm-8">${response.details.class} </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-sm-2">Hall : </div>
                                <div class="col-sm-8"> ${response.details.hall} </div>
                            </div>
            
            
                            <h6 class="mt-3 text-muted">Election Details</h6> <hr>
                            <div class="row mb-3">
                                <div class="col-sm-2">Polling station : </div>
                                <div class="col-sm-8"> ${response.details.polling_station} </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-12 mb-3">Voting logs</div>
                                <div class="col-sm-12 table-responsive">
                                    <table class="table" id="log-table">
                                        <tr>
                                            <td>Election</td>
                                            <td>Position</td>
                                            <td>Time voted</td>
                                        </tr>
                                        
                                    </table>
                                </div>
                            </div>
            
                            <div class="row mt-5">
                                <div class="col-sm-12">
                                    <small><span class="text-muted">DATE GENERATED : ${date}</span></small>
                                </div>
                            </div>
                        </div>`
                    )

                    for(var data in response.details.voting_logs){
                        $('#log-table').append(
                            `<tr>
                                <td>${response.details.voting_logs[data].election}</td>
                                <td>${response.details.voting_logs[data].position}</td>
                                <td>${response.details.voting_logs[data].time_stamp}</td>
                            </tr>`
                        )
                    }

                    $('#details-body').print()
                }
                else{
                    errorValidator(response.message, 'Unsuccess')
                    $('#details-body').empty()
                }
            },
            
            error: function(){
                errorValidator("Something went wrong, try again")
            }
    
        })

    })



    function successValidator(message, title){
        toastr.success(message, title,{
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


})


