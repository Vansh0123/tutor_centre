import { Connector } from './connector.js';

var form = document.querySelector("form");          
// Attach the submit event listener to the form
document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener("submit", function(event) {
        // Prevent the form's default submission action
        event.preventDefault();

        var formDataObj = {};

        
        // Example: Collecting and logging form data
        var formData = new FormData(form);
        for (var [key, value] of formData.entries()) {
            if(key=="fees"){ 
                formDataObj[key] = +value;
            }
            else{
                formDataObj[key] = value;
            }
        }
        
        // Convert the object into a JSON string
        var jsonFormData = JSON.stringify(formDataObj);
        postForm('/students',jsonFormData)
    })
})

async function postForm(endpoint, jsonFormData){
    var cnx = new Connector("http://localhost:8000/tutoring");
    await cnx.postData(endpoint,jsonFormData);    
}