const formData = {};
const form = document.querySelector("#userForm");
const button = document.querySelector('#show-output');
const output = document.querySelector('.output__text');

form.addEventListener("submit", updateServer);
button.addEventListener('click', fetchData);

function updateServer(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  for (let pair of formData.entries()) {
    formData[pair[0]] = pair[1];
  }

  fetch("http://localhost:3000/save/user", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fetchData(){
  fetch("http://localhost:3000/read/user")
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    displayData(JSON.parse(data));
  })
  .catch((error)=>{
    console.log(error);
    console.log('No data');
  })
}

function displayData(data){
  console.log(data);
  output.innerHTML = `<p>First name: ${data.fName}</p><p>Last name: ${data.lName}</p><p>Phone: ${data.number}</p><p>Email: ${data.email}</p><p>Message: ${data.text}</p>`;
}