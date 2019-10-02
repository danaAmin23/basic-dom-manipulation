/*  1) Basic functionality 1. Display a user registration form that accepts name, email and year of birth.  
    a. Name must be limited to 100 chars and must be sanitized before displaying. V 
    b. Only a valid email address must be accepted. 
    c. Year must be between 1900 and current year. 
    d. Once valid information is entered for all three, 
    replace the labels and text boxes with content that has the format “Jane Doe (jdoe@example.com) [foo]” 
    where “foo” is “Adult” if the age is over 18 and “Child’ if not.  --> */


function formSubmit(event) {

    //prevent default closing form behavior
    event.preventDefault();

    // assign vars to dom objects
    var name = document.getElementById("txtName").value;

    //sanitize
    var name = name.replace(/[|&;$%@"<>()+,]/g, "");
    var email = document.getElementById("txtEmail").value;
    var birthYear = document.getElementById("txtBirthYear").value;

    //log values to console 
    console.log("Name : " + name + "\n" + "Email : " + email + "\n" + "Birth Year : " + birthYear);

    //select outer div of list item aka content div
    var content = document.getElementById("content");

    //function to determin if Adult or Child 
    function overEighteen(year) {
        var age = new Date().getFullYear() - year;
        console.log(age);
        if (age > 18) {
            return 'Adult';
        }//end if 
        else if (age <= 18) {
            return 'Child';
        }//end else it
    }//end over18

    //determine if admin
    if (name === 'admin' && birthYear === "1") {
        document.getElementById("txtName").value = "Librarian";
        var admins = document.getElementsByClassName("admin");
        for (var i = 0; i < admins.length; i++) {
            //show buttons for admin mode
            admins[i].style.display = "inline";
        }//end for 
    }//end if 

    else {
        console.log("normal mode");
        //replace content div with user input variables 
        content.innerHTML = name + " " + "(" + email + ")" + " " + overEighteen(birthYear);
    }//end else

}//end formSubmit

// prevent user from keying in bad chars 
function validate() {
    var element = document.getElementById('txtName');
    element.value = element.value.replace(/[^a-zA-Z@\s]+/, '');
};//end validate

//set to new list items id, usually derived from autonum from db
var counter = 2;

/***admin mode functionality  */
function addBook(event) {

    event.preventDefault();
    var title = document.getElementById("txtTitle").value;
    var image = document.getElementById("img");
    var imagePath = image.value;
    //strip fake path
    imagePath = "./images/" + imagePath.substr(12);
    console.log(imagePath);


    // Get the last <li> element ("Milk") of <ul> with id="myList2"
    var itm = document.getElementById("li_0");
    console.log(itm);

    // Copy the <li> element and its child nodes
    var cln = itm.cloneNode(true);
    //cln_id = "li_" + document.getElementById('books-list').childElementCount;
    cln.id = document.getElementById('books-list').childElementCount + document.getElementById('basket').childElementCount;
    counter++;
    cln.id = "li_" + counter;

    // Append the cloned <li> element to <ul> with id="myList1"
    document.getElementById("books-list").appendChild(cln);

    //update cloned elements 
    cln.childNodes[0].data = title;
    cln.childNodes[1].src = imagePath;

    //selected option mediaS
    var selected = document.getElementById("media-type");
    var media_type = selected.options[selected.selectedIndex].text;

    //determine due date via media type
    if (media_type === "Cd") {
        cln.childNodes[3].innerHTML = "Due Date 10 Days";
    }//end if
    else if (media_type === "Book") {
        cln.childNodes[3].innerHTML = "Due Date 30 Days";
    }//end else if 

}//addBook

function addBooks() {

    var div = document.getElementById("content");
    console.log(div);
    div.id = "content2";
    div.innerHTML =
        "<form id ='remove' onsubmit=addBook(event)>" +
        "<h3>Welcome to the add book form</h3>" +
        "<label>Enter New Book Title</label>" +
        "<input type = 'text' id='txtTitle'><br>" +
        "<label>Upload Image: </label>" +
        "<input id = 'img' type='file' name='pic' accept='image/*'>" +
        "<label>Select Media Type: </label>" +
        "<select id ='media-type'><option>Media Type</option><option>Cd</option><option>Book</option></select>" +
        "<br><input type='submit' value='Add Book'/>" +
        "</form>";


}//end addBooks

function removeBook(event){
    event.preventDefault();
    var selected = document.getElementById("media-remove");
    var book = selected.options[selected.selectedIndex].text;
    var bookId = selected.options[selected.selectedIndex].value;
    selected.options[selected.selectedIndex].remove();    
    console.log(book);
    console.log(bookId);
    var basketBookId = "li_" + bookId;
    console.log(basketBookId);
    document.getElementById(basketBookId).remove();






}



function removeBooks() {

    var div = document.getElementById("content");
    console.log(div);
    div.id = "content2";
    div.innerHTML =

        "<form id ='remove' onsubmit=removeBook(event)>" +
        "<h3>Welcome to the remove book form</h3>" +
        "<label>Select  Book From List Title</label>" +
        "<br><input type='submit' value='Remove'/>" +
        "<select id ='media-remove'><option>Choose Book</option></select>" +
        "</form>";

    //change to function in a loop 

    for(var i = 0;i< document.getElementById("books-list").childElementCount;i++){    
    //get element titles
    var id = "li_" + i;
    var element = document.getElementById(id).childNodes;
    console.log(element[0].data); 
        
    //add single item to select 
    var option = document.createElement("option");
    option.text = element[0].data;
    option.value = i;
    var select = document.getElementById("media-remove");
    select.appendChild(option);

    }//end for

}//end remove


//logout func, hides all buttons and input values 
function logout() {

    //clear console
    console.clear();

    //get all buttons under class user, in admin modeo
    var admins = document.getElementsByClassName("admin");
    for (var i = 0; i < admins.length; i++) {
        //hide all admin buttons
        admins[i].style.display = "none";
    }//end for

    //revert inputs to defaults 
    var inputs = document.getElementsByClassName("user")
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }//end for 


}//end logout()

/*2. Display a list of at least 10 items from books and CD’s including a picture of the item and name in English. 
Books are due in 30 days and CD’s are due in 10 days.*/
function removeFromBasket(id) {
    console.log("remove from basket called")

    //select element by div id  id  "li-0"
    var element = document.getElementById(id.parentElement.id);

    //remove from basket
    document.getElementById("basket").removeChild(element);

    //add back to available books    
    document.getElementById("books-list").appendChild(element);

    //change onclick functionality of input 
    element.childNodes[2].value = 'add';
    element.childNodes[2].onclick = function () {
        addToBasket(id);
    }//end fn

}//end removeFromBasket


/* 3. For each item, show an “Add” button. When the add button is clicked, 
    update the basket (see below) and remove them from the available items list.*/
function addToBasket(id) {

    console.log('static list id :');
    console.log(id.parentElement);
    console.log("addToBasket called");

    //remove form available list to basket list 
    document.getElementById("books-list").removeChild(id.parentElement);
    document.getElementById("basket").appendChild(id.parentElement);

    //id points to input element of current li, we need parent li and to selet that div
    var parentDivId = id.parentElement.id;
    var element = document.getElementById(parentDivId);

    /* 6 .With each item, show a “remove” button that allows user to remove an item from the basket. */
    //change value of the button to remove, and change its onclick functionality 
    element.childNodes[2].value = 'remove';
    element.childNodes[2].onclick = function () {
        //console.log(id);
        removeFromBasket(id);
    }//end fn

    //console.log("parentDivId : " + parentDivId);
    parentDiv = document.getElementById(parentDivId);
    //console.log(parentDiv.className);

}//end addToBasket


//objects with swith book translations
var books = {

    li_0: {

        lang: {
            English: "Do Androids Dream of Electric sheep",
            French: "Les androïdes rêvent-ils de moutons électriques",
            Spanish: "Los androides sueñan con ovejas eléctricas?"
        }//ens Androud
    },

    li_1: {

        lang: {
            English: "A Clockwork Orange",
            French: "Un orange mécanique",
            Spanish: "Una Naranja Mecánica?"
        }//ens lang
    },//end clockwork


    li_2: {

        lang: {
            English: "John Dies in the end ",
            French: "John meurt à la fin",
            Spanish: "Come, dispara y  Hojas"
        }//ens lang
    },//end clockwork  


}//end books


/*4. Display the item names in a second language based on user selection (item names only). */
function language() {

    //selected option
    var selected = document.getElementById("books-list-lang");
    var language = selected.options[selected.selectedIndex].text;
    // console.log(language);

    //get all elements, get each element class, replace it with inhouse api 
    var lis = document.getElementById("books-list").getElementsByTagName("li");
    //console.log(lis);

    if (language !== "Select Language") {
        for (var i = 0; i < lis.length; i++) {
            var li_id = lis[i].id;
            // console.log(li_id);
            var div = document.getElementById(lis[i].id);
            //console.log("li selected : ");
            div.childNodes[0].data = books[li_id].lang[language];
            // div.childNodes[0].data = newT;
        }//end for
    }//end if
}//end language

/* 5. Show checkout basket which contains names of items that are added (no pictures, initially empty) 
and the due date of each item  - >SEE HTML
 
7. On the basket, show a “Checkout” button, which will show a dialog 
with two buttons (OK/Cancel) with the total number of items and if “OK” button is clicked, clear the basket. 
If “Cancel” button is clicked, then add the items back to “available” list.
*/
function checkout() {
    var x = document.getElementById("myDialog");
    x.innerHTML = "Items Selected : " + document.getElementById('basket').childElementCount +
        "<input type ='button' value='OK' onclick = 'ok()' =''><input type ='button' value='Cancel' onClick='cancel()'>";
    //console.log(document.getElementById('basket').childElementCount)
    x.show();
}//end checkout()

//checkout ok func , cleares basked div 
function ok() {
    document.getElementById('basket').innerHTML = '';
}

//refereshes page
function cancel() {
    location.reload();
}//end cancel();

