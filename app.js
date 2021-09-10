// Define UI Vars
const form = document.querySelector("#task-form")
// where you enter tasks
const taskInput = document.querySelector("#task")
// List items will populate here in the ul
const taskList = document.querySelector(".collection")
// filter through tasks
const filter = document.querySelector("#filter")
// Clear all tasks
const clearBtn = document.querySelector(".clear-tasks")

// Load all event listeners
loadEventListeners()

function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask)
}

// Add Task
function addTask(e) {
  // check if value here
  if (taskInput.value === "") {
    alert("add task")
  }
  // Create li element
  const li = document.createElement("li")
  // Add class to li (need collection-item class for materialize)
  li.className = "collection-item"
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link element. this will be the 'X' on each item in the list
  const link = document.createElement("a")
  // Add class to push 'x' to right of element. materialize uses secondary-content
  link.className = "delete-item secondary-content"
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append the link to li
  li.appendChild(link)
  // Append li to ul
  taskList.appendChild(li)
  // Clear input
  taskInput.value = ""
  // prevent page refresh when clicking submit
  e.preventDefault()
}
