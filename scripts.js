const addTask = () => {
	let userInput = document.getElementById('main_input').value;
	if (userInput === ''){
		alert('Insira um valor antes de adicionar!');		
	}else{
		database.push ({'task': userInput, 'status': ''});
		document.getElementById('main_input').value = '';
		refresh();
	}
}
const addTaskEnter = (event) => {
	if (event.key === 'Enter'){
		let userInput = event.target.value;
		if (userInput === ''){
			alert('Insira um valor antes de adicionar!')
		}else{
		database.push ({'task': userInput, 'status': ''})
		event.target.value = '';
		refresh();
		}
	}
}
const clickTask = (event) => {
	const element = event.target;
	if (element.type === 'button'){
		let ask = confirm('Você tem certeza que deseja excluir esta tarefa?');
		if (ask === true) {
			const buttonKey = element.dataset.key;
			removeTask (buttonKey);
		}
	}else if (element.type === 'checkbox') {
		const buttonKey = element.dataset.key;
		attTask (buttonKey);
	}
}
const removeTask = (key) => {
	database.splice(key, 1);
	refresh();
}
const attTask = (key) => {
	if (database[key].status === ''){
		database[key].status = 'checked';
	}else{
		database[key].status = '';
	}
	refresh();
}

const refresh = () => {
	localStorage.setItem('savedTasks', JSON.stringify(database));
	clearTasks();
	database.forEach ( (data, index) => createTask (data.task, data.status, index));
}
const clearTasks = () => {
	const mainUl = document.getElementById('main_ul');
	while (mainUl.firstChild){
		mainUl.removeChild(mainUl.lastChild);
	}
}
const createTask = (task, status, key) => {
	const newLi = document.createElement('li');
	newLi.classList.add('new_task');
	newLi.innerHTML = '<input type="checkbox"' + status + ' data-key=' + key + '><div class="task_text">' + task + '</div><input type="button" value="&#x274C" data-key=' + key + '>';
	document.getElementById('main_ul').appendChild(newLi);
}

const verifyDatabase = () => {
	let data = localStorage.getItem ('savedTasks');
	if (!data) {
		let output = [];
		return output;	
	}else{
		let output = JSON.parse(data);
		return output;
	}
}

var database = verifyDatabase();
document.getElementById('add_task').addEventListener('click', addTask);
document.getElementById('add_task2').addEventListener('click', addTask);
document.getElementById('main_input').addEventListener('keypress', addTaskEnter);
document.getElementById('main_ul').addEventListener('click', clickTask);
refresh();