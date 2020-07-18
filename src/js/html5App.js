// html5 js
import '../css/html5.css'
// require('./log.js');
// require('./offline.js');
// console.log("html5app");
var save = window.localStorage;
let db = null;
window.onload = function () {
    createDataBase();
}
window.addNote = function (e) {
    e.preventDefault();
    var today = new Date();
    var creationDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const taskContent = {

        name: document.getElementById("taskname").value,
        description: document.getElementById("description").value,
        date: document.getElementById("duedate").value,
        creation_date:creationDate
    }
    const transact = db.transaction("taskStore", "readwrite");
    const showTransact = transact.objectStore("taskStore");
    showTransact.add(taskContent);
    removeExistingList();
    showExistingTasks();
}
function createDataBase() {
    const dataBaseName = "task_db";
    const dataBaseVersion = "1";
    const request = indexedDB.open(dataBaseName, dataBaseVersion);
    request.onupgradeneeded = e => {
        db = e.target.result;
        const to_do_notes = db.createObjectStore("taskStore", { keyPath: "note_id", autoIncrement: true });


        alert("upgrade is called");
        console.log(db.dataBaseName);
    }
    request.onsuccess = e => {
        db = e.target.result;
        alert("success is called");
        console.log(db.dataBaseName);
    }
    request.onerror = e => {
        alert("error is called");
    }

}
window.removeExistingList=function(){
  var ol_container=document.getElementById("task_container");
  var ol_list=document.getElementById("sublist");
  ol_container.removeChild(ol_list);
  ol_list=document.createElement("ol");
  ol_list.setAttribute("id","sublist");
  ol_container.appendChild(ol_list);

}

  window.showExistingTasks = function() {
    const transact = db.transaction("taskStore","readonly");
    const showTransact = transact.objectStore("taskStore");
    const request = showTransact.openCursor();
    var counter=0;
    request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
            counter+=1;

            document.getElementById("sublist").innerHTML += '<li><span class="sp1">'+cursor.value.name+'</span><span class="sp2">'+cursor.value.description+'</span><span class="sp2">'+cursor.value.date+'</span></li>';
            cursor.continue();
        }
      }
    }

    /*GEOLOCATION PROPERTY USAGE*/
    window.locator=function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(GetPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    window.GetPosition=function(position) {
      var latitude=position.coords.latitude;
      var longitude=position.coords.longitude;
      if(latitude<=53 && longitude <= 14)
      {
      window.location.replace("new-location.html");
      }
    }

    window.setTimeout(showExistingTasks,100);
    window.setTimeout(locator,200);

    window.setTimeout(function(){
      var taskName = document.getElementById("taskname");
      var taskDescription = document.getElementById("description");
      var taskDate = document.getElementById("duedate");
      if(save!=null){
      taskName.value = save.taskName;
      taskDescription.value = save.taskDescription;
      taskDate.value=save.taskDate;}
    },1000);

    /*LOCAL STORAGE IN EVERY 5 SECONDS AND AUTOFILL FORM*/

    window.setInterval(function(){
        var taskName = document.getElementById("taskname");
        var taskDescription = document.getElementById("description");
        var taskDate = document.getElementById("duedate");

        save.taskName = taskName.value;
        save.taskDescription=taskDescription.value;
        save.taskDate=taskDate.value;

        console.log(taskName.value);
        console.log(save.taskName);
        console.log(save.taskDescription);
        console.log(save.taskDate);
    }, 5000);
