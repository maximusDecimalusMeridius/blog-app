const editBlogButtons = document.querySelectorAll(".edit-blog-button");
const deleteBlogButtons = document.querySelectorAll(".delete-blog-button");
const editCommentButtons = document.querySelectorAll(".edit-comment-button");
const deleteCommentButtons = document.querySelectorAll(".delete-comment-button");
const addCommentButtons = document.querySelectorAll(".add-comment-button");
const submitCommentButtons = document.querySelectorAll(".submit-comment-button");
const blogHeaders = document.querySelectorAll(".blogheader");

blogHeaders.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.parentNode.lastElementChild.classList.toggle("hide");
        }
    })
})

deleteBlogButtons.forEach( blog => {
    blog.addEventListener("click", async (event) => {
        try {
            const blogId = event.target.parentNode.parentNode.parentNode.dataset.id;
            const result = await fetch(`/blogs/delete/${blogId}`, {
                method: "DELETE",
            });
            
            if(result.ok){
                location.reload();
            }
        } catch(error) {
            console.error(error);
        }
    })
})

deleteCommentButtons.forEach( comment => {
    comment.addEventListener("click", async (event) => {
        try {
            const comment = event.target.parentNode.parentNode.parentNode.dataset.id;
            const result = await fetch(`/blogs/comments/delete/${comment}`, {
                method: "DELETE",
            });
            
            if(result.ok){
                location.reload();
            }
        } catch(error) {
            console.error(error);
        }
    })
})

addCommentButtons.forEach( comment => {
    comment.addEventListener("click", (event) =>  {
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "block";
    })
})

submitCommentButtons.forEach( button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log(event.target.parentNode[0]);
        try{
        
            const newCommentObj = {
                title: event.target.parentNode[0].value,
                content: event.target.parentNode[1].value,
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
            event.target.parentNode[0].value = "";
            event.target.parentNode[1].value = "";
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
})
