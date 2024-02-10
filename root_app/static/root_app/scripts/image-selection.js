let imageButton = document.querySelector('.image-button')
let fileInput  = document.querySelector('.file-input')
 
window.thumbnail = $('#image').prop('src')

imageButton.addEventListener('click', () => fileInput.click())

$('.file-input').change(function(){

    let imageFile = fileInput.files[0]

    if(imageFile){
        $('#image').prop('src', URL.createObjectURL(imageFile))
    }
    else{
        $('#image').prop('src', window.thumbnail)
    }

})