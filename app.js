let assignedByInput = document.querySelector('#inputAssignedBy');
let descriptionInput = document.querySelector('#inputDesc');
let assignedToInput = document.querySelector('#inputAssignedTo');
let dueDateInput = document.querySelector('#inputDueDate');
let statusInput = document.querySelector('#inputStatus');


let currentlyEditingTask = null;

// // Function that gets the user details input in the form when the button with the id of storeTaskBtn is clicked
document.querySelector('#storeTaskBtn').addEventListener('click', function () {
  let assignedBy = assignedByInput.value;
  let description = descriptionInput.value;
  let assignedTo = assignedToInput.value;
  let dueDate = dueDateInput.value;
  dueDate = (new Date(dueDate)).toLocaleDateString("en-GB");
  let status = statusInput.value;
  //Checks if the an array of the object's keys is empty, in this case this is useful for the checking the 'error' object that is returned from the validateTaskForm function because if the array is empty it means the user data input did that did not engage with any of the conditions within the validateTaskForm function meaning that the data input was formatted correctly. 
  if (isObjectEmpty(validateTaskForm(assignedBy, description, assignedTo, dueDate))){
    clearInputBoxes(); //Clears the input boxes on the form when someone when a task is sucessfuly added
    taskManager.addTask(assignedBy, description, assignedTo, dueDate, status); 
  } else{
    let errorMessages = (validateTaskForm(assignedBy, description, assignedTo, dueDate));
    let errorString = `Error:  `
    for (i in errorMessages){
      errorString += `\n ${errorMessages[i]}`;
    }
    alert(errorString);
  };
  
   
});

// Function to store the details input by the user in local storage for it to later be used
function storeTaskDetails(assignedBy, description, assignedTo, dueDate, status){
    let taskObject = new Task(assignedBy, description, assignedTo, dueDate, status);
    // let idCounter = taskObject.taskID; 
    let taskArray = JSON.parse(localStorage.getItem("taskArray"));
    taskArray.push(taskObject);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    localStorage.setItem("counter", (++taskObject.taskID)) //updates the counter to the incremented value
};

class Task {
  
  constructor (assignedBy, description, assignedTo, dueDate, status){
    this.assignedBy = assignedBy;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
    this.id = taskManager.taskID //parseInt(localStorage.getItem("counter")); //Gets the value of counter in local storage and converts it into an integer
  }
}


