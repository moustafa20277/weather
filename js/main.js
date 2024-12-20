const btn = document.querySelector("button")
const show = document.querySelector("#navbarNav")
const form = document.querySelector("form")
const search = document.querySelector("#search")
const d = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var box2=``;
let contents ;


function showList(){
    if(show.classList.contains("show")){
        show.classList.remove("show")
    }else{
        show.classList.add("show")
    }
}
btn.addEventListener("click", showList)

async function searchItem(city) {
    let http = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2d18961a63ec490ca5631204241912&q=${city}&days=3`)
    
    if(http.status != 400){
        const myHttp = await http.json()
        
        display(myHttp.location ,myHttp.current ,myHttp.forecast.forecastday)
        clear()
    }else{
        console.log("error in APi");
    }
}
searchItem("cairo")

search.addEventListener("blur" , function(e){
    searchItem(e.target.value)
})
form.addEventListener("click",function(e){
    e.preventDefault()
})



function clear(){
    search.value = null
}



function display(city , t , another){
    let cartona="";
    
    const box1 = `<div class="card-body col-lg-4">
                <header class="d-flex justify-content-between px-2 py-2">
                    <p class="m-0">${days[d.getDay()]}</p>
                    <p class="m-0"><span>${d.getDate()}</span>${months[d.getMonth()]}</p>
                </header>
                <section class="px-3">
                    <div class="my-3">
                        <p class="fs-3">${city.name}</p>
                        <h2 class="fw-bolder text-white">${t.temp_c}<sup>o</sup>C</h2>
                        <figure><img src="${t.condition.icon}" alt="logo"></figure>
                        <figcaption>${t.condition.text}</figcaption>
                    </div>
                    <div class="footer d-flex justify-content-around my-2">
                        <div class="d-flex">
                            <figure class="me-2"><img src="./images/icon-umberella.png" alt="logo"></figure>
                            <p>clear</p>
                    </div>
                    <div class="d-flex">
                        <figure class="me-2"><img src="./images/icon-wind.png" alt="logo"></figure>
                        <p>clear</p>
                    </div>
                    <div class="d-flex">
                        <figure class="me-2"><img src="./images/icon-compass.png" alt="logo"></figure>
                        <p>clear</p>
                    </div>
                </div>
                </section>
        </div>
        `
        for (let i = 1; i < another.length; i++) {
            const Day = another[i].date
            let newD = new Date(Day);

            box2 +=`<div class="card-body special col-lg-4 text-center">
            <header class="special px-2 py-2">
                <p class="m-0">${days[newD.getDay()]}</p>
            </header>
            <section class="px-3 pt-5">
                    <figure><img src="${another[i].day.condition.icon}" alt="logo"></figure>
                    <h3 class="fw-bolder text-white mt-2">${another[i].day.maxtemp_c}<sup>o</sup>C</h3>
                    <p class="mb-2">${another[i].day.mintemp_c}<sup>o</sup></p>
                    <figcaption>${another[i].day.condition.text}</figcaption>
            </section>
            </div>
            `
            
        }
        cartona = box1+box2
        document.querySelector("#myData").innerHTML=cartona
}