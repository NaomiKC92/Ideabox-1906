
var main = document.querySelector(".main");
var titleInput = document.querySelector(".title__input");
var bodyInput = document.querySelector(".body__input");
var saveButton = document.querySelector(".top__input--btn");
var bottomSection = document.querySelector(".main__bottom");
var searchBar = document.querySelector(".form__search--input");
var main = document.querySelector('.main');
var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom');
var searchBar = document.querySelector('.form__search--input');
var ideas = [];
var navStarBtn = document.querySelector(".nav__btn--starred");
var qualitiesArr = ["Swill", "Plausible", "Genius"];
var parseIdeas = JSON.parse(localStorage.getItem("ideasKey"));


checkLocalStorage();
appendCards();
insertPrompt();


titleInput.addEventListener("keyup", enableSave);
bodyInput.addEventListener("keyup", enableSave);
titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
saveButton.addEventListener("click", createIdea);
bottomSection.addEventListener("focusout", updateTitle);
bottomSection.addEventListener("focusout", updateBody);
searchBar.addEventListener("keyup", searchCardContent);
bottomSection.addEventListener("keydown", saveOnEnter);
bottomSection.addEventListener("click", voteHandler);
navStarBtn.addEventListener("click", handleStarred);
bottomSection.addEventListener('click', voteHandler);
navBar.addEventListener("click", filterByStarred);


// FUNCTIONS
function filterByStarred(event) {
  var cardStars = document.querySelectorAll(".card__header")
  var card = document.querySelectorAll(".card")
  var unstarredCards = [];
  for (var i = 0; i < cardStars.length; i++) {
    if (!cardStars[i].innerHTML.includes("images/star-active.svg")) {
      unstarredCards.push(card[i]);
    };
  };
  unstarredCards.forEach(function (card) {
    card.remove();
  });
  navStarBtn.innerText = "Show All Ideas";
};

function returnAll() {
  var card = document.querySelectorAll(".card")
  card.forEach(function (card) {
    card.remove();
  });
  navStarBtn.innerText = "Show Starred Ideas"
  appendCards();
};

function handleStarred(event) {
  if (navStarBtn.innerText === "Show Starred Ideas") {
    filterByStarred();
  } else {
    returnAll();
  };
};


function enableSave() {
  if (titleInput.value === "" || bodyInput.value === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  };
};

function clearFields() {
  if (saveButton.disabled = true) {
    titleInput.value = "";
    bodyInput.value = "";
  };
};

function createIdea() {
  var idea = new Idea({ title: titleInput.value, body: bodyInput.value, quality: 0 });
  ideas.push(idea);
  idea.saveToStorage(ideas);
  makeCard(idea);
  clearFields();
};

function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("ideasKey")) === null) {
    ideas = []
  } else {
    ideas = JSON.parse(localStorage.getItem("ideasKey")).map(function (element) {
      return new Idea(element)
    });
  };
};

function findId(event) {
    var foundId = parseInt(event.target.closest('.card').dataset.id);
    return foundId;
}

function deleteMatchingIdea(event) {
  var cardId = findId(event)
  ideas = ideas.filter(function (idea) {
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
  for (var i = 0; i < ideas.length; i++) {
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
    bottomSection.insertAdjacentHTML("afterbegin",
      `<article class="prompt__new-idea">
    <p>Got a great idea?! Name it, create it and click save!</p>
  </article>`)
  };
};

function getIndex(event) {
  return ideas.findIndex(function (idea) {
    return parseInt(findId(event)) === idea.id
  });
};

function starIdea(event) {
  var index = getIndex(event);
  ideas[index].starred = !ideas[index].starred
  var starToChange = event.target;
  var starred = "images/star-active.svg"
  var notStarred = "images/star.svg"
  ideas[index].starred === true ? starToChange.src = starred :
    starToChange.src = notStarred
  ideas[index].saveToStorage(ideas)
};

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
  if (event.key === "Enter") {
    event.target.blur();
    updateBody(event);
    updateTitle(event);
  };
};

function voteHandler(event) {
  if (event.target.id === "upvote") {
    upvoteQuality(event);
    refreshQuality(event);
  }
  else if (event.target.id === "downvote") {
    downvoteQuality(event);
    refreshQuality(event);
  };
};

function upvoteQuality(event) {
  var arrayIndex = getIndex(event);
  var idea = parseIdeas[arrayIndex];
  if (idea.quality < 2) {
    idea.quality++;
    ideas.splice(arrayIndex, 1, idea);
    localStorage.setItem("ideasKey", JSON.stringify(ideas));
  };
};

function downvoteQuality(event) {
  var arrayIndex = getIndex(event);
  var idea = parseIdeas[arrayIndex];
  if (idea.quality > 0) {
    idea.quality--;
    ideas.splice(arrayIndex, 1, idea);
    localStorage.setItem("ideasKey", JSON.stringify(ideas));
  };
};

function refreshQuality(event) {
  var arrayIndex = getIndex(event);
  var idea = parseIdeas[arrayIndex];
  var displayQuality = event.target.closest(".card").querySelector(".card__quality");
  displayQuality.innerText = `Quality: ${qualitiesArr[idea.quality]}`
};


function searchCardContent() {
  var input = document.querySelector(".form__search--input").value;
  input = input.toLowerCase();
  var cardContent = document.querySelectorAll(".card__body");
  var card = document.querySelectorAll(".card");
  for (var i = 0; i < cardContent.length; i++) {
    if (!cardContent[i].innerText.toLowerCase().includes(input)) {
      card[i].classList.add('hidden');
    } else if (input.length === 0) {
      card[i].classList.remove('hidden');
    }
  }
}

function makeCard(idea) {
  bottomSection.insertAdjacentHTML("afterbegin", `<article class="card"
            data-id=${idea.id}>
						<section class="card__header">
              <img src =${idea.starred ? "images/star-active.svg" :
      "images/star.svg"} class="card__img card__img--star"
              id="card__img--star" alt="star button" onclick="starIdea(event)">
							<img src="images/delete.svg"  class="card__img card__img--close" alt="delete button"
              onclick="deleteCard(event)"
              onmouseover="this.src="images/delete-active.svg""
              onmouseout="this.src="images/delete.svg"">
						</section>
						<section class="card__body">
							<h2 class="card__ideas" contenteditable="true">${idea.title}</h2>
							<p class="card__info" contenteditable="true">${idea.body}</p>
						</section>
						<section class="card__footer">
							<img src="images/upvote.svg" class="card__img card__img--upvote"
							id="upvote" alt="upvote button">
							<p class="card__quality">Quality: ${qualitiesArr[idea.quality]}</p>
							<img src="images/downvote.svg"
							class="card__img card__img--downvote" id="downvote" alt="downvote button">
						</section>
          </article>`)
  removePrompt();
};
