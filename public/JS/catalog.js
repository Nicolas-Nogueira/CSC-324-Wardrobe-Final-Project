class App {
    constructor() { // containers for owned and unowned items
        this.ownedContainer = document.querySelector("#owned");
        this.unownedContainer = document.querySelector("#unowned");
        this.allItems = [];
        this.userWardrobe = []; 

        this.queryClothes();

        this.filter = document.querySelector('#sidebar');
        this.filter.addEventListener('change', this.filterItems.bind(this)); // re-render items when filter changes
    }

    async queryClothes() { // fetches clothing data and user data, then renders the items
        // fetch catalog
        const catalogResponse = await fetch("./ClothingData/clothes.json");
        const catalogData = await catalogResponse.json();

        // fetch current user 
        const userResponse = await fetch("./user");
        const userData = await userResponse.json();
        this.userWardrobe = userData.wardrobe;

        this.allItems = catalogData; // store all items for filtering
        this.filterItems();
    }

    renderItems(items) { // renders the given items into the owned and unowned containers
        this.ownedContainer.innerHTML = ''; // clear existing items
        this.unownedContainer.innerHTML = ''; // clear existing items
    
        items.forEach(item => { // for each item, check if it's owned and create a card for it
            const isOwned = this.userWardrobe.includes(item.id); // check if item is in user's wardrobe
            const card = new CreateCard(item, isOwned, this.toggleItem.bind(this)).element; // create a card for the item
            
            if (isOwned) { // if owned, add to owned container; otherwise, add to unowned container
                this.ownedContainer.appendChild(card);
            } else {
                this.unownedContainer.appendChild(card);
            }
        });
    }

    filterItems() { // filters items based on selected checkboxes and re-renders the items
        const checkboxes = Array.from(document.querySelectorAll('[name="itemFilter"]:checked')); // get all checked checkboxes. Got this code from the homework
        const checkbox_values = checkboxes.map(checkbox => checkbox.value); // extract the values of the checked checkboxes
    
        if (checkbox_values.length === 0) { // if no filters are selected, show all items
            this.renderItems(this.allItems);
            return;
        }
    
        const filteredItems = this.allItems.filter(item => this.filterMatch(item, checkbox_values)); // filter items based on whether they match the selected filters
        this.renderItems(filteredItems); // render the filtered items
    }

    filterMatch(item, filters) { // helper function that checks if an item matches any of the selected filters
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

    async toggleItem(itemId) { // toggles whether an item is owned or not, updates the server, and re-renders the items
        if (this.userWardrobe.includes(itemId)) {
            // remove it
            this.userWardrobe = this.userWardrobe.filter(id => id !== itemId);
        } else {
            // add it
            this.userWardrobe.push(itemId);
        }

        const obj = { 
            username: "AlexisC",
            wardrobe: this.userWardrobe
        }

        const response = await fetch('/save-wardrobe', { // send updated wardrobe to server
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });

        this.filterItems();
    }
}

class CreateCard { // class for creating a card element for each clothing item
    constructor(image, isOwned, onToggle) { //stores the image data, whether it's owned, and the function to call when toggling ownership
        this.image = image;
        this.isOwned = isOwned;
        this.onToggle = onToggle;
        this.element = this.createClothCard();
    }

    createClothCard() { // creates the card element with the clothing image and a button to toggle ownership
        const item = document.createElement("div");
        item.classList.add("item");

        const imageSrc = document.createElement("img");
        imageSrc.classList.add("image");
        imageSrc.src = this.image.clothLink;
        imageSrc.alt = this.image.name;

        const btn = document.createElement("button");
        btn.classList.add("card-btn");
        btn.textContent = this.isOwned ? "x" : "+"; // if owned, show "x" to remove; if unowned, show "+" to add. ? is shorthand if/else learnt from when nick used it in genoutfits

        btn.addEventListener("click", () => { // when button is clicked, toggle ownership of the item
            this.onToggle(this.image.id);
        });

        item.appendChild(imageSrc);
        item.appendChild(btn);
        return item;
    }
}

export default App;