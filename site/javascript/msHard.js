document.addEventListener('DOMContentLoaded', () => {
  
  const grid = document.querySelector('.gridHard')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')

  let width = 18
  let height = 18

  let bombAmount = 60
  let flags = 0
  let noBombFields = (width*height - bombAmount)

  let gameFields = []

  let isGameOver = false


  // ====================== Create Board ======================
  function createBoard() {

    flagsLeft.innerHTML = bombAmount    // Set flags value on HTML page

    // ====================== Shuffled game array with random bombs ======================
    const bombsArray = Array(bombAmount).fill('bombHard')     // 'bombHard' is defined in css file
    const emptyArray = Array(width*height - bombAmount).fill('validHard')    // 'validHard' is defined in css file

    const gameArray = emptyArray.concat(bombsArray)   // Create merge bomb array and field array

    const shuffledArray = gameArray.sort(() => Math.random() -0.5)    // Randomize gameArray

    // ====================== Create gameField ======================
    for(let i = 0; i < width*height; i++) {
      const gameField = document.createElement('div')
      gameField.setAttribute('id', i)
      gameField.classList.add(shuffledArray[i])
      grid.appendChild(gameField)
      gameFields.push(gameField)

      // ====================== Normal click ======================
      gameField.addEventListener('click', function(e) {
        click(gameField)
      })

      // ====================== Ctrl and left click ======================
      gameField.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(gameField)
      }
    }

    // ====================== Add numbers ======================
    for (let i = 0; i < gameFields.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width - 1)
  
      if (gameFields[i].classList.contains('validHard')) {
        if (i > 0 && !isLeftEdge && gameFields[i - 1].classList.contains('bombHard')) total ++                    // Bomb to the left of field 'i'
        if (i > 17 && !isRightEdge && gameFields[i + 1 - width].classList.contains('bombHard')) total ++           // Bomb to the top-right of field 'i'
        if (i > 18 && gameFields[i - width].classList.contains('bombHard')) total ++                              // Bomb to the top of field 'i'
        if (i > 19 && !isLeftEdge && gameFields[i - 1 - width].classList.contains('bombHard')) total ++           // Bomb to the top-left of field 'i'
        if (i < 322 && !isRightEdge && gameFields[i + 1].classList.contains('bombHard')) total ++                  // Bomb to the right of field 'i'
        if (i < 306 && !isLeftEdge && gameFields[i - 1 + width].classList.contains('bombHard')) total ++           // Bomb to the bottom-left of field 'i'
        if (i < 304 && !isRightEdge && gameFields[i + 1 + width].classList.contains('bombHard')) total ++          // Bomb to the bottom-right of field 'i'
        if (i < 305 && gameFields[i + width].classList.contains('bombHard')) total ++                              // Bomb to the bottom of field 'i'
        gameFields[i].setAttribute('data', total)
      }
    }
  }

  // ====================== Create the board ======================

  createBoard()

  // ====================== Add Flag with right click ======================
  function addFlag(gameField) {
    if (isGameOver) return
    if (!gameField.classList.contains('checkedHard') && (flags < bombAmount)) {
      if (!gameField.classList.contains('flag')) {
        gameField.classList.add('flag')         // Add a Flag
        gameField.innerHTML = ' 🚩'
        flags ++
        flagsLeft.innerHTML = bombAmount - flags
        checkForWin()   // Check for win on field flag (with bomb covered, flagged, or not flagged)
      } else {
        gameField.classList.remove('flag')      // Remove a Flag
        gameField.innerHTML = ''
        flags --
        flagsLeft.innerHTML = bombAmount - flags
      }
    }
  }


  // ====================== Click on gameField actions ======================
  function click(gameField) {
    let currentId = gameField.id
    if (isGameOver) return
    if (gameField.classList.contains('checkedHard') || gameField.classList.contains('flag')) return
    if (gameField.classList.contains('bombHard')) {
      gameOver(gameField)
    } else {
      let total = gameField.getAttribute('data')
      if (total != 0) {
        gameField.classList.add('checkedHard')
        if (total == 1) gameField.classList.add('one')
        if (total == 2) gameField.classList.add('two')
        if (total == 3) gameField.classList.add('three')
        if (total == 4) gameField.classList.add('four')
        if (total == 5) gameField.classList.add('five')
        if (total == 6) gameField.classList.add('six')
        if (total == 7) gameField.classList.add('seven')
        if (total == 8) gameField.classList.add('eight')
        gameField.innerHTML = total
        checkForWin()   // Check for win on field click (with bomb covered, flagged, or not flagged)
        return
      }
      checkgameField(gameField, currentId)    // Show all empty fields connected to 'id'
    }
    gameField.classList.add('checkedHard')
  }


  // ====================== Check neighboring gameFields once gameField is clicked   (Recursion Function) ======================
  function checkgameField(gameField, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {                                     // Empty field to the left of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) - 1].id                  // Take the id of left empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId > 17 && !isRightEdge) {                                    // Empty field to the top-right of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) + 1 -width].id           // Take the id of top-right empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId > 18) {                                                   // Empty field to the top of clicked field (currentId)
        const newId = gameFields[parseInt(currentId - width)].id              // Take the id of top empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      } 
      if (currentId > 19 && !isLeftEdge) {                                    // Empty field to the top-left of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) - 1 - width].id          // Take the id of top-left empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId < 322 && !isRightEdge) {                                   // Empty field to the right of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) + 1].id                  // Take the id of right empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId < 306 && !isLeftEdge) {                                    // Empty field to the bottom-left of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) - 1 + width].id          // Take the id of bottom-left empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId < 304 && !isRightEdge) {                                   // Empty field to the bottom-right of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) +1 +width].id            // Take the id of bottom-right empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
      if (currentId < 305) {                                                   // Empty field to the bottom of clicked field (currentId)
        const newId = gameFields[parseInt(currentId) +width].id               // Take the id of bottom empty field as compared to clicked field (currentId)
        const newgameField = document.getElementById(newId)                   // Consider a new field (the taken id)
        click(newgameField)                                                   // Perform 'click' function on the new considered field to check (Recursion Function)
      }
    }, 10)  // Timeout (milliseconds) to wait before execute the upper block of code
  }


  // ====================== Game over ======================
  function gameOver(gameField) {
    result.innerHTML = 'BOOM! Hai perso!'
    isGameOver = true

    // Show ALL the bombs
    gameFields.forEach(gameField => {
      if (gameField.classList.contains('bombHard')) {
        gameField.innerHTML = '💣'
        gameField.classList.remove('bombHard')
        gameField.classList.add('checkedHard')
      }
    })
  }


  // ====================== Check for win ======================
  function checkForWin() {
  let matchbombflag = 0
  let matchchecked = 0

    for (let i = 0; i < gameFields.length; i++) {
      if (gameFields[i].classList.contains('flag') && gameFields[i].classList.contains('bombHard')) {
        matchbombflag ++
      }
      if (gameFields[i].classList.contains('validHard') && gameFields[i].classList.contains('checkedHard')){
        matchchecked ++
      }
      if (matchchecked === noBombFields || matchbombflag === bombAmount) {
        result.innerHTML = 'Hai vinto!'
        isGameOver = true
      }
    }
  }


})


function sendResult(user){

  var gameresult = document.getElementById("result").innerHTML;

  if(gameresult == "Hai vinto!"){

      fetch("/games/result", {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
              'game': 'ms',
              'user': user,
              'result': 'win'
          })
      }).then(console.log("Game result sent!"));

  }else if(gameresult == "BOOM! Hai perso!"){

      fetch("/games/result", {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
              'game': 'ms',
              'user': user,
              'result': 'lose'
          })
      }).then(console.log("Game result sent!"));
  }
}     