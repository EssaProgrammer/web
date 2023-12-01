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
let barangs = []
let mybarang = []
let namabarang = []
let hargabarang = []
let potobarang = ["proris.jpg", "promag.jpg", "telon.jpg", "kayuputih.jpg"]
let barangadabrp = []
let elsdhdibuat = {}
let stok = []
let idofbarang = []

fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < namabarang.length; i++){
            elsdhdibuat[namabarang.indexOf(data.product[i]) + 1] = false
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        for(let i = 0; i < data.tinggal.length; i++){
            stok.push(data.tinggal[i])
        }
        fetch(`https://database.essaprogrammer.repl.co/database/get/keranjang/password=essahalogays&key=6c5a1eaBU3Cr&username=${getCookie("username")}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            /*for(let i = 0; i < data.data.username.length; i++){
                usernames.push(data.data.username[i])
            }
            */
            for(let i = 0; i < data.data.product.length; i++){
                barangs.push(data.data.product[i])
                idofbarang.push(data.data.product[i] - 1)
                barangadabrp.push(data.data.count[i])
            }
            //for(let i = 0; i < data.data.count.length; i++){
            //}
            /*if (usernames.includes(getCookie("username"))) {
                let idofbarang = []
                for(let i = 0; i < barangs[usernames.indexOf(getCookie("username"))].length ; i++){
                    mybarang.push(barangs[usernames.indexOf(getCookie("username"))][i])
                    const theid = barangs[usernames.indexOf(getCookie("username"))][i] - 1
                    idofbarang.push(theid)
                    barangadabrp[theid + 1] ++
                    let newel = document.createElement("div")
                    newel.className = "barang"
                    newel.innerHTML = `<img src="${potobarang[theid]}"/>`
                    document.getElementById("wrapper").append(newel)
                    
                }
                */
                /*for(let i = 0; i < barangs.length ; i++){
                    mybarang.push(barangs[i])
                    const theid = barangs[i] - 1
                    idofbarang.push(theid)
                    barangadabrp[theid + 1] ++
                    let newel = document.createElement("div")
                    newel.className = "barang"
                    newel.innerHTML = `<img src="${potobarang[theid]}"/>`
                    document.getElementById("wrapper").append(newel)
                    
                }
                */
                for(let i = 0; i < barangs.length ; i++){
                        let newel = document.createElement("div")
                        newel.className = "barang"
                        newel.innerHTML = `<img style="width: 200px; height: 200px;" src="${potobarang[idofbarang[i]]}"/><div style="display: flex; flex-direction: column; align-items: center; width: ;"><div>${barangadabrp[i]}</div><button class="beli" id="beli${idofbarang[i] + 1}">BELI SEKARANG</button></div><button class="beli" id="keran${idofbarang[i] + 1}">hapus dari keranjang</button>`
                        document.getElementById("wrapper").append(newel)
                        document.getElementById(`beli${idofbarang[i] + 1}`).addEventListener("click", () => {
                            if (stok[idofbarang[i]] != 0){
                                /*fetch(`https://database.essaprogrammer.repl.co/database/post/username=${getCookie('username')}&password=${getCookie('password')}&barang=${namabarang[idofbarang[i]]}&count=${barangadabrp[i]}`, {method: "POST"})
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status){
                                        alert("berhasil")
                                    }
                                })
                                .catch(error => console.error(error));*/
                                localStorage.setItem("isbeli", "false")
                                localStorage.setItem("belibarang", idofbarang[i]+1)
                                localStorage.setItem("countbarang", barangadabrp[i])
                                window.location.replace("web/belisekarang.html")
                            }else {
                                alert("stok kosong")
                            }
                        
                        })
                        document.getElementById(`keran${idofbarang[i] + 1}`).addEventListener("click", () => {
                                fetch(`https://database.essaprogrammer.repl.co/database/post/delkeran/password=essahalogays&key=6c5a1eaBU3Cr&barang=${idofbarang[i] + 1}&username=${getCookie("username")}`, {method: "POST"})
                                .then(response => response.json())
                                .then(data => {
                                    window.location.reload()
                                })
                                .catch(error => console.error(error));
                        
                        })
                    
                }
            //}
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));

document.getElementById("kembali").addEventListener("click", () => {
    window.location.replace("web/home.html")
})