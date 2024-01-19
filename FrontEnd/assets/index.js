
//vérifier que son Jason server et bien enroute

/***** variables *****/
getWorks();
//affichageWorks();


const gallery = document.querySelector("gallery");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJason=response.json()
    console.log(responseJason)
    //return await response.json();
}


//async function affichageWorks() {
    //const arrayWorks = await getWorks();

//}

