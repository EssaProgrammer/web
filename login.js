const loginButton = document.getElementById("btnlogin")

/*fetch('https://database.essaprogrammer.repl.co/database/get/product')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.error(error));
*/

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
//setCookie("username", "essa", 30)
//document.cookie = "username=;"

let usernames = []
let passwords = []

fetch('https://database.essaprogrammer.repl.co/database/get/password=essahalogays&key=6c5a1eaBU3Cr', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.data.username.length; i++){
            usernames.push(data.data.username[i])
        }
        for(let i = 0; i < data.data.password.length; i++){
            passwords.push(data.data.password[i])
        }
    })
    .catch(error => console.error(error));

loginButton.addEventListener("click", () => {
    let jangandigituin
    let jangandigituin2
    const usernameinput = document.getElementById("usernameinp").value
    const passwordinput = document.getElementById("passwordinp").value
    /*if (usernames.includes(usernameinput)){
        console.log("XD")
    }*/
    if (usernames.includes(usernameinput)){
        if (passwordinput == passwords[usernames.indexOf(usernameinput)]){
            console.log("password sama")
            setCookie("username", usernameinput, 30)
            setCookie("password", passwordinput, 30)
            window.location.replace("web/home.html")
        }
    }
})
