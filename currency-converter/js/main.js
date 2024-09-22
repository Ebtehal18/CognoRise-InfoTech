// selecting elements
const amountInput=document.querySelector('.amount')
const fromCurrency=document.getElementById('from')
const toCurrency=document.getElementById('to')
const exchangeBtn = document.querySelector(".btn");
const selects=document.querySelectorAll("datalist")
const exchangeRateParagraph=document.querySelector(".exchange") 


// for loop of currency list
for(let i=0;i<selects.length;i++){
    let cart=''
for(countryCode in countryCodes){
    cart+=`<option value="${countryCode}">${countryCode}</option>`
}
selects[i].innerHTML+=cart;
const inputElement= selects[i].previousElementSibling;
inputElement.addEventListener("change",function(e){
    loadFlag(e.target);
})
}


function loadFlag(elem){
    for (code in countryCodes){
      if(elem.value===code){
        const img=(elem.previousElementSibling);
      img.src=`https://flagsapi.com/${countryCodes[code]}/flat/64.png`
      }
    }
}

// function  of exchange btn
exchangeBtn.addEventListener("click",function(e){
e.preventDefault()
let amount=amountInput.value;
if(!amount){
    amountInput.value=1
}
let url=` https://v6.exchangerate-api.com/v6/44fdefe60ab3bfc80895e52b/latest/${fromCurrency.value}`
fetch(url).then(response=>response.json()).then((result)=>{
let exchangeRate=result.conversion_rates[toCurrency.value]
if (!exchangeRate) {
    exchangeRateParagraph.innerHTML = "Conversion rate unavailable.";
    return;
}
let totalExchangeRate=(amount*exchangeRate).toFixed(2)
exchangeRateParagraph.innerHTML=(`${amount?amount:1} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`);
}).catch(error => {
    exchangeRateParagraph.innerHTML = "Error fetching exchange rates.";
});

})