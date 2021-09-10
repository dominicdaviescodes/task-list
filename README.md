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