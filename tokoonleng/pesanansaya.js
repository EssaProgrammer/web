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

let userbeli = []
let barangbeli = []
let belibrp = []
let beliid = []
fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
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
                    if (userbeli[i] == getCookie("username")){
                        newel = document.createElement("div")
                    }
                }
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));