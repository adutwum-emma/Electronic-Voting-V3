$(document).ready(function(){

    $('.results-pane').hide()

    let panes = $('.results-pane')

    let current_pane = 0

    if(current_pane <= 0){
        $('#previous-res').prop('disabled', true)
    }


    if(panes.length === 0 || panes.length == 1){
        $('#next-res').prop('disabled', true)
    }


    $(panes[current_pane]).show();

    var doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };
    
    
    $.ajax({
    
        url: $('#results-url').val(),
        type: 'get',
    
        success: function(response){
    
            for(var ele in response.data){
    
                var doughnutPieData = {
                    datasets: [{
                      data: [],
    
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                      ],
    
                      borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                    }],
                
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                      
                    ]
                };
    
    
                for (var item in response.data[ele].results){
                    doughnutPieData.datasets[0].data.push(
                        response.data[ele].results[item].percentage
                    )
                    
                    doughnutPieData.labels.push(
                        response.data[ele].results[item].full_name
                    )
                }
    
                
                if ($(`#canvas${parseInt(ele) + 1}`).length) {
                    var doughnutChartCanvas = $(`#canvas${parseInt(ele) + 1}`).get(0).getContext("2d");
                    var doughnutChart = new Chart(doughnutChartCanvas, {
                      type: 'doughnut',
                      data: doughnutPieData,
                      options: doughnutPieOptions
                    });
                }
            }
        }
    
    })


    $('#next-res').click(function(){

        if (current_pane < panes.length - 1){

            $(panes[current_pane]).hide()
            current_pane++
            $(panes[current_pane]).show('slow')

            $('html, body').animate({scrollTop: 0}, 80)

            $('#previous-res').prop('disabled', false)

            if(current_pane === panes.length - 1){
                $(this).prop('disabled', true)
            }

        }

    })

    $('#previous-res').click(function(){

        if (current_pane >= 0){

            $(panes[current_pane]).hide()
            current_pane--
            $(panes[current_pane]).show('slow')

            $('html, body').animate({scrollTop: 0}, 80)

            $('#next-res').prop('disabled', false)

            if(current_pane <= 0){
                $(this).prop('disabled', true)
            }

        }

    })

})