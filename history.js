let his = JSON.parse(localStorage.getItem("history"))
console.log(his, typeof (his));
console.log(typeof (his));

let write = document.querySelector(".display")

document.querySelector(".clear").addEventListener("click", clearfun)
function clearfun(){
    console.log("hi"),  
    localStorage.removeItem("history"),
    write.innerHTML=""
    console.log(localStorage.getItem("history"))
    console.log("helo");
}


write.innerHTML = his.map((data) => `
                            <div class="inner">
                                 ${data.search}
                                <span>Searched On: ${data.date} at ${data.time}</span>
                                 </div> `)