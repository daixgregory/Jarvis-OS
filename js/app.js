function openModule(name){

alert("Module " + name + " en développement");

}

function addTask(){

const input = document.getElementById("taskInput");

if(input.value.trim() === ""){
return;
}

const list = document.getElementById("missionList");

const li = document.createElement("li");

li.innerHTML = "🟢 " + input.value;

list.appendChild(li);

input.value = "";

}
