// global vars
var main = document.querySelector('.main');
var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom');
var searchBar = document.querySelector('.form__search--input');
var ideas = [];
var qualities = ['Swill', 'Plausible', 'Genius'];
var parseIdeas = JSON.parse(localStorage.getItem('ideas'));

// load functions
checkLocalStorage();
appendCards();
insertPrompt();

// event listeners
titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
saveButton.addEventListener("click", createIdea);
bottomSection.addEventListener("focusout", updateTitle);
bottomSection.addEventListener("focusout", updateBody);
searchBar.addEventListener("keyup", searchCardContent);
bottomSection.addEventListener("keydown", saveOnEnter);

function enableSave() {
    if (titleInput.value === '' || bodyInput.value === ''){
      saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    };
};

function clearFields () {
  if (saveButton.disabled = true) {
    titleInput.value = "";
    bodyInput.value = "";
  };
};

function createIdea() {
	var idea = new Idea({title:titleInput.value, body:bodyInput.value});
	ideas.push(idea);
  idea.saveToStorage(ideas);
  makeCard(idea);
  clearFields();
};

function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("ideasKey")) === null) {
    ideas = []
  } else {
  ideas = JSON.parse(localStorage.getItem("ideasKey")).map( function(element) {
    return new Idea(element)
  });
};
};

function findId(event) {
    var foundId = parseInt(event.target.closest('.card').id);
    return foundId;
};

function deleteMatchingIdea(event) {
  var cardId = findId(event)
    ideas = ideas.filter(function(idea) {
        return idea.id !== cardId
    });
    var idea = new Idea("title", "body")
    idea.saveToStorage(ideas);
};

function deleteCard(event) {
	if (event.target.classList[1] === "card__img--close") {
		var card = event.target.closest(".card")
    card.remove();
    deleteMatchingIdea(event)
    insertPrompt();
  };
};

function appendCards() {
  for (var i = 0; i < ideas.length ; i++) {
    makeCard(ideas[i]);
  };
};

function removePrompt() {
  var prompt = document.querySelector(".prompt__new-idea");
  if (prompt) {
    prompt.parentNode.removeChild(prompt)
  };
};

function insertPrompt() {
  if (bottomSection.innerHTML === "" || bottomSection.innerHTML === " ") {
    bottomSection.insertAdjacentHTML("afterbegin", `<article class="prompt__new-idea">
    <p>Got a great idea?! Name it, create it and click save!</p>
  </article>`)
  };
};

function getIndex(event) {
  return ideas.findIndex( function(idea) {
    return parseInt(findId(event)) === idea.id
  });
};

function starIdea(event) {
  var index = getIndex(event);
  ideas[index].starred = !ideas[index].starred
  var starToChange = event.target;
  var starred = "images/star-active.svg"
  var notStarred = "images/star.svg"
  ideas[index].starred === true ? starToChange.src = starred : starToChange.src = notStarred
  ideas[index].saveToStorage(ideas)
};

// function showStarredIdeas() {
//   var index = ideas(getIndex(event))
//   ideas = ideas.filter(function() {
//     return ideas[]
//   })

// };

function updateTitle(event) {
  if (event.target.classList[0] === "card__ideas") {
      var index = getIndex(event);
      var updatedTitle = event.target.innerText;
      ideas[index].title = updatedTitle;
      ideas[index].updateIdea(ideas);
    };
};

function updateBody(event) {
  if (event.target.classList[0] === "card__info") {
    var index = getIndex(event);
    var updatedBody = event.target.innerText;
    ideas[index].body = updatedBody;
    ideas[index].updateIdea(ideas);
  };
};

function saveOnEnter(event) {
  if (event.key === 'Enter') {
    event.target.blur();
    updateBody(event);
    updateTitle(event);
  };
 };

 function changeQuality(event) {
  var foundId = parseInt(event.target.closest('.card').id);
  var arrayIndex = ideas.findIndex(function(item){
    return item.id === foundId
  })
  var storedQualities = parseIdeas[arrayIndex].quality;
  if (event.target.id === 'upvote' && storedQualities < 2) {
    console.log('hi')
    storedQualities++
  } else if (event.target.id === 'downvote'  && storedQualities > 0){
    storedQualities--
  }
  qualities[arrayIndex].updateQuality(storedQualities);
}


function defineButtonSelector(event) {
  if (event.target.id === 'upvote' || 'downvote') {
    changeQuality(event);
  }
}

function searchCardContent() {
  var input = document.querySelector('.form__search--input').value;
  input = input.toLowerCase();
  var cardContent = document.querySelectorAll('.card__body');
  var card = document.querySelectorAll('.card');
  for (var i = 0; i < cardContent.length; i++) {
    if (!cardContent[i].innerText.toLowerCase().includes(input)) {
      card[i].style.display = "none";
    } else {
      card[i].style.display = "flex";
    };
  };
};

function makeCard(idea) {
  bottomSection.insertAdjacentHTML("afterbegin", `<article class="card" id=${idea.id}>
						<section class="card__header">
              <img src =${idea.starred ? "images/star-active.svg" : "images/star.svg"} class="card__img card__img--star" id="card__img--star" onclick="starIdea(event)">
							<img src="images/delete.svg"  class="card__img card__img--close" onclick="deleteCard(event)" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'">
						</section>
						<section class="card__body">
							<h2 class="card__ideas" contenteditable="true">${idea.title}</h2>
							<p class="card__info" contenteditable="true">${idea.body}</p>
						</section>
						<section class="card__footer">
							<img src="images/upvote.svg" class="card__img card__img--upvote"
							arrow up>
							<p class="card__quality"> Quality: ${idea.quality}</p>
							<img src="images/downvote.svg"
							class="card__img card__img--downvote" arrow down>
						</section>
          </article>`)
  removePrompt();
};
