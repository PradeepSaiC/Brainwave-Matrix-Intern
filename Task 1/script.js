function addToList(){
const inputText=document.getElementById("input-text").value;
    const holdDiv=document.createElement("div");
    holdDiv.classList.add("item");
    const pElem=document.createElement("p");
    pElem.classList.add("item-text");
    pElem.innerText=inputText;
    const underlineElem=document.createElement("div");
    underlineElem.classList.add("underline");
    holdDiv.appendChild(pElem);
    holdDiv.appendChild(underlineElem);
    const taskList=document.querySelector(".second");
    if(taskList.firstChild){
        taskList.insertBefore(holdDiv,taskList.firstChild);
    }
    else{
        taskList.appendChild(holdDiv);
    }
}
const btnElem=document.querySelector(".addBtn");
btnElem.addEventListener("click",()=>{
const holdInputText=document.getElementById("input-text");

        if(holdInputText.value.trim() === ""){
         holdInputText.placeholder="Please Enter the text";
        } 
        else{
         addToList();
        }
});