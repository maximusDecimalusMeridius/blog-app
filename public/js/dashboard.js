const addBlogButton = document.querySelector("#add-blog-button");
const addBlogForm = document.querySelector(".new-form");
const submitBlogButton = document.querySelector("#submit-button");

const editBlogButtons = document.querySelectorAll(".edit-blog-button");
const deleteBlogButtons = document.querySelectorAll(".delete-blog-button");
const editCommentButtons = document.querySelectorAll(".edit-comment-button");
const deleteCommentButtons = document.querySelectorAll(".delete-comment-button");
const addCommentButtons = document.querySelectorAll(".add-comment-button");
const submitCommentButtons = document.querySelectorAll(".submit-comment-button");

const blogHeaders = document.querySelectorAll(".blogheader");

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
    
    document.querySelector("#blog-title").value = "";
    document.querySelector("#blog-content").value = "";
    location.reload();    
    } catch (error) {
        console.error(error);
    }
})

blogHeaders.forEach( blogPost => {
    blogPost.addEventListener("click", function(event) {
        if( event.target.classList.contains("blogheader") ||
            event.target.classList.contains("blogheader-title") ||
            event.target.classList.contains("blogheader-date")
            ) {
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

//TODO: Edit blog listener

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

addCommentButtons.forEach( comment => {
    comment.addEventListener("click", (event) =>  {
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "block";
    })
})

editCommentButtons.forEach( button => {
    button.addEventListener("click", (event) => {
        if(Window.isEditing != true){
        
            Window.isEditing = true;

            const commentTitleBox = event.target.parentNode.parentNode.firstElementChild
            const commentTitle = event.target.parentNode.parentNode.firstElementChild.textContent;
            const commentContentBox = event.target.parentNode.parentNode.parentNode.lastElementChild.childNodes[1];
            const commentContent = event.target.parentNode.parentNode.parentNode.lastElementChild.childNodes[1].textContent;

            const titlePlaceholder = commentTitle;
            const contentPlaceholder = commentContent;

            const editTitleBox = document.createElement("input");
            const editContentBox = document.createElement("textarea");
            editContentBox.classList.add("edit-content");
            document.querySelector("#add-comment-button").classList.toggle("hide");
            document.querySelector("#send-it").classList.toggle("hide");
            const closeEdit = document.createElement("div");

            closeEdit.textContent = "❌";
            closeEdit.classList.add("cursor");
            closeEdit.style.fontSize = "20px";

            commentTitleBox.textContent = "";
            commentContentBox.textContent = "";

            editTitleBox.value = `${commentTitle}`
            commentTitleBox.appendChild(editTitleBox);
            commentTitleBox.appendChild(closeEdit);

            editContentBox.value = `${commentContent}`
            commentContentBox.appendChild(editContentBox);

            closeEdit.addEventListener("click", () => {
                Window.isEditing = false;
                commentTitleBox.textContent = titlePlaceholder;
                commentContentBox.textContent = contentPlaceholder;
                // commentTitleBox.removeChild(editTitleBox);
                // commentTitleBox.removeChild(closeEdit);
                // commentContentBox.removeChild(editContentBox);
                document.querySelector("#add-comment-button").classList.toggle("hide");
                document.querySelector("#send-it").classList.toggle("hide");
            })

            document.querySelector("#send-it").addEventListener("click", async (event) => {
                event.preventDefault();
                try{
                    const newCommentObj = {
                        title: editTitleBox.value,
                        content: editContentBox.value,
                        id: 21
                    }

                    const result = await fetch (`/blogs/comments/update/`, {
                        method: "PUT",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(newCommentObj)
                    })

                    const data = await result.json();

                    console.log(data);

                    if(result.ok){
                        Window.isEditing = false;
                        commentTitleBox.textContent = newCommentObj.title;
                        commentContentBox.textContent = newCommentObj.content;
                        document.querySelector("#add-comment-button").classList.toggle("hide");
                        document.querySelector("#send-it").classList.toggle("hide");                   
                    }

                } catch (error) {
                    console.error(error);
                }
            })
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