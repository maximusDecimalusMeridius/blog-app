const addButton = document.querySelector("#add-blog-button");
const addBlogForm = document.querySelector("#new-form");
const submitButton = document.querySelector("#submit-button");
const blogPosts = document.querySelectorAll(".blogpost");

blogPosts.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.lastElementChild.classList.toggle("hide");
        }
    })
})

addButton.addEventListener("click", () => {
    const computedBlogForm = getComputedStyle(addBlogForm)
    if(computedBlogForm.display == "none"){
        addBlogForm.style.display = "block";
    } else {
        addBlogForm.style.display = "none"
    }
})

submitButton.addEventListener("click", async (event) => {
    try{
        event.preventDefault();
    const newBlogObj = {
        title: document.querySelector("#blog-title").value,
        content: document.querySelector("#blog-content").value
    }

    await fetch("/blogs",{
        method:"POST",
        body:JSON.stringify(newBlogObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    
    location.reload();    
    } catch (error) {
        console.error(error);
    }
})