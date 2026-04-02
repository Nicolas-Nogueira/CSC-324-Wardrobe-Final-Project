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

    createClothingItem(){
        const card = new createCard();
        const itemsMapped1 = this.topImages.map(image => card(image));
        itemsMapped1.forEach(image => this.topContainer.appendChild(image));
    
        const itemsMapped2 = this.bottomImages.map(image => card(image));
        itemsMapped2.forEach(image => this.bottomContainer.appendChild(image));
    
        const itemsMapped3 = this.footwearImages.map(image => card(image));
        itemsMapped3.forEach(image => this.footwearContainer.appendChild(image));
    }

    async queryClothes(){
        const response = await fetch("/clothes.json");
        const data = await response.json();
        for(const dataObject of data){
            // this.createClothingItem(dataObject);

            if (dataObject.category == "tops") {
                this.topImages.push(dataObject);
            }
            if (dataObject.category == "bottoms") {
                this.bottomImages.push(dataObject);
            }
            if (dataObject.category == "footwear") {
                this.footwearImages.push(dataObject);
            }
        }
        this.createClothingItem();
    }

}

class createCard {
    constructor(image) {
        this.image = image;
        this.createClothCard();
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