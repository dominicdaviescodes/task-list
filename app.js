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
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks)
  // Add task event
  form.addEventListener("submit", addTask)
  // Remove task
  taskList.addEventListener("click", removeTask)
  // Remove all tasks
  clearBtn.addEventListener("click", clearTasks)
  // filter tasks
  filter.addEventListener("keyup", filterTasks)
}

// Get tasks from LS
function getTasks() {
  let tasks
  // any tasks in LocalStorage? if none set to empty arr
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    // if there are items set tasks to what's already there
    // LocalStorage only stores str's so need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  // loop through existing tasks
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li")
    // Add class to li (need collection-item class for materialize)
    li.className = "collection-item"
    // Create text node and append to li
    li.appendChild(document.createTextNode(task))
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
  })
}

// Add Task
function addTask(e) {
  // check if value here
  if (taskInput.value === "") {
    alert("add task")
  } else {
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
    // local storage
    storeTaskInLocalStorage(taskInput.value)
    // Clear input
    taskInput.value = ""
    // prevent page refresh when clicking submit
    e.preventDefault()
  }
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks
  // any tasks in LocalStorage?
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    // LocalStorage only stores str's so need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task)
  // has to be stored as str
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// remove task runs when we click on ul
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove()

      // remove from LS
      // tasks don't have id's so we pass in e.target.parentElement.parentElement
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  // any tasks in LocalStorage?
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    // LocalStorage only stores str's so need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function (task) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// clear tasks
function clearTasks() {
  // while there is something in the list
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // clear tasks from LS
  clearTasksFromLocalStorage()
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent
    // indexOf Returns the position of the first occurrence of a substring
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  })
}
