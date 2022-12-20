"use strict";


var baseURL = "http://localhost:3000/teas/";

// GET tea
document.addEventListener("DOMContentLoaded", function(){ 

    // Hämta Te
        let url = baseURL;
        fetch(url, {method: 'GET'})
            .then(response => response.text())
                .then(data => {
                    var jsonData = JSON.parse( data );
                    var writeTeas = "<div class='divt'><h1>Sorter</h1><table><th>Namn</th><th>Blad</th><th>Pris</th><th>Antal</th><th>Radera</th>";
                    for(var i=0; i < jsonData.length; i++){
                        writeTeas += "<tr><td class='name'  id=" + jsonData[i]._id + " contenteditable>"+jsonData[i].name+"</td><td class='code'  id=" + jsonData[i]._id + "contenteditable>"+jsonData[i].type+"</td><td class='syll'  id=" + jsonData[i]._id + " contenteditable>"+ "<a href=" + jsonData[i].price + "target='_blank'>Länk</a>" + "</td><td class='prog'  id=" + jsonData[i]._id + " contenteditable>"+jsonData[i].amount+"</td><td><img src='images/trash.png' class='delete'  id=" + jsonData[i]._id + "/></td> </tr>";    
                    }//<td><img src='images/pencil.png' alt='update course' class='update' id=" + jsonData[i]._id + "/></td>
                    writeTeas += "</table></div>";
                    
                    //Kurserna skrivs ut
                    document.getElementById("teas").innerHTML = writeTeas;
                    
                    //Variabler för knapparna
                    //slet updateBtn = document.getElementsByClassName("update");
                    let deleteBtn = document.getElementsByClassName("delete");

                        // Evenetlistener för knapparna, anropar funktioner för delete och update
                        for(let i = 0; i < deleteBtn.length; i++) {
                        deleteBtn[i].addEventListener("click", deleteTea);
                       // updateBtn[i].addEventListener("click", updateCourse);
    }
                 })
            .catch(error => {
                alert('There was an error '+error);
            }
            
            );

/********************************************************************* */
// Create event handler for delete course
/********************************************************************* */
function deleteTea(e) {
    let url=baseURL+e.target.id;
    fetch(url, {method: 'DELETE'})
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
}

/********************************************************************* */
// Create event handler for ADD course
/********************************************************************* */
document.getElementById("create").addEventListener("click", (e) => {
    
    var obj = {};
    obj.name = document.getElementById("name").value;
    obj.code = document.getElementById("code").value;
    obj.syllabus = document.getElementById("syllabus").value;
    obj.progression = document.getElementById("progression").value;
    obj.term = document.getElementById("term").value;

    fetch(url, {method: 'POST', 
                    body: JSON.stringify(obj), 	
                        headers: { 'Content-type': 'application/json; charset=UTF-8'} })
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
});



/********************************************************************* */
// Create event handler for UPDATE course
/********************************************************************* */
/*
function updateCourse(e) {
    
    let url=baseURL+e.target.id;

    //Lagrad id som variabel
    let id = e.target.id;
    console.log("Hej ID: " + id);
    
    let Cname= document.getElementsByClassName("name"+ id);
    let Ccode= document.getElementsByClassName("code"+ id);
    let Cprogression= document.getElementsByClassName("prog" + id);
    let Csyllabus= document.getElementsByClassName("syll" + id);
    let Cterm= document.getElementsByClassName("term" + id); 

   let name2 = Cname.innerHTML;
   let code2 = Ccode.innerHTML;
   let prog2 = Cprogression.innerHTML;
   let syll2 = Csyllabus.innerHTML;
   let term2 = Cterm.innerHTML;

   console.log(name2 + id );

    var obj = {};
    obj.name = name2,
    obj.code = code2;
    obj.syllabus = prog2;
    obj.progression = syll2;
    obj.term = term2; 
    obj.id = id; //??????
    

    Objektet som skall lagras i databasen
    var obj = {};
    obj.name = document.getElementById("courseName" + id).innerHTML;
    obj.code = document.getElementById("courseCode" + id).value;
    obj.syllabus = document.getElementById("courseSyll" + id).value;
    obj.progression = document.getElementById("courseProg" +id).value;
    obj.term = document.getElementById("courseTerm" + id).value; 

    fetch(url, {method: 'PUT', 
                    body: JSON.stringify(obj), 	
                        headers: { 'Content-type': 'application/json; charset=UTF-8'} })
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
}



*/
   

}); 


