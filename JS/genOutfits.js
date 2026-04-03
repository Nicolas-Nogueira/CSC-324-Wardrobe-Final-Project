
class App{
    constructor(){
        this.topImages = [];
        this.bottomImages = [];
        this.footwearImages = [];

        /* made an original copy to separate the query and creation logic as it made filtering easier */
        this.allTopImages = [];
        this.allBottomImages = [];
        this.allFootwearImages = [];

        this.queryClothes();

        this.filter = document.querySelector('#sidebar');
        this.filter.addEventListener('change',this.filterItems.bind(this));
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
                this.allTopImages.push(dataObject);
            }
            if (dataObject.category === "bottoms") {
                this.bottomImages.push(dataObject);
                this.allBottomImages.push(dataObject);
            }
            if (dataObject.category === "footwear") {
                this.footwearImages.push(dataObject);
                this.allFootwearImages.push(dataObject);

            }
        }
        this.randomOutfit();
    }

    filterItems(){
        const checkboxes = Array.from(document.querySelectorAll('[name="itemFilter"]:checked')); // copied from HW3 selects all checkboxes with that name and that are checked

        const checkbox_values = checkboxes.map(checkbox => checkbox.value);

        if(checkbox_values.length === 0){
            this.topImages = this.allTopImages;
            this.bottomImages = this.allBottomImages;
            this.footwearImages = this.allFootwearImages;
            this.randomOutfit();
            return;
        }

        // handles the 3 sections separately checks if any of the items in each array have any of the checkboxes that are checked
        // stores the ones that do from the all into the smaller sections
        // helper function filterMatch to deal with checkbox value checking
        this.topImages = this.allTopImages.filter(item => {
            return this.filterMatch(item, checkbox_values);
        });
        
        this.bottomImages = this.allBottomImages.filter(item => {
            return this.filterMatch(item, checkbox_values);
        });
        
        this.footwearImages = this.allFootwearImages.filter(item => {
            return this.filterMatch(item, checkbox_values);
        });

        this.randomOutfit();
    }

    filterMatch(item, filters) {
        // if the clothing type checkboxes match the clothing type of our item
        if (filters.includes(item.clothingType)) return true;
        
        // if the style checkboxes match the style of our item
        for (const style of item.style) {
            if (filters.includes(style)) return true;
        }
        
        // Check if any of the seasons in the item.season list are checked
        for (const season of item.season) {
            if (filters.includes(season)) return true;
        }
        
        return false;
    }
}

export default App;