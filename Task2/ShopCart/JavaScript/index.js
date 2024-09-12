

async function getCategories(){
    const response=await fetch("https://fakestoreapi.com/products/categories");
    const data=await response.json();
    return data;
}
async function addCategories(){
    const categories=await getCategories();
    const loaderBackdrop=document.getElementById("loaderBackdrop");
    loaderBackdrop.style.display="none";
    const categoryList=document.getElementById("categoryList");
    categories.forEach((category)=>{
        const categoryHolder=document.createElement("div");
        categoryHolder.classList.add("category-item","d-flex","align-items-center","justify-content-center")
        const categoryLink=document.createElement("a");
        categoryLink.href=`productList.html?category=${category}`;
        categoryLink.innerText=category;
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);
    });
}
addCategories();