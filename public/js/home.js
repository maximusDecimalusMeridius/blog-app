const blogHeaders = document.querySelectorAll(".blogheader");
const addCommentButton = document.querySelector("#add-comment-button");
const submitCommentButton = document.querySelector("#submit-comment-button");
const blogTitle = document.querySelector("#blog-title");
const blogContent = document.querySelector("#blog-content");

blogHeaders.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        console.log(this);
        if(event.target.id != "add-comment-button"){
            this.parentNode.lastElementChild.classList.toggle("hide");
        }
    })
})

addCommentButton.addEventListener("click", (event) =>  {
    event.target.style.display = "none";
    event.target.nextElementSibling.style.display = "block";
})

submitCommentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try{
       
        const newCommentObj = {
            title: blogTitle.value,
            content: blogContent.value,
            blog_id: event.target.parentNode.parentNode.parentNode.parentNode.dataset.id
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