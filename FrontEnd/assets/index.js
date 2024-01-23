
//vérifier que son Jason server et bien enroute

/***** variables *****/
getWorks();
affichageWorks();
getCategorys();
getCategorysButtons()
displayWorks()


const gallery = document.getElementById("gal");
const filter = document.getElementById("filter")
console.log(gallery);

//function return array works//

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

async function displayWorks() {
    const works = await getWorks ();
    works.forEach((work) => {
        affichageWorks(work);
    })
}


async function affichageWorks(work) {
   
    const figure=document.createElement("figure");
    const img = document.createElement("img");
    const figcaption =document.createElement("figcaption");
    img.src= work.imageUrl;
    figcaption.textContent = work.title;
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    
}


//recuperer le tableau des categories//

async function getCategorys(){
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

async function getCategorysButtons(){
    const categorie = await getCategorys();
    console.log(categorie);
    categorie.forEach((category) => {
        const btn =document.createElement("button");
        btn.textContent = category.name.toUpperCase();
        btn.id= category.id;
        filter.appendChild(btn);
        btn.classList.add("filterButtonAll")

     })
}
//filtre au click sur le bouton par categories//

async function filtercategory(){
    const allCategorie= await getWorks();
    console.log(allCategorie)
    const boutons = document.querySelectorAll(".filter button");
    boutons.forEach((bouton) => {
        bouton.addEventListener("click", (e) => {
            btnId= e.target.id
            gallery.innerHTML=""
            if (btnId !== "0") {
                const worksTriCategorie = allCategorie.filter((work) => {
                    return work.categoryId == btnId;
                });
                worksTriCategorie.forEach(work =>{
                    affichageWorks(work);
                })
            }else{
                displayWorks();
            }
            
            console.log(btnId)
        })
    })
}
filtercategory()
