
class App{
    constructor(){
        this.topContainer = document.querySelector("#top-items");
        this.bottomContainer = document.querySelector("#bottom-items");
        this.footwearContainer = document.querySelector("#footwear-items");
        this.topImages = [];
        this.bottomImages = [];
        this.footwearImages = [];
        this.queryClothes();
    }

    // This method maps each image to its corresponding clothing row and creates a new card for every item added.
    // It then appends each element to the container it relates to
    createClothingItem(){

        const itemsMappedTop = this.topImages.map(image => new CreateCard(image).element);
        itemsMappedTop.forEach(el => this.topContainer.appendChild(el));
    
        const itemsMappedBottom = this.bottomImages.map(image => new CreateCard(image).element);
        itemsMappedBottom.forEach(el => this.bottomContainer.appendChild(el));
    
        const itemsMappedFootwear = this.footwearImages.map(image => new CreateCard(image).element);
        itemsMappedFootwear.forEach(el => this.footwearContainer.appendChild(el));
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
        this.createClothingItem();
    }
}

// This class handles all of the html creation code 
// It takes in an image and creates the container for it
class CreateCard {
    constructor(image) {
        this.image = image;
        this.element = this.createClothCard();
    }

    createClothCard() {
        const item = document.createElement("div");
        item.classList.add("item");

        const imageSrc = document.createElement("img");
        imageSrc.classList.add("image");
        imageSrc.src = this.image.clothLink;
        item.appendChild(imageSrc);

        return item;
    }
}

export default App;