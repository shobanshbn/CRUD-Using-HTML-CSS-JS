const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

// FORM VALIDATION

const formValidation = () => {
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ){
    msg.innerHTML = "Input Fields Cannot Be Empty 😟";
    
  } else {
    msg.innerHTML = "";
    getData();
     
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// SUBMIT LOGIC

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  formValidation();
})

//GETTING DEATAILS FROM THE FORM INPUT AND STORING IT IN DATA IN ARRAY OF OBJECTS.

let data = [{}]

const getData = ()=>{
  data.push({
      text: textInput.value,
      date: dateInput.value,
      task: textarea.value
  })

  // TO SAVE THE DATA TO THE LOCAL STORAGE

  localStorage.setItem("data",JSON.stringify(data));
  createTask();
}

// CREATE FUNCTION USED  TO GET THE DATA FROM THE LOCAL STORAGE AND DISPLAY IT IN MY TODO'S

const createTask =() =>{
  tasks.innerHTML = ""
  data.map((ele,y)=>{
    return(
      tasks.innerHTML += `
      <div id=${y}>
      <span class="fw-bolder">${ele.text}</span>
      <span class="fw-bolder">${ele.date}</span>
      <span class="fw-bolder">${ele.textarea}</span>
      </div>
      `
    )
  })
}







  
