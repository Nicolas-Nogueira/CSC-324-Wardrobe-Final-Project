/* For the login page I did use some help from a tutorial for the best way of handleing login/registraion switching 
Here is the link to the tutorial: https://youtu.be/p1GmFCGuVjw?si=HVDteNE2P8vS0R5Y
*/

class App{ // This class handles all of the login and registration logic for the login page
    constructor(){ // makes instance variables from querySelectors, calls addActiveTag to determine to whether you are on login or registration, adds eventListeners on both login and register on submit events.
        this.wrapper = document.querySelector('.login-page-wrapper');
        this.loginLink = document.querySelector('.login-link');
        this.registerLink = document.querySelector('.register-link');

        this.addActiveTag(); // adds event listeners to the login and register links to toggle the active class on the wrapper, which controls which form is visible

        this.lUser = document.querySelector("#login-username");
        this.lPassW = document.querySelector("#login-password");
        this.lErrorM = document.querySelector("#login-error-message");
        this.login = this.login.bind(this)

        this.rUser = document.querySelector("#register-username");
        this.rPassW = document.querySelector("#register-password");
        this.rErrorM = document.querySelector("#register-error-message");
        this.register = this.register.bind(this)

        document.querySelector("#login").addEventListener('submit', this.login) // adds an event listener to the login form to handle form submission and call the login method
        document.querySelector("#register").addEventListener('submit', this.register) // adds an event listener to the registration form to handle form submission and call the register method
    }

    addActiveTag(){ // this method adds event listeners to the login and register links to toggle the active class on the wrapper, which controls which form is visible
        this.registerLink.addEventListener('click', () => { // when the register link is clicked, add the active class to the wrapper to show the registration form and hide the login form
            this.wrapper.classList.add('active');
        });

        this.loginLink.addEventListener('click', () => { // when the login link is clicked, remove the active class from the wrapper to show the login form and hide the registration form
            this.wrapper.classList.remove('active');
        });
    }

    async login(event){ // this method handles the login form submission by sending the entered credentials to the server and awaiting the response to determine if the login was successful or if an error message should be shown
        event.preventDefault();
        const username = this.lUser.value;
        const password = this.lPassW.value;

        const credentials = {
            username: username,
            password: password
        }

        // send the credentials to the server and await the response 
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        // await the body of the response
        const auth = await response.json();

        // if the server responded with { success: true, message: "..." }, then the new user was created
        if (auth.success){
            window.location.href = 'home.html'; // update the page to account.html
        }
        else { // otherwise
            this.showError(auth.message, this.lErrorM); // show the error message div with the message received from the server
        }
    }

    async register(event){ // this method handles the registration form submission by sending the entered credentials to the server and awaiting the response to determine if the registration was successful or if an error message should be shown
        event.preventDefault();
        const password = this.rPassW.value;
        const username = this.rUser.value;

        const credentials = {
            "username": username,
            "password": password,
            "wardrobe": []
        };

        const response = await fetch('/register', { // send the credentials to the server and await the response
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const auth = await response.json(); // await the body of the response

        if (auth.success){ // if the server responded with { success: true, message: "..." }, then the new user was created
            alert("Registration successful. Please login.");
        }
        else { // otherwise
            this.showError(auth.message, this.rErrorM); // show the error message div with the message received from the server
        }
    }

    showError(message, errorDiv){ // this method takes in an error message and an error message div, sets the text content of the div to the message, and removes the hidden class to make it visible
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

export default App;