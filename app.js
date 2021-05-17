// // Function that gets the user details input in the form when the button with the id of storeTaskBtn is clicked
document.querySelector('#storeTaskBtn').addEventListener('click', function () {
    
   let assignedBy = document.querySelector('#inputAssignedBy').value.trim();
   let description = document.querySelector('#inputDesc').value.trim();
   let assignedTo = document.querySelector('#inputAssignedTo').value.trim();
   let dueDate = document.querySelector('#inputDueDate').value.trim();
   let status = document.querySelector('#inputStatus').value.trim();


   if (isObjectEmpty(validateTaskForm(assignedBy, description, assignedTo, dueDate))){
    createTaskSummary(assignedTo, dueDate, status) //Runs a function that adds a summary card when you press the button to add the input
    createTaskCard(assignedBy, description, assignedTo, dueDate, status);  
   } else{
    console.log("Card cannot be created as a field is empty or formatted incorrectly");
   }
   

//    storeTaskDetails(assignedBy, description, assignedTo, dueDate, status)
});

// // Function to store the details input by the user as a task input
// function storeTaskDetails(assignedBy, description, assignedTo, dueDate, status){
//     let taskObject = {
//         "Assigned By": assignedBy,
//         "Description": description,
//         "Assigned To": assignedTo,
//         "Due Date": dueDate,
//         "Status": status,
//     }; 
//     taskArray.push(taskObject)
//     localStorage.setItem("TasksSetArray", JSON.stringify(taskArray))
// };


function createTaskCard(assignedBy, description, assignedTo, dueDate, status){
    taskCard = document.getElementById("taskCards");
    taskCard.innerHTML += ` <div class="col-12 col-sm-6 col-lg-4">
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

// Function that checks an if an object is empty by checking the length of an array of the object's eys
function isObjectEmpty(obj){
    console.log(Object.keys(obj));
    return Object.keys(obj).length === 0;
}

// Validates the inputs by checking if they have unwanted characters in them or if they are of the correct length
function validateTaskForm(assignedBy, description, assignedTo, dueDate){
    const errors = {};
    const specialChars = /[`!@#£$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numberList = /[1234567890]/;
    const dateFormat =/[dmy]/ 
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
    return errors;
    
};


function createTaskSummary(assignedTo, dueDate, status){
    summaryCard = document.getElementById("taskSummaryCard");
    summaryCard.innerHTML += `<a href="#" class="list-group-item list-group-item-action ">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${assignedTo}</h5>
      <small>Due ${dueDate}</small>
    </div>
    <p class="mb-1">${status}</p>
  </a>`
}


// let taskArray = [];

// let arrayRequest = localStorage.getItem("TasksSetArray");