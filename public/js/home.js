const blogHeaders = document.querySelectorAll(".blogheader");
const addCommentButton = document.querySelector("#add-comment-button");
const submitCommentButton = document.querySelector("#submit-comment-button");
const commentTitle = document.querySelector("#comment-title");
const commentContent = document.querySelector("#comment-content");

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
            title: commentTitle.value,
            content: commentContent.value,
            blog_id: event.target.parentNode.parentNode.parentNode.parentNode.dataset.id
        }
        
        const result = await fetch("/blogs/comments",{
            method:"POST",
            body:JSON.stringify(newCommentObj),
            headers:{
                "Content-Type":"application/json"
            }
        })

        //reset fields and reload page
        commentTitle.value = "";
        commentContent.value = "";
        if(result.status === 500){
            alert("Please login before commenting");
        } else {
            location.reload();
        }
    } catch(error) {
        console.error(error);
        json.status(500)
    }
})