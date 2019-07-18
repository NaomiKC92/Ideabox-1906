class Idea {
  constructor(title, body, id) {
      this.title = title;
      this.body = body;
      this.id = id;
      this.quality = "Swill";
      this.star = false;
  }
// methods we MUST add
  saveToStorage(ideas) {
  	localStorage.setItem("ideas", JSON.stringify(ideas));
  }

// updateIdea() {
//
// }

// updateQuality() {git 
//
// }
	deleteFromStorage(id) {
		localStorage.getItem("ideas", JSON.parse(ideas));
    //
		
	}


// 	var targetedId = event.target.parentNode.id;
// 	var output = ideas.filter(function(idea){
// 		return idea.id !== parseInt(targetedId);

// 	}
// } 
// maybe this.id instead of ideas???
}