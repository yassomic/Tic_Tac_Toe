// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [];

// keeps track of the players and their css images
var player1 = 'veggies';
var player2 = 'junkfood';

// allows players to update their names without changing css links
var player1string = 'veggies';
var player2string = 'junkfood';

var currentPlayer = null;
var currentPlayerString = null;
var gameWon = false;
var player1tally = 0;
var player2tally = 0;


// Animates the winning squares when the game is won
var animateBoard = function() {
    if (spaces[0] === spaces[1] && spaces[1] === spaces[2]) {
        animateSpaces(0,1,2);
    }else if(spaces[3] === spaces[4] && spaces[4] === spaces[5]) {
        animateSpaces(3,4,5);
    }else if(spaces[6] === spaces[7] && spaces[7] === spaces[8]) {
        animateSpaces(6,7,8);
    }else if(spaces[0] === spaces[3] && spaces[3] === spaces[6]) {
        animateSpaces(0,3,6);
    }else if(spaces[1] === spaces[4] && spaces[4] === spaces[7]) {
        animateSpaces(1,4,7);
    }else if(spaces[2] === spaces[5] && spaces[5] === spaces[8]) {
        animateSpaces(2,5,8);
    }else if(spaces[0] === spaces[4] && spaces[4] === spaces[8]) {
        animateSpaces(0,4,8);
    }else if(spaces[2] === spaces[4] && spaces[4] === spaces[6]) {
        animateSpaces(2,4,6);
    }
};

var animateSpaces = function(space1, space2, space3) {
    $('#board .space:eq(' + space1 + ')').fadeOut(400).fadeIn(400);
    $('#board .space:eq(' + space2 + ')').delay(400).fadeOut(400).fadeIn(400);
    $('#board .space:eq(' + space3 + ')').delay(800).fadeOut(400).fadeIn(400);
};




// Resets the spaces array for a new game.
var resetSpaces = function() {
    spaces = [
      NaN, NaN, NaN,
      NaN, NaN, NaN,
      NaN, NaN, NaN
    ];
};

// Clears the images from the board.
var clearBoard = function() {

    for(spaceNum = 0; spaceNum < spaces.length; spaceNum++) {
        $('#board .space:eq(' + spaceNum + ')').removeClass(player1);
        $('#board .space:eq(' + spaceNum + ')').removeClass(player2);
    }
};

// Runs through the sequence of needed functions to set up for a new game.
var startGame = function() {
    resetSpaces();
    gameWon = false;
    clearBoard();
    setNextTurn();
    updateNames();
    updateScores();
};

// Updates the HTML to list the players names
var updateNames = function() {
    $('#player1name').text(player1string + ": ");
    $('#player2name').text(player2string + ": ");
};


// Updates the HTML to list the players scores.
var updateScores = function() {
    $('#player1tally').text(player1tally);
    $('#player2tally').text(player2tally);
};


// Decides which player is the current player.
var setNextTurn = function () {
    if (currentPlayer === player1) {
          currentPlayer = player2;
          currentPlayerString = player2string
        }
        else {
          currentPlayer = player1;
          currentPlayerString = player1string
        }
    $('#turn-label').text(currentPlayerString);
};


// Examines the spaces array to check if three in a row has been acheived.
// If there is a winner, end the game.
var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]

    || spaces[0] === spaces[3] && spaces[3] === spaces[6] 
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]

    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    )
  {
    gameWon = true;
    console.log('somebody won');
    if(currentPlayer === player1) {
        player1tally += 1;
    }else {
        player2tally += 1;
    }
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayerString);
    updateScores();
    setNextTurn();
  }
};

// Event handler for a player marking a space
$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);
  if(gameWon) {
    alert("The game has already been won!  Please start a new game.");
  }else if(spaces[spaceNum]){
    alert("That space is already taken!  Please choose an empty space.");
  }else {
      // Marks the space with the current player's name
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
    checkForWinner();
    setNextTurn();
  }

});


// When the game has been won, alert the winner.
$(document).on('game-win', function (e, winner) {
    alert(winner + " won this game!");
    // var animateCounter = 0
    // while(animateCounter < 3) {
        animateBoard();
        // animateCounter += 1;
    // }
});

// Event handler for the "New Game!" button.
$('#newGame').on('click', function (e) {
    console.log("New Game! clicked");
    startGame();
});

// Event handler for the "Update Names" button.
$('#names button').on('click', function (e) {
    console.log("Update Names clicked");
    if( $('#player1update').val() ){
        player1string = $('#player1update').val();
        $('#player1update').val(null);

    }
    if( $('#player2update').val() ){
        player2string = $('#player2update').val();
        $('#player2update').val(null);
    }
    updateNames();
});





// Start the game
startGame();
