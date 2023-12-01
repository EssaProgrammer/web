document.getElementById("kembali").addEventListener("click", () => {
    window.location.replace("/web/home.html")
})

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

let usernames = []
let alamats = []
let phonum = []
let emails = []
let barangs = []
let mybarang = []
let namabarang = []
let hargabarang = []
let potobarang = ["proris.jpg", "promag.jpg", "telon.jpg", "kayuputih.jpg"]
let userbeli = []
let barangbeli = []
let belibrp = []
let beliid = []
let barangid
let theid
fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        fetch('https://database.essaprogrammer.repl.co/database/get/password=essahalogays&key=6c5a1eaBU3Cr', {method: "GET"})
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.data.username.length; i++){
                usernames.push(data.data.username[i])
            }
            for(let i = 0; i < data.data.alamat.length; i++){
                alamats.push(data.data.alamat[i])
            }
            for(let i = 0; i < data.data.telp.length; i++){
                phonum.push(data.data.telp[i])
            }
            for(let i = 0; i < data.data.email.length; i++){
                emails.push(data.data.email[i])
            }
            fetch('https://database.essaprogrammer.repl.co/database/get/pesanan/password=essahalogays&key=6c5a1eaBU3Cr', {method: "GET"})
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < data.data.username.length; i++){
                    userbeli.push(data.data.username[i])
                }
                for(let i = 0; i < data.data.barang.length; i++){
                    barangbeli.push(data.data.barang[i])
                }
                for(let i = 0; i < data.data.count.length; i++){
                    belibrp.push(data.data.count[i])
                }
                for(let i = 0; i < data.data.id.length; i++){
                    beliid.push(data.data.id[i])
                }
                for(let i = 0; i < userbeli.length; i++){
                        barangid = namabarang.indexOf(barangbeli[i]) + 1
                        theid = namabarang.indexOf(barangbeli[i])
                        const newel = document.createElement("div")
                        newel.className = "barang"
                        newel.innerHTML = `<div>pesanan id: ${beliid[i]}</div><div>(${userbeli[i]}) beli ${belibrp[i]}</div><img style="width: 200px; height: 200px;" src="${potobarang[theid]}"/><button id="detail${i}">lihat detail</button>`
                        document.getElementById("wrapper").append(newel)
                        document.getElementById(`detail${i}`).addEventListener("click", () => {
                            localStorage.setItem("lihatpesanan", beliid[i])
                            window.location.replace("/web/detail.html")
                        })

                }
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
})
.catch(error => console.error(error));