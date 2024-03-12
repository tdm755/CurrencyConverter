let BaseURL = "https://open.er-api.com/v6/latest";


let fromCurr = document.querySelector(".from .selectContainer select");
let toCurr = document.querySelector(".To .selectContainer select");

let dropdowns = document.querySelectorAll(".selectContainer select");
// let select = document.querySelectorAll(".selectContainer select");


for(let select of dropdowns){
    let img = select.parentElement.querySelector("img");
    for(let currCoun in countryList){
        let option = document.createElement("option");
        option.innerText = currCoun
        option.value = currCoun;
        select.append(option)
        
        if(select.name === "To"  && currCoun === "INR"){
            option.selected = "selected";
        }else if(select.name === "From"  && currCoun === "USD"){
            option.selected = "selected";
        }       
        
   
    }
    select.addEventListener("change", (event)=>{
        // console.log(event.target.name);
        updateFlag(event.target, img);
    })
    
}

function updateFlag(evt, img){
    let countryCurrencyCode = evt.value;  
    let countCode = countryList[countryCurrencyCode];
           img.setAttribute("src", `https://flagsapi.com/${countCode}/flat/64.png`);
          
    if(evt.name == "From"){
        document.querySelector(".input1 img").setAttribute("src", `https://flagsapi.com/${countCode}/flat/64.png`);
    }else {
        document.querySelector(".input2 img").setAttribute("src", `https://flagsapi.com/${countCode}/flat/64.png`);
        document.querySelector(".input2 label span").textContent = countryCurrencyCode;
    }
}




document.querySelector("button").addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("#EA").value;
    let URL =  `${BaseURL}/${fromCurr.value}`
    let response = await fetch(URL);

    let data = await response.json();
    console.log(data);
    let toval = toCurr.value;
    let exchangeRate = data.rates[toval];
    let rateVal = amount * exchangeRate;
    document.querySelector("#EB").value = rateVal;
})





