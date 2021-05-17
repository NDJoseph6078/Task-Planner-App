// // Function that gets the user details input in the form when the button with the id of storeTaskBtn is clicked
document.querySelector('#storeTaskBtn').addEventListener('click', function () {
    
   let assignedBy = document.querySelector('#inputAssignedBy').value;
   let description = document.querySelector('#inputDesc').value;
   let assignedTo = document.querySelector('#inputAssignedTo').value;
   let dueDate = document.querySelector('#inputDueDate').value;
   let status = document.querySelector('#inputStatus').value;

   createTaskCard(assignedBy, description, assignedTo, dueDate, status)

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
        <a href="#" class="list-group-item list-group-item-action ">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Task</h5>
            <small>3 days ago</small>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned By</h5>
          </div>
          <p class="mb-1">${assignedBy}</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Description</h5>
          </div>
          <p class="mb-1">${description}</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned To</h5>
          </div>
          <p class="mb-1">${assignedTo}</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Due Date</h5>
          </div>
          <p class="mb-1">${dueDate}</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Status</h5>
          </div>
          <p class="mb-1">${status}</p>
        </a>
        
      </div>`;

}

// let taskArray = [];

// let arrayRequest = localStorage.getItem("TasksSetArray");