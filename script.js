var user=[]

var print=document.querySelector(".books")
let image=document.getElementsByTagName("img")

function start() {
    
    fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson")
        .then((data) => data.json())
        .then((data) => validate(data.items))

    function validate(data) {
        print.innerHTML=""
        var searchval = document.querySelector(".search").value
        console.log(data);
        let dateandtime=new Date()
        
        console.log(searchval);
        document.querySelector(".result").innerHTML=`Book Results for '${searchval}'`
        let count=true
        let arr=[]
        for(let i=0;i<10;i++){
            
            if(data[i].volumeInfo.title.includes(searchval)===true){               
                console.log(data[i], typeof(data[i]));
              
                arr.push(data[i])
                console.log(arr);
                print.innerHTML+=`                 
                    <div class="main">
                        <img src=${data[i].volumeInfo.imageLinks.thumbnail}>
                        <div>Title: ${data[i].volumeInfo.title}</div><br> 
                        <div>Author: ${data[i].volumeInfo.authors[0]}</div> <br>
                        <div>Page Count: ${data[i].volumeInfo.pageCount}</div>
                        <button>Buy Now</button>
                    </div>`        
            }
        }

        let obj={
            search: searchval,
            date: dateandtime.toLocaleDateString(),
            time: dateandtime.toLocaleTimeString(),
            values: arr
        }

        let searchhistory=JSON.parse(localStorage.getItem("history"))
        console.log(searchhistory, typeof(searchhistory));
       
        console.log(obj);

        if(searchhistory){
            searchhistory.push(obj)
            console.log("in if");
        }
        else{
            searchhistory=[obj]
            console.log("in else");
            console.log(searchhistory);
        }
        localStorage.setItem("history", JSON.stringify(searchhistory))
       
        console.log(JSON.parse(localStorage.getItem("history")));
        document.querySelector(".direct").addEventListener("click",direct)
        
        function direct(){
            console.log("hi");
            window.location.href="history.html"
        }
        
    }
}
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  const h3 = document.createElement("h3");
  h3.textContent = `Book Results for "${searchTerm}"`;
  h3.style.display = "block";


  if (searchTerm !== "") {
    bookResults.innerHTML = "";
    bookResults.appendChild(h3);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          for (let i = 0; i < data.items.length; i++) {
            const book = data.items[i];
            const bookInfo = {
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              pageCount: book.volumeInfo.pageCount,
              categories: book.volumeInfo.categories,
              imageUrl: book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : "noimage.png",
              infoLink: book.volumeInfo.infoLink,
            };
            const bookElement = createBookElement(bookInfo);
            bookResults.appendChild(bookElement);
          }
          history.unshift(searchTerm);
          localStorage.setItem("searchHistory", JSON.stringify(history));
          updateSearchHistory();
        } else {
          const message = document.createElement("p");
          message.textContent = "No results found.";
          bookResults.appendChild(message);
        }
      })
      .catch((error) => {
        console.log(error);
        const message = document.createElement("p");
        message.textContent = "An error occurred.";
        bookResults.appendChild(message);
      });
  }
});
