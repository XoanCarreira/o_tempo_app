let portos = document.getElementById("portos");




function mostrarMareas() {
    const urlMareas = `https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=${portos.value}&format=json`
    fetch(urlMareas)
        .then(response => response.json())
        .then(data => {
            console.log(data)


            let infoMareas = data.mareas.datos.marea;
            let mareasBody = document.getElementById("mareas__body");
            mareasBody.innerHTML = "";


            for (let i = 0; i < infoMareas.length; i++) {

                let tipoMarea = data.mareas.datos.marea[i].tipo;
                let horaMarea = data.mareas.datos.marea[i].hora + "h";
                let alturaMarea = parseFloat(data.mareas.datos.marea[i].altura).toFixed(2) + "m";

                //Tradución a galego
                if(tipoMarea === "pleamar"){
                    tipoMarea = "Preamar";
                }else if(tipoMarea === "bajamar"){
                    tipoMarea = "Baixamar"
                }

                //Incrusto o html coa info das mareas
                mareasBody.innerHTML += `<tr>
                  <td><span class="mareas__texto" >${tipoMarea}</span></td>
                  <td><span class="mareas__texto" >${horaMarea}</span></td>
                  <td>
                    <span class="mareas__texto" >${alturaMarea}</span>
                  </td>
                </tr>`
                
            }


        })
    pecharMareas()
}


function pecharMareas() {
    document.getElementById("mareasFondo").classList.toggle("ocultar");
}