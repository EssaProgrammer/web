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

const barangid = localStorage.getItem('type') - 1
let namabarang = []
let hargabarang = []
let potobarang = ["proris.jpg", "promag.jpg", "telon.jpg", "kayuputih.jpg"]
let stoklist = []
fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        for(let i = 0; i < data.tinggal.length; i++){
            stoklist.push(data.tinggal[i])
        }
        document.getElementById("palpale").innerHTML = `<div style="margin-bottom: 5px; margin-top: 90px;">nama barang: ${namabarang[barangid]}</div><div style="margin-bottom: 5px;">stok barang: ${stoklist[barangid]}</div><div style="margin-bottom: 50px;">harga barang: ${hargabarang[barangid]}</div>`
    })
    .catch(error => console.error(error));

document.getElementById("image").src = potobarang[barangid]

document.getElementById("beli").addEventListener("click", () => {
    localStorage.setItem("belibarang", barangid + 1)
    if (!getCookie("username") == "" && stoklist[barangid] != 0){
        localStorage.setItem("countbarang", Number(document.getElementById("angkabeli").value))
                                localStorage.setItem("isbeli", "true")
                                window.location.replace("/web/belisekarang.html")
    }else {
        if (stoklist[barangid] == 0 && getCookie("username") == ""){
            alert("anda belum login")
        }else if (getCookie("username") == ""){
            alert("anda belum login")
        }else {
            alert("stok kosong")
        }
    }
})

document.getElementById("kembali").addEventListener("click", () => {
    window.location.replace("/web/home.html")
})

document.getElementById("keranj").addEventListener("click", () => {
    if (!getCookie("username") == ""){
    fetch(`https://database.essaprogrammer.repl.co/database/keranjang/username=${getCookie('username')}&password=${getCookie('password')}&barang=${barangid + 1}&count=${Number(document.getElementById("angkakeran").value)}`, {method: "POST"})
        .then(response => response.json())
        .then(data => {
            if (data.status == "gk tau"){
                alert("dimasukan")
            }
        })
        .catch(error => console.error(error));
    }else {
        alert("anda belum login")
    }
})

fetch(`https://database.essaprogrammer.repl.co/database/get/isadmin/username=${getCookie("username")}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        if (data.status == "benar") {  
            fetch(`https://database.essaprogrammer.repl.co/database/get/product`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                document.getElementById("stoks").innerHTML = `<button id="stokupdate" style="width: 300px;">update stok</button><input style="width: 50px;" type="number" id="angkastok" value="${data.tinggal[barangid]}"/>`
                document.getElementById("stokupdate").addEventListener("click", () => {
                    fetch(`https://database.essaprogrammer.repl.co/database/post/settinggal/password=essahalogays&key=6c5a1eaBU3Cr&barang=${namabarang[barangid]}&brp=${document.getElementById("angkastok").value}`, {method: "POST"})
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == "berhasil") {
                            alert("berhasil")
                            window.location.reload()
                        }else {
                            alert("gagal")
                        }
                    })
                    .catch(error => console.error(error));
                })
            })
            .catch(error => console.error(error));
        }else {
            document.getElementById("stoks").remove()
        }
    })
    .catch(error => console.error(error));