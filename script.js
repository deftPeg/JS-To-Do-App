window.addEventListener('load', () => {
    // get todos if any in local storage else empty array
    // **** todos declared without const or let is a global variable and can be used outside function
	todos = JSON.parse(localStorage.getItem('todos')) || [];

    // declaring variables for DOM manipulation
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

    // listen for change in username. Set it in local storage
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
        // get todo info according to name value in html file
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}
        // add new todo to array of todos
		todos.push(todo);

        // turn todo into a JSON String and store in local storage
		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})
// called at the end of event listener show it as soon as page is loaded
	DisplayTodos()
})

// DISPLAY TO DO ITEM LIST ON SCREEN FUNCTION
function DisplayTodos () {
    // declare todo list element to push todos to
	const todoList = document.querySelector('#todo-list');

    // clear all elements every time function is called
	todoList.innerHTML = "";

    // loop through each todo
	todos.forEach(todo => {
        // declare variable for todo item DOM manipulation
		const todoItem = document.createElement('div');
        // add class to item
		todoItem.classList.add('todo-item');

        // declare variables for each todo Item DOM manipulation (buttons etc...)
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');

        // check if category is personal or business. Business is set as default
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        // get the actual content of the todo
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

        // append all the elements
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

        // append new todo item to the list
		todoList.appendChild(todoItem);

        // if todo is checked add done as class name
		if (todo.done) {
			todoItem.classList.add('done');
		}
		
        // add event listener for checked todo item
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;

            // update the item in local storage
			localStorage.setItem('todos', JSON.stringify(todos));

            // check or uncheck the todo depending on previous state
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
            // redisplay todos after change
			DisplayTodos()

		})

        // EDIT TODO ITEM FUNCTION
        // listen for a click event
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');

            // remove readonly to be able to edit
			input.removeAttribute('readonly');

            // highlight todo
			input.focus();

            // blur occurs if you click outside the todo and stops editing
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);

                // set todo content to new value
				todo.content = e.target.value;

                // update local storage with item change
				localStorage.setItem('todos', JSON.stringify(todos));

                // redisplay todos on screen
				DisplayTodos()

			})
		})

        // DELETE TODO ITEM FUNCTION
		deleteButton.addEventListener('click', (e) => {
            // filter the array of todos for all not equal to the clicked todo "t"
			todos = todos.filter(t => t != todo);

            // update the todo list in local storage
			localStorage.setItem('todos', JSON.stringify(todos));
            
            // redisplay todos
			DisplayTodos()
		})

	})
}