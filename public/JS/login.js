/* For the login page I did use some help from a tutorial for the best way of handleing login/registraion switching */

class App{
    constructor(){
        this.wrapper = document.querySelector('.login-page-wrapper');
        this.loginLink = document.querySelector('.login-link');
        this.registerLink = document.querySelector('.register-link');

        this.addActiveTag();

        this.lEmail = document.querySelector("#login-email");
        this.lPassW = document.querySelector("#login-password");
        this.lErrorM = document.querySelector("#login-error-message");
        this.login = this.login.bind(this)

        this.rEmail = document.querySelector("#register-email");
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
        const email = this.lEmail.value;
        const password = this.lPassW.value;

        const response = await fetch("./Data/credentials.json");
        const data = await response.json();

        for(const cred of data){
            if(email === cred.email && password === cred.password){
                console.log("here");
                window.location.href = "home.html";
                return;
            }
        }
        console.log("here");
        this.lErrorM.classList.remove("hidden");
    }

    async register(event){
        event.preventDefault();
        const email = this.rEmail.value;
        const password = this.rPassW.value;

        const response = await fetch("./data/credentials.json");
        const data = await response.json();

        for(const cred of data){
            if(email === cred.email){
                this.rErrorM.classList.remove("hidden");
                return;
            }
        }
        alert("Account created successfully! Please login to continue.");
    }
}

export default App;