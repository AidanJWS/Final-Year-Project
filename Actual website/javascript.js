let form = document.querySelector('#upload'); //Selects the id element 'upload' and then assigns it to the variable form. This variable now holds a reference to the HTML element with the ID 'upload'.
let file = document.querySelector('#file'); //Selects the id element of 'file' and then assigns it to the variable file. This variable now holds a reference to the HTML element with the ID 'file'.

//Log the uploaded file to the console
function logFile (event) //Makes a function with the name log file and takes an event parameter 
{
	let str = event.target.result; // event.target is the file reader object which reads the file and what is read in that file is then contained in the results. This is then all being assigned to the variable str.
	let json = JSON.parse(str); //Converts the JSON formatted string ('str') into a Javascript object. Then assign this to the variable json.
	console.log(str);//Logs the original JSOn formatted string ('str') to the console, providing a way to see the raw content of the file.
	console.log(json);//Logs the parsed JavaScript object ('json') to the console. This can be useful for debugging to see the structured representation of the data.	
}


function handlesubmit (event)//Makes  a function called handlesumbit which taks an event parameter
{ 
	event.preventDefault();//prevents the form from reloading the page.?????
	if (!file.value.length)return;// If there is no file, do not return anything/ do nothing.
	let reader= new FileReader();//Create a new FileReader() object and assign it to the variable reader.
	reader.onload = logFile;//The logFile function is assigned as the callback for the 'onload' event, and will be called when the file has been read
	reader.readAsText(file.files[0]);//reads the files content as text.
}

form.addEventListener('submit', handlesubmit);//The form listens for when the submit event happens and then performs the handle submit function when it does.


let fileInput = document.querySelector('#file');
let searchInput = document.querySelector('#search');
let bookListContainer = document.querySelector('#bookList');
let libraryData; // To store the parsed library data

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    libraryData = json.books; // Store the parsed data in the libraryData variable
    console.log(str);
    console.log(json);
}

function handleSubmit(event) {
    event.preventDefault();
    if (!fileInput.files.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(fileInput.files[0]);
}

function displayBooks(books) {
    // Clear previous content
    bookListContainer.innerHTML = '';

    if (books.length === 0) {
        bookListContainer.innerHTML = '<p>No matching books found.</p>';
        return;
    }

    // Display each book
    books.forEach(book => {
        let bookInfo = document.createElement('div');
        bookInfo.innerHTML = `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Author:</strong> ${book.author}<br>
            <strong>Genre:</strong> ${book.genre}<br>
            <strong>Published Year:</strong> ${book.published_year}<br>
            <strong>Status:</strong> ${book.Status}<input type="checkbox" class="book-checkbox"><br></br>`;
        bookListContainer.appendChild(bookInfo);
    });
}


function handleSearch() {
    let searchTerm = searchInput.value.toLowerCase();

    if (!libraryData) {
        console.error('Library data not loaded yet.');
        return;
    }

    // Filter books based on the search term
    let filteredBooks = libraryData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.Status.toLowerCase().includes(searchTerm)
    );

    // Display the filtered books
    displayBooks(filteredBooks);
}

function clearSearchResults() {
    // Clear the search input
    searchInput.value = '';

    // Clear the bookListContainer
    bookListContainer.innerHTML = '';
}

function loadContent(page) {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    let selectedSection = document.getElementById(page);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Show or hide the search bar based on the current page
    let searchBar = document.getElementById('search');
    if (page === 'home') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }

    // Additional logic for each page if needed
    if (page === 'home') {
        // Load initial content for the home page
    } else if (page === 'addBook') {
        // Load content for the add book page
    } else if (page === 'removeBook') {
        // Load content for the remove book page
    } else if (page === 'editBookDetails') {
        // Load content for the edit book details page
    }
    if (page !== 'home') {
        clearSearchResults();
    }
}

function init() {
    // Load initial content when the page loads
    loadContent('home');
}

form.addEventListener('submit', handleSubmit);
searchInput.addEventListener('input', handleSearch);

function validateAddBookForm() {
    let inputs = document.querySelectorAll('#addBook input[type="text"]');
    let validFormat = true;

    inputs.forEach(input => {
        let value = input.value.trim();
        if (value === '') {
            alert('Please fill in all fields.');
            validFormat = false;
            return; // Exit the loop early if any field is empty
        }

        // Perform additional format validation for each field as needed
        if (input.id === 'isbn' && !/^\d{3}-\d{10}$/.test(value)) {
            alert('Invalid ISBN format. Please use the format XXX-XXXXXXXXXX.');
            validFormat = false;
        }
        
    });

    if (validFormat) {
        alert('All fields are filled and formatted correctly.');
    }
}

document.querySelector('.add-button').addEventListener('click', function(event) {
    event.preventDefault();
    validateAddBookForm();
});

function validateRemoveBookForm() {
    let inputs = document.querySelectorAll('#removeBook input[type="text"]');
    let validFormat = true;

    inputs.forEach(input => {
        let value = input.value.trim();
        if (value === '') {
            alert('Please fill in all fields.');
            validFormat = false;
            return;
        }
        
    });

    if (validFormat) {
        alert('All fields are filled and formatted correctly.');
    }
}

document.querySelector('.remove-button').addEventListener('click', function(event) {
    event.preventDefault();
    validateRemoveBookForm();
});

function validateEditBookForm() {
    let inputs = document.querySelectorAll('#editBookDetails input[type="text"]');
    let validFormat = true;

    inputs.forEach(input => {
        let value = input.value.trim();
        if (value === '') {
            alert('Please fill in all fields.');
            validFormat = false;
            return;
        }
        
    });

    if (validFormat) {
        alert('All fields are filled and formatted correctly.');
    }
}

document.querySelector('.edit-button').addEventListener('click', function(event) {
    event.preventDefault();
    validateEditBookForm();
});

document.querySelector('.confirm-button').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Book details have been edited.');
});
document.querySelector('.checkout-button').addEventListener('click', function(event) {
    event.preventDefault();
    alert('The book has been checked out.');
});
document.querySelector('.place-on-hold-button').addEventListener('click', function(event) {
    event.preventDefault();
    alert('The book has been placed on hold.');
});
