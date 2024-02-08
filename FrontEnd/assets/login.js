// Les variable pour le login //



const balisEmail = document.getElementById("email");
const balisPassword = document.getElementById("password");
const form =document.querySelector("form")
const messageErreur = document.querySelector("#login p")


function conectionUser(){
    form.addEventListener("submit",(event) =>  {
        event.preventDefault();
    
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
            
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.setItem("token", data.token);
    
                if (data.message || data.error) {
                    ("Erreur dans l\'identifiant ou le mot de passe");
                    messageErreur.textContent = "Erreur dans l\'identifiant ou le mot de passe"
                } else {
                    window.sessionStorage.setItem("isConnected", JSON.stringify(true));
                    window.location.replace("index.html");
                }
            })
    });
};
conectionUser()