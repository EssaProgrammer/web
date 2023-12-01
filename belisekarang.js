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

let hargaorang = undefined
let potobarang = ["proris.jpg", "promag.jpg", "telon.jpg", "kayuputih.jpg"]
const idbarang = localStorage.getItem("belibarang") - 1
let namabarang = []
let hargabarang = []
let grambarang = []
fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        hargaorang = hargabarang[idbarang].split("Rp.")
        hargaorang = hargaorang[1]
        document.getElementById("imagekah").src = potobarang[idbarang]
        document.getElementById("namabarang").textContent = `nama barang: ${namabarang[idbarang]}`
        document.getElementById("hargatotal").textContent = `harga total (belum ongkir): Rp.${hargaorang * localStorage.getItem("countbarang")}000`
        document.getElementById("membeli").textContent = `membeli: ${localStorage.getItem("countbarang")}`
    })
    .catch(error => console.error(error));

    function ongkircek(){
        fetch(`https://database.essaprogrammer.repl.co/database/get/ongkir/beli/password=essahalogays&key=6c5a1eaBU3Cr&barangid=${localStorage.getItem("belibarang")}&count=${localStorage.getItem("countbarang")}&kurir=${document.getElementById("kuririd").value.toLowerCase()}&username=${getCookie("username")}`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                document.getElementById("imagekah").src = potobarang[idbarang]
                document.getElementById("ongkir").textContent = `ongkos kirim: Rp.${data.harga}`
                if (hargaorang != undefined){
                    document.getElementById("hargaygtotal").textContent = `harga total: Rp.${Number(Number((hargaorang * localStorage.getItem("countbarang") + "000")) + data.harga)}`
                }else {
                    ongkircek()
                }
            })
            .catch(error => console.error(error));
    }
ongkircek()

document.getElementById("buttonbeli").addEventListener("click", () => {
    fetch(`https://database.essaprogrammer.repl.co/database/post/username=${getCookie('username')}&password=${getCookie('password')}&barang=${namabarang[idbarang]}&count=${localStorage.getItem("countbarang")}&kurir=${document.getElementById("kuririd").value.toLowerCase()}&pengiriman=${document.getElementById("pengirimanss").value}`, {method: "POST"})
.then(response => response.json())
.then(data => {
if (data.status){
    alert("dibeli")
}
})
.catch(error => console.error(error));
})

document.getElementById("kembali").addEventListener("click", () => {
    window.location.replace(localStorage.getItem("isbeli") == "true" ? "liat.html": "keranjang.html")
})