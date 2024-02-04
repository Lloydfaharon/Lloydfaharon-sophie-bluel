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
    

  }//else(loged == false)
}

adminUserMode()

//****************** function admin user mode **********************

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

//****************** function close mode 1 **********************


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

//****************** function put image (works) inside mode 1 **********************
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


    trash.classList.add ("fa-solid","fa-trash-can",)
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
  containerModal.addEventListener ("click",(e) => {
    console.log(e.target.id);
   
  });
}
displayGaleriePhoto()


//****************** function suprime (works) inside mode 1 **********************
function deleteWithTrash() {
  let deleteBtn = document.querySelectorAll("fa-solid,fa-trash-can");
  console.log(deleteBtn)
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", deleteWork);
  }
}
deleteWithTrash()



//****************** function suprime (works) inside mode 1 **********************
//******** constente ************

const urlWorks = ("http://localhost:5678/api/works/")


function deleteWork(id) {
  const token = sessionStorage.setItem("Token", data.token);
  const req = {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  
 
  fetch(`${urlWorks}${id}`, req)
    .then((res) => {
      if (res.status === 204) {
        // La photo a été supprimée avec succès
        const galleryItem = document.querySelector(`[data-photo-id="${id}"]`);
        console.log(galleryItem)
        if (galleryItem) {
          galleryItem.remove(); // Supprimez également l'élément de la galerie côté client
        }
        console.info("Item deleted");
      } else if (res.status === 401) {
        console.error("Unauthorized");
      } else {
        console.error("Unexpected behavior");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
deleteWork()



