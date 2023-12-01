let hari = new Date().getDay()
const namahari = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']
let randomNumber = Math.floor(Math.random()*10)
const harini = namahari[hari - 1]
let percobaan = 0
refsresh()

function refsresh() {
    randomNumber = Math.floor(Math.random()*10)
    document.querySelector("#buttons").value = ""
    percobaan = 0
}

function cek() {
    percobaan = percobaan +1
    const inputan = document.getElementById('buttons').value
    const dapet = Number(inputan)
    let gaktau = null
    if (dapet >= randomNumber){
        gaktau = "besar"
    }
    if (dapet <= randomNumber){
        gaktau = "kecil"
    }
    if (dapet == randomNumber){
        gaktau = "benar"
    }
    switch(gaktau){
        case "besar":
            alert("angka yg kamu input lebih besar kamu sudah mencoba " + percobaan + " kali")
            break
        case "kecil":
            alert("angka yg kamu input lebih kecil kamu sudah mencoba " + percobaan + " kali")
            break
        case "benar":
            alert("angka kamu input benar kamu bisa menebak dalam " + percobaan + " kali")
            refsresh()
            break
        default:
            alert("error")
            break
    }
}