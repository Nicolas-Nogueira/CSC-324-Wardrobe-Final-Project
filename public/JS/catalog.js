class App {
    constructor() {
        this.ownedContainer = document.querySelector("#owned");
        this.unownedContainer = document.querySelector("#unowned");
        this.allItems = [];
        this.userWardrobe = []; // user's owned item ids

        this.queryClothes();

        this.filter = document.querySelector('#sidebar');
        this.filter.addEventListener('change', this.filterItems.bind(this));
    }

    async queryClothes() {
        // fetch catalog
        const catalogResponse = await fetch("./ClothingData/clothes.json");
        const catalogData = await catalogResponse.json();

        // fetch current user
        const userResponse = await fetch("./user");
        const userData = await userResponse.json();
        this.userWardrobe = userData.wardrobe;

        this.allItems = catalogData;
        this.renderItems(this.allItems);
    }

    renderItems(items) {
        this.ownedContainer.innerHTML = '';
        this.unownedContainer.innerHTML = '';
    
        items.forEach(item => {
            const isOwned = this.userWardrobe.includes(item.id);
            const card = new CreateCard(item, isOwned, this.toggleItem.bind(this)).element;
            
            if (isOwned) {
                this.ownedContainer.appendChild(card);
            } else {
                this.unownedContainer.appendChild(card);
            }
        });
    }

    filterItems(){
        const checkboxes = Array.from(document.querySelectorAll('[name="itemFilter"]:checked')); // copied from HW3 selects all checkboxes with that name and that are checked

        const checkbox_values = checkboxes.map(checkbox => checkbox.value);

        if(checkbox_values.length === 0){
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

    filterMatch(item, filters) {
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

    toggleItem(itemId) {
        if (this.userWardrobe.includes(itemId)) {
            // remove it
            this.userWardrobe = this.userWardrobe.filter(id => id !== itemId);
        } else {
            // add it
            this.userWardrobe.push(itemId);
        }
        this.renderItems(this.allItems);
    }
}

class CreateCard {
    constructor(image, isOwned, onToggle) {
        this.image = image;
        this.isOwned = isOwned;
        this.onToggle = onToggle;
        this.element = this.createClothCard();
    }

    createClothCard() {
        const item = document.createElement("div");
        item.classList.add("item");

        const imageSrc = document.createElement("img");
        imageSrc.classList.add("image");
        imageSrc.src = this.image.clothLink;
        imageSrc.alt = this.image.name;

        const btn = document.createElement("button");
        btn.classList.add("card-btn");
        btn.textContent = this.isOwned ? "x" : "+";

        btn.addEventListener("click", () => {
            this.onToggle(this.image.id);
        });

        item.appendChild(imageSrc);
        item.appendChild(btn);
        return item;
    }
}

export default App;