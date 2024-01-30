
//vérifier que son Jason server et bien enroute

/***** variables *****/
getWorks();






const gallery = document.getElementById("gal");
const filter = document.getElementById("filter")
console.log(gallery);

//function return array works//

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

async function displayWorks() {
    gallery.innerHTML = "";
    const works = await getWorks ();
    works.forEach((work) => {
        affichageWorks(work);
    });
}
displayWorks()

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
affichageWorks();


//recuperer le tableau des categories//

async function getCategorys(){
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
getCategorys();

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
getCategorysButtons()
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
    //console.log(e.target.className);
    if (e.target.className =="containerModal") {
        containerModal.style.display="none";
    }
});

  
//put images inside in the modal//
  


const modalCmt = document.querySelector (".modalContent")
//console.log(modalCmt)
  
async function displayGaleriePhoto() {
    modalCmt.innerHTML= ""
    const photo = await getWorks();
    console.log(photo)
    photo.forEach((work) =>{
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("i")

        trash.classList.add ("fa-solid","fa-trash-can",)
        trash.id = work.id
        img.src= work.imageUrl
        img.classList.add ("gallery" )
        
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        modalCmt.appendChild(figure)

    });
    deleteWork()

}
displayGaleriePhoto()

//DELETE work event listener handler
const deleteBtn = function (e) {
    e.preventDefault();
    //clicked button
    if (e.target.matches(".fa-trash-can")) {
      deleteWork(e.target.id);
    }
  };
  
  //API call for DELETE route
  function deleteWork(i) {
    //authentify user and send API response
    let token = sessionStorage.getItem("token");
    fetch("http://localhost:5678/api/works/" + i, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //if response is positive, update the works gallery accordingly
      if (response.ok) {
        alert("Projet supprimé avec succés")
        //delete work from worksData array
        worksData = worksData.filter((work) => work.id != i);
        //display updated galleries
        displayGalleryPhoto(worksData);
        displayWorks(worksData);
        //if response is negative report an error
      } else {
        //alert("Erreur : " + response.status);
        //closeModal;
      }
    });
  }

//Faire aparaitre la deuxieme modale un fois son html fini
const btnAddModal = document.getElementById("addPictureBtn");
const modalAddPix = document.getElementById("addPicture");
const modalPix = document.getElementById("editGallery");
const arrowL = document.querySelector(".modalHeader .fa-arrow-left");
const markAdd = document.getElementById("closeModale2");


function displayAddModal() {
  btnAddModal.addEventListener("click", () => {
    modalAddPix.style.display = "flex";
    modalPix.style.display = "none";
  });
  arrowL.addEventListener("click", () => {
    modalAddPix.style.display = "none";
    modalPix.style.display = "flex";
  });
  markAdd.addEventListener("click", () => {
    modalCmt.style.display = "none";
    window.location = "index.html";
  });
}
displayAddModal();  
// faire la prévisualisation
const previewImg = document.getElementById("picture");
const inputFile = document.querySelector(".modalWrapper input");
const labelFile = document.querySelector(".modalWrapper label");
//const iconFile = document.querySelector(".modalWrapper .fa-image");
const pFile = document.getElementById("pp");

//Ecouter les changement sur l'input file
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      //iconFile.style.display = "none";
      pFile.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});