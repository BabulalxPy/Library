const container = document.querySelector(".container");

const bookList = document.createElement("div"); 
bookList.classList.add("book-list");
container.appendChild(bookList);

var book = [];

// Load from storage
if (localStorage.getItem("myLibrary")) {
    book = JSON.parse(localStorage.getItem("myLibrary"));
    display(); 
}

function books(title, author, pages, uid, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.uid = uid;
    this.read = read;
};

function onclick(){


   const contenttitle = document.createElement("div");

   const ip_title = document.createElement("input"); ip_title.placeholder = "Title";
   const ip_auth = document.createElement("input"); ip_auth.placeholder = "Author";
   const ip_pages = document.createElement("input"); ip_pages.placeholder = "Pages";
   ip_pages.type = "number";

   // Radio buttons
   const ip_read = document.createElement("input"); ip_read.type = "radio"; ip_read.name = "radio"; ip_read.value = "Read"; ip_read.checked = true;
   const ip_notRead = document.createElement("input"); ip_notRead.type = "radio"; ip_notRead.name = "radio"; ip_notRead.value = "Not read";
   
   // Append inputs to container (Keep your styling divs)
   container.appendChild(ip_title);
   container.appendChild(ip_auth);
   container.appendChild(ip_pages);
   container.appendChild(ip_read); container.append(" Read ");
   container.appendChild(ip_notRead); container.append(" Not Read ");

   // BUTTON TO ADD BOOK
   const btn2 = document.createElement("button");
   btn2.textContent = "Add Book to Library";
   btn2.addEventListener("click", () => {
       const u_id = crypto.randomUUID();
       // Get checked radio value
       const selectedRadio = document.querySelector('input[name="radio"]:checked').value;

       const obj1 = new books(ip_title.value, ip_auth.value, ip_pages.value, u_id, selectedRadio);
       
       book.push(obj1);
       
       // FIX: Don't pass obj1. Just call display() to refresh the whole list.
       display(); 
   });
   
   container.appendChild(btn2);
   // Important: We append the bookList at the end so it appears below inputs
   container.appendChild(bookList);
};

// --- THE FIXED DISPLAY FUNCTION ---
function display(){
    
    // Clear ONLY the book list, not the whole container
    bookList.innerHTML = "";

    // Save to storage
    localStorage.setItem("myLibrary", JSON.stringify(book));

    // We need 'index' to know which book to delete
    book.forEach((myBook, index) => {
        
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Simple styling so you can see separate cards
        card.style.border = "1px solid black";
        card.style.margin = "10px";
        card.style.padding = "10px";

        const title_disp = document.createElement("h3");
        title_disp.textContent = myBook.title;

        const auth_disp = document.createElement("p");
        auth_disp.textContent = "by: " + myBook.author;
       
        const pages_disp = document.createElement("p");
        pages_disp.textContent = myBook.pages + " pages";

        const read_disp = document.createElement("p");
        read_disp.textContent = "Read Status: " + myBook.read;

        card.appendChild(title_disp);
        card.appendChild(auth_disp);
        card.appendChild(pages_disp);
        card.appendChild(read_disp);

        // --- REMOVE BUTTON ---
        const rm_btn = document.createElement("button");
        rm_btn.textContent = "Remove";
        rm_btn.addEventListener("click", () => {
            // 1. Remove from Array
            book.splice(index, 1);
            // 2. Refresh Screen (This updates LocalStorage automatically)
            display(); 
        });
        card.appendChild(rm_btn);

        // --- UPDATE READ BUTTON (Fixed Error 1) ---
        const update_read_btn = document.createElement("button");
        update_read_btn.textContent = "Update reading status";
        update_read_btn.addEventListener("click", () => {
            // FIX: Use 'myBook', NOT 'obj1'
            if(myBook.read === "Read"){
                myBook.read = "Not read";
            } else {
                myBook.read = "Read";
            }
            // Refresh Screen
            display();
        });
        card.appendChild(update_read_btn);

        // Append card to our specific bookList div
        bookList.appendChild(card);
    });
};

const btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", onclick);
