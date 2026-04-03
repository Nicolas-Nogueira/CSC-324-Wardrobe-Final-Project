# WARDRODE
 A web app where users can upload and categorize their clothes to generate outfit combinations.

---


# How to run 

- Start with login.html as your entry point
- Use the VS Code Live Server
- Don't need to login just click the login botton 

---

# Project Structure 
WARDRODE/
├── index.html              # Main outfit generator page
├── login.html              # Login & registration page
├── wardrobe.html           # Wardrobe browsing page
├── clothes.json            # Data file with all clothing items
│
├── CSS/                    # Stylesheets
│   ├── style.css          # Main styling (home page, wardrobe page, navbar, sidebar)
│   └── login.css          # Login page styling
│
├── JS/                    # JavaScript modules
│   ├── genOutfits.js      # Outfit generator logic (index.html)
│   │   ├── queryClothes()           # Fetch clothes from JSON
│   │   ├── randomOutfit()           # Generate random outfit
│   │   ├── filterItems()            # Apply filters to clothing
│   │   ├── nextTop/previousTop()    # Navigate through tops with arrows
│   │   ├── nextBottom/previousBottom() # Navigate through bottoms
│   │   ├── nextShoes/previousShoes()  # Navigate through shoes
│   │   └── displayTop/Bottom/Shoes()  # Update displayed images
│   │
│   ├── wardrobe.js        # Wardrobe page logic (wardrobe.html)
│   │   ├── queryClothes()  # Fetch all clothing items
│   │   ├── createClothingItem() # Create cards for each item
│   │   ├── filterItems()   # Filter clothing by type/season/style
│   │   └── filterMatch()   # Helper to match filter criteria
│   │
│   ├── login.js           # Login page logic (login.html)
│   │   ├── constructor()   # Initialize form switching
│   │   └── addActiveTag()  # Toggle login/register forms
│   │
│   └── sidebar.js         # Sidebar toggle functionality
│       └── Sidebar filter management
│
├── images/               # Asset images
│   ├── profilepic.png
│   ├── menuicon.png
│   ├── unlocked.png
│   ├── locked.png
│   └── clothing images (hoodies, shorts, shoes, etc.)
│
├── .vscode/             # VS Code settings
└── README.md           # This file


