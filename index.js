const buttons = document.getElementById("buttons");
const searchForm = document.getElementById("search-form");
const searchFormBar = document.getElementById("search-form-bar");
const selectedSite = document.getElementById("selectedSite");
const keyboardPopout = document.getElementById("keyboardPopout");
const deleteBtn = document.getElementById("deleteBtn");
const innerValue = searchFormBar.value;


let siteSelected;
const json = await fetch('link.json')
  .then((response) => response.json())
  .then((data) => {
    return data
  })

  //create button 
json.forEach(x => {
    const button = document.createElement("button");
    if(x.isShortcut){
        button.innerText="🔗"+x.site;
    }else{
        button.innerText= x.site;
    }
    button.id = x.site;
    button.type ="button";
    button.style.backgroundColor = x.color;
    button.classList.add("urlBtn");
    //button click 
    buttons.appendChild(button).addEventListener("click", function(){
        const searchFormBarFirst = searchFormBar.value.split(" ");
        if(x.isShortcut){
            return location.href = x.url;
        }
        if(searchFormBar.value===""){
            searchFormBar.value = x.site + " ";
            wordCheck();
            siteSelected =  true;
            
        }else if(siteSelected){
            searchFormBarFirst[0] = x.site;
            searchFormBar.value = searchFormBarFirst.join(" ");
            wordCheck();
            siteSelected =  true;
        }else{
            searchFormBarFirst.splice(0,0,x.site);
            console.log(searchFormBarFirst.join(" "));
            searchFormBar.value = searchFormBarFirst.join(" ");
            wordCheck();
            siteSelected =  true;
        }
        searchFormBar.focus();
    });
})

// input submit
const handleSubmit = (event)=>{
    event.preventDefault();
    const innerValue = searchFormBar.value;
    json.forEach(x=>{
        if(selectedSite.innerText){
            const valueArray = innerValue.split(" ")
            if(x.site === valueArray[0]){
                location.href = x.url+valueArray.slice(1,valueArray.length).join(" ");
            }
        }
    })
}


const wordCheck = () =>{
    const innerValue = searchFormBar.value;
    const array = innerValue.split(" ");
    if(array.length>=2){
        json.forEach(x=>{
            if(x.site === array[0]){
                selectedSite.innerText = array[0];
                siteSelected = true;
                selectedSite.style.backgroundColor = x.color;
            }
        })
    }else{
        selectedSite.innerText = ""
        siteSelected = false;
    }
}

const handleInput = (event) =>{
    wordCheck();
}

wordCheck();
window.addEventListener("load", ()=>{
    wordCheck();
    searchFormBar.value="";
});
searchForm.addEventListener("submit", handleSubmit)
searchFormBar.addEventListener("input", handleInput);
keyboardPopout.addEventListener("click", ()=>{
    wordCheck();
    searchFormBar.focus();
    searchFormBar.select();
});
deleteBtn.addEventListener("click", (event)=> {
    searchFormBar.value=""
    wordCheck();
    searchFormBar.focus();
});