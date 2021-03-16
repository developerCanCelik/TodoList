//Tüm elementleri(değişkenleri seçme)
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const allClearButton = document.querySelector("#clear-todos");
//Fonksiyonu sakın ve sakın çağırmayı unutma
eventListener()
function eventListener(){//All Event Listener
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    allClearButton.addEventListener("click",clearALLTodos)
}
function clearALLTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //todoList.innerHTML = ""; //Yavaş Yöntem
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    //Bütün harfleri küçük harfe çevirdik
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filtervalue) === -1){
            //Bulamaz ise
            listItem.setAttribute("style","display : none !important")
        }else{
            listItem.setAttribute("style","display : block")
        }
    })
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        //tıkladığımız yerin li parentine kadar ilerleyip sildik
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo Başarı ile Silindi")
        
    }
}
function deleteTodoFromStorage(todo){
    let todos = getTodosFromStorage();
    todos.forEach(function(deleteTodo,index){
        if(todo === deleteTodo){
            //Arrayden veriyi silme işlemi için
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo)
    });
    /* For Each ikinci kullanımı */
    /*todos.forEach(function(todo){
        addTodoToUI(todo)
    })*/
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger","Lütfen Bir Todo Girin...");
    }else{
        addTodoToUI(newTodo);
        showAlert("success","Todo Başarı İle Eklendi");
        addTodoToStorage(newTodo);
    }
    e.preventDefault();
}
function addTodoToUI(newTodo){
    //String değerini ui (arayüze ekleme)
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    const hr = document.createElement("hr")
    firstCardBody.appendChild(hr)
    firstCardBody.appendChild(alert);
    //setTimeout Methodu
    setTimeout(function(){
        hr.remove()
        alert.remove()
    },1000)
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos
}
function addTodoToStorage(newTodo){
   let todoss = getTodosFromStorage();
   todoss.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todoss))
}
