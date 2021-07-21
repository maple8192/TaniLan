"use strict"

/*
+ -> Tani
- -> Tako
> -> yan
< -> やん
[ -> たに
] -> たこ
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

class Result {
    constructor() {
        this.ret = null
        this.err = null
    }

    success(ret) {
        this.ret = ret
        this.err = null

        return this
    }

    error(err) {
        this.ret = null
        this.err = err

        return this
    }

    isSuccess() {
        return (this.err === null && this.suc !== null)
    }

    onSuccess(fun) {
        if(this.isSuccess()) {
            fun(this.ret)
        }
    }

    onError(fun) {
        if(!this.isSuccess()) {
            fun(this.err)
        }
    }
}

function run() {
    const code = load()

    const ret = tokenize(code)

    ret.onSuccess((ret) => {
        const disp = interpret(ret)

        disp.onSuccess((ret2) => {
            display(ret2, false)
        })
        disp.onError((err2) => {
            display(ret2, true)
        })
    })
    ret.onError((err) => {
        display(ret2, true)
    })
}

function load() {
    let code = document.getElementById("Source").value

    code = code.replaceAll(/\n/g, '')

    return code
}

function tokenize(code) {
    if(code.length == 0) {return new Result().error("No Code")}

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
            case "やん":
                commands.push(Commands.usf)
                p = i
                break
            case "たに":
                commands.push(Commands.sta)
                p = i
                break
            case "たこ":
                commands.push(Commands.end)
                p = i
                break
            case "18":
                commands.push(Commands.out)
                p = i
                break
        }
    }
    if(p != code.length) {return new Result().error("Syntax Error")}

    return new Result().success(commands)
}

function interpret(commands) {
    let memory = [0]
    let pointer = 0

    let ret = ""

    for(let i = 0; i < commands.length; i++) {
        switch(commands[i]) {
            case Commands.add:
                if(memory[pointer] == 255) {
                    memory[pointer] = 0
                }else {
                    memory[pointer]++
                }
                break
            case Commands.sub:
                if(memory[pointer] == 0) {
                    memory[pointer] = 255
                }else {
                    memory[pointer]--
                }
                break
            case Commands.sft:
                pointer++
                if(memory.length <= pointer) {
                    memory.push(0)
                }
                break
            case Commands.usf:
                pointer--
                if(pointer < 0) {
                    return new Result().error("OutOfMemory")
                }
                break
            case Commands.sta:
                if(memory[pointer] == 0) {
                    let nest = 0

                    let b = false

                    for(let p = i + 1; p < commands.length; p++) {
                        switch(commands[p]) {
                            case Commands.sta:
                                nest++
                                break
                            case Commands.end:
                                if(nest == 0) {
                                    i = p + 1
                                    b = true
                                }
                                nest--
                                break
                        }

                        if(b) {
                            break
                        }
                    }
                }
                break
            case Commands.end:
                if(memory[pointer] != 0) {
                    let nest = 0

                    let b = false

                    for(let p = i - 1; p >= 0; p--) {
                        switch(commands[p]) {
                            case Commands.sta:
                                if(nest == 0) {
                                    i = p + 1
                                    b = true
                                }
                                nest--
                                break
                            case Commands.end:
                                nest++
                                break
                        }

                        if(b) {
                            break
                        }
                    }
                }
                break
            case Commands.out:
                ret += String.fromCharCode(memory[pointer])
                break
        }
    }

    return new Result().success(ret)
}

function display(str, err) {
    const result = document.getElementById("Result")

    if(err) {
        result.style.color = "#FF4444"
        result.value = str
    }else {
        result.style.color = "#000000"
        result.value = str
    }
}