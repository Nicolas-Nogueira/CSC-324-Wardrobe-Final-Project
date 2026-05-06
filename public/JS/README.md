- Catalog.js
    - App class - main class that handles fetching clothing data, rendering items, filtering items, and toggling ownership of items
        - constructor - creates instance variables, calls queryClothes, and adds eventListener on sidebar filters for change occurring
        - queryClothes (async) - fetches clothing data, fetches user data, renders items through filterItems
        - renderItems - renders given item parameter into the owned or unowned containers
        - filterItems - filters items based on selected checkboxes calling filterMatch as a helper function and re-renders the items by calling renderItems
        - filterMatch - helper function that checks if an item matches any of the selected filters
        - toggleItem - toggles whether an item is owned or not, updates the server, and re-renders the items by calling filterItems
    - CreateCard class - class for creating a card element for each clothing item
        - constructor - stores the image data, whether it's owned, and the function to call when toggling ownership, creates instance variable this.element which calls createClothCard().
        createClothCard - creates the card element with the clothing image and a button to toggle ownership

- genOutfits.js
    - App class - main class that handles the outfit generation logic and user interactions
        - constructor - creates instance variables for categorization, calls queryClothes, adds eventListeners for arrows which call next and previous, locks which call toggleLock, and generate button which calls randomOutfit
        - toggleLock - toggles the lock state for the given slot and updates the lock button image and aria-pressed attribute accordingly
        - randomOutfit - generates a random outfit by selecting random indices for tops, bottoms, and footwear, but only if they are not locked. If any category has no available items, it alerts the user. Calls displayOutfit at the end.
        - queryClothes - fetches the clothes from the json and pushes them to their correct array based on category, also fetches the user's wardrobe to determine which items they own and only pushes those to the arrays. Finally, it generates a random outfit to display on page load. Calls RandomOutfit at the end
        - filterItems - filters items based on selected checkboxes calling filterMatch as a helper function, calls randomOutfit if filters make a possible outfit
        - filterMatch - helper function that checks if an item matches any of the selected filters
        - displayOutfit - Unified display method with filter validation calls randomOutfit if unable to make a full outfit which then sends alert
        - updateImageElement - Helper method to update image elements and reduce code duplication
        - outfitIsValid - Check if outfit items share at least one common filter
        - getItemFilters - helper function to extract all filters from an item
        - next - handles right arrow clicking to move onto the next clothing item in the list, calls displayOutfit
        - previous - handles left arrow clicking to move onto the previous clothing item in the list, calls displayOutfit

- login.js
    - App class - This class handles all of the login and registration logic for the login page
        - constructor - makes instance variables from querySelectors, calls addActiveTag to determine to whether you are on login or registration, adds eventListeners on both login and register on submit events.
        - addActiveTag -  adds event listeners to the login and register links to toggle the active class on the wrapper, which controls which form is visible
        - login - handles the login form submission by sending the entered credentials to the server and awaiting the response to determine if the login was successful or if an error message should be shown. Calls showError if incorrect details for logging in
        - register -  this method handles the registration form submission by sending the entered credentials to the server and awaiting the response to determine if the registration was successful or if an error message should be shown. Calls showError if user exists already
        - showError - takes in an error message and an error message div, sets the text content of the div to the message, and removes the hidden class to make it visible

- sidebar.js
    - adds an eventListener to the sidebar which toggles opening and closing

- wardrobe.js
    - App class - handles all of the logic for the wardrobe page, including fetching the user's wardrobe from the server, creating the clothing item cards, and filtering the items based on the selected checkboxes
        - constructor - creates instance variables for containers and image lists, calls queryClothes, adds eventListener to the sidebar listening for change which calls filterItems.
        - createClothingItem - maps each image to its corresponding clothing row and creates a new card for every item added. It then appends each element to the container it relates to
        - queryClothes - fetches the clothes from the json and user ownership and pushes the owned clothes to their correct array, calls createClothingItem
        - filterItems - this method filters the displayed clothing items based on which checkboxes are checked in the sidebar and then updates the topImages, bottomImages, and footwearImages arrays to only include items that match the selected filters, and then calls createClothingItem to update the displayed items on the page
        - filterMatch - helper function that checks if an item matches any of the selected filters
    - CreateCard class - handles all of the html creation code it takes in an image and creates the container for it
        - constructor - takes in an image object which contains the link to the clothing item and its name, and then calls the createClothCard method to create the HTML element for the clothing item card and stores it in this.element
        - createClothCard - creates the HTML element for a clothing item card by creating a div with the class "item", creating an img element with the class "image" and setting its src and alt attributes to the link and name of the clothing item, appending the img element to the div, and then returning the div element


Control Flow 
- server.js brings user to index.html
- index.html
    - uses script to import App from "./JS/login.js"
    - eventListener on Register and Login minor buttons toggles by calling addActiveTag
    - If major registration button is clicked and user already exists then showError is called
    - If major login button is clicked with incorrect details showError is called, if details are correct then window updates to home.html
- home.html
    - uses script to import App from "./JS/genOutfits.js"
    - queryClothes is called which takes in data from credentials.json and clothes.json
    - eventListeners on all arrows, locks, and the generate button, sidebar too.
        - if Generate Button clicked:
            - calls randomOutfit which calls displayOutfit
            - displayOutfit calls OutfitIsValid in an if statement, which additionally calls getItemFilter as a helper function, if true updateImgElement is called, if false then randomOutfit without any changes in display
        - if sidebar options are clicked/changed:
            - calls filterItems which uses a helper function filterMatch
        - if arrows are clicked:
            - if it is a right arrow it will call the next function
            - if it is a left arrow it will call the previous function
            - both of these will call displayOutfit
        - if lock is clicked:
            - it will call toggle lock which changes unlocked items to locked, and locked items to unlocked
- navbar can be clicked to switch into either home.html, wardrobe.html, or catalog.html
- wardrobe.html
    - uses script to import App from "./JS/wardrobe.js"
    - calls queryClothes which takes in data from credentials.json and clothes.json, queryClothes calls createClothingItem
    - has an event listener on the sidebar checkbox options when changed
        - if sidebar options are clicked/changed:
            - calls filterItems which uses a helper function filterMatch
            - filterItems also calls createClothingItem
    - createClothingItem uses new class CreateCard to make all the clothing item cards displayed on the wardrobe page
    - createCard calls a function named CreateClothCard
- catalog.html
    - uses script to import App from "./JS/catalog.js"
    - calls queryClothes which takes in data from credentials.json and clothes.json, queryClothes calls filterItems
    - has an event listener on the sidebar checkbox options when changed
        - if sidebar options are clicked/changed:
            - calls filterItems which uses a helper function filterMatch
            - filterItems calls renderItems
    - renderItems calls class CreateCard which in turn calls CreateClothCard
    - CreateClothCard makes the card as before but this time also adds + or x button to toggle ownership, that button has an eventListener which calls toggleItem when clicked
    - toggleItem then calls filterItems again
- profile pic element in navbar has eventListener which takes you back to index.html when clicked

![Control Flow Diagram](./public/images/Control_flow.jpg)
