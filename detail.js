let potobarang = ["proris.jpg", "promag.jpg", "telon.jpg", "kayuputih.jpg"]
let namabarang = []
let hargabarang = []
let kurirs = []
let pengirimans = []
let hargaorang = undefined
let kurirhaghag = undefined
let baranghaghag = undefined
let thisid = undefined
let barangadabrp = undefined
let HAGHAG = "basin"

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

fetch('https://database.essaprogrammer.repl.co/database/get/product', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.product.length; i++){
            namabarang.push(data.product[i])
        }
        for(let i = 0; i < data.harga.length; i++){
            hargabarang.push(data.harga[i])
        }
        fetch(`https://database.essaprogrammer.repl.co/database/get/pesanan/password=essahalogays&key=6c5a1eaBU3Cr`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            let barangid = []
            let barangs = []
            let barangbrp = []
            let usernamess = []
            let statushaghag = []
            for(let i = 0; i < data.data.id.length; i++){
                barangid.push(data.data.id[i])
            }
            for(let i = 0; i < data.data.barang.length; i++){
                barangs.push(data.data.barang[i])
            }
            for(let i = 0; i < data.data.count.length; i++){
                barangbrp.push(data.data.count[i])
            }
            for(let i = 0; i < data.data.username.length; i++){
                usernamess.push(data.data.username[i])
            }
            for(let i = 0; i < data.data.kurir.length; i++){
                kurirs.push(data.data.kurir[i])
            }
            for(let i = 0; i < data.data.pengiriman.length; i++){
                pengirimans.push(data.data.pengiriman[i])
            }
            for(let i = 0; i < data.data.status.length; i++){
                statushaghag.push(data.data.status[i])
            }
            thisid = barangid.indexOf(localStorage.getItem("lihatpesanan"))
            hargaorang = hargabarang[thisid].split("Rp.")
            hargaorang = hargaorang[1]
            fetch(`https://database.essaprogrammer.repl.co/database/get/password=essahalogays&key=6c5a1eaBU3Cr`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                document.getElementById("thisimg").src = potobarang[namabarang.indexOf(barangs[thisid])]
                let haghagjiso
                let sumbingbarabidaaa
                if (statushaghag[thisid] == "belum"){
                    haghagjiso = "tandai sudah di kirim"
                    sumbingbarabidaaa = "sudah"
                }else {
                    haghagjiso = "tandai belum di kirim"
                    sumbingbarabidaaa = "belum"
                }
                document.getElementById("tandai").textContent = haghagjiso
                document.getElementById("namapembeli").textContent = "pembeli: "+usernamess[thisid]
                document.getElementById("namabarang").textContent = "barang: "+barangs[thisid]
                document.getElementById("notelp").textContent = "no telp: "+data.data.telp[data.data.username.indexOf(usernamess[thisid])]
                document.getElementById("email").textContent = "email: "+data.data.email[data.data.username.indexOf(usernamess[thisid])]
                document.getElementById("pengiriman").textContent = "pengiriman: "+pengirimans[thisid]
                kurirhaghag = kurirs[thisid]
                document.getElementById("kurir").textContent = "kurir: "+kurirhaghag
                document.getElementById("pesen").textContent = "membeli: "+barangbrp[thisid]
                baranghaghag = barangbrp[thisid]
                HAGHAG = "lol"
                document.getElementById("alamat").textContent = "alamat: "+data.data.alamat[data.data.username.indexOf(usernamess[thisid])]
                ongkircek()
                document.getElementById("tandai").addEventListener("click", () => {
                    fetch(`https://database.essaprogrammer.repl.co/database/post/tandai/username=${usernamess[thisid]}&barangid=${thisid + 1}&password=essahalogays&key=6c5a1eaBU3Cr&status=${sumbingbarabidaaa}`, {method: "POST"})
                    .then(response => response.json())
                    .then(data => {
                        alert("di tandai")
                        window.location.reload()
                    })
                    .catch(error => console.error(error));
                })
                document.getElementById("hapuskirim").addEventListener("click", () => {
                    fetch(`https://database.essaprogrammer.repl.co/database/post/delpesan/password=essahalogays&key=6c5a1eaBU3Cr&pesanid=${localStorage.getItem("lihatpesanan")}`, {method: "POST"})
                    .then(response => response.json())
                    .then(data => {
                        alert("dihapus")
                        window.location.replace("/web/pesanan.html")
                    })
                    .catch(error => console.error(error));
                })
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));

    function ongkircek(){
        fetch(`https://database.essaprogrammer.repl.co/database/get/ongkir/beli/password=essahalogays&key=6c5a1eaBU3Cr&barangid=${thisid + 1}&count=${baranghaghag}&kurir=${kurirhaghag}&username=${getCookie("username")}`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                
                    document.getElementById("totalharga").textContent = `harga total: Rp.${Number(Number((hargaorang * baranghaghag + "000")) + data.harga)}`
            })
            .catch(error => console.error(error));
    }

document.getElementById("kembali").addEventListener("click", () => {
    window.location.replace("/web/pesanan.html")
})