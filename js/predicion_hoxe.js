
function tempoHoxe(){
    const urlHoxe = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=gl`

    document.getElementById("ampliadaHoxe").classList.toggle("mostrar");

    fetch(urlHoxe)
        .then(response => response.json())
        .then(datosHoxe => {
            console.log(datosHoxe)

            //Nome lugar e cordenadas
            document.getElementById("hoxeTitulo").textContent = datosHoxe.name;
            document.getElementById("cordenadas").textContent = datosHoxe.coord.lat + "/" + datosHoxe.coord.lon;

            //Nubrado
            document.getElementById("nubrado").textContent = datosHoxe.clouds.all;

            //Humidade
            document.getElementById("humidade").textContent = datosHoxe.main.humidity;

            //Temperatura
            document.getElementById("temperatura").textContent = Math.round(datosHoxe.main.temp);
            document.getElementById("temperaturas").textContent = Math.round(datosHoxe.main.temp_min) + "ºC/" + Math.round(datosHoxe.main.temp_max) + "ºC";
            document.getElementById("sensacion").textContent = Math.round(datosHoxe.main.feels_like) + "ºC";

            //Visibilidade
            document.getElementById("visibilidade").textContent = (datosHoxe.visibility / 1000) + "km";

            //Vento
            document.getElementById("vento").textContent = Math.round(datosHoxe.wind.speed * 3.6) + "km/h " + datosHoxe.wind.deg + "º";


            //Amencer e atardecer
            let timestamp1 = datosHoxe.sys.sunrise * 1000;
            let amencer = new Date(timestamp1);
            let horaAmencer = amencer.getHours();
            let minutosAmencer = amencer.getMinutes();
            amencer = horaAmencer + ":" + minutosAmencer;


            let timestamp2 = datosHoxe.sys.sunset * 1000;
            let atardecer = new Date(timestamp2)
            let horaAterdecer = atardecer.getHours();
            let minutosAtardecer = atardecer.getMinutes();
            atardecer = horaAterdecer + ":" + minutosAtardecer;

            document.getElementById("amencer").textContent = amencer;
            document.getElementById("atardecer").textContent = atardecer;
            
            



        })
    }


function pecharPopup(){
    document.getElementById("ampliadaHoxe").classList.toggle("mostrar");
}
