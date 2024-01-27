
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

//if user's conected//


const loged= (JSON.parse(sessionStorage.getItem("isConnected"))) 
console.log(loged)
const logout = document.getElementById("logBtn")
console.log(logout)
const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;


function adminUserMode() {
    if (loged == true){
      //Hide filter
      filter.style.display="none"

      //change login to logout
      logout.textContent = "logout";

      //display top menu bar
      const body = document.querySelector("body");
      const topMenu = document.createElement("div");
      const editMode = document.createElement("p");
      topMenu.className = "topMenu";
      editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
      body.insertAdjacentElement("afterbegin", topMenu);
      topMenu.append(editMode);

      //edit buttons
      document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", editBtn);
      //event listener modal
      //document.querySelector("#portfolio p").addEventListener("click", openModal);

      
      
    }//else(loged == false)
}
  
adminUserMode()


//If user's disconcted//

logout.addEventListener("click", () => {

    sessionStorage.removeItem("Token");
    window.sessionStorage.setItem("isConnected", JSON.stringify(false));
    window.location.replace("login.html");
        
       
});  

// Afficher la modale //      
const btned = document.querySelector("#portfolio p ")
const containerModal =document.querySelector(".modal")
const closeXmark = document.getElementById("closeModale")

 
btned.addEventListener ("click",() => {

    containerModal.style.display="flex"   
})

//close the modale//
closeXmark.addEventListener ("click",() => {

    containerModal.style.display="none";  
})
containerModal.addEventListener ("click",(e) => {
    console.log(e.target.className);
    if(e.target.className =="containerModal" ) {
        containerModal.style.display="none"
    }
});

  
//put images inside in the modal//
  


const modalCmt = document.querySelector (".modalContent")
console.log(modalCmt)
  
async function displayGaleriePhoto() {
    modalCmt.innerHTML= ""
    const photo = await getWorks();
    console.log(photo)
    photo.forEach((work) =>{
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash =document.createElement("i")
        trash.classList.add ("fa-solid","fa-trash-can")
        trash.id = work.id
        img.src= work.imageUrl
        img.classList.add ("gallery" )
        
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        modalCmt.appendChild(figure)


    })

}

displayGaleriePhoto()


