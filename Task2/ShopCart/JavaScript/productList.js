

async function getProducts(){
    const response=await axios.get("https://fakestoreapi.com/products");
    const data=await response.data;
    return data;
}

async function getCategories(){
    const response=await fetch("https://fakestoreapi.com/products/categories");
    const data=await response.json();
    return data;
}
async function getCategoryProducts(category){
    const response=await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    const data=await response.data;
    return data;
}
async function addProducts(flag,customProducts){
    let products=customProducts;
    const queryParams=new URLSearchParams(window.location.search);
    const queryParamsObject=Object.fromEntries(queryParams.entries());
    if(flag === false){
        if(queryParamsObject['category']){
           products=await getCategoryProducts(queryParamsObject['category']);
        }else{
        products=await getProducts();
        }
    }
    const productList=document.getElementById("productList");
    products.forEach((product)=>{
        const productItem=document.createElement("a");
        productItem.href=`productDetails.html?id=${product.id}`;
        productItem.target="_blank";
        productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");

        const productImageDiv=document.createElement("div");
        productImageDiv.classList.add("product-img");
        const productNameDiv=document.createElement("div");
        productNameDiv.classList.add("product-name","text-center");
        productNameDiv.textContent=product.title.substring(0,12)+"...";
        const productPriceDiv=document.createElement("div");
        productPriceDiv.innerHTML=`&#x24; ${product.price}`;
        productPriceDiv.classList.add("product-price","text-center")
        const productImage=document.createElement("img");
        productImage.src=product.image;
        productImageDiv.appendChild(productImage);
        productItem.appendChild(productImageDiv);
        productItem.appendChild(productNameDiv);
        productItem.appendChild(productPriceDiv);
        productList.appendChild(productItem);

    });
}

const filterSearch=document.getElementById("search");
filterSearch.addEventListener("click",async ()=>{
    const productList=document.getElementById("productList");
    productList.innerHTML="";
    const minPrice=Number(document.getElementById("minPrice").value);
    const maxPrice=Number(document.getElementById("maxPrice").value);
    const products=await getProducts();
    const filteredProducts=products.filter(product => product.price>=minPrice && product.price<=maxPrice);
    addProducts(true,filteredProducts);
});

const resetFilters=document.getElementById("clear");
resetFilters.addEventListener("click",()=>{
    window.location.reload();
});

async function populateCategories() {
    const categories=await getCategories();
    const categoryList=document.getElementById("categoryList");
    categories.forEach((category)=>{
        const categoryLink=document.createElement("a");
        categoryLink.href=`productList.html?category=${category}`;
        categoryLink.classList.add("d-flex","text-decoration-none");
        categoryLink.innerText=category;
        categoryList.appendChild(categoryLink);
    })
}
async function downloadAndPopulate(){
    
    Promise.all([addProducts(false),populateCategories()])
    .then(()=>{
        const loaderBackdrop=document.getElementById("loaderBackdrop");
        loaderBackdrop.style.display="none";
    })
}
downloadAndPopulate();