taskManager = {
  taskList : [],
  taskID : 0,


  addTask(assignedBy, description, assignedTo, dueDate, status){
    let taskObject = new Task(assignedBy, description, assignedTo, dueDate, status);
    this.taskList.push(taskObject);
    this.taskID++;
    this.updateLocalStorage();
    this.displayCards();

  },

  deleteTask(task){
    this.taskList.splice(this.findID(task),1);
    this.updateLocalStorage();
    this.displayCards();

  },

  // updateTask(assignedBy, description, assignedTo, dueDate, status){
  //   const taskId = currentlyEditingTask;
  //   console.log(this.taskID)

  //   let taskObject = (assignedBy, description, assignedTo, dueDate, status);
  //   this.taskList.splice((this.findID(Task.id)+1), taskObject)
  //   console.log(this.taskList)
  //   // this.updateLocalStorage();
  //   // this.displayCards();
  // },
  
  // Puts the data from the card you pressed the edit button on, into the form fields and runs the toggleButtonSate method
  // displayTaskToUpdateInForm(){
  //   let allTasks = this.taskList;
  //   let currentTask = allTasks.splice(this.findID(),1)
  //   console.log(currentTask[0].dueDate);
    
  //   assignedByInput.value = currentTask[0].assignedBy;
  //   descriptionInput.value = currentTask[0].description;
  //   assignedToInput.value = currentTask[0].assignedTo;
  //   dueDateInput.value = this.dateFormatToYMD(currentTask[0].dueDate); //Converts the date from dd/mm/yyyy to yyyy-mm-dd
  //   statusInput.value = currentTask[0].status;
  //   toggleButtonState("edit");
  // },
  // A method that converts the date from dd/mm/yyyy to yyyy-mm-dd
  dateFormatToYMD(dateFieldValue){
    let  date = dateFieldValue;
    let convertedDate = date.split("/").reverse().join("-");
    return convertedDate;
  },
  // A method that finds the index for the key taskID in the taskArray
  findID(targetID){
    for (i in this.taskList){
      if (this.taskList[i].id === targetID){
        return i //Returns the index of my target id
      };
    };
  },

  updateLocalStorage() {
    localStorage.setItem("taskArray", JSON.stringify(this.taskList));
    localStorage.setItem("counter", JSON.stringify(this.taskID));
  },

  displayCards(){
    // Checks if the key 'taskArray' in local storage has any value in it, if not it sets the value for taskArray to '[]' which when converted back using JSON.parse translates to an empty array
    if (!localStorage.getItem("taskArray")){
      localStorage.setItem("taskArray", "[]")
    }
    // Checks if the key 'counter' in local storage has any value in it, if not it sets the value for taskarray to '0' which is later converted to an integer so that the counter can be incremented and then set as the taskID for the current object before being store and updating the counter.
    // It also sets counter to 0 if all the tasks in the taskArray are deleted
    if ((!localStorage.getItem("counter")) || (localStorage.getItem("taskArray")==="[]")) {
      localStorage.setItem("counter", "0")
      this.taskID = 0; //Resets the task ID to zero so that if the user adds another item straigh
    }

    let list = this.taskList;
    
    document.getElementById("ToDo").innerHTML = "";
    document.getElementById("InProgress").innerHTML = "";
    document.getElementById("Review").innerHTML = "";
    document.getElementById("Completed").innerHTML = "";
    // document.getElementById((list[i].taskStatus)).innerHTML = "";
    document.getElementById("taskSummaryCard").innerHTML = "";
    for (i in this.taskList){
    
      
      this.createTaskSummary(this.taskList[i]);
      this.createTaskCard(this.taskList[i]);
    };
  },

  // A method that creates the individual cards under the form
  createTaskCard(task){
    // console.log(task, task.status)
    // console.log(task.id)
    taskCard = document.getElementById(`${task.status}`);
    taskCard.innerHTML += ` <div class="col-12 " id="taskID-${task.id}">
    <div class="list-group">
        <div  class="list-group-item list-group-item-action ">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Task</h5>
            <small></small>
          </div>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned By</h5>
          </div>
          <p class="mb-1">${task.assignedBy}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Description</h5>
          </div>
          <p class="mb-1">${task.description}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned To</h5>
          </div>
          <p class="mb-1">${task.assignedTo}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Due Date</h5>
          </div>
          <p class="mb-1">${task.dueDate}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Status</h5>
          </div>
          <p class="mb-1">${task.status}</p>
        </div>
       <!--  <button class="btn btn-primary" id="editTaskBtn" onclick="taskManager.displayTaskToUpdateInForm()">Edit task</button> -->
        <button class="btn btn-danger" id="deleteTaskBtn" onclick="taskManager.deleteTask(${task.id})">Delete task</button>        
      </div>`;
  },
  // Creates a summarry card using the data stored in local storage
  createTaskSummary(task){
    summaryCard = document.getElementById("taskSummaryCard");
    summaryCard.innerHTML += `<a href="#taskID-${task.id}" class="list-group-item list-group-item-action ">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${task.assignedTo}</h5>
      <small>Due ${task.dueDate}</small>
    </div>
    <p class="mb-1">${task.status}</p>
  </a>`;
  }

};

// A function to clear the input boxes on the form
function clearInputBoxes(){
  assignedByInput.value = null
  descriptionInput.value = null
  assignedToInput.value = null
  dueDateInput.value = null
};

