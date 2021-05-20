let assignedByInput = document.querySelector('#inputAssignedBy');
let descriptionInput = document.querySelector('#inputDesc');
let assignedToInput = document.querySelector('#inputAssignedTo');
let dueDateInput = document.querySelector('#inputDueDate');
let statusInput = document.querySelector('#inputStatus');

console.log(assignedByInput, descriptionInput, assignedToInput, dueDateInput, statusInput);

// // Function that gets the user details input in the form when the button with the id of storeTaskBtn is clicked
document.querySelector('#storeTaskBtn').addEventListener('click', function () {
  let assignedBy = assignedByInput.value
  let description = descriptionInput.value
  let assignedTo = assignedToInput.value
  let dueDate = dueDateInput.value
  dueDate = (new Date(dueDate)).toLocaleDateString();
  let status = statusInput.value


  
  //Checks if the an array of the object's keys is empty, in this case this is useful for the checking the 'error' object that is returned from the validateTaskForm function because if the array is empty it means the user data input did that did not engage with any of the conditions within the validateTaskForm function meaning that the data input was formatted correctly. 
  if (isObjectEmpty(validateTaskForm(assignedBy, description, assignedTo, dueDate))){
    taskManager.addTask(assignedBy, description, assignedTo, dueDate, status);
    clearInputBoxes(); //Clears the input boxes on the form when someone when a task is sucessfuly added
  } else{
    let errorMessages = (validateTaskForm(assignedBy, description, assignedTo, dueDate));
    let errorString = `Error:  `
    for (i in errorMessages){
      errorString += `\n ${errorMessages[i]}`;
      console.log(errorMessages[i]);
    }
    alert(errorString);
  };
  
   
});

// Function to store the details input by the user in local storage for it to later be used
function storeTaskDetails(assignedBy, description, assignedTo, dueDate, status){
    let taskObject = new Task(assignedBy, description, assignedTo, dueDate, status);
    console.log(taskObject.taskID)
    // let idCounter = taskObject.taskID; 
    let taskArray = JSON.parse(localStorage.getItem("taskArray"));
    taskArray.push(taskObject);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    localStorage.setItem("counter", (++taskObject.taskID)) //updates the counter to the incremented value
};

class Task {
  
  constructor (assignedBy, description, assignedTo, dueDate, status){
    this.taskAssignedBy = assignedBy;
    this.taskDescription = description;
    this.taskAssignedTo = assignedTo;
    this.taskDueDate = dueDate;
    this.taskStatus = status;
    this.taskID = taskManager.taskID //parseInt(localStorage.getItem("counter")); //Gets the value of counter in local storage and converts it into an integer
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
    console.log(this.taskList)
  },

  deleteTask(taskID){
    this.taskList.splice(this.findID(taskID),1);
    this.updateLocalStorage();
    this.displayCards();
    console.log(this.taskList);
    console.log(i);
  },

  updateTaskStatus(taskID, status){

  },
  // A method that finds the index for the key taskID in the taskArray
  findID(targetID){
    for (i in this.taskList){
      if (this.taskList[i].taskID === targetID){
        console.log(`The target id is ${targetID}`)
        console.log(taskManager.taskList[i].taskID);
        console.log(i);
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
    document.getElementById("taskCards").innerHTML = "";
    document.getElementById("taskSummaryCard").innerHTML = "";
    for (i in list){
      this.createTaskSummary(list[i].taskAssignedTo, list[i].taskDueDate, list[i].taskStatus, list[i].taskID);
      this.createTaskCard(list[i].taskAssignedBy, list[i].taskDescription, list[i].taskAssignedTo, list[i].taskDueDate, list[i].taskStatus, list[i].taskID);
    };
  },

  // A method that creates the individual cards under the form
  createTaskCard(assignedBy, description, assignedTo, dueDate, status, taskId){
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
        <button class="btn btn-danger" id="deleteTaskBtn" onclick="taskManager.deleteTask()">Delete task</button>

        
      </div>`;
  },
  // Creates a summarry card using the data stored in local storage
  createTaskSummary(assignedTo, dueDate, status, taskId){
    summaryCard = document.getElementById("taskSummaryCard");
    summaryCard.innerHTML += `<a href="#taskID-${taskId}" class="list-group-item list-group-item-action ">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${assignedTo}</h5>
      <small>Due ${dueDate}</small>
    </div>
    <p class="mb-1">${status}</p>
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
    console.log(Object.keys(obj));
    return Object.keys(obj).length === 0;
};

// Validates the inputs by checking if they have unwanted characters in them or if they are of the correct length
function validateTaskForm(assignedBy, description, assignedTo, dueDate){
    const errors = {}; //Error object which gets data added to it if any of the inputs meet this onditons 
    const specialChars = /[`!@#£$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //Creates a regular expression literal with all the special characters in it
    const numberList = /[1234567890]/; //Creates a regular expression literal with all the numbers in it
    const dateFormat =/[dmy]/ //Creates a regular expression literal with the letters 'd', 'm', and 'y' in it because the date input when no date is selected changes to dd/mm/yyyy
    console.log(assignedBy, description, assignedTo, dueDate)
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
    console.log(errors);
    return errors; //returns the error object so it can be used to check if the validation was successful
    
};


taskManager.taskList = JSON.parse(localStorage.getItem("taskArray"));
localStorage.setItem("taskArray", JSON.stringify(taskManager.taskList));
taskManager.taskID = JSON.parse(localStorage.getItem("counter"));
localStorage.setItem("counter", (taskManager.taskID)) //updates the counter to the incremented value



taskManager.displayCards(); //Calls the displayCards method in the taskManager object so that anything in local storage under the key 'taskArray' with be presented on the web page as a card