
class App{ // This class handles all of the logic for the wardrobe page, including fetching the user's wardrobe from the server, creating the clothing item cards, and filtering the items based on the selected checkboxes
    constructor(){
        this.topContainer = document.querySelector("#top-items");
        this.bottomContainer = document.querySelector("#bottom-items");
        this.footwearContainer = document.querySelector("#footwear-items");
        this.topImages = [];
        this.bottomImages = [];
        this.footwearImages = [];

        /* made an original copy to separate the query and creation logic as it made filtering easier */
        this.allTopImages = [];
        this.allBottomImages = [];
        this.allFootwearImages = [];

        this.queryClothes();

        this.filter = document.querySelector('#sidebar');
        this.filter.addEventListener('change',this.filterItems.bind(this)); // adds an event listener to the sidebar to listen for changes to the checkboxes and call the filterItems method to update the displayed items based on which checkboxes are checked
    }

    // This method maps each image to its corresponding clothing row and creates a new card for every item added.
    // It then appends each element to the container it relates to
    createClothingItem(){
        this.topContainer.innerHTML = ''; // clear the containers before appending new elements to avoid duplicates when filtering
        this.bottomContainer.innerHTML = ''; // clear the containers before appending new elements to avoid duplicates when filtering
        this.footwearContainer.innerHTML = ''; // clear the containers before appending new elements to avoid duplicates when filtering

        const itemsMappedTop = this.topImages.map(image => new CreateCard(image).element); // map each image in the topImages array to a new CreateCard element and store the resulting elements in an array
        itemsMappedTop.forEach(el => this.topContainer.appendChild(el)); // for each element in the itemsMappedTop array, append it to the topContainer in the HTML to display it on the page
    
        const itemsMappedBottom = this.bottomImages.map(image => new CreateCard(image).element); // map each image in the bottomImages array to a new CreateCard element and store the resulting elements in an array
        itemsMappedBottom.forEach(el => this.bottomContainer.appendChild(el)); // for each element in the itemsMappedBottom array, append it to the bottomContainer in the HTML to display it on the page
    
        const itemsMappedFootwear = this.footwearImages.map(image => new CreateCard(image).element); // map each image in the footwearImages array to a new CreateCard element and store the resulting elements in an array
        itemsMappedFootwear.forEach(el => this.footwearContainer.appendChild(el)); // for each element in the itemsMappedFootwear array, append it to the footwearContainer in the HTML to display it on the page
    }

    //this method fetches the clothes from the json and user ownership and pushes the owned clothes to their correct array
    async queryClothes(){
        // fetch user
        const userResponse = await fetch("./user");
        const userData = await userResponse.json();
        const userWardrobeIds = userData.wardrobe;
    
        // fetch full catalog
        const clothesResponse = await fetch("./ClothingData/clothes.json");
        const clothesData = await clothesResponse.json();
    
        // only keep items whose id is in the user's wardrobe
        const ownedItems = clothesData.filter(item => userWardrobeIds.includes(item.id));
    
        for(const dataObject of ownedItems){ // for each clothing item in the user's wardrobe, push it to the appropriate category array based on its category, and also keep a copy of all items in separate arrays for filtering purposes
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
        this.createClothingItem(); 
    }

    filterItems(){ // this method filters the displayed clothing items based on which checkboxes are checked in the sidebar, it checks which checkboxes are checked and then updates the topImages, bottomImages, and footwearImages arrays to only include items that match the selected filters, and then calls createClothingItem to update the displayed items on the page
        const checkboxes = Array.from(document.querySelectorAll('[name="itemFilter"]:checked')); // copied from HW3. selects all checkboxes with that name and that are checked

        const checkbox_values = checkboxes.map(checkbox => checkbox.value); // creates an array of the values of the checked checkboxes to use for filtering

        if(checkbox_values.length === 0){ // if there are no checkboxes checked, then we want to show all items, so we set the topImages, bottomImages, and footwearImages arrays to be the same as the allTopImages, allBottomImages, and allFootwearImages arrays which contain all of the user's items, and then call createClothingItem to update the displayed items on the page
            this.topImages = this.allTopImages;
            this.bottomImages = this.allBottomImages;
            this.footwearImages = this.allFootwearImages;
            this.createClothingItem();
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

        this.createClothingItem();
    }

    filterMatch(item, filters) { // this helper function checks if any of the filters match the clothing type, style, or season of the item, and returns true if there is a match and false if there is not
        // if the clothing type checkboxes match the clothing type of our item
        if (filters.includes(item.clothingType)) return true;
        
        // if the style checkboxes match the style of our item
        for (const style of item.style) {
            if (filters.includes(style)) return true;
        }
        
        // check if any of the seasons in the item.season list are checked
        for (const season of item.season) {
            if (filters.includes(season)) return true;
        }
        
        return false;
    }
}

// This class handles all of the html creation code 
// It takes in an image and creates the container for it
class CreateCard { 
    constructor(image) { // the constructor takes in an image object which contains the link to the clothing item and its name, and then calls the createClothCard method to create the HTML element for the clothing item card and stores it in this.element
        this.image = image;
        this.element = this.createClothCard();
    }

    createClothCard() { // this method creates the HTML element for a clothing item card by creating a div with the class "item", creating an img element with the class "image" and setting its src and alt attributes to the link and name of the clothing item, appending the img element to the div, and then returning the div element
        const item = document.createElement("div");
        item.classList.add("item");

        const imageSrc = document.createElement("img");
        imageSrc.classList.add("image");
        imageSrc.src = this.image.clothLink;
        imageSrc.alt = this.image.name;
        item.appendChild(imageSrc);

        return item;
    }
}

export default App;