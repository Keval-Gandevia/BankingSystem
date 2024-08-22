const fs = require('fs')

function getCurTime() {
    const curTime = new Date()
    return curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds()
}

function checkMakeFile(fileName) {
    if (fs.existsSync("./Logs/" + fileName + "_log.txt")) {
        return "exists"
    }
    else {
        fs.writeFile("./Logs/" + fileName + "_log.txt", "", (er) => {
            console.log(er)
        })
        return "DNE"
    }
}

function add_log(data, type = "SUCCESS") {
    const curDate = new Date()
    const fileName = curDate.getDate() + "_" + curDate.getMonth() + "_" + curDate.getFullYear()
    const serverFile = fileName + "_log.txt"
    checkMakeFile(fileName)
    const writer = type + " " + getCurTime() + " : " + data + "\n"
    fs.appendFile("./Logs/" + serverFile, writer, (err) => {
    })
}

module.exports = {
    add_log
}