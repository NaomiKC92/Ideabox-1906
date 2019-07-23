class Idea {
  constructor(obj) {
      this.title = obj.title;
      this.body = obj.body;
      this.id = obj.id || Date.now();
      this.quality = obj.quality;
      this.starred = obj.starred || false;
  }

// Methods
  saveToStorage(ideas) {
  	localStorage.setItem("ideasKey", JSON.stringify(ideas));
}

  updateIdea() {
    localStorage.setItem("ideasKey", JSON.stringify(ideas));
}

  deleteFromStorage(id) {
		localStorage.getItem("ideasKey", JSON.parse(ideas));
}

  updateQuality() {
    this.quality = quality;
    // this.saveToStorage();
}

}
