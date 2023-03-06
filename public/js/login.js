const loginLink = document.querySelector("#login-link");
const signupLink = document.querySelector("#signup-link");
const loginWindow = document.querySelector("#login-window");
const signupWindow = document.querySelector("#signup-window");
const loginError = document.querySelector("#login-error");
const signupError = document.querySelector("#signup-error");

loginLink.addEventListener("click", (event) => {
    loginWindow.classList.toggle("hide");
    signupWindow.classList.toggle("hide");
})

signupLink.addEventListener("click", (event) => {
    loginWindow.classList.toggle("hide");
    signupWindow.classList.toggle("hide");
})

document.querySelector("#login").addEventListener("submit", async (event) => {
    
    try {
        event.preventDefault();
        const loginObj = {
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value
        }

        const result = await fetch("/users/login",{
            method:"POST",
            body:JSON.stringify(loginObj),
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(result.status === 401){
            loginError.textContent = "Invalid login credentials";
            setTimeout(() => {
                loginError.textContent = "";
            }, 2000)
        } else {
            location.href="/dashboard"
        }
    } catch (error) {
        console.error(error);
    }
})

document.querySelector("#signup").addEventListener("submit", async (event) => {
    try{
        event.preventDefault();
        const signupObj = {
            username:document.querySelector("#signupUsername").value,
            password:document.querySelector("#signupPassword").value
        }

        const result = await fetch("/users",{
            method:"POST",
            body:JSON.stringify(signupObj),
            headers:{
                "Content-Type":"application/json"
            }
        })
    
        if(result.status > 400){
            signupError.textContent = "Username taken - choose another";
            setTimeout(() => {
                signupError.textContent = "";
            }, 2000)
        } else {
            await fetch("/users/login",{
                method:"POST",
                body:JSON.stringify(signupObj),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            location.href="/";
        }
    } catch (error) {
        console.error(error);
    }
})