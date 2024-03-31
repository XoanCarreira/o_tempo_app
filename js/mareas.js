let portos = document.getElementById("portos");




function mostrarMareas(){
    const urlMareas = `https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=${portos.value}&format=json`
    fetch(urlMareas)
        .then(response => response.json())
        .then(data =>{
            console.log(data)


            document.getElementById("mareaTipo1").textContent = data.mareas.datos.marea[0].tipo;
            document.getElementById("mareaHora1").textContent = data.mareas.datos.marea[0].hora;
            document.getElementById("mareaAltura1").textContent = data.mareas.datos.marea[0].altura;
            
            document.getElementById("mareaTipo2").textContent = data.mareas.datos.marea[1].tipo;
            document.getElementById("mareaHora2").textContent = data.mareas.datos.marea[1].hora;
            document.getElementById("mareaAltura2").textContent = data.mareas.datos.marea[1].altura;
            
            document.getElementById("mareaTipo3").textContent = data.mareas.datos.marea[2].tipo;
            document.getElementById("mareaHora3").textContent = data.mareas.datos.marea[2].hora;
            document.getElementById("mareaAltura3").textContent = data.mareas.datos.marea[2].altura;
            
            document.getElementById("mareaTipo4").textContent = data.mareas.datos.marea[3].tipo;
            document.getElementById("mareaHora4").textContent = data.mareas.datos.marea[3].hora;
            document.getElementById("mareaAltura4").textContent = data.mareas.datos.marea[3].altura;



        })
        pecharMareas()
}


function pecharMareas(){
    document.getElementById("mareasFondo").classList.toggle("ocultar");
}