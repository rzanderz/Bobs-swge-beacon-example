function randomize () {
    if (mode != 0) {
        basic.showString("RANDOM")
        if (mode == 1) {
            zone = randint(1, 7)
            activateLocationBeacon()
        } else if (mode == 2) {
            personality = randint(1, 8)
            activateDroidBeacon()
        }
        next_random = 120
    }
}
input.onButtonPressed(Button.A, function () {
    if (zone >= 7) {
        zone = 1
    } else {
        zone += 1
    }
    mode = 1
    next_random = 0
    activateLocationBeacon()
})
function activateDroidBeacon () {
    bluetooth.activateSwgeDroidBeacon(
    personality
    )
}
function activateLocationBeacon () {
    bluetooth.activateSwgeLocationBeacon(
    zone
    )
}
input.onButtonPressed(Button.AB, function () {
    randomize()
})
function display () {
    if (mode == 1) {
        basic.showString("L")
        basic.pause(500)
        basic.showString("" + (zone))
    } else if (mode == 2) {
        basic.showString("D")
        basic.pause(500)
        basic.showString("" + (personality))
    } else {
        basic.showLeds(`
            # . # . #
            . # # # .
            . . # . .
            . # . # .
            . # . # .
            `)
    }
}
input.onButtonPressed(Button.B, function () {
    if (personality >= 8) {
        personality = 1
    } else {
        personality += 1
    }
    mode = 2
    next_random = 0
    activateDroidBeacon()
})
input.onGesture(Gesture.Shake, function () {
    reset()
})
function reset () {
    bluetooth.stopAdvertising()
    zone = 0
    personality = 0
    mode = 0
    next_random = 0
}
let next_random = 0
let personality = 0
let zone = 0
let mode = 0
reset()
basic.forever(function () {
    if (next_random > 0) {
        next_random += -1
        if (next_random == 0) {
            randomize()
        }
    }
    display()
    basic.pause(2000)
})
