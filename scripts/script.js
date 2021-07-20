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

function run() {
    const code = load()

    interpret(code)
}

function load() {
    let code = document.getElementById("Source").value

    code = code.replaceAll(/\n/g, '')

    return code
}

function interpret(code) {

}