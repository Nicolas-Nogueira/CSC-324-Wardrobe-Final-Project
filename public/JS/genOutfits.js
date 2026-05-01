class App{
    constructor(){
        this.topImages = [];
        this.bottomImages = [];
        this.footwearImages = [];

        /* made an original copy to separate the query and creation logic as it made filtering easier */
        this.allTopImages = [];
        this.allBottomImages = [];
        this.allFootwearImages = [];
        
        // index starts at 0 for next and prev
        this.currentTopIndex = 0;
        this.currentBottomIndex = 0;
        this.currentShoesIndex = 0;

        // Lock state tracking
        this.topLocked = false;
        this.bottomLocked = false;
        this.shoesLocked = false;

        this.queryClothes();

        this.filter = document.querySelector('#sidebar');
        this.filter.addEventListener('change',this.filterItems.bind(this));

        // Top arrows
        rightArrowTop.addEventListener('click', () => this.next('top'));
        leftArrowTop.addEventListener('click',  () => this.previous('top'));

        // Bottom arrows
        rightArrowBottom.addEventListener('click', () => this.next('bottom'));
        leftArrowBottom.addEventListener('click',  () => this.previous('bottom'));

        // Shoes arrows
        rightArrowShoes.addEventListener('click', () => this.next('shoes'));
        leftArrowShoes.addEventListener('click',  () => this.previous('shoes'));

        //Lock bottom
        const topLockBtn = document.querySelector('#top-slot .lock-btn');
        const bottomLockBtn = document.querySelector('#bottoms-slot .lock-btn');
        const shoesLockBtn = document.querySelector('#shoes-slot .lock-btn');

        topLockBtn.addEventListener('click', () => this.toggleLock('top'));
        bottomLockBtn.addEventListener('click', () => this.toggleLock('bottoms'));
        shoesLockBtn.addEventListener('click', () => this.toggleLock('shoes'));
    }

    toggleLock(slot) {
        let lockBtn;
        
        // Determine which slot and get its button
        if (slot === 'top') {
            this.topLocked = !this.topLocked;
            lockBtn = document.querySelector('#top-slot .lock-btn');
        } else if (slot === 'bottoms') {
            this.bottomLocked = !this.bottomLocked;
            lockBtn = document.querySelector('#bottoms-slot .lock-btn');
        } else if (slot === 'shoes') {
            this.shoesLocked = !this.shoesLocked;
            lockBtn = document.querySelector('#shoes-slot .lock-btn');
        }
        
        // Update the lock button image and aria-pressed
        const img = lockBtn.querySelector('img');
        if (slot === 'top' ? this.topLocked : slot === 'bottoms' ? this.bottomLocked : this.shoesLocked) {
            img.src = 'images/locked.png';
            lockBtn.setAttribute('aria-pressed', 'true');
        } else {
            img.src = 'images/unlocked.png';
            lockBtn.setAttribute('aria-pressed', 'false');
        }
    }

    // Gen Oufit
    randomOutfit() {
        if (!this.topImages?.length || !this.bottomImages?.length || !this.footwearImages?.length) {
            alert("Unable to make a full outfit. Make sure filter selections have a possible option in each slot");
            return;
        }
    
        // gen a random num from 0 to the lenght of the image array 
        const randomTop = Math.floor(Math.random() * this.topImages.length);
        const randomBottom = Math.floor(Math.random() * this.bottomImages.length);
        const randomFootwear = Math.floor(Math.random() * this.footwearImages.length);
    
        // Only change if NOT locked
        if (!this.topLocked) {
            this.currentTopIndex = randomTop;
        }
    
        if (!this.bottomLocked) {
            this.currentBottomIndex = randomBottom;
        }
    
        if (!this.shoesLocked) {
            this.currentShoesIndex = randomFootwear;
        }

        // Validate and display the outfit
        this.displayOutfit();
    }

    //this method fetches the clothes from the json and pushes them to there correct array
    async queryClothes(){

        // fetch user
        const userResponse = await fetch("./Data/credentials.json");
        const userData = await userResponse.json();
        const alexis = userData.find(user => user.email === "ac@ac.com");
        const userWardrobeIds = alexis.wardrobe;

        // Fetch clothes data
        const clothesResponse = await fetch("./Data/clothes.json");
        const clothesData = await clothesResponse.json();

        // only keep items whose id is in the user's wardrobe
       const ownedItems = clothesData.filter(item => userWardrobeIds.includes(item.id));

        //change dataObject to userwardrobe 
        for(const dataObject of ownedItems){

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

        if (this.topImages.length > 0 && this.bottomImages.length > 0 && this.footwearImages.length > 0) {
            this.randomOutfit();
        }
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

    // Unified display method with filter validation
    displayOutfit() {
        const top = this.topImages[this.currentTopIndex];
        const bottom = this.bottomImages[this.currentBottomIndex];
        const shoes = this.footwearImages[this.currentShoesIndex];
        
        if (this.outfitIsValid(top, bottom, shoes)) {
            // Display all three items
            this.updateImageElement("#top-image", top);
            this.updateImageElement("#bottom-image", bottom);
            this.updateImageElement("#shoes-image", shoes);
        } else {
            // Generate new outfit if no matching filters
            this.randomOutfit();
        }
    }

    // Helper method to update image elements and reduce code duplication
    updateImageElement(selector, clothingItem) {
        const imageEl = document.querySelector(selector);
        imageEl.src = clothingItem.clothLink;
        imageEl.alt = clothingItem.name;
    }

    // Check if outfit items share at least one common filter
    outfitIsValid(top, bottom, shoes) {
        const topFilters = this.getItemFilters(top);
        const bottomFilters = this.getItemFilters(bottom);
        const shoeFilters = this.getItemFilters(shoes);
        
        // Find if there's at least one common filter across all three
        return topFilters.some(f => 
            bottomFilters.includes(f) && shoeFilters.includes(f)
        );
    }

    // Extract all filters (clothing type, style, season) from an item
    getItemFilters(item) {
        return [
            item.clothingType,
            ...item.style,
            ...item.season
        ];
    }
    
    //https://claude.ai/chat/35c144b4-957f-45b7-ae52-0c2f71075c7a
    //arrows method 
    next(category) {
        const configs = {
            top:    { locked: this.topLocked,    images: this.topImages,      indexKey: 'currentTopIndex' },
            bottom: { locked: this.bottomLocked, images: this.bottomImages,   indexKey: 'currentBottomIndex' },
            shoes:  { locked: this.shoesLocked,  images: this.footwearImages, indexKey: 'currentShoesIndex' }
        };
    
        const { locked, images, indexKey } = configs[category];
        if (locked) return;
    
        this[indexKey] = this[indexKey] < images.length - 1 ? this[indexKey] + 1 : 0;
        this.displayOutfit();
    }
    
    previous(category) {
        const configs = {
            top:    { locked: this.topLocked,    images: this.topImages,      indexKey: 'currentTopIndex' },
            bottom: { locked: this.bottomLocked, images: this.bottomImages,   indexKey: 'currentBottomIndex' },
            shoes:  { locked: this.shoesLocked,  images: this.footwearImages, indexKey: 'currentShoesIndex' }
        };
    
        const { locked, images, indexKey } = configs[category];
        if (locked) return;
    
        this[indexKey] = this[indexKey] > 0 ? this[indexKey] - 1 : images.length - 1;
        this.displayOutfit();
    }
}

export default App;