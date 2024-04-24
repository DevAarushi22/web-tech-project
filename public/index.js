const TEXT_1 = "The\nFuture\nTechnology\nWelcomes\n"
const TEXT_2 = "You!"

const typeElement_1 = document.getElementById("typing_1")
const typeElement_2 = document.getElementById("typing_2")

const eachLetterTime = 100

for (let i = 0; i < TEXT_1.length; i++) {
    setTimeout(()=>{
        typeElement_1.innerText += TEXT_1[i]
    },eachLetterTime*i)
}

setTimeout(()=>{
    for (let i = 0; i < TEXT_2.length; i++) {
        setTimeout(()=>{
            typeElement_2.innerText += TEXT_2[i]
        },eachLetterTime*i)
    }     
},(TEXT_1.length+1)*eachLetterTime)

setTimeout(()=>{
    typeElement_2.classList.add("glow")    
},(TEXT_1.length+TEXT_2.length +5)*eachLetterTime)
