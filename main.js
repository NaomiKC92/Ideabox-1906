var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom');
var ideas = []

persistIdeas();
reappendCard();


//named function for appending card to go on event listener
    //use afterbegin

//savebutton event listener!!!
    //titleInput to be interpolated to card h2
    //bodyInput to be interpolated to card body/p class card__ideas

titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
saveButton.addEventListener("click", function() {
    console.log("click!");
    createIdea();
})

bottomSection.addEventListener("click", deleteCard);

function deleteCard(event) {
	if (event.target.classList[1] === "card__img--close") {
		var card = event.target.closest(".card")
		card.remove();
	}
	// retrieveCard();
	// deleteFromStorage(event);
	// returnIndex(card);
	console.log(ideas);
}

function maximumDelete() {
	//create empty array
	//method (parsed items)
	//once objects are parsed, push into empty array
	//

}
// bottomSection.addEventListener("keypress", updateIdea) {
// 	var key = event.which || event.keyCode;
//     if (key === 13) { 
//       //save update
// }

function retrieveCard() {
	var parsedIdeas = JSON.parse(localStorage.getItem("ideas"));
	var parsedArray = [];
	var cardId = event.target.closest(".card").getAttribute(idea.id);
}

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
	var ideaId = Date.now()
	var idea = new Idea(titleInput.value, bodyInput.value, ideaId );
	ideas.push(idea);
  	idea.saveToStorage(ideas);
	appendCard(idea);
  	clearFields();
}
// ideas dont disappear on refresh
function persistIdeas() {
	// debugger;
  var freshIdeas = [];
  var parseIdeas = JSON.parse(localStorage.getItem('ideas'));
   parseIdeas.forEach(function(idea) {
      var freshIdea = new Idea (idea.title, idea.body, idea.id)
        freshIdeas.push(freshIdea);
  });
   console.log('fresh ideas array', freshIdeas);
  ideas = freshIdeas;
  console.log('global array', ideas);
}


function findId(event) {
	var getId = event.target.parentNode.id;
	console.log("HI", getId);
	return getId;
}

// function returnIndex(array) {
// 	var arrayIndex 
// 	for (var i = 0; i < ideas.length; i++) {
// 		if (findId(event) === ideas.idea.id[i]) {
// 			console.log("in the index")
// 			return indexOf(i);
// 		}
// 		arrayIndex = indexOf(i);
	
// 	}
// }


function reappendCard() {
  for (var i = 0; i < ideas.length ; i++) {
    appendCard(ideas[i]);
    }
  }

function appendCard(idea) {
bottomSection.insertAdjacentHTML("afterbegin", `<article class="card">
						<section class="card__header" id=${idea.id}>
							<img src="images/star.svg" class="card__img card__img--star">
							<img src="images/delete.svg"  class="card__img card__img--close" onclick="findId(event)">
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

// function saveEdits() {
// 	var ideaTitle = document.querySelector('.card__ideas');
// 	var editedIdeaTitle = ideaTitle.innerHTML;
// 	ideas.push(editedIdeaTitle);
// 	editedIdeaTitle.saveToStorage(ideas);

// }



// function createIdea() {
// 	var idea = new Idea(Date.now(), titleInput.value, bodyInput.value, 0, false);
// 	ideas.push(idea);
//   idea.saveToStorage(ideas);
// 	appendCard(idea);
//   clearFields();
// }
