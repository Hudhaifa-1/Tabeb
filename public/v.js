function websiteVisits(response) {
    let l= document.querySelector("#visits");
    if(l){

        l.textContent =  response.value;
    }
    console.log(response.value)
}
// nothing 