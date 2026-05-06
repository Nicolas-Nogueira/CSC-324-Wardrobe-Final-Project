import express from 'express';
import fs from 'fs';
import credentials from './Data/credentials.json' with { type: 'json' }; // import the credentials object from the credentials.json file which contains the usernames, passwords, and wardrobes of all users in the system

const app = express();

app.use(express.json());
app.use(express.static('public')); 

// handle user login by POST
app.post('/login', function(req, res){
    const username = req.body.username;
    // console.log(username);
    const user = credentials[username];
    // console.log(user);
    
    if(user === undefined) { // if username wasn't found in the credentials object
        res.json({ success: false, message: 'Username does not exist.' }); // send a response that the authentication was unsuccessful
        return;
    }

    if(user.password === req.body.password){ // if password is the correct password
        res.json({ success: true, message: 'User authentication successful.'}); // send a response that the authentication was successful
    }
    else {                                   // otherwise
        res.json({ success: false, message: 'Incorrect password.' }); // send a response that the authentication was unsuccessful
    }
});

// handle user registration by POST
app.post('/register', function(req, res){
    const username = req.body.username;
    const existingUser = credentials[username]; 

    if(existingUser !== undefined){ // if the username already exists in the database 
        res.json({ success: false, message: 'Username is already taken.' }); // send a failure message stating that the username has already been taken
        return; // exit the handler
    }

    // add new user to the credentials object
    credentials[username] = { 
        password: req.body.password,
        wardrobe: []
    };

    // update the credentials.json file with the new credentials object containing the new user
    fs.writeFile('./Data/credentials.json', JSON.stringify(credentials, null, 4), 'utf-8', function(err){
        if(err) console.log(err);
        else console.log('Credentials saved to Data/credentials.json');
    })

    // send a success message
    res.json({ success: true, message: "Registration successful."})
})

// GET the current user
app.get('/user', function(req, res){
    const currentUser = credentials['AlexisC']; // hardcode the currently logged in user

    res.json({ // send the username and wardrobe of the current user to the client
        username: currentUser.username,
        wardrobe: currentUser.wardrobe
    });

});

app.post('/save-wardrobe', function(req, res) { // this handler gets the updated wardrobe and updates cred obj with new wardrobe and then writes the updated cred obj to the credentials.json file
    credentials[req.body.username].wardrobe = req.body.wardrobe; // update the credentials object with the new wardrobe for the user
    
    fs.writeFile('./Data/credentials.json', JSON.stringify(credentials, null, 2), 'utf-8', function(err) { // write the updated credentials object to the credentials.json file
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Failed to save" }); // send a failure response if there was an error writing to the file
        } else {
            console.log("Data written successfully");
            res.status(200).json({ message: "Success" }); // send a success response if the file was written successfully
        }
    });

    
});

app.listen(3000, function(err){ // start the server on port 3000. log a message to the console indicating that the server is listening. log an error if there was an issue starting the server
    if(err) console.log(err);
    else console.log('Server listening on port 3000');
})