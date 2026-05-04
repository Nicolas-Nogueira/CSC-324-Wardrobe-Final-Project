# WARDROBE
A web app where users can select clothes from a given catalog and can generate their own outfits based off the items they have chose to own.

---


# How to run 

- start in project directory and type node server.js
- Head to localhost:3000
- Login with any of the given credentials in credentials.json or register a new account

---

# Project Structure
- Data Folder
   - credentials.json - contains all the information about users. Each user object has username as a key and then additionally subkeys of password and wardrobe where wardrobe contains a list of numbers which are the ids for the clothing objects in clothes.json
- Public folder
   - ClothingData folder
      - clothes.json - contains all the information about the catalog clothes. Each clothing item has keys id, name, clothLink, category, clothingType, season, style. All the values are strings except season and style which contain a list of strings.
   - CSS folder
      - Login.css: contains our CSS for the login and registration page, we separated this as they were very different to our main pages
      - style.css: contains all the CSS for our home and wardrobe page
   
   - images folder
      - has all our clothing images uploaded as well as button images and some old placeholder images
   
   - JS folder
      - catalog.js: handles the adding/removing of clothes to a users account has filtering as well
      - genOutfits.js: the App for the home page includes generate, arrows, lock, and filtering, 
      - login.js: the functionality of the sliding window of our login/registration page
      - README.md: Description of all methods and classes as well as flow chart
      - sidebar.js: the functionality of how the toggle button works on our sidebar
      - wardrobe.js: the App for the wardrobe page includes creating our rows and the filtering

   - catalog.html: Page where users can select from the given clothes which ones they wish to own

   - home.html: our home page html

   - index.html: the login/registration page html

   - wardrobe.html: Displays owned clothes in separate clothing categories
  
- README.md: this file

- server.js
 



