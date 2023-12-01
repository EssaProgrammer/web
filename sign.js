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

let namakota = []
let idkota = []
const btnsingup = document.getElementById("btnsing")

btnsingup.addEventListener("click", () => {
    const usernameinput = document.getElementById("usernameinp").value
    const passwordinput = document.getElementById("passwordinp").value
    const emailinput = document.getElementById("emailinp").value
    const telpinput = document.getElementById("telpinp").value
    const alamatinput = document.getElementById("alamatinp").value
    const kotainput = document.getElementById("kotanama").value
    let thekota = idkota[namakota.indexOf(kotainput)]
    //setCookie("username", usernameinput, 30)
    //setCookie("password", passwordinput, 30)
    fetch(`https://database.essaprogrammer.repl.co/database/put/username=${usernameinput}&password=${passwordinput}&email=${emailinput}&telp=${telpinput}&alamat=${alamatinput}&kota=${thekota}`, {method: "PUT"})
    .then(response => response.json())
    .then(data => {
        if (data.status == "successfully"){
            setCookie("username", usernameinput, 30)
            setCookie("password", passwordinput, 30)
            window.location.replace("web/home.html")
        }
    })
    .catch(error => console.error(error));
})

fetch('https://ipapi.co/json/', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        document.getElementById("telpinp").value = data.country_calling_code
    })
    .catch(error => console.error(error));

fetch('https://database.essaprogrammer.repl.co/database/get/kota', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        const kotanamas = document.getElementById("kotanama")
        for(let i = 0; i < data.city_name.length; i++){
            const thenew = document.createElement("option")
            thenew.textContent = data.city_name[i] 
            kotanamas.append(thenew)
            namakota.push(data.city_name[i])
            idkota.push(data.city_id[i])
        }
    })
    .catch(error => console.error(error));