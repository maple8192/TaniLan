"use strict"

/*
+ -> Tani
- -> Tako
> -> yan
< -> たに
[ -> やん
] -> 椛谷
. -> 18
*/

const Commands = [
    ["たに", "やん", "椛谷", "18"],
    ["yan"],
    ["Tani", "Tako"]
]

function run() {
    const code = load()

    const commandSet = interpret(code)

    console.log(commandSet)
}

function load() {
    let code = document.getElementById("Source").value

    code = code.replaceAll(/\n/g, '')

    return code
}

function interpret(code) {
    let commands = []

    let p = 0;
    for(let i = 1; i <= code.length; i++) {
        switch(code.substring(p, i)) {
            case "Tani":
                commands.push("Tani")
                p = i
                break
            case "Tako":
                commands.push("Tako")
                p = i
                break
            case "yan":
                commands.push("yan")
                p = i
                break
            case "たに":
                commands.push("たに")
                p = i
                break
            case "やん":
                commands.push("やん")
                p = i
                break
            case "椛谷":
                commands.push("椛谷")
                p = i
                break
            case "18":
                commands.push("18")
                p = i
                break
        }
    }
    if(p != code.length) {return []}

    return commands
}