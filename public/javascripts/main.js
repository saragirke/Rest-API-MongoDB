"use strict";


var baseURL = "mongodb+srv://Avokado321:GDY1qGbxGV8apOje@cluster0.8yzwcvr.mongodb.net/?retryWrites=true&w=majority";

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



}); 


