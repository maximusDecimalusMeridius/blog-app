const addBlogButton = document.querySelector("#add-blog-button");
const addBlogForm = document.querySelector(".new-form");
const submitBlogButton = document.querySelector("#submit-button");
const blogHeaders = document.querySelectorAll(".blogheader");

const addCommentButton = document.querySelector("#add-comment-button");
const submitCommentButton = document.querySelector("#submit-comment-button");
const commentTitle = document.querySelector("#comment-title");
const commentContent = document.querySelector("#comment-content");

blogHeaders.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.parentNode.lastElementChild.classList.toggle("hide");
        }
    })
})

addBlogButton.addEventListener("click", () => {
    const computedBlogForm = getComputedStyle(addBlogForm)
    if(computedBlogForm.display == "none"){
        addBlogForm.style.display = "block";
    } else {
        addBlogForm.style.display = "none"
    }
})

submitBlogButton.addEventListener("click", async (event) => {
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

addCommentButton.addEventListener("click", (event) =>  {
    event.target.style.display = "none";
    event.target.nextElementSibling.style.display = "block";
})

submitCommentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(event);
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