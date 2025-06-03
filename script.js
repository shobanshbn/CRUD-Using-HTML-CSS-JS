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
      <P class="fw-bolder">${ele.task}</P>
      <span class="options">
      <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square fa-bounce" style="color:#FFD43B"></i>
      <i  onclick="deleteTask(this); createTask()" class="fa-solid fa-trash-can fa-bounce" style="color:#FFD43B"></i>
      </span>
      </div>
      `
    )
  })
  resetForm();
}

// RESETTING THE FORM AFTER DISPLAY THE TASK

const resetForm = ()=>{
  textInput.value = "";
  dateInput .value = "";
  textarea.value = ""
}

(()=>{
  data = JSON.parse(localStorage.getItem("data")) || []
  createTask();
}) ();


// EDIT FUNCTION FOR CREATED TODO's

const editTask = (e) =>{
  let result = e.parentElement.parentElement;
  textInput.value = result.children[0].innerHTML;
  dateInput.value = result.children[1].innerHTML;
  textarea.value = result.children[2].innerHTML

  // TO REMOVE THE TASK AFTER EDITED
  deleteTask(e)

}

// DELETE FUNCTION FOR CRETED TODO

const deleteTask = (e)=>{
  e.parentElement.parentElement.remove();
  data.splice( e.parentElement.parentElement.id,1)
  localStorage.setItem("data",JSON.stringify(data))
}








  
