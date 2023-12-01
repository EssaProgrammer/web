let listOfNumber = ['']
const listGakBoleh = ['+', '-', '*', '/', '%']
const yanggakboleh = ['=', 'CE', 'C', 'back']
document.getElementById('gaktau').textContent = 0
//document.querySelector('.btn-back').textContent = '<'

function setinput(){
    let i = 0
    let untukinput = ''
    while (listOfNumber.length > i){
        untukinput = untukinput + " " + listOfNumber[i]
        i ++
    }
    document.getElementById("gaktau").textContent = untukinput
}

function setinputo(to){
    document.getElementById("gaktau").textContent = to
}

function btn(varr){
    if (listGakBoleh.includes(varr)){
        listOfNumber.push(varr)
    }else if (listGakBoleh.includes(listOfNumber[listOfNumber.length - 1]) && varr != 'back' && varr != 'C'){
        listOfNumber.push(varr)
    }else if (varr == '='){
        jumlahin()
    }else if (varr == 'CE'){
        listOfNumber = ['']
        setinputo(0)
    }else if (varr == 'back'){
        let iii = 0
        let items = listOfNumber[listOfNumber.length - 1]
        let = backspace = []
        while (items.length > iii){
            backspace.push(items.charAt(iii))
            iii ++
        }
        let iiii = 0
        let untukinput = ''
        backspace.pop()
        while (backspace.length > iiii){
            untukinput = untukinput + backspace[iiii]
            iiii ++
        }
        if (untukinput == '' && listOfNumber.length > 1){
            listOfNumber.pop()
            setinput()
        }else if (listOfNumber.length < 2 && untukinput == ''){
            listOfNumber[listOfNumber.length - 1] = untukinput
            setinputo(0)
        }else{
            listOfNumber[listOfNumber.length - 1] = untukinput
            setinput()
        }
    }else if(varr == 'C'){
        if (listOfNumber.length > 1){
            listOfNumber.pop()
            setinput()
        }else{
            listOfNumber[listOfNumber.length - 1] = ''
            setinputo(0)
        }
    }else {
        listOfNumber[listOfNumber.length - 1] = listOfNumber[listOfNumber.length - 1] + varr
    }
    if (yanggakboleh.includes(varr)){
        null
    }else{
        setinput()
    }

}

function membuatdata(vars){
    let i2 = 0
    let list1 = []
    while(vars.length > i2){
        list1.push(vars.charAt(i2))
        i2 ++
    }
    list1.pop()
    i2 = 0
    let hasilnumber = ''
    while(list1.length > i2){
        hasilnumber = hasilnumber + list1[i2]
        i2 ++
    }
    let hasilakhir = ('0.' + hasilnumber)
    return Number(hasilakhir)
}

function jumlahin(){
    let ii = 0
    let jumlahin = 0
    while (listOfNumber.length > ii){
        let values = listOfNumber[ii]
        if (listGakBoleh.includes(values) && ii < 3){
            if (values == "+"){
                jumlahin = Number(Number(listOfNumber[ii - 1]) + Number(listOfNumber[ii + 1]))
            }else if(values == "-"){
                jumlahin = Number(Number(listOfNumber[ii - 1]) - Number(listOfNumber[ii + 1]))
            }else if(values == "*"){
                jumlahin = Number(Number(listOfNumber[ii - 1]) * Number(listOfNumber[ii + 1]))
            }else if(values == "/"){
                jumlahin = Number(Number(listOfNumber[ii - 1]) / Number(listOfNumber[ii + 1]))
            }else if(values == "%"){
                jumlahin = Number(Number(listOfNumber[ii - 1]) % Number(listOfNumber[ii + 1]))
            }
        }else if (listGakBoleh.includes(values)){
            if (values == "+"){
                jumlahin = Number(Number(jumlahin) + Number(listOfNumber[ii + 1]))
            }else if(values == "-"){
                jumlahin = Number(Number(jumlahin) - Number(listOfNumber[ii + 1]))
            }else if(values == "*"){
                jumlahin = Number(Number(jumlahin) * Number(listOfNumber[ii + 1]))
            }else if(values == "/"){
                jumlahin = Number(Number(jumlahin) / Number(listOfNumber[ii + 1]))
            }else if(values == "%"){
                jumlahin = Number(Number(jumlahin) % Number(listOfNumber[ii + 1]))
            }
        }
        ii ++
    }
    document.getElementById("gaktau").textContent = jumlahin
}