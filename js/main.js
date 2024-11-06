// add_task_btn = document.querySelector(".add");
// text_input = document.querySelector(".input");
// all_taskes = document.querySelector(".tasks");
// let x = 0;
// let indexes = [] ;

// //window.localStorage.clear();
// // console.log(window.localStorage.getItem("div"));
// if(window.localStorage.getItem("div")){
//     let y = window.localStorage.getItem("div")
//     all_taskes.innerHTML=window.localStorage.getItem("div");
//     all_taskes.style.display = "block";

//     //console.log(all_taskes.children[2]);
//     //console.log(window.localStorage.getItem("delete").split(",").length);
//     // console.log(window.localStorage.getItem("delete"));
//     if(window.localStorage.getItem("delete") ){
//         for(let i = 0 ; i<window.localStorage.getItem("delete").split(",").length;i++){
//             // x= Number(window.localStorage.getItem("count"))--;
//             console.log(all_taskes.children[window.localStorage.getItem("delete").split(",")[i] - 1]);
//             if(all_taskes.children[window.localStorage.getItem("delete").split(",")[i] - 1]){
//                 all_taskes.children[window.localStorage.getItem("delete").split(",")[i] - 1].remove();
//             }
//         }

//     }
//     document.querySelectorAll(".task button").forEach((button,idx)=>{
//         button.onclick=function(){
//             removeTask(button.parentElement,idx+1);
//         }
//     })
//     }

// add_task_btn.addEventListener("click",(e)=>{
//     if(text_input.value !== ""){
//         x++;
//         // console.log("mlian");
//         // console.log(x);
//         all_taskes.appendChild(Create_Div_Task(text_input.value , x));
//         text_input.value = "";
//         //console.log(all_taskes);
//         window.localStorage.setItem("div",`${all_taskes.innerHTML}`);

//     }
//     else{

//         console.log("empty");
//     }
// })

// let Create_Div_Task = function(input_value , x){
//     task_1 = document.createElement("div");
//     task_1.classList.add("task");
//     task_1.setAttribute("style","display : flex;justify-content : space-between;padding:20px;");
//     h4_1 = document.createElement("h4");
//     task_1.appendChild(h4_1);
//     h4_1.innerHTML = `${input_value}`;

//     task_1.appendChild(delete_btn(task_1 , x));

//     all_taskes.style.display = "block";
//     return task_1;
// }
// let delete_btn=function(task_1 , x){
//     delete_1 = document.createElement("button");
//     delete_1.textContent="Delete";
//     delete_1.onclick = function(){
//     removeTask(task_1,x);
//     }
//     return delete_1;
// }
// let removeTask = function(task_1,x){
//         indexes.push(x);
//         window.localStorage.setItem("delete",indexes);
//         window.localStorage.setItem("div",`${all_taskes.innerHTML}`);
//         console.log(`x=${x}`);

//         task_1.remove();
//         return true;
// }

//****** افضل حل ******

// window.localStorage.clear();
// تعريف العناصر الأساسية
const add_task_btn = document.querySelector(".add");
const text_input = document.querySelector(".input");
const all_taskes = document.querySelector(".tasks");
const Total_tasks = document.querySelector(".Total_tasks");

// الحصول على عدد المهام المخزنة أو تعيينه إلى 0 إذا لم يكن موجوداً
let taskCount = parseInt(window.localStorage.getItem("taskCount")) || 0;

Total_tasks.innerHTML = `Your Tasks = ${updateTaskCount()}`;
console.log(taskCount);
// تحميل المهام من localStorage عند فتح الصفحة
for (let i = 1; i <= taskCount; i++) {
  let task = window.localStorage.getItem(`task-${i}`);
  if (task && task !== "deleted") {
    all_taskes.appendChild(createDivTask(task, i));
  }
}

// تحديث حالة عرض المهام
all_taskes.style.display = hasRemainingTasks() ? "block" : "none";

// إضافة مهمة جديدة عند الضغط على زر الإضافة
add_task_btn.addEventListener("click", () => {
  if (text_input.value !== "") {
    taskCount++;
    Total_tasks.innerHTML = `Your Tasks = ${updateTaskCount()}`;
    const taskValue = text_input.value;
    window.localStorage.setItem(`task-${taskCount}`, taskValue);
    window.localStorage.setItem("taskCount", taskCount);

    all_taskes.appendChild(createDivTask(taskValue, taskCount));
    text_input.value = ""; // مسح حقل الإدخال

    all_taskes.style.display = "block";
  } else {
    console.log("empty");
  }
});

// دالة لإنشاء عنصر المهمة (div)
function createDivTask(inputValue, index) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute(
    "style",
    "display: flex; justify-content: space-between; padding: 20px;margin-top : 10px;background-color: #ff5335;    border-radius:40px;border-style: double;"
  );

  const taskContent = document.createElement("h4");
  taskContent.textContent = inputValue;
  taskDiv.appendChild(taskContent);

  const delBtn = createDeleteButton(taskDiv, index);
  taskDiv.appendChild(delBtn);

  return taskDiv;
}

// دالة لإنشاء زر الحذف للمهمة
function createDeleteButton(taskDiv, index) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute(
    "style",
    "border-radius:40px;border:none;font-size:15px;color:#ff5335;cursor:pointer;"
  );
  deleteButton.onclick = function () {
    removeTask(taskDiv, index);
  };
  return deleteButton;
}

// دالة لحذف المهمة
function removeTask(taskDiv, index) {
  window.localStorage.setItem(`task-${index}`, "deleted");
  taskDiv.remove();

  // التحقق إذا كانت هناك مهام متبقية لعرض/إخفاء القائمة
  all_taskes.style.display = hasRemainingTasks() ? "block" : "none";
  updateTaskCount();
}

// دالة للتحقق إذا كانت هناك مهام غير محذوفة
function hasRemainingTasks() {
  for (let i = 1; i <= taskCount; i++) {
    if (window.localStorage.getItem(`task-${i}`) !== "deleted") {
      return true;
    }
  }
  return false;
}

// دالة لتحديث عدد المهام الفعلي بعد الحذف
function updateTaskCount() {
  let actualCount = 0;
  for (let i = 1; i <= taskCount; i++) {
    if (window.localStorage.getItem(`task-${i}`) !== "deleted") {
      actualCount++;
    }
  }
  Total_tasks.innerHTML = `Your Tasks = ${actualCount}`;
  return actualCount;
}
