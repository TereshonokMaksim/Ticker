// Its in miliseconds, don't forget
const startNum = Date.now()
const eveningSchedule = [[["", "TDv - 31"], ["", "TDv - 31"], "FIZ - 22", "HR - 33", "HR - 33", "AIP - 27", "TZK - sd", "TZK - sd"],
                  ["MA - 34", "BI - 26", "OE - 26", "PO - 41", "PO - 41", "", "", ""],
                  ["", "OE - 27", "FIZ - 26", "KE - 22", "MA - 36", "SR - 40", ["", "FIZv - 22"], "HRd - 21"],
                  [["TDv - 4", ""], ["TDv - 4", ""], "OE - 26", "GE - 47", "GE - 47", "EN - 40", "EN - 40", "VJ/ET - 25/21"],
                  ["MA - 37", "MA - 37", "HR - 33", "KE - 22", ["UITUP - 31", "AIPv - 4"], ["UITUP - 31", "AIPv - 4"], ["AIPv - 4", "UITOP - 31"], ["AIPv - 4", "UITUP - 31"]]]
const eveningTimeSchedule = ["13:15-13:55", "14:00-14:40", "14:45-15:25", "15:30-16:10",   "16:30-17:10", "17:15-17:55", "18:00-18:40", "18:45-19:25"]

const morningSchedule = [[["OEv - 28", "TDv - 4"], ["OEv - 28", "TDv - 4"], ["TDv - 4", "OEv - 28"], ["TDv - 4", "OEv - 28"], "HR - 33", "HR - 33", "TZK - sd", "TZK - sd"],
                    ["", "BI - 26", "OE - 26", "PO - 41", "PO - 41", "OE - 26", "FIZv - 22", ""],
                    ["", "", "FIZ - 29", "KE - 26", "MA - 37", "SR - 40", "MA - 34", "HRd - 21"],
                    ["", "AIP - 27", "OE - 26", "GE - 47", "GE - 47", "EN - 40", "EN - 40", "VJ/ET - 25/21"],
                    ["MA - 37", "MA - 37", "HR - 33", "KE - 22", ["UITUP - 31", "AIPv - 4"], ["UITUP - 31", "AIPv - 4"], ["AIPv - 4", "UITOP - 31"], ["AIPv - 4", "UITUP - 31"]]]
const morningTimeSchedule = ["7:45-8:25", "8:30-9:10", "9:15-9:55", "10:00-10:40", "11:00-11:40", "11:45-12:25", "12:30-13:10", "13:15-13:55"]

let schedule = morningSchedule
let timeSchedule = morningTimeSchedule
let evenWeek = 0
let firstUnevenWeek = 2855

let group = 0
// 0 - dark, 1 - light
let colorTheme = 0
const BELL_OFFSET = -28
const UTC = 2
const dayMinus = 1

function setLightTheme() {
    document.querySelector("body").style.background = "rgb(255, 253, 217)"
    document.querySelectorAll(".time").forEach((time_el) => {time_el.style.color = "rgb(40, 40, 40)"})
    document.querySelector(".theme-switcher").style.background = "linear-gradient(to top, rgb(140, 140, 140), rgb(207, 207, 207))"
    document.querySelector("#theme-dark").classList.add("not-choosed")
    document.querySelector("#theme-light").classList.remove("not-choosed")
}

function setDarkTheme() {
    document.querySelector("body").style.background = "rgb(0, 0, 40)"
    document.querySelectorAll(".time").forEach((time_el) => {time_el.style.color = "rgb(80, 80, 200)"})
    document.querySelector(".theme-switcher").style.background = "linear-gradient(to top, rgb(1, 0, 100), rgb(6, 0, 130))"
    document.querySelector("#theme-dark").classList.remove("not-choosed")
    document.querySelector("#theme-light").classList.add("not-choosed")
}

function transformToSecs (hour_form) {
    return hour_form.split(":")[0] * 3600 + hour_form.split(":")[1] * 60 + BELL_OFFSET
}

function getFirstLesson (day) {
    // day = number 0-4
    // console.log("getting first lesson")
    if (day < 5) {
        let currentSchedule = schedule[day]
        for (let lessonNum = 0; lessonNum < 8; lessonNum++) {
            // console.log(`lll - ${schedule instanceof Array}`)
            let lesson = currentSchedule[lessonNum]
            // console.log(lesson)
            if (lesson instanceof Array) {
                if (lesson[group] != "") {
                    // console.log(lesson[group])
                    return lesson[group] + "^" + timeSchedule[lessonNum]
                }
            }
            else {
                if (lesson != ""){
                    return lesson + "^" + timeSchedule[lessonNum]
                }
            }
        }
        return false
    }
    else {
        return -2
    }
}

function getCurrentLesson (currentTime, day) {
    for (let lessonNum = 0; lessonNum < 8; lessonNum++){
        if (transformToSecs(timeSchedule[lessonNum].split("-")[1]) > currentTime) {
            let lesson = schedule[day][lessonNum]
            if (lesson instanceof Array) {
                if (lesson[group] != "") {
                    return lesson[group]
                }
                else {
                    return "Next lesson is absent (?)"
                }
            }
            else {
                if (lesson != ""){
                    return lesson
                }
                else {
                    return "Next lesson is absent (?)"
                }
            }
        }
    }
}

