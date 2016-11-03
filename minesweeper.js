document.addEventListener('DOMContentLoaded', startGame)

//Define board size and the number of mines
var size =6
var noElements = size*size;
var noMine= Math.floor(noElements/3);
var mineList = []

//Create an array of the mines
for (var n = 0; n < noElements; n++) {
    if (n < noMine)
    {
      mineList.push (1)
    }
    else {mineList.push (0)}
}

//Shuffle the mines array using a Knuth shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

mineList = shuffle(mineList)

//Create the board
function boardCreate () {
  var cells = []
  var z = 0

  for (x =0; x < size; x++ )

        for (y=0; y < size; y++)
        {
          if (mineList[z] == 1) {
            mine=true;
          }
          else {
            mine=false
          }
//Populate the cells
          cells.push ({row:x, col: y, isMine: mine, hidden: true})
          z++;
        }
  return {
    cells: cells
  }
}
var board = boardCreate()

//Reload the page
function myFunction() {
    location.reload();
}
// Don't remove this function call: it makes the game work!
function startGame() {
    for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);

        document.addEventListener('contextmenu', woosh, checkForWin)
        document.addEventListener('click', gong, checkForWin)
    }
    lib.initBoard()
}
// Sound Functions
function woosh(){
  var soundWoosh = document.getElementById("iThinkItsAMine")
  soundWoosh.play();
}
// function woosh(){
//   var soundWoosh = document.getElementById("notMine?")
//   soundWoosh.play();
// }

function gong(){
  var soundGong = document.getElementById("gong")
  var soundBlob = document.getElementById("notMine?")
  for (var i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine && !board.cells[i].hidden) {
        soundGong.play();
      }
      else {soundBlob.play();
      }
  }
}
function chipmunks(){
  var soundChipmunks = document.getElementById("win")
  soundChipmunks.play();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

var win = false;

function checkForWin() {
    for (var i = 0; i < board.cells.length; i++) {
        if (!board.cells[i].isMine && board.cells[i].hidden) {
            return
        } else if (board.cells[i].isMine && !board.cells[i].isMarked) {
            return
        }
    }
    lib.displayMessage('You win!')
    chipmunks()
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var x = 0; x < surroundingCells.length; x++)
    {
        if (surroundingCells[x].isMine)
        {
            (surroundingCells[x])
            count++;
        }
        (count)
    }
    return count;
}
