// =====firebase=====

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  import { getDatabase,ref,set,push,onValue,remove,update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyANf31dSFMhCRqta4kxUKpfGY0yedwMFTQ",
    authDomain: "todo-app-16f71.firebaseapp.com",
    databaseURL: "https://todo-app-16f71-default-rtdb.firebaseio.com",
    projectId: "todo-app-16f71",
    storageBucket: "todo-app-16f71.appspot.com",
    messagingSenderId: "133209455449",
    appId: "1:133209455449:web:660415e73f26de3e72ea48",
    measurementId: "G-35HV550C2F"
  };

  // =====firebase=====
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
 
  // ====li ul function=====
  window.AddTask = function (){
var obj = {
    todo: document.getElementById('input').value
}
console.log(obj);
var userRef = push(ref(database , 'todos/'))

obj.id = userRef.key

set(userRef , obj)
    }

    // =====data 2=====

    window.get = function(){
        var listData = document.getElementById('List')

        onValue(ref(database , 'todos/'),function(todo){
            listData.innerHTML = ""

            var todos = Object.values(todo.val())
            
            for(var i = 0; i < todos.length; i++){
                var app = todos[i]
                console.log(app.todo);
                listData.innerHTML += `
                <li class = "listing" > TODO : ${app.todo} <button class = "edit-btn"
                onclick = "ToDoUpdate('${app.id}' )" > EDIT </button>
                
                <button class = "del-btn"
                onclick = "Tododel('${app.id}')"  > DELETE</button>
                
                </li>`
            }
            var inp = document.getElementById('input').value = "";
        })
    }
    get()
    
    // =====delete button=====
    
    window.Tododel = function(id){
    remove(ref(database , `todos/${id}`))
}

window.delAll = function (){
    remove(ref(database , `todos/`))

}

window.ToDoUpdate = function(id){
    var newTodo = prompt("enter your data")

    update(ref(database , `todos/${id}`),{
        todo : newTodo
    })
}
