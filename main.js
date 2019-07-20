
// global vars

var main = document.querySelector('.main');
var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom');
var ideas = [];

// Load functions and listeners

persistIdeas();
appendCards();

main.addEventListener('click', mainEventHandler)
titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
saveButton.addEventListener("click", function() {
    console.log("click!");
    createIdeaHandler();
})


// functions

function createIdeaHandler(event) {
  // e.preventDefault();
  instantiateIdea();
	// var ideaId = Date.now()
	// var idea = new Idea(titleInput.value, bodyInput.value, ideaId);
	// ideas.push(idea);
  // idea.saveToStorage(ideas);
  // persistIdeas();
	// appendCard(idea);
  clearFields();
}

function mainEventHandler(event) {
  findIndex(event);
  deleteCard(event);
}

// function retrieveCard() {
// 	var parsedIdeas = JSON.parse(localStorage.getItem("ideas"));
// 	var parsedArray = [];
// 	var cardId = event.target.closest(".card").getAttribute(idea.id);
// }

function instantiateIdea() {
  var ideaId = Date.now()
  var idea = new Idea(titleInput.value, bodyInput.value, ideaId);
  ideas.push(idea);
  idea.saveToStorage(ideas);
	appendCard(idea);
}

function persistIdeas() {
  var freshIdeas = [];
  var parseIdeas = JSON.parse(localStorage.getItem('ideas'));
  if (parseIdeas) {
  parseIdeas.forEach(function(idea) {
      var freshIdea = new Idea (idea.title, idea.body, idea.id)
        freshIdeas.push(freshIdea);
     })
  };
  ideas = freshIdeas;
}


function appendCard(idea) {
bottomSection.insertAdjacentHTML("afterbegin", `<article class="card" " id=${idea.id}>
						<section class="card__header">
							<img src="images/star.svg" class="card__img card__img--star">
							<img src="images/delete.svg"  class="card__img card__img--close" >
						</section>
						<section class="card__body">
							<h2 class="card__ideas" contenteditable="true">${idea.title}</h2>
							<p class="card__info" contenteditable="true">${idea.body}</p>
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


function appendCards() {
  for (var i = 0; i < ideas.length ; i++) {
    appendCard(ideas[i]);
    }
  }

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

function findId(event) {
    var foundId = parseInt(event.target.closest('.card').id);
    if (ideas.length > 0 && foundId) {
      return foundId;
    }
}

function findIndex(event) {
    var id = findId(event);
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id) {
      console.log(parseInt(i));;
      return parseInt(i);
    }
  }
}

function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.closest('.card__img--close')) {
    event.target.closest('.card').remove();
    ideas[cardIndex].deleteFromStorage(cardIndex);
  }
}


function updateLocalStorage() {
	ideas[0].saveToStorage(ideas);
}




// function deleteMatchingIdea(targetID) {
//     var updatedArray = ideas.filter( idea => {
//         return idea.id !== targetID;
//     })
//     ideas = updatedArray;
//     updateLocalStorage();
// }



// function saveEdits() {
// 	var ideaTitle = document.querySelector('.card__ideas');
// 	var editedIdeaTitle = ideaTitle.innerHTML;
// 	ideas.push(editedIdeaTitle);
// 	editedIdeaTitle.saveToStorage(ideas);

// }