// Function that checks an if an object is empty by checking the length of an array of the object's keys
function isObjectEmpty(obj){
    
    return Object.keys(obj).length === 0;
};

// Validates the inputs by checking if they have unwanted characters in them or if they are of the correct length
function validateTaskForm(assignedBy, description, assignedTo, dueDate){
    const errors = {}; //Error object which gets data added to it if any of the inputs meet this onditons 
    const specialChars = /[`!@#£$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //Creates a regular expression literal with all the special characters in it
    const numberList = /[1234567890]/; //Creates a regular expression literal with all the numbers in it
    const dateFormat =/[dmy]/ //Creates a regular expression literal with the letters 'd', 'm', and 'y' in it because the date input when no date is selected changes to dd/mm/yyyy
    if ((assignedBy.length > 20) || (assignedBy.length < 1) || (specialChars.test(assignedBy) === true) || (numberList.test(assignedBy) == true)) {
        errors["Assigned By"] = "The length of the 'AssignedBy' input has to be between 1 and 20 characters, and have no special characters.";
    };
    if ((description.length < 3) || (specialChars.test(description) === true)) {
        errors["Description"] = "The length of this 'description input is has to be greater than 3 characters long, and have no special characters.";
    };
    if ((assignedTo.length > 20) || (assignedTo.length < 1) || (specialChars.test(assignedTo) === true) || (numberList.test(assignedTo) == true)) {
        errors["Assigned To"] = "The length of the 'AssignedTo' input has to be between 1 and 20 characters, and have no special characters.";
    };
    if ((dueDate.length < 10) || (dateFormat.test(dueDate) === true)) {
        errors["Due Date"] = "The Date has not been formatted correctly.";
    };
    return errors; //returns the error object so it can be used to check if the validation was successful
    
};

// Changes the button under the form from the storeTaskBtn to the saveChangesBtn
function toggleButtonState(state){
  const edit = document.getElementById("saveChangesBtn");
  const add = document.getElementById("storeTaskBtn");
  if (state === "edit"){
    add.setAttribute("hidden", "true");
    edit.removeAttribute("hidden");
    
  } else{
    edit.setAttribute("hidden", "true");
    add.removeAttribute("hidden");
  };  
};


// document.querySelector('#saveChangesBtn').addEventListener('click', function () {
//   let assignedBy = assignedByInput.value
//   let description = descriptionInput.value
//   let assignedTo = assignedToInput.value
//   let dueDate = dueDateInput.value
//   dueDate = (new Date(dueDate)).toLocaleDateString("en-GB");
//   let status = statusInput.value  
//   //Checks if the an array of the object's keys is empty, in this case this is useful for the checking the 'error' object that is returned from the validateTaskForm function because if the array is empty it means the user data input did that did not engage with any of the conditions within the validateTaskForm function meaning that the data input was formatted correctly. 
//   if (isObjectEmpty(validateTaskForm(assignedBy, description, assignedTo, dueDate))){
//     taskManager.updateTask(assignedBy, description, assignedTo, dueDate, status);
//     clearInputBoxes(); //Clears the input boxes on the form when someone when a task is sucessfuly added
//     toggleButtonState("add");
//     currentlyEditingTask = null;
//   } else{
//     let errorMessages = (validateTaskForm(assignedBy, description, assignedTo, dueDate));
//     let errorString = `Error:  `
//     for (i in errorMessages){
//       errorString += `\n ${errorMessages[i]}`;
//     }
//     alert(errorString);
//   }
// })

// Sets the taskList variable and taskID variables inside the taskManager object equal what is stored in local storage under the keys taskArray and counter respectively
taskManager.taskList = JSON.parse(localStorage.getItem("taskArray")) || [];
taskManager.taskID = JSON.parse(localStorage.getItem("counter")) || 0;


//Calls the displayCards method in the taskManager object so that anything in local storage under the key 'taskArray' with be presented on the web page as a taskCard.
taskManager.displayCards();