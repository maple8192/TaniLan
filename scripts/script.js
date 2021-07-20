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

const Commands = {
    add: 0,
    sub: 1,
    sft: 2,
    usf: 3,
    sta: 4,
    end: 5,
    out: 6
}

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
                commands.push(Commands.add)
                p = i
                break
            case "Tako":
                commands.push(Commands.sub)
                p = i
                break
            case "yan":
                commands.push(Commands.sft)
                p = i
                break
            case "たに":
                commands.push(Commands.usf)
                p = i
                break
            case "やん":
                commands.push(Commands.sta)
                p = i
                break
            case "椛谷":
                commands.push(Commands.end)
                p = i
                break
            case "18":
                commands.push(Commands.out)
                p = i
                break
        }
    }
    if(p != code.length) {return []}

    return commands
}