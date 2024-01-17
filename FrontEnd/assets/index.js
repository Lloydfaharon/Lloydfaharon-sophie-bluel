async function getWorks() {
    const response = await fetch("http://localhost:5678/api-docs/");
    const responseJson =  response.json();
    console.log(responseJson);
}
getWorks();