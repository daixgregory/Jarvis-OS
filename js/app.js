function addTask(){

const input = document.getElementById("taskInput");

if(input.value.trim() === ""){
return;
}

const list = document.getElementById("missionList");

const li = document.createElement("li");

li.innerHTML = "🟢 " + input.value;

list.appendChild(li);

saveTasks();

input.value = "";

}

function saveTasks(){

localStorage.setItem(
"jarvis_tasks",
document.getElementById("missionList").innerHTML
);

}

function loadTasks(){

const saved = localStorage.getItem("jarvis_tasks");

if(saved){
document.getElementById("missionList").innerHTML = saved;
}

}

loadTasks();
function openModule(module){

if(module === "sport"){
alert("Module SPORT en développement");
}

if(module === "invest"){
alert("Module INVESTISSEMENTS en développement");
}

if(module === "mecano"){
alert("Module MÉCANIQUE en développement");
}

if(module === "urbanisme"){
alert("Module URBANISME en développement");
}

}
