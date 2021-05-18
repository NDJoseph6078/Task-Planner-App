// Checks if the key taskArray in local storage has any value in it, if not it sets the value for taskArray to '[]' which when converted back using JSON.parse translates to an empty array
if (!localStorage.getItem("taskArray")){
  localStorage.setItem("taskArray", "[]")
}
if (!localStorage.getItem("counter")){
  localStorage.setItem("counter", "0")
}



// // Function that gets the user details input in the form when the button with the id of storeTaskBtn is clicked
document.querySelector('#storeTaskBtn').addEventListener('click', function () {
  let assignedBy = document.querySelector('#inputAssignedBy').value.trim();
  let description = document.querySelector('#inputDesc').value.trim();
  let assignedTo = document.querySelector('#inputAssignedTo').value.trim();
  let dueDate = document.querySelector('#inputDueDate').value.trim();
  dueDate = (new Date(dueDate)).toLocaleDateString();
  let status = document.querySelector('#inputStatus').value.trim();

  //Checks if the an array of the object's keys is empty, in this case this is useful for the checking the 'error' object that is returned from the validateTaskForm function because if the array is empty it means the user data input did that did not engage with any of the conditions within the validateTaskForm function meaning that the data input was formatted correctly. 
  if (isObjectEmpty(validateTaskForm(assignedBy, description, assignedTo, dueDate))){
    storeTaskDetails(assignedBy, description, assignedTo, dueDate, status); 
    //location.reload(); //Forces the page to reload
  } else{
    console.log("Card cannot be created as a field is empty or formatted incorrectly");
  }
   
});

// Function to store the details input by the user in local storage for it to later be used
function storeTaskDetails(assignedBy, description, assignedTo, dueDate, status){
    let taskObject = new Task(assignedBy, description, assignedTo, dueDate, status);
    console.log(taskObject.taskID)
    let idCounter = taskObject.taskID;
    let taskArray = JSON.parse(localStorage.getItem("taskArray"));
    taskArray.push(taskObject);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    localStorage.setItem("counter", (++idCounter))
};

class Task {
  
  constructor (assignedBy, description, assignedTo, dueDate, status){
    this.taskAssignedBy = assignedBy;
    this.taskDescription = description;
    this.taskAssignedTo = assignedTo;
    this.taskDueDate = dueDate;
    this.taskStatus = status;
    this.taskID = parseInt(localStorage.getItem("counter"));
  }
}

// Function that creates the individual cards under the form
function createTaskCard(assignedBy, description, assignedTo, dueDate, status, taskId){
    taskCard = document.getElementById("taskCards");
    taskCard.innerHTML += ` <div class="col-12 col-sm-6 col-lg-4" id="taskID-${taskId}">
    <div class="list-group">
        <div  class="list-group-item list-group-item-action ">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Task</h5>
            <small>3 days ago</small>
          </div>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned By</h5>
          </div>
          <p class="mb-1">${assignedBy}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Description</h5>
          </div>
          <p class="mb-1">${description}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned To</h5>
          </div>
          <p class="mb-1">${assignedTo}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Due Date</h5>
          </div>
          <p class="mb-1">${dueDate}</p>
        </div>
        <div  class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Status</h5>
          </div>
          <p class="mb-1">${status}</p>
        </div>
        
      </div>`;

};

// Function that checks an if an object is empty by checking the length of an array of the object's keys
function isObjectEmpty(obj){
    console.log(Object.keys(obj));
    return Object.keys(obj).length === 0;
}

// Validates the inputs by checking if they have unwanted characters in them or if they are of the correct length
function validateTaskForm(assignedBy, description, assignedTo, dueDate){
    const errors = {}; //Error object which gets data added to it if any of the inputs meet this onditons 
    const specialChars = /[`!@#£$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //Creates a regular expression literal with all the special characters in it
    const numberList = /[1234567890]/; //Creates a regular expression literal with all the numbers in it
    const dateFormat =/[dmy]/ //Creates a regular expression literal with the letters 'd', 'm', and 'y' in it because the date input when no date is selected changes to dd/mm/yyyy
    if ((assignedBy.length > 20) || (assignedBy.length < 1) || (specialChars.test(assignedBy) == true) || (numberList.test(assignedBy) == true)) {
        errors["Assigned By"] = "The length of this input has to be between 1 and 20 characters, and have no special characters ";
    };
    if ((description.length > 20) || (description.length < 1) || (specialChars.test(description) == true)) {
        errors["Description"] = "The length of this input has to be between 1 and 20 characters, and have no special characters";
    };
    if ((assignedTo.length > 20) || (assignedTo.length < 1) || (specialChars.test(assignedTo) == true) || (numberList.test(assignedTo) == true)) {
        errors["Assigned To"] = "The length of this input has to be between 1 and 20 characters, and have no special characters";
    };
    if (dueDate.length < 10) {
        errors["Due Date"] = "The Date has no been formatted correctly";
    };
    console.log(errors);
    return errors; //returns the error object so it can be used to check if the validation was successful
    
};

// Creates a summarry card using the data stored in local storage
function createTaskSummary(assignedTo, dueDate, status, taskId){
    summaryCard = document.getElementById("taskSummaryCard");
    summaryCard.innerHTML += `<a href="#taskID-${taskId}" class="list-group-item list-group-item-action ">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${assignedTo}</h5>
      <small>Due ${dueDate}</small>
    </div>
    <p class="mb-1">${status}</p>
  </a>`;
}

// Iterates over the the value for the key 'taskArray' after it's converted from a string into an array and then runs the 'createTaskSummary' and 'createTaskCard' functions with the the sliced array values passed through the function 
function displayCards(){
  let list = JSON.parse(localStorage.getItem("taskArray"));
  for (i in list){
    createTaskSummary(list[i].taskAssignedTo, list[i].taskDueDate, list[i].taskStatus, list[i].taskID);
    createTaskCard(list[i].taskAssignedBy, list[i].taskDescription, list[i].taskAssignedTo, list[i].taskDueDate, list[i].taskStatus, list[i].taskID);
  }
}

class TaskManager {
  constructor(){
    this.tmID = 0;

  }
  getAllTasks(){
    
  }

  addTask(task){
    this.tmID++
  }

  deleteTask(task){

  }

  updateTaskStatus(taskID, status){

  }
}

displayCards(); //Calls the displayCards function so that anything in local storage under the key 'taskArray' with be presented on the web page as the in the form of the respective cards when the page loads.