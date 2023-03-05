document.querySelector("#login").addEventListener("submit", event => {
    event.preventDefault();
    const loginObj = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
    console.log(loginObj)
    fetch("/users/login",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/dashboard"
        } else {
            alert("Error logging in")
        }
    })
})

document.querySelector("#signup").addEventListener("submit", event => {
    event.preventDefault();
    const signupObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value
    }

    fetch("/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})