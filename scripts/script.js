"use strict"

function run() {
    let code = document.getElementById("Source").value

    code = code.replaceAll(/\n/g, '')

    interpret(code)
}

function interpret(code) {

}