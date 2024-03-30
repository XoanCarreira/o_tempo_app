let lat;
let lon;


//API de OpenWeather

const apiKey = "e28f230758f15fbf4a9b66b5ebaa05fa";

// const apikey = API_KEY;
const localidade = document.getElementById("localidade");



// console.log(localidade.value);






//Iconos tempo
const iconos = {
    "01d": 'assets/iconos/01d.png',
    "01n": 'assets/iconos/01n.png',
    "02d": 'assets/iconos/02d.png',
    "02n": 'assets/iconos/02n.png',
    "03d": 'assets/iconos/03d.png',
    "03n": 'assets/iconos/03n.png',
    "04d": 'assets/iconos/04d.png',
    "04n": 'assets/iconos/04n.png',
    "09d": 'assets/iconos/09d.png',
    "09n": 'assets/iconos/09n.png',
    "10d": 'assets/iconos/10d.png',
    "10n": 'assets/iconos/10n.png',
    "11d": 'assets/iconos/11d.png',
    "11n": 'assets/iconos/11n.png',
    "13d": 'assets/iconos/13d.png',
    "13n": 'assets/iconos/13n.png',
    "50d": 'assets/iconos/50d.png',
    "50n": 'assets/iconos/50n.png'
}

function actualizaTempo(lat, lon) {

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=gl`;

    fetch(apiURL)
        .then(response => response.json())

        .then(
            data => {
                console.log(data);


                let estado = "";
                if(data.city.country != "ES"){
                    estado = data.city.country;
                }else{
                    estado = ""
                }

                document.querySelector(".hoxe__localidade").textContent = data.city.name + " " + estado;

                //Calcular a data de hoxe
                const timestamp = data.list[0].dt * 1000;

                const fecha = new Date(timestamp);
                // console.log(fecha)

                //Transformar en día e mes
                const semanario = fecha.getDay();
                const dia = fecha.getDate();
                const mes = fecha.getMonth();

                const diasSemana = ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
                const meses = ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"];
                const nomeMes = meses[mes];

                const dataHoxe = `${diasSemana[semanario]}, ${dia} de ${nomeMes}`;

                document.querySelector(".hoxe__data").textContent = dataHoxe;

                //Icono do tempo
                let icono = data.list[0].weather[0].icon;

                document.querySelector(".hoxe__icono").src = iconos[icono];

                //Info en texto do estado do ceo hoxe
                document.querySelector(".hoxe__descripcion").textContent = data.list[0].weather[0].description;

                ////////////////////////Temperatura de hoxe (Revisar xa que as min/max son da franxa de 3h)
                document.querySelector(".hoxe__temperatura").textContent = Math.round(data.list[0].main.temp) + "℃";
                document.querySelector(".hoxe__min").textContent = Math.round(data.list[0].main.temp_min) + "℃";
                document.querySelector(".hoxe__max").textContent = Math.round(data.list[0].main.temp_max) + "℃";




                //Previsións para os próximos días

                const mesesAbre = ["Xan", "Feb", "Mar", "Abr", "Mai", "Xuñ", "Xul", "Ago", "Set", "Out", "Nov", "Dec"];
                const diasAbre = ["Dom", "Lun", "Mar", "Mér", "Xov", "Ven", "Sáb"]


                
                //Predición por horas

                const ampliada = document.getElementById("ampliada");
                let timeAmpliado
                let diaAmpliado;
                let iconoAmpliado;
                let tempAmpliado;


                for (let i = 0; i < 39; i++) {
                    timeAmpliado = data.list[i].dt * 1000;

                    //Data
                    diaAmpliado = new Date(timeAmpliado);
                    let formatDia = diaAmpliado.getDate();
                    let formatMes = mesesAbre[diaAmpliado.getMonth()]
                    let formatFecha = diasAbre[diaAmpliado.getDay()] + ", " + formatDia + " "+ formatMes;

                    //Hora
                    let formatHora = diaAmpliado.getHours() + ":00h";

                    //Icono tempo
                    iconoAmpliado = iconos[data.list[i].weather[0].icon];

                    //Temperatura
                    tempAmpliado = Math.round(data.list[i].main.temp) + "ºC";

                    //Humidade relativa
                    let formatHumidade = data.list[i].main.humidity + "%H";

                    //Probavilidade choiva
                    let probChoiva = (Math.round(data.list[i].pop * 100)) + "%";

                    //Vento
                    let formatVento = Math.round(data.list[i].wind.speed * 3.6) + "km/h";
                    let direcVento = () => {
                        let direcion = data.list[i].wind.deg;
                        if(direcion > 0 && direcion < 30 || direcion > 341){
                            return "N"
                        }else if(direcion >= 31 && direcion <= 70){
                            return "NE"
                        }else if(direcion >= 71 && direcion <= 110){
                            return "E"
                        }else if(direcion >= 111 && direcion <= 160){
                            return "SE"
                        }else if(direcion >= 161 && direcion <= 200){
                            return "S"
                        }else if(direcion >= 201 && direcion <= 250){
                            return "SO"
                        }else if(direcion >= 251 && direcion <= 290){
                            return "O"
                        }else if(direcion >= 291 && direcion <= 340){
                            return "NO"
                        }        
                    }
                    
                

                    


                    ampliada.innerHTML += `<div class="ampliada__box">
                    <p class="ampliada__data">${formatFecha}\n${formatHora}</p>
                    
                    <img
                      id="ampliadaIcono"
                      src="${iconoAmpliado}"
                      alt="Icono do tempo"
                      class="previsions__icono"
                    />
                    <div class="ampliada__right">
                    <p class="ampliada__p">${tempAmpliado} ${formatHumidade}</p>
                    <p class="ampliada__p">Prob. 🌧: ${probChoiva}</p>
                    <p class="ampliada__p">Vento: ${formatVento} ${direcVento()}</p>
                    </div>
                    </div>`
                    
                }
            }
        )

}




//Definir coordenadas segun municipio
function localizacion(municipio){
    console.log(municipio);
    if (municipio == ""){
        municipio = "vedra";
    }
    const cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${municipio}&appid=${apiKey}`;

    fetch(cordURL)
        .then(response => response.json())
        .then(
            data => {
                // console.log(data)

                lat = data[0].lat;
                lon = data[0].lon;

                actualizaTempo(lat, lon)
            }
        )
    localidade.value = ""
}

const botonBuscar = document.getElementById("botonBuscar");
