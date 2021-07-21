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
        return (this.suc != null)
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
}

function load() {
    let code = document.getElementById("Source").value

    code = code.replaceAll(/\n/g, '')

    return code
}

function tokenize(code) {
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

}