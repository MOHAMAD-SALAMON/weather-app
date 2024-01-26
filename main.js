const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField =inputPart.querySelector('input'),
locationBtn =inputPart.querySelector('button'),
wIcon = document.querySelector(".weather-part img")
;
let api;

const apiKey = "595b80ea5d6b852d755b3f613d959ca5"
inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter" && inputField.value !=""){
        requestApi(inputField.value);
    }
});
locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess , onErorr)
    }else{
        alert("You broswser not support geolocation api")
    }
});
function onSuccess(position){
    const {latitude , longitude} = position.coords;
     api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
     fetchData();
}
function onErorr(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error")
}
function requestApi(city){
     api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
     fetchData();
} 
function fetchData(){
    infoTxt.innerText = "Getting weather details ...";
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => {
        if(result.cod=="404"){
            infoTxt.innerText=`${inputField.value} isn't a valid city name`;
            infoTxt.classList.replace("pending","error")
        }else{
            const city=result.name;
            const country = result.sys.country;
            const {description , id}=result.weather[0];
            const {feels_like , humidity , temp}=result.main
            if(id== 800){
                wIcon.src="img/day.svg"
            }else if(id>= 200 && id<= 232){
                wIcon.src="img/thunder.svg"
            }else if(id>= 600 && id<= 622){
                wIcon.src="img/snowy-1.svg"
            }else if(id>= 701 && id<= 781){
                wIcon.src="img/day.svg"
            }else if(id>= 801 && id<= 804){
                wIcon.src="img/cloudy.svg"
            }else if((id>= 300 && id<= 321)|| (id>= 500 && id<= 531)){
                wIcon.src="img/rainy-1.svg"
            }




            infoTxt.classList.remove("pending","error");
            wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
            wrapper.querySelector(".weather").innerText = description;
            wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
            wrapper.querySelector(".temp .numb-2").innerText =feels_like;
            // wrapper.querySelector(".humidity span").innerText = `${humidity}%`;   
            wrapper.classList.add('active');
            console.log(result);
        }
    })
} 