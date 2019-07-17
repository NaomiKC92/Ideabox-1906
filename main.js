var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom');
var ideas = []

//named function for appending card to go on event listener
    //use afterbegin

//savebutton event listener!!!
    //titleInput to be interpolated to card h2
    //bodyInput to be interpolated to card body/p class card__ideas

titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
window.addEventListener('load', persistIdeas);
window.addEventListener('load', reappendCard);
saveButton.addEventListener('click', function() {
    console.log("click!");
    createIdea();

})

// sets save button to disabled if a text field is empty
function enableSave() {
    if (titleInput.value === '' || bodyInput.value === ''){
      saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    }
}

function clearFields () {
  if (saveButton.disabled = true) {
    titleInput.value = "";
    bodyInput.value = "";
  }
}

function createIdea() {
	var idea = new Idea(Date.now(), titleInput.value, bodyInput.value, 0, false);
	ideas.push(idea);
  idea.saveToStorage(ideas);
	appendCard(idea);
  clearFields();
}
// ideas dont disappear on refresh
function persistIdeas() {
  var freshIdeas = [];
  var parseIdeas = JSON.parse(localStorage.getItem('ideas'));
  parseIdeas.map(function(idea) {
      var freshIdea = new Idea (idea.id, idea.title, idea.body, idea.quality,
        idea.star)
        freshIdeas.push(freshIdea);
  });
  ideas = freshIdeas;
}

function reappendCard() {
  for (var i = 0; i < ideas.length ; i++) {
    appendCard(ideas[i]);
    }
  }

function appendCard(object) {
bottomSection.insertAdjacentHTML("afterbegin", `<article class="card">
						<section class="card__header" id=${object.id}>
							<img src="images/star.svg" class="card__img card__img--star">
							<img src="images/delete.svg" class="card__img card__img--close">
						</section>
						<section class="card__body">
							<h2 class="card__ideas">${object.title}</h2>
							<p class="card__info">${object.body}</p>
						</section>
						<section class="card__footer">
							<img src="images/upvote.svg" class="card__img card__img--upvote"
							arrow up>
							<p class="card__quality"> Quality: Swill</p>
							<img src="images/downvote.svg"
							class="card__img card__img--downvote" arrow down>
						</section>
					</article>`)
}
