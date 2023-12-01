const dokumen = document.querySelector(".container")

function gantiwarna(warna){
    switch(warna){
        case "merah":
            dokumen.style.background = 'tomato'
            break
        case "kuning":
            dokumen.style.background = 'rgb(255, 255, 80)'
            break
        case "hijau":
            dokumen.style.background = 'rgb(94, 255, 94)'
            break
        case "biru":
            dokumen.style.background = 'rgb(92, 92, 255)'
            break
    }
}