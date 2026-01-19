const container = document.querySelector(".container");

var book = [];

function books(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
console.log(book);
function onclick(){
    //input for title of book
    const ip_title = document.createElement("input");
    ip_title.classList.add("ip_title");
    ip_title.textContent = "Enter the title of Book";
    //input for author of book
    const ip_auth = document.createElement("input");
    ip_auth.classList.add("ip_auth");
    ip_auth.textContent = "Enter the Author of book";
    //input for no. of pages of book
    const ip_pages = document.createElement("input");
    ip_pages.classList.add("ip_pages");
    ip_pages.textContent = "Enter the number of pages of book";
    
    
    //button to input it and store it to the array as object
    const btn2 = document.createElement("button");
    btn2.classList.add("btn2");
    btn2.textContent = "click to add input";
    btn2.addEventListener("click", () => {
        const input_title = ip_title.value;
        const input_auth = ip_auth.value;
        const input_pages = ip_pages;

        const obj1 = new books(input_title, input_auth, input_pages, "read");
        book.push(obj1);
        console.log(book);
    });
    container.appendChild(ip_title);
    container.appendChild(ip_auth);
    container.appendChild(ip_pages);
    
    container.appendChild(btn2);
};

const btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", onclick);