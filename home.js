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

function issingout() {
    const checkdipilih = document.getElementById("opsibadabida")
    if (checkdipilih.value == "sign out"){
        document.cookie = "username=;"
        document.cookie = "password=;"
        window.location.reload()
    }else if (checkdipilih.value == "login") {
        window.location.replace("/login.html")
    }else if (checkdipilih.value == "sign up") {
        window.location.replace("/sign.html")
    }else if (checkdipilih.value == "keranjang") {
        window.location.replace("/keranjang.html")
    }else if (checkdipilih.value == "pesanan") {
        window.location.replace("/pesanan.html")
    }else if (checkdipilih.value == "pesanan saya") {
        window.location.replace("/pesanansaya.html")
    }
}

function liat(type) {
    localStorage.setItem('type', type)
    window.location.replace(`/liat.html`)
}

const namapengguna = document.getElementById("namasiorang")
if (!getCookie("username") == ""){
    namapengguna.textContent = getCookie("username")
    fetch(`https://database.essaprogrammer.repl.co/database/get/isadmin/username=${getCookie("username")}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        if (data.status == "benar") {
            document.getElementById("keranjanggatuh").textContent = "pesanan"
            document.getElementById("akugknaikodonghaghag").remove()
        }
    })
    .catch(error => console.error(error));
}else {
    namapengguna.textContent = "belum login"
    document.getElementById("akugaknaikodong2").textContent = "login"
    document.getElementById("keranjanggatuh").remove()
    const mausingupgaknih = document.createElement("option")
    mausingupgaknih.textContent = "sign up"
    document.getElementById("opsibadabida").append(mausingupgaknih)
}