var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__btn--save');
var bottomSection = document.querySelector('.bottom-section');


//named function for appending card to go on event listener
    //use afterbegin

//savebutton event listener
    //titleInput to be interpolated to card h2
    //bodyInput to be interpolated to card body/p class card__ideas

titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);

saveButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("click!");

})


function enableSave() {
    if (titleInput.value !== "" && bodyInput.value !== "") {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
}