class Idea {
  constructor(title, body, id) {
      this.title = title;
      this.body = body;
      this.id = id;
      this.quality = ['Swill', 'Plausible', 'Genius'];
      this.star = false;
  }
// methods we MUST add
  saveToStorage(ideas) {
  	localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  deleteFromStorage(index) {
     ideas.splice(index, 1);
     this.saveToStorage(ideas);
   }

updateQuality(quality) {
  this.quality = quality;
  this.saveToStorage(storedQualities);
}


// 	var targetedId = event.target.parentNode.id;
// 	var output = ideas.filter(function(idea){
// 		return idea.id !== parseInt(targetedId);

// 	}
// }
// maybe this.id instead of ideas???
}
