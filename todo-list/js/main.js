// select elements
const addBtn=document.querySelector('.btn-add');
const deletBtn=document.querySelector(".btn-delete");
const updateBtn=document.querySelector(".btn-update");
const countValElement=document.querySelector(".countVal");
const input=document.querySelector("input");
const tasks=document.querySelector(".tasks");
const alert=document.querySelector(".alert")


let tasksContainer;
let taskVal=0;
let indexUpdateBtn;

// update task count
function updateTaskVal(val){
    countValElement.innerHTML=val
}
// clear input
function clearInput(){
    input.value=null
}

// localstorage
if(localStorage.getItem("tasks")===null){
    tasksContainer=[]
}else{
    tasksContainer=JSON.parse(localStorage.getItem('tasks'))
    taskVal=tasksContainer.length
    displayTasks(tasksContainer)
}
updateTaskVal(taskVal)

// add task
function addTask(){
if(!input.value){
    alert.classList.remove("d-none")
}
else{
    alert.classList.add("d-none")
    taskVal++ 
const taskobj={
    task:input.value.trim(),
    isChecked:false
}

tasksContainer.push(taskobj)
localStorage.setItem("tasks",JSON.stringify(tasksContainer))
displayTasks(tasksContainer)
clearInput()
updateTaskVal(taskVal)
  }

}
// display task
function displayTasks(arr){
    let container=''
for(let i=0;i<arr.length;i++){
    container+=` 
    <div class="task rounded  d-flex justify-content-between align-items-center mt-2">
             <div class="task-content d-flex align-items-center">
                <input type="checkbox" class="task-check me-2"onchange="Checked(this,${i})" ${arr[i].isChecked?"checked":""}>
              <span class="task-name mb-0 ${arr[i].isChecked ? 'completed' : ''}">${arr[i].task}</span>
             </div>
                 <div class="btns ms-2 d-flex">
                  <button class="btn btn-update btn-outline-primary me-2" onclick="updateIndex(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button class="btn btn-delete btn-outline-danger  " onclick=deleteTask(${i})><i class="fa-solid fa-trash-can"></i></button>
                 </div>
              </div>`
}
tasks.innerHTML=container
}

// delete task
function deleteTask(index){
tasksContainer.splice(index,1)
displayTasks(tasksContainer)
taskVal=0
for(let i=0;i<tasksContainer.length;i++){
    if(!tasksContainer[i].isChecked)
        taskVal++
}

updateTaskVal(taskVal)
localStorage.setItem("tasks",JSON.stringify(tasksContainer))
}
// update task
function updateIndex(index){
indexUpdateBtn=index
console.log(tasksContainer,index);
input.value=tasksContainer[index].task
addBtn.classList.add("d-none")
updateBtn.classList.remove('d-none')
}

function updateTask(){
    if(!input.value){
        alert.classList.remove("d-none")
    }else{
        alert.classList.add("d-none")
        tasksContainer[indexUpdateBtn].task=input.value
        displayTasks(tasksContainer)
        addBtn.classList.remove("d-none")
        updateBtn.classList.add('d-none')
        clearInput()
    }
}
// check the task
function Checked(elem,i){
elem.nextElementSibling.classList.toggle("completed")
tasksContainer[i].isChecked=elem.checked
localStorage.setItem("tasks", JSON.stringify(tasksContainer));
if (tasksContainer[i].isChecked){
    taskVal--
}else{
    taskVal++
}
updateTaskVal(taskVal)
}

   
addBtn.addEventListener("click",addTask)
updateBtn.addEventListener("click",updateTask)
