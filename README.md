# task-list

## Step one
* We should be able to enter a task
* We should be able to see entered tasks in a list

### Steps for adding a task

* We create the li, give it a classname.
* We append the task content to the li
* We create the link tag, give it classnames.
* We add the 'X' icon to the link's innerHTML
* We add this link to the li
* we add the li to the ul
* we set the input to empty as the task has now been moved to the list
* e.preventDefault() prevents default submit behaviour

### Logic for adding a task

```js
function addTask(e) {
  if (taskInput.value === "") {
    alert("add task")
  }
  const li = document.createElement("li")
  li.className = "collection-item"
  li.appendChild(document.createTextNode(taskInput.value))
  const link = document.createElement("a")
  link.className = "delete-item secondary-content"
  link.innerHTML = '<i class="fa fa-remove"></i>'
  li.appendChild(link)
  taskList.appendChild(li)
  taskInput.value = ""
  e.preventDefault()
}
```

## Step Two

* you should be able to delete a task by clicking on the 'x'
* you should be able to filter through the list of tasks
* you should be able to delete all tasks by clicking on the clear tasks button

### Steps for deleting tasks

* we'll use event delegation and add the listener to the ul that holds the list items

First we add the listener to the ul 

```js
// Load all event listeners
loadEventListeners()

function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask)
  // Remove task
  taskList.addEventListener("click", removeTask)
}
```

Then we create a function to remove task.  We need to target the a tag which is the parent of the 'x' icon.

```js
// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target)
  }
}
```

But we want the whole li to be removed by clicking on the 'a' tag. So thats the parent of the parent when you click the 'i' tag.

```js
// remove task runs when we click on ul
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove()
  }
}
```
Then we add a confirmation

```js
// remove task runs when we click on ul
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove()
    }
  }
}
```

### Deleting All tasks

* Clicking Clear Tasks button removes all tasks in list

First we need to add a listener to the btn.

```js
loadEventListeners()

function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask)
  // Remove task
  taskList.addEventListener("click", removeTask)
  // Remove all tasks
  clearBtn.addEventListener("click", clearTasks)
}
```
Then we create the function:
easy version
```js
// clear tasks
function clearTasks() {
  taskList.innerHTML = ""
}
```
and faster using removeChild() and while loop:

```js
function clearTasks() {
  // while there is something in the list
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }
}
```

## Filter Tasks

* 1st we add keyup listener 

```js
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask)
  // Remove task
  taskList.addEventListener("click", removeTask)
  // Remove all tasks
  clearBtn.addEventListener("click", clearTasks)
  // filter tasks
  filter.addEventListener("keyup", filterTasks)
}
```

Then create the function:

We pass in event param as we'll need the value being typed.

```js
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
}
```

querySelectorAll returns a node list so we can use .forEach()

collection-item is a class we are adding to li's for materialize. 

```js
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
```