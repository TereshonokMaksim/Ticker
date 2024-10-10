// Its in miliseconds, don't forget
const startNum = Date.now()
// Oof, time for full rework for schedules. 
// Alright, lets go
// Ok, you know what? No, i dont want to do it
// Let it be the strangest, but working way!
const eveningSchedule = [[["", "TDv - 31"], ["", "TDv - 31"], "FIZ - 22", "HR - 33", "HR - 33", "AIP - 27", "TZK - sd", "TZK - sd"],
                  ["MA - 34", "BI - 26", "OE - 26", "PO - 41", "PO - 41", "", "", ""],
                  ["", "OE - 27", "FIZ - 26", "KE - 22", "MA - 36", "SR - 40", ["", "FIZv - 22"], "HRd - 21"],
                  [["TDv - 4", ""], ["TDv - 4", ""], "OE - 26", "GE - 47", "GE - 47", "EN - 40", "EN - 40", "VJ/ET - 25/21"],
                  ["MA - 37", "MA - 37", "HR - 33", "KE - 22", ["UITUP - 31", "AIPv - 4"], ["UITUP - 31", "AIPv - 4"], ["AIPv - 4", "UITOP - 31"], ["AIPv - 4", "UITUP - 31"]]]
const eveningTimeSchedule = ["13:15-13:55", "14:00-14:40", "14:45-15:25", "15:30-16:10",   "16:30-17:10", "17:15-17:55", "18:00-18:40", "18:45-19:25"]

const morningSchedule = [[["OEv - 28", "TDv - 4"], ["OEv - 28", "TDv - 4"], ["TDv - 4", "OEv - 28"], ["TDv - 4", "OEv - 28"], "HR - 33", "HR - 33", "TZK - sd", "TZK - sd"],
                    ["", "BI - 26", "OE - 26", "PO - 41", "PO - 41", "OE - 26", ["FIZv - 22", ""], ""],
                    ["", "", "FIZ - 29", "KE - 26", "MA - 37", "SR - 40", "MA - 34", "HRd - 21"],
                    ["", "AIP - 27", "OE - 26", "GE - 47", "GE - 47", "EN - 40", "EN - 40", "VJ/ET - 25/21"],
                    ["MA - 37", "MA - 37", "HR - 33", "KE - 22", ["UITUP - 31", "AIPv - 4"], ["UITUP - 31", "AIPv - 4"], ["AIPv - 4", "UITOP - 31"], ["AIPv - 4", "UITUP - 31"]]]
const morningTimeSchedule = ["7:45-8:25", "8:30-9:10", "9:15-9:55", "10:00-10:40", "11:00-11:40", "11:45-12:25", "12:30-13:10", "13:15-13:55"]

const EVENING_SCHEDULE_WORK = true
let schedule = morningSchedule
let timeSchedule = morningTimeSchedule
let evenWeek = 0
let firstUnevenWeek = 2855

let group = 0
// 0 - dark, 1 - light
let colorTheme = 0
const BELL_OFFSET = -27.5
const UTC = 2
const dayMinus = 1

function setLightTheme() {
    document.querySelector("body").style.background = "rgb(255, 253, 217)"
    document.querySelectorAll(".time").forEach((time_el) => {time_el.style.color = "rgb(40, 40, 40)"})
    document.querySelectorAll(".info").forEach((time_el) => {time_el.style.color = "rgb(40, 40, 40)"})
    document.querySelector(".theme-switcher").style.background = "linear-gradient(to top, rgb(140, 140, 140), rgb(207, 207, 207))"
    document.querySelector("#theme-dark").classList.add("not-choosed")
    document.querySelector("#theme-light").classList.remove("not-choosed")
}

function setDarkTheme() {
    document.querySelector("body").style.background = "rgb(0, 0, 40)"
    document.querySelectorAll(".time").forEach((time_el) => {time_el.style.color = "rgb(80, 80, 200)"})
    document.querySelectorAll(".info").forEach((time_el) => {time_el.style.color = "rgb(80, 80, 200)"})
    document.querySelector(".theme-switcher").style.background = "linear-gradient(to top, rgb(1, 0, 100), rgb(6, 0, 130))"
    document.querySelector("#theme-dark").classList.remove("not-choosed")
    document.querySelector("#theme-light").classList.add("not-choosed")
}

function transformToSecs (hour_form) {
    return hour_form.split(":")[0] * 3600 + hour_form.split(":")[1] * 60 + BELL_OFFSET
}
function transformFromSecs (sec_form) {
    seconds = sec_form % 86400
    return `` 
}

// Hello again, its me from 3 line
// Here, im gonna rewrite this funtion
// Wish me luck. please. ty

// DEV NOTE: first name was getFirstLesson, check for it in the code later
// DEV NOTE 2: idk why i renamed it :)

