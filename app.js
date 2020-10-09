const formData = {};
const form = document.querySelector("#userForm");
const button = document.querySelector('#show-output');
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
    const output = document.querySelector('.output__text');
    console.log(response.json());
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    console.log('No data');
  })
}