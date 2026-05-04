/* For the login page I did use some help from a tutorial for the best way of handleing login/registraion switching 
Here is the link to the tutorial: https://youtu.be/p1GmFCGuVjw?si=HVDteNE2P8vS0R5Y
*/

class App{
    constructor(){
        this.wrapper = document.querySelector('.login-page-wrapper');
        this.loginLink = document.querySelector('.login-link');
        this.registerLink = document.querySelector('.register-link');

        this.addActiveTag();

        this.lUser = document.querySelector("#login-username");
        this.lPassW = document.querySelector("#login-password");
        this.lErrorM = document.querySelector("#login-error-message");
        this.login = this.login.bind(this)

        this.rUser = document.querySelector("#register-username");
        this.rPassW = document.querySelector("#register-password");
        this.rErrorM = document.querySelector("#register-error-message");
        this.register = this.register.bind(this)

        document.querySelector("#login").addEventListener('submit', this.login)
        document.querySelector("#register").addEventListener('submit', this.register)
    }

    /* listens for a button click and then adds/removes the class active to the wrapper */
    addActiveTag(){
        this.registerLink.addEventListener('click', () => {
            this.wrapper.classList.add('active');
        });

        this.loginLink.addEventListener('click', () => {
            this.wrapper.classList.remove('active');
        });
    }

    async login(event){
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

    async register(event){
        event.preventDefault();
        const password = this.rPassW.value;
        const username = this.rUser.value;

        const credentials = {
            "username": username,
            "password": password,
            "wardrobe": []
        };

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const auth = await response.json();

        if (auth.success){
            alert("Registration successful. Please login.");
        }
        else { // otherwise
            this.showError(auth.message, this.rErrorM); // show the error message div with the message received from the server
        }
    }

    showError(message, errorDiv){
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

export default App;