function getFirstEvent (day) {
    // day = number 0-4
    if (day < 5) {
        let currentSchedule = schedule[day]
        for (let lessonNum = 0; lessonNum < 8; lessonNum++) {
            let lesson = currentSchedule[lessonNum]
            // console.log(lesson)
            if (lesson instanceof Array) {
                if (lesson[group] != "") {
                    console.log(lesson[group])
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

// How are you, by the way

// DEV NOTE 1: first name was "getCurrentLesson", fix it in the later code 

function getCurrentEvent (currentTime, day) {
    for (let lessonNum = 0; lessonNum < 8; lessonNum++){
        let lessonStart = transformToSecs(timeSchedule[lessonNum].split("-")[0])
        let lessonEnd = transformToSecs(timeSchedule[lessonNum].split("-")[1])
        if (lessonStart <= currentTime & currentTime <= lessonEnd) {
            console.log(lessonStart <= currentTime & currentTime <= lessonEnd)
            let lesson = schedule[day][lessonNum]
            if (lesson instanceof Array) {
                if (lesson[group] != "") {
                    return lesson[group] + "^" + lessonEnd
                }
                else {
                    return "Current lesson is absent (?)"
                }
            }
            else {
                if (lesson != ""){
                    return lesson + "^" + lessonEnd
                }
                else {
                    return "Current lesson is absent (?)"
                }
            }
        }
        else {
            console.log(!(lessonNum < 7), "yoyo")
            if (lessonNum < 7) {
                // Best optimization in my projects be like
                let endCurrentLesson = transformToSecs(timeSchedule[lessonNum].split("-")[1])
                let startNextLesson = transformToSecs(timeSchedule[lessonNum + 1].split("-")[0])
                if (endCurrentLesson < currentTime & currentTime < startNextLesson) {
                    if (startNextLesson - endCurrentLesson > 600) {
                        return "Big Break" + "^" + startNextLesson
                    }
                    else {
                        return "Small Break" + "^" + startNextLesson
                    }
                }
            }
            else {
                // <i> Ironically </i>
                return "It looks like the break system broke"
            }
        }
    }
}

// And why are you here?
// What are you looking for?
// You can just contact me and ask if you need something, you know

// DEV NOTE 1: This is completely untested
// DEV NOTE 2: Okay, it is just a copy of getCurrentEvent, nice job, myself
// DEV NOTE 3: wait, how breaks work? are they before the lesson or after it?
// DEV NOTE 4: Um, it shows that breaks are after lessons, not before. It doesnt change anything, but i was thinking not like it

function getNextEvent (currentTime, day) {
    let first_lesson = getFirstEvent(day).split("^")
    console.log(transformToSecs(first_lesson[1].split("-")[0]), "aaa")
    if (currentTime < transformToSecs(first_lesson[1].split("-")[0])) {
        return `First lesson is ${first_lesson[0]}`
    }
    if (transformToSecs(getLastEvent(day).split("^")[1].split("-")[0]) < currentTime) {
        return `Its the final lesson`
    }
    else {
        for (let lessonNum = 0; lessonNum < 7; lessonNum++){
            let startCurrentLesson = transformToSecs(timeSchedule[lessonNum].split("-")[0])
            // Break borders
            let endCurrentLesson = transformToSecs(timeSchedule[lessonNum].split("-")[1])
            let startNextLesson = transformToSecs(timeSchedule[lessonNum + 1].split("-")[0])
            if (startCurrentLesson < currentTime & currentTime < endCurrentLesson) {
                // DUDE WHY COPYPASTE >:O
                // Best optimization in my projects be like
                // if (endCurrentLesson < currentTime < startNextLesson) {
                if (startNextLesson - endCurrentLesson > 600) {
                    return "Next is Big Break!"
                }
                else {
                    return "Next is Small break!"
                }
                // }
            }
            else {
                console.log(endCurrentLesson, currentTime, startNextLesson, "KOK")
                if (endCurrentLesson < currentTime & currentTime < startNextLesson) {
                    let lesson = schedule[day][lessonNum + 1]
                    if (lesson instanceof Array) {
                        if (lesson[group] != "") {
                            return `Next lesson is ${lesson[group]}`
                        }
                        else {
                            return "Next lesson is absent (?)"
                        }
                    }
                    else {
                        if (lesson != ""){
                            return `Next lesson is ${lesson}`
                        }
                        else {
                            return "Next lesson is absent (?)"
                        }
                    }
                }
            }
        }
    }
}

// Hm, you still reading this, dont you?
// Can you please send me anything?
// I would like to chat with you some time :)

// DEV NOTE 1: Renamed from "getLastLesson" to "getLastEvent" for the sake of "event system" or smth like it

function getLastEvent (day) {
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

// yooo, new totally not copypasted and totally not useless function!1!!11
// Okay, if serious, why i create a bunch of stupid functions?
// nevermind, back to work

function getLessonsNumber (day) {
    let currentSchedule = schedule[day]
    let lessonNumber = 0
    for (let lessonNum = 0; lessonNum < 8; lessonNum++) {
        let lesson = currentSchedule[lessonNum]
        if (lesson instanceof Array) {
            if (lesson[group] != "" & !lesson[group].split(" - ")[0].includes("d")) {
                lessonNumber++
            }
        }
        else {
            if (lesson != "" & !lesson.split(" - ")[0].includes("d")) {
                lessonNumber++
            }
        }
    }
    return lessonNumber
}

// wait, i even had THIS function? wow, not bad, not even remeber what i did last week...
// or 2 weeks ago? when i did this? what?

function getWeek(time) {
    return ((Math.floor((time - 86400 * 4) / (86400 * 7))) - firstUnevenWeek) % 2
}

// Oh, the main function. I dont want to touch it, it looks bad, like, VERY BAD
// help

function updateTimer () {
    // let currentTime = Math.ceil(Date.now() / 1000 + 3600 * 3) % 86400
    // Artificial time, used for tests
    // wait, i did not turn artificial time off?...
    let ARTIFICIAL_TIME = Math.ceil(Date.now() / 1000) + 86400 * 0 + 3600 * (UTC + 0) + 60 * 0
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

    let currentEventLabel = document.querySelector(".info-current-event")
    let nextEventLabel = document.querySelector(".info-next-event")
    // let additionalInfoLabel = document.querySelector(".info-additional")
    let hourFormLabel = document.querySelector(".time-full")
    let secFormLabel = document.querySelector(".time-secs")

    let curDay = new Date(ARTIFICIAL_TIME * 1000)
    // console.log(`Day = ${curDay.getDay()}`)
    let firstEvent = getFirstEvent(curDay.getDay() - dayMinus)
    if (firstEvent != false & firstEvent != -2) {
        let lastEvent = getLastEvent(curDay.getDay() - dayMinus)
        let startTime = transformToSecs(firstEvent.split("^")[1].split("-")[0])
        let endTime = transformToSecs(lastEvent.split("^")[1].split("-")[1])
        // console.log(startTime, currentTime)
        if (startTime > currentTime) {
            let timeText = ""
            if (startTime > currentTime + 3600) {
                timeText = `${Math.floor((startTime - currentTime) / 3600)}hours `
            }
            if (startTime > currentTime + 60) {
                timeText += `${Math.floor((startTime - currentTime) / 60) % 60}min`
            }
            else {
                timeText = `${startTime - currentTime}s`
            }
            hourFormLabel.innerHTML = `Classes starts in ${timeText}`
            secFormLabel.innerHTML = `${Math.ceil(startTime - currentTime)}s left`
            currentEventLabel.innerHTML = "You have some time left, use it"
            nextEventLabel.innerHTML = getNextEvent(currentTime, curDay.getDay() - dayMinus)
            // additionalInfoLabel.innerHTML = `Good luck at the school`
        }
        else if (endTime > currentTime) {
            let timeText = ""
            if (endTime > currentTime + 3600) {
                timeText = `${Math.floor((endTime - currentTime) / 3600)}hours `
            }
            if (endTime > currentTime + 60) {
                timeText += `${Math.floor((endTime - currentTime) / 60) % 60}min`
            }
            else {
                timeText = `${endTime - currentTime}sec`
            }
            hourFormLabel.innerHTML = `End in ${timeText}`
            secFormLabel.innerHTML = `${Math.ceil(endTime - currentTime)}sec left`
            let currentEvent = getCurrentEvent(currentTime, curDay.getDay() - dayMinus)
            let timeLeft = Math.ceil(currentEvent.split("^")[1]) - currentTime
            console.log(currentEvent.split("^")[1], currentTime, "sss")
            let timeLeftText = ""
            if (Math.floor(timeLeft / 60) != 0) {
                timeLeftText = `${Math.floor(timeLeft / 60)}min `
            }
            timeLeftText += `${timeLeft % 60}sec`
            currentEventLabel.innerHTML = `${currentEvent.split("^")[0]} ends in ${timeLeftText}`
            nextEventLabel.innerHTML = getNextEvent(currentTime, curDay.getDay() - dayMinus)
        }
        else if (endTime > currentTime - 3600) {
            hourFormLabel.innerHTML = "END"
            secFormLabel.innerHTML = "You can go home now!"
            currentEventLabel.innerHTML = "Have a good day!"
            nextEventLabel.innerHTML = "Dont forget about homework, though"
            // additionalInfoLabel.innerHTML = ``
        }
        else {
            hourFormLabel.innerHTML = "Hello there!"
            secFormLabel.innerHTML = "Classes are over. You can freely live!"
            currentEventLabel.innerHTML = "peaceful life"
            nextEventLabel = "Btw, how are you"
            // additionalInfoLabel = "By the way, how are you?"
        }

    }
    else if (firstLesson != -2) {
        hourFormLabel.innerHTML = "It seems like there is an error :("
        secFormLabel.innerHTML = "This is so sad(("
        currentEventLabel.innerHTML = "aww"
    }
    else {
        hourFormLabel.innerHTML = "Today is weekend, what are you doing here?"
        secFormLabel.innerHTML = "Go outside, touch grass! Come on! Don't waste time like me!"
        currentEventLabel.innerHTML = "Also, dont forget about homework!"
        nextEventLabel.innerHTML = "..."
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
