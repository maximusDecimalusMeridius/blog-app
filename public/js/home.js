const blogPosts = document.querySelectorAll(".blogpost");
const addCommentButton = document.querySelector("#add-comment-button");
const submitCommentButton = document.querySelector("#submit-comment-button");
const blogTitle = document.querySelector("#blog-title");
const blogContent = document.querySelector("#blog-content");


blogPosts.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.lastElementChild.classList.toggle("hide");
        }
    })
})

addCommentButton.addEventListener("click", (event) =>  {
    event.target.style.display = "none";
    event.target.nextElementSibling.style.display = "block";
})

submitCommentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(event);
    try{
       
        const newCommentObj = {
            title: blogTitle.value,
            content: blogContent.value
        }
        
        await fetch("/blogs/comments",{
            method:"POST",
            body:JSON.stringify(newCommentObj),
            headers:{
                "Content-Type":"application/json"
            }
        })

        location.reload();
    } catch(error) {
        console.error(error);
        json.status(500)
    }
})