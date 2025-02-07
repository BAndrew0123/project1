// Initialize an empty array to hold tasks
let tasks = [];

// Function to render the task list
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current list

    // Loop through the tasks array and create list items
    tasks.forEach((task, index) => {
        // Create a list item
        const listItem = document.createElement("li");
        listItem.textContent = task;

        // Create a delete button for each task
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px"; // Add some spacing for better UI

        // Event listener to delete the task
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1); // Remove the task from the array
            saveTasks(); // Save changes to local storage
            renderTasks(); // Re-render the task list
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert tasks array to JSON and save it
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks"); // Get tasks from local storage
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); // Parse the JSON and update the tasks array
    }
    renderTasks(); // Render the loaded tasks
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim(); // Get the input value and trim any extra spaces

    // Check if the input is not empty
    if (taskText !== "") {
        tasks.push(taskText); // Add the new task to the array
        saveTasks(); // Save tasks to local storage
        renderTasks(); // Render the updated task list
        taskInput.value = ""; // Clear the input field after adding the task
    } else {
        alert("Please enter a task.");
    }
}

// Add event listener to the 'Add Task' button
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Add keydown event listener for the input field to handle Enter key
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if the pressed key is "Enter"
        addTask();
    }
});

// Load tasks from local storage when the page loads
window.onload = loadTasks;
