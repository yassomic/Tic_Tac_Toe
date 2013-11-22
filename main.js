// document.write(<button id="mybutton" onclick="incrementIndex()">Button 1</button>);
// function incrementIndex() {
//   index +=1;
}
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'Veggies';
var player2 = 'Junkfood';
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    // TODO: Check for rest of game winning cases
  )
  {
    $(document).trigger('game-win', currentPlayer);// TODO: Trigger 'game-win' event with the winning player as the event data

    console.log('somebody won');
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Mark the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  
  if (spaces[spaceNum]) {
  alert('Already chosen! Dont be a cheater!');
  }
  // Add class to elem so css can take care of the visuals
  else { 
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
  spaces[spaceNum] = currentPlayer;
  checkForWinner();
  setNextTurn();
  };


});

$(document).on('game-win', function (e, winner) {
  alert(winner + ' wins the game!')// TODO: Alert who won the game
});

// Start the game
setNextTurn();
