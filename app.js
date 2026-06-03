
let tasks = JSON.parse(localStorage.getItem('jarvisTasks')) || [];
function saveTasks(){localStorage.setItem('jarvisTasks',JSON.stringify(tasks));}
function renderTasks(){
const list=document.getElementById('taskList');
if(!list)return;
list.innerHTML='';
tasks.forEach((task,index)=>{
const div=document.createElement('div');
div.className='task';
div.innerHTML=`<strong>${task.name}</strong><br>${task.category} • ${task.duration}h<br><button onclick="deleteTask(${index})">Supprimer</button>`;
list.appendChild(div);
});
}
function addTask(){
const name=document.getElementById('taskName').value;
const category=document.getElementById('taskCategory').value;
const duration=document.getElementById('taskDuration').value;
if(!name||!duration){alert('Complète les champs');return;}
tasks.push({name,category,duration});
saveTasks();
renderTasks();
document.getElementById('taskName').value='';
document.getElementById('taskDuration').value='';
}
function deleteTask(index){
tasks.splice(index,1);
saveTasks();
renderTasks();
}
window.onload=renderTasks;