function getLastLesson (day) {
    // day = number 0-4
    let currentSchedule = schedule[day]
    for (let lessonNum = 7; lessonNum > -1; lessonNum--) {
        let lesson = currentSchedule[lessonNum]
        if (lesson instanceof Array) {
            if (lesson[group] != "" & !lesson[group].split(" - ")[0].includes("d")) {
                // console.log(lesson[group])
                return lesson[group] + "^" + timeSchedule[lessonNum]
            }
        }
        else {
            if (lesson != "" & !lesson.split(" - ")[0].includes("d")) {
                // console.log(lesson)
                return lesson + "^" + timeSchedule[lessonNum]
            }
        }
    }
    return false
}

function getWeek(time) {
    return ((Math.floor((time - 86400 * 4) / (86400 * 7))) - firstUnevenWeek) % 2
}

function updateTimer () {
    // let currentTime = Math.ceil(Date.now() / 1000 + 3600 * 3) % 86400
    // Artificial time, used for tests
    let ARTIFICIAL_TIME = Math.ceil(Date.now() / 1000) + 86400 * 1 + 3600 * (UTC + -10) + 60 * 0
    let currentTime = Math.ceil(ARTIFICIAL_TIME) % 86400
    
    if (getWeek(ARTIFICIAL_TIME) == 1) {
        schedule = morningSchedule
        timeSchedule = morningTimeSchedule
    }
    else {
        schedule = eveningSchedule
        timeSchedule = eveningTimeSchedule
    }

    // console.log(`Week - ${getWeek(ARTIFICIAL_TIME)}   Hour - ${currentTime / 3600}`)

    let lessonFormLabel = document.querySelector(".time-lesson")
    let hourFormLabel = document.querySelector(".time-full")
    let secFormLabel = document.querySelector(".time-secs")

    let curDay = new Date(ARTIFICIAL_TIME * 1000)
    // console.log(`Day = ${curDay.getDay()}`)
    let firstLesson = getFirstLesson(curDay.getDay() - dayMinus)
    if (firstLesson != false & firstLesson != -2) {
        let lastLesson = getLastLesson(curDay.getDay() - dayMinus)
        let startTime = transformToSecs(firstLesson.split("^")[1].split("-")[0])
        let endTime = transformToSecs(lastLesson.split("^")[1].split("-")[1])
        // console.log(startTime, currentTime)
        if (startTime > currentTime) {
            let timeText = ""
            if (startTime > currentTime + 3600) {
                timeText = `${Math.floor((startTime - currentTime) / 3600)}h `
            }
            if (startTime > currentTime + 60) {
                timeText += `${Math.floor((startTime - currentTime) / 60) % 60}m`
            }
            else {
                timeText = `${startTime - currentTime}s`
            }
            hourFormLabel.innerHTML = `Classes starts in ${timeText}`
            secFormLabel.innerHTML = `${startTime - currentTime}s left`
            lessonFormLabel.innerHTML = `Good luck at the school`
        }
        else if (endTime > currentTime) {
            let timeText = ""
            if (endTime > currentTime + 3600) {
                timeText = `${Math.floor((endTime - currentTime) / 3600)}h `
            }
            if (endTime > currentTime + 60) {
                timeText += `${Math.floor((endTime - currentTime) / 60) % 60}m`
            }
            else {
                timeText = `${endTime - currentTime}s`
            }
            hourFormLabel.innerHTML = `End in ${timeText}`
            secFormLabel.innerHTML = `${endTime - currentTime}s left`
            lessonFormLabel.innerHTML = `${getCurrentLesson(currentTime, curDay.getDay() - dayMinus)}`
        }
        else if (endTime > currentTime - 3600) {
            hourFormLabel.innerHTML = "END"
            secFormLabel.innerHTML = "You can go home now!"
            lessonFormLabel.innerHTML = "Have a good day!"
        }
        else {
            hourFormLabel.innerHTML = "Hello there!"
            secFormLabel.innerHTML = "Classes are over. You can freely live!"
            lessonFormLabel.innerHTML = "peaceful life"
        }

    }
    else if (firstLesson != -2) {
        hourFormLabel.innerHTML = "It seems like there is an error :("
        secFormLabel.innerHTML = "This is so sad(("
        lessonFormLabel.innerHTML = "aww"
    }
    else {
        hourFormLabel.innerHTML = "Today is weekend, what are you doing here?"
        secFormLabel.innerHTML = "Go outside, touch grass! Come on! Don't waste time like me!"
        lessonFormLabel.innerHTML = "Also, dont forget about homework!"
    }
}

setInterval(updateTimer, 500)

const themeButton = document.querySelector(".theme-switcher")
themeButton.addEventListener("click", () => {
    [setLightTheme, setDarkTheme][colorTheme]()
    if (colorTheme == 0) {
        colorTheme = 1
    }
    else {
        colorTheme = 0
    }
})

const groupButton = document.querySelector(".group-switcher")
groupButton.addEventListener("click", () => {
    if (group == 0){
        group = 1
        // console.log(
        // "hi"
        // )
        document.querySelector("#group-a").classList.add("not-choosed")
        document.querySelector("#group-b").classList.remove("not-choosed")
    }
    else {
        group = 0
        document.querySelector("#group-b").classList.add("not-choosed")
        document.querySelector("#group-a").classList.remove("not-choosed")
    }
    updateTimer()
})
