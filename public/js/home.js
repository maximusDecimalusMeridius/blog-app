const blogHeaders = document.querySelectorAll(".blogheader");

const addCommentButtons = document.querySelectorAll(".add-comment-button");
const submitCommentButtons = document.querySelectorAll(".submit-comment-button");

blogHeaders.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.parentNode.lastElementChild.classList.toggle("hide");
        }
    })
})

for(let i = 0; i < addCommentButtons.length; i++){
    addCommentButtons[i].addEventListener("click", (event) =>  {
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "block";
    })
}

for(let i = 0; i < submitCommentButtons.length; i++){

    submitCommentButtons[i].addEventListener("click", async (event) => {
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
}

