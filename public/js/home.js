const blogPosts = document.querySelectorAll(".blogpost");

blogPosts.forEach(blogPost => {
    blogPost.addEventListener("click", function(event) {
        if(event.target.id != "add-comment-button"){
            this.lastElementChild.classList.toggle("hide");
        }
    })
})