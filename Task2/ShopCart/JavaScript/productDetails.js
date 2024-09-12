
document.addEventListener("DOMContentLoaded",()=>{
    
function getQueryParams(){
    const queryParams=new URLSearchParams(window.location.search);
const queryParamsObject=Object.fromEntries(queryParams.entries());
return queryParamsObject;
}

async function fetchProductById(id){
    const product= await axios.get(`https://fakestoreapi.com/products/${id}`);
    return product.data;
}

    async function populateProduct(){
        const queryParams=getQueryParams();
        if(queryParams['id']){
            const productId=queryParams['id'];
            const product= await fetchProductById(productId);

            const productName=document.getElementById("productName");
            const productPrice=document.getElementById("productPrice");
            const productDescriptionData=document.getElementById("productDescriptionData");
            const productImage=document.getElementById("productImage");

            productName.textContent=product.title;
            productDescriptionData.textContent=product.description;
            productImage.src=product.image;
            productPrice.innerHTML=`&#x24; ${product.price}`;
            const loaderBackdrop=document.getElementById("loaderBackdrop");
            loaderBackdrop.style.display="none";
        }
    }
    populateProduct();
})