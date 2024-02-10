//vérifier que son Jason server et bien enroute

/***** variables *****/


const gallery = document.getElementById("gal");
const filter = document.getElementById("filter")
console.log(gallery);

//****************** function return array works ******************//

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getWorks();

//****************** function creation espasce pour afficher image ******************//

async function displayWorks() {
  gallery.innerHTML = "";
  const works = await getWorks ();
  works.forEach((work) => {
    affichageWorks(work);
  });
}
displayWorks()

//****************** function afficher image ******************//

async function affichageWorks(work) {
   
  const figure=document.createElement("figure");
  const img = document.createElement("img");
  const figcaption =document.createElement("figcaption");
  img.src = work.imageUrl;
  figcaption.textContent = work.title;
  gallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  
}
//affichageWorks();

//****************** function recuperer le tableau des categories ******************//

async function getCategorys(){
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getCategorys();

//****************** function ajouter bouton categories ******************//

async function getCategorysButtons(){
  const categorie = await getCategorys();
  console.log(categorie);
  categorie.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name.toUpperCase();
      btn.id= category.id;
      filter.appendChild(btn);
      btn.classList.add("filterButtonAll")

   });
}
getCategorysButtons()

//****************** function ajouter bouton categories *****************

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

//****************** function admin user mode **********************

//******** constente ************
const loged= (JSON.parse(sessionStorage.getItem("isConnected"))) 
console.log(loged)
const logout = document.getElementById("logBtn")
console.log(logout)
const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;

async function adminUserMode() {
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
    

  }
}

adminUserMode()

//****************** function admin user mode disco **********************

function disconected(){
  logout.addEventListener("click", () => {

    sessionStorage.removeItem("Token");
    window.sessionStorage.setItem("isConnected", JSON.stringify(false));
    window.location.replace("login.html");
         
  });  
};
disconected()

//****************** function open mode 1 **********************
//******** constente ************

const btned = document.querySelector("#portfolio p ");
const containerModal = document.querySelector(".modal");
const closeXmark = document.getElementById("closeModale");


function openModal(){

  btned.addEventListener ("click",() => {

    containerModal.style.display="flex"   
  });
};

openModal()

//****************** function close modale 1 **********************


function closeModal(){

  closeXmark.addEventListener ("click",() => {

    containerModal.style.display="none";  
  })
  
  containerModal.addEventListener ("click",(e) => {
    console.log(e.target.className);
    if (e.target.className == ("modal")) {
      containerModal.style.display="none";
    }
  });
};
closeModal()

//****************** function put image (works) inside modale 1 **********************
//******** constente ************

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
    const trash = document.createElement("i")


    trash.classList.add ("fa-solid","fa-trash-can","poub")
    trash.setAttribute("id","poubelle")
    span.classList.add ("miniWork")
      
    trash.id = work.id
    img.src= work.imageUrl
    img.classList.add ("imgGallery" )
      
    span.appendChild(trash)
    figure.appendChild(span)
    figure.appendChild(img)
    modalCmt.appendChild(figure)

  });
  // ne pas oublier d'ajouter la fonction deleteWork
  deleteWithTrash()
}
displayGaleriePhoto()


//****************** function suprime (works) inside modale 1 **********************
function deleteWithTrash() {
  const deleteBtn = document.querySelectorAll(".poub");
  console.log(deleteBtn)
 deleteBtn.forEach(trash => {
  const token = window.sessionStorage.getItem("token");
  trash.addEventListener("click" , (e) =>{
    const id = trash.id
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) =>{
      if (!response.ok){
        console.log ("ca marcghe pas ")
      }
      return response.json()
    })
    .then((data)=>{
      console.log("la data reusi",data)
      displayGaleriePhoto()
      displayWorks()
    })
  })
})
}
//****************** function afficher mode 2 **********************
//******** constente ************

const btnAddModal = document.getElementById("addPictureBtn");
console.log(btnAddModal)
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
};

displayAddModal(); 


//****************** function ajouter (works) inside mode 2 **********************
//******** constente ************

// faire la prévisualisation
const previewCon =document.getElementById("picturePreview")
const previewImg = document.getElementById("picturePreviewImg");
console.log(previewImg)
const inputFile = document.querySelector(".modalWrapper input");
const labelFile = document.querySelector(".modalWrapper label");
const conIconeFile =document.getElementById("labelPhoto");
const iconFile = document.querySelector("#picture");
const pFile = document.getElementById("pp");


//Ecouter les changement sur l'input file
function previsualiserWorksModal2(){
  inputFile.addEventListener("change", () => {
 
    const file = inputFile.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      console.log(reader)
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewCon.style.display = "flex";
        labelFile.style.display = "none";
        conIconeFile.style.display = "none";
        pFile.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
}
previsualiserWorksModal2()


const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("selectCategory");
const imageInput = document.getElementById("photo");

const btnValider = document.getElementById("valider");

function verifierChampsRemplis() {
 
  // Vérifier si tous les champs requis sont remplis
  const champsRemplis = titleInput.value !== "" && categorySelect.value !== "" && imageInput.files.length > 0;

  // Mettre à jour le style du bouton en fonction de l'état des champs
  if (champsRemplis) {
      btnValider.disabled = false; // Activer le bouton de validation
      // pour changer la couleur du bouton
      btnValider.style.backgroundColor = "#1D6154";
  } else {
      btnValider.disabled = true; // Désactiver le bouton de validation
     // pour changer la couleur du bouton
      btnValider.style.backgroundColor = "#A7A7A7";
  }
}

// Appeler la fonction verifierChampsRemplis chaque fois qu'un champ est modifié
document.getElementById("title").addEventListener("input", verifierChampsRemplis);
document.getElementById("selectCategory").addEventListener("change", verifierChampsRemplis);
document.getElementById("photo").addEventListener("change", verifierChampsRemplis);


//Faire un POST ajouter une photo

function ajouterListenerEnvoyerPhoto(){
  const form = document.getElementById("addPictureForm");
  console.log(form)
 
  

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
   
   

    const title = document.querySelector("#title").value;
    console.log(title )
    const categoryId = document.querySelector("#selectCategory").value;
    console.log(categoryId)
    const imageInput = document.querySelector("#photo");
    console.log(imageInput )
    const image = imageInput.files[0];
    const validerBtn = document.querySelector("#valider");

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", image);

    const token = window.sessionStorage.getItem("token");

    try{
      const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST", 
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok){
        throw new Error (`Erreur HTTP ! Statut : ${response.status}`);
      }

      const data = await response.json();
      console.log("Nouvelle photo crée !", data);
    } catch (error) {
      console.error("une erreur est survenue lors de l'envoi:", error.message);    
    } 
  });
  
}
ajouterListenerEnvoyerPhoto()













