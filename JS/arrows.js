
class App{
    constructor(){
        this.topImages = [];
        this.currentTopIndex = 0;
        this.bottomImages = [];
        this.currentBottomIndex = 0;
        this.footwearImages = [];
        this.currentShoesIndex = 0;

        // TOP ARROWS
        const rightArrowTop = document.querySelector('#top-slot .arrow-btn-right-arrow');
        const leftArrowTop = document.querySelector('#top-slot .arrow-btn-left-arrow');
        rightArrowTop.addEventListener('click', this.nextTop.bind(this));
        leftArrowTop.addEventListener('click', this.previousTop.bind(this));

        // BOTTOM ARROWS
        const rightArrowBottom = document.querySelector('#bottoms-slot .arrow-btn-right-arrow');
        const leftArrowBottom = document.querySelector('#bottoms-slot .arrow-btn-left-arrow');
        rightArrowBottom.addEventListener('click', this.nextBottom.bind(this));
        leftArrowBottom.addEventListener('click', this.previousBottom.bind(this));

        // SHOES ARROWS
        const rightArrowShoes = document.querySelector('#shoes-slot .arrow-btn-right-arrow');
        const leftArrowShoes = document.querySelector('#shoes-slot .arrow-btn-left-arrow');
        rightArrowShoes.addEventListener('click', this.nextShoes.bind(this));
        leftArrowShoes.addEventListener('click', this.previousShoes.bind(this));
    }


    displayTop() {
        const topImageEl = document.querySelector("#top-image");
        const topObject = this.topImages[this.currentTopIndex];
        
        topImageEl.src = topObject.clothLink;
        topImageEl.alt = topObject.name;
      }

    nextTop() {
        // Increment, but don't go past the end
        if (this.currentTopIndex < this.topImages.length - 1) {
          this.currentTopIndex++;
        } else {
          this.currentTopIndex = 0; // loop back to start
        }
        this.displayTop(); // update the screen
      }
      
    previousTop() {
        // Decrement, but don't go below 0
        if (this.currentTopIndex > 0) {
          this.currentTopIndex--;
        } else {
          this.currentTopIndex = this.topImages.length - 1; // loop to end
        }
        this.displayTop(); // update the screen
      }


    
    displayBottom(){
        const bottomImageEl = document.querySelector("#bottom-image");
        const bottomObject = this.bottomImages[this.currentBottomIndex];
        
        bottomImageEl.src = bottomObject.clothLink;
        bottomImageEl.alt = bottomObject.name;
    }

    nextBottom() {
        // Increment, but don't go past the end
        if (this.currentBottomIndex < this.bottomImages.length - 1) {
          this.currentBottomIndex++;
        } else {
          this.currentBottomIndex = 0; // loop back to start
        }
        this.displayBottom(); // update the screen
      }
      
      previousBottom() {
        // Decrement, but don't go below 0
        if (this.currentBottomIndex > 0) {
          this.currentBottomIndex--;
        } else {
          this.currentBottomIndex = this.bottomImages.length - 1; // loop to end
        }
        this.displayBottom(); // update the screen
      }


    displayShoes(){
        const shoesImageEl = document.querySelector("#shoes-image");
        const shoesObject = this.footwearImages[this.currentShoesIndex];
        
        shoesImageEl.src = shoesObject.clothLink;
        shoesImageEl.alt = shoesObject.name;

    }


      nextShoes() {
        // Increment, but don't go past the end
        if (this.currentShoesIndex < this.footwearImages.length - 1) {
          this.currentShoesIndex++;
        } else {
          this.currentShoesIndex = 0; // loop back to start
        }
        this.displayShoes(); // update the screen
      }
      
      previousShoes() {
        // Decrement, but don't go below 0
        if (this.currentShoesIndex > 0) {
          this.currentShoesIndex--;
        } else {
          this.currentShoesIndex = this.footwearImages.length - 1; // loop to end
        }
        this.displayShoes(); // update the screen
      }

}

export default App;