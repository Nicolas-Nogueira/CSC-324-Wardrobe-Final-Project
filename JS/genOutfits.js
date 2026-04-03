
class App{
    constructor(){
        this.topImages = [];
        this.bottomImages = [];
        this.footwearImages = [];

        this.queryClothes();
    }

    randomOutfit(){
        if (!this.topImages?.length || !this.bottomImages?.length || !this.footwearImages?.length) {
            console.warn("Missing images to generate an outfit.");
            return;
          }

        const randomTop = Math.floor(Math.random() * this.topImages.length)
        const randomBottom =  Math.floor(Math.random() * this.bottomImages.length)
        const randomFootwear =  Math.floor(Math.random() *this.footwearImages.length)

        const topLink = this.topImages[randomTop].clothLink;
        const bottomLink = this.bottomImages[randomBottom].clothLink;
        const shoesLink = this.footwearImages[randomFootwear].clothLink;

        const topImageEl = document.querySelector("#top-image");
        const bottomImageEl = document.querySelector("#bottom-image");
        const shoesImageEl = document.querySelector("#shoes-image");

        topImageEl.src = topLink;
        bottomImageEl.src = bottomLink;
        shoesImageEl.src = shoesLink;
      

        topImageEl.alt = "Random top";
        bottomImageEl.alt = "Random bottom";
        shoesImageEl.alt = "Random shoes";


    }

    //this method fetches the clothes from the json and pushes them to there correct array
    async queryClothes(){
        const response = await fetch("./clothes.json");
        const data = await response.json();
        for(const dataObject of data){

            if (dataObject.category === "tops") {
                this.topImages.push(dataObject);
            }
            if (dataObject.category === "bottoms") {
                this.bottomImages.push(dataObject);
            }
            if (dataObject.category === "footwear") {
                this.footwearImages.push(dataObject);
            }
        }
        this.randomOutfit();
    }
}

export default App;