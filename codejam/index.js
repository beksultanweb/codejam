window.onload = function() {
    drawInitBtns()
    var sizeIs = localStorage.getItem("size") || 16
    console.log(sizeIs)
    changeSize(sizeIs)
    drawSizeBtns()
    drawMove()
    drawTurnBtn()
    drawTime()

    let sizes = document.getElementsByClassName("size");

    for(let item of sizes) {
        item.addEventListener("click", () => {
            clear()
            changeSize(Math.pow(item.innerHTML.slice(0,1), 2))
            sizeIs = Math.pow(item.innerHTML.slice(0,1), 2)
        })
    }

    let restart = document.getElementsByClassName("restart")[0]
    restart.addEventListener("click", () => {
        localStorage.removeItem("size")
        localStorage.removeItem("positions")
        clear()
        changeSize(sizeIs)
    })

    let save = document.getElementsByClassName("save")[0]
    save.addEventListener("click", () => {
        localStorage.removeItem("size")
        localStorage.removeItem("positions")
        saveBtn()
    })

    let results = document.getElementsByClassName("results")[0]
    results.addEventListener("click", () => {
        topTen()
    })

    let turnBtn = document.getElementsByClassName("turnBtn")[0]
    turnBtn.addEventListener("click", () => {
        let label = document.querySelector("label")
        if(turnBtn.checked) {
            label.innerHTML = "Click to disable mute"
            enableMute()
        }
        else {
            label.innerHTML = "Click to enable mute"
            disableMute()
        }
    })
};

function drawTime() {
    let time = document.createElement("div")
    time.className = "time"
    var seconds=0;
    // var i=0;
    setInterval(Timeout, 1000);
    function Timeout(){
        checkForValid()
        //TODO
        seconds += 1
        if (seconds <=9) {
            time.innerHTML=`Time: 00:0${seconds}`
        }
        else if(seconds > 9 && seconds <=59) {
            time.innerHTML=`Time: 00:${seconds}`
        }
        else if(seconds > 59 && seconds <=599) {
            time.innerHTML=`Time: 0${Math.floor(seconds/60)}:${seconds%60}`
        }
        else if(seconds > 599) {
            time.innerHTML=`Time: ${Math.floor(seconds/60)}:${seconds%60}`
        }
    }
    // time.innerHTML = `Time: ${(performance.now() - start) * 60} seconds`
    document.body.appendChild(time)
}

function drawMove(count) {
    let move = document.createElement("div")
    move.className = "moves"
    move.innerHTML = `Moves: 0`
    document.body.appendChild(move)
}

function check(num) {
    let square = Math.sqrt(num), leftBorder = [], rightBorder = [], count = 0;
    for(let i = 1; i<=num; i+=square) {
        leftBorder.push(i)
        rightBorder.push(i+(square-1))
    }
    console.log(leftBorder, "|", rightBorder)

    let boxes = document.getElementsByClassName("box")
    for(let item of boxes) {
        item.addEventListener("click", () => {
            console.log(parseInt(item.style.order));
            let clickedItem = parseInt(item.style.order)
            let emptyItem = parseInt(document.getElementsByClassName("empty")[0].style.order)
            if(leftBorder.includes(emptyItem)) {
                if(clickedItem + square === emptyItem || clickedItem - square === emptyItem || clickedItem - 1 === emptyItem) {
                    playBtn()
                    item.style.order = emptyItem
                    document.getElementsByClassName("empty")[0].style.order = clickedItem
                    document.getElementsByClassName("moves")[0].innerHTML = `Moves: ${++count}`
                }
            }
            else if(rightBorder.includes(emptyItem)) {
                if(clickedItem + square === emptyItem || clickedItem - square === emptyItem || clickedItem + 1 === emptyItem) {
                    playBtn()
                    item.style.order = emptyItem
                    document.getElementsByClassName("empty")[0].style.order = clickedItem
                    document.getElementsByClassName("moves")[0].innerHTML = `Moves: ${++count}`
                }
            }
            else if(clickedItem + 1 === emptyItem || clickedItem - 1 === emptyItem || clickedItem + square === emptyItem || clickedItem - square === emptyItem) {
                playBtn()
                item.style.order = emptyItem
                document.getElementsByClassName("empty")[0].style.order = clickedItem
                document.getElementsByClassName("moves")[0].innerHTML = `Moves: ${++count}`
            }
        })
    }
}

function clear() {
    document.body.removeChild(document.getElementsByClassName("container")[0])
}

function changeSize(num) {
    console.log(num);
    let container = document.createElement("div")
    container.className = "container"
    if(num == 16) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(4, 1fr)"
    }
    else if(num == 9) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(3, 1fr)"
    }
    else if(num == 25) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(5, 1fr)"
    }
    else if(num == 36) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(6, 1fr)"
    }
    else if(num == 49) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(7, 1fr)"
    }
    else if(num == 64) {
        container.style.display = "grid"
        container.style.gridTemplateColumns = "repeat(8, 1fr)"
    }
    document.body.appendChild(container)

    let boxWidth
    if(window.innerWidth <= 640) boxWidth = window.innerWidth/Math.sqrt(num)
    else boxWidth = 100
    for(let i = 1; i<num; i++){
        let boxes = document.createElement("div")
        boxes.className = `box`
        boxes.style.width = `${boxWidth}px`
        boxes.style.height = boxes.style.width
        let p = document.createElement("p")
        p.innerHTML = i
        boxes.appendChild(p)
        document.getElementsByClassName("container")[0].appendChild(boxes)
    }

    let empty = document.createElement("div")
    empty.className = "empty"
    empty.style.width = `${boxWidth}px`
    empty.style.height = empty.style.width
    empty.style.order = num
    document.getElementsByClassName("container")[0].appendChild(empty)

    randomize()
    check(num)
}

function drawInitBtns() {
    let navBar = document.createElement("nav")
    document.body.appendChild(navBar)

    var arrBtn = ["restart", "stop", "save", "results"]
    for(let i = 0; i<4; i++) {
        let btn = document.createElement("button")
        btn.className = arrBtn[i]
        btn.innerHTML = arrBtn[i]
        document.querySelector("nav").appendChild(btn)
    }
}

function drawSizeBtns() {
    let sizeBar = document.createElement("div")
    sizeBar.className = "sizes"
    document.body.appendChild(sizeBar)
    for(let i = 3; i<9; i++) {
        let btn = document.createElement("a")
        btn.className = "size"
        btn.innerHTML = `${i}x${i}`
        document.getElementsByClassName("sizes")[0].appendChild(btn)
    }
}

function randomize() {
    let boxes = document.getElementsByClassName("box")
    let pos = []
    pos = JSON.parse(localStorage.getItem("positions"));


    let arr = [], randomPos = 0, ranNums = []
    for(let i = 1; i<=boxes.length; i++){
        arr.push(i)
    }
    let len = arr.length
    while (len--) {
        randomPos = Math.floor(Math.random() * (len+1));
        ranNums.push(arr[randomPos]);
        arr.splice(randomPos,1);
    }
    console.log(ranNums);
    console.log("pos: ", pos)
    if(pos) {
        console.log("localstorage found");
        [...boxes].forEach((el, ind) => {
            el.style.order = pos[ind]
        })
    }
    else {
        console.log("localstorage not found");
        [...boxes].forEach((el, ind) => {
            el.style.order = ranNums[ind]
       })
    }
}

function checkForValid() {
    let boxes = document.getElementsByClassName("box"), positions = [], valid = []
    for(let el of boxes) {
        positions.push(parseInt(el.style.order));
    }
    for(let i = 1; i<=boxes.length; i++){
        valid.push(i)
    }
    // positions.sort((a,b) => {
    //     return a-b
    // })
    // console.log(positions, valid);
    if(positions.every((val, index) => val === valid[index])) {
        let move = document.getElementsByClassName("moves")[0].innerHTML.split(" ")[1]
        let time = document.getElementsByClassName("time")[0].innerHTML.split(" ")[1]
        console.log(time);
        alert(`Hooray! You solved the puzzle in ${time} and ${move} moves!`)
        if(time !== undefined) {
            var existing = JSON.parse(localStorage.getItem("results")) || [];
            
            var newItem = {
                'time': time,
                'move': move
            }

            existing.push(newItem)
            localStorage.setItem("results", JSON.stringify(existing))
        }
    }
}

function topTen() {
    let newDiv = document.createElement("div")
    let existing = JSON.parse(localStorage.getItem("results")) || [];
    existing.sort((a,b) => {
        if(parseInt(a.move) < parseInt(b.move)) return -1
        if(parseInt(a.move) > parseInt(b.move)) return 1
        return 0
    })
    console.log();
    newDiv.innerHTML = `<div class="resmove">Top results from less:<br> ${JSON.stringify(existing.map(el => {return {move: el.move, time: el.time}}))}</div>`
    document.body.appendChild(newDiv)
}

function saveBtn() {
    let boxes = document.getElementsByClassName("box"), positions = []
    for(let el of boxes) {
        positions.push(parseInt(el.style.order));
    }
    console.log(positions);
    localStorage.setItem("positions", JSON.stringify(positions))
    localStorage.setItem("size", boxes.length + 1)
    alert("saved")
}

var audio = new Audio("./whoosh.mp3")

function playBtn() {
    audio.play()
}

function enableMute() {
    audio.muted = true
}

function disableMute() {
    audio.muted = false
}

function drawTurnBtn() {
    let turnBtn = document.createElement("input")
    turnBtn.type = "checkbox"
    turnBtn.id = "id"

    var label = document.createElement('label');
    label.htmlFor = "id";
    label.innerHTML = "Turn On"

    turnBtn.className = "turnBtn"

    document.body.appendChild(label)
    document.body.appendChild(turnBtn)
}