document.addEventListener("DOMContentLoaded",()=>{
    async function fetchProductById(id){
        const product= await axios.get(`https://fakestoreapi.com/products/${id}`);
        return product.data;
    }
    async function fetchPayment(id){
        const payableAmount=await fetchProductById(id);
        const amount=document.getElementById("amount-payable");
        amount.innerHTML=`&#x24; ${payableAmount.price}`;
    }
    fetchPayment("1");
})
