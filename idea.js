class Idea {
  constructor(title, body) {
      this.id = Date.now();
      this.title = title;
      this.body = body;
      this.quality = "Swill";
      this.star = false;
  }
// methods we MUST add
  saveToStorage(i) {
  localStorage.setItem('ideas', JSON.stringify(i));
  }
// not working yet!!! {
  deleteFromStorage(i) {
  localStorage.removeItem('ideas', i);
  }
//
// }
  updateIdea() {

  }
// updateIdea() {
//
// }

// updateQuality() {
//
// }
}
