const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navBar = document.querySelector(".nav-bar");

if(bar){
    bar.addEventListener('click',()=>{
        navBar.classList.add('active');
    })
}
if(close){
    bar.addEventListener('click',()=>{
        close.classList.remove('active');
    })
}

    // Clicking an image from the small row in the shop's page    
    let mainImg = document.getElementById("mainImg"); 
    let smallImgs = document.querySelectorAll(".smallImg"); // Select all small images
    smallImgs.forEach(function(img) {
        img.addEventListener("click", function() {
            mainImg.src = this.src; // Change main image
        });

        let selectedImage = localStorage.getItem("selectedImage");
        if (selectedImage) {
            mainImg.src = selectedImage; // Set the main image to the clicked image
        }
    });
    

    // shop image click function
        let productImages = document.querySelectorAll(".product-container img");
    
        productImages.forEach(function(img) {
            img.addEventListener("click", function() {
                localStorage.setItem("selectedImage", this.src); // Store the clicked image source
                window.location.href = "sproducts.html"; // Redirect to the product details page
            });
        });
    

        