const players = {};

function getPlayerData(playerName) {
  if (!players[playerName]) {
    players[playerName] = { balance: 1000000 };
  }
  return players[playerName];
}

function slotGame(playerName, bet) {
  const playerData = getPlayerData(playerName);

  if (isNaN(bet) || bet < 1000000) {
    return "Invalid bet amount. Please try again.";
  }

  if (playerData.balance < bet) {
    return "Insufficient balance. Please add more funds.";
  }

  const outcome = Math.random() < 0.5 ? "win" : "lose";

  if (outcome === "win") {
    const winAmount = Math.floor(Math.random() * 30000000) + 1000000;
    playerData.balance += winAmount;
    return `Congratulations, ${playerName}! You won ${winAmount}!`;
  } else {
    const loseAmount = bet;
    playerData.balance -= loseAmount;

    if (playerData.balance < 1000000) {
      playerData.balance = 1000000;
      return `You've reached the minimum balance, ${playerName}. You can't bet anymore.`;
    }

    return `Better luck next time, ${playerName}! You lost ${loseAmount}.`;
  }
}

function wallet(playerName) {
  const playerData = getPlayerData(playerName);
  return `Your current balance, ${playerName}, is ${playerData.balance}.`;
}

function bank(playerName, action, amount) {
  const playerData = getPlayerData(playerName);

  if (action === "deposit") {
    playerData.balance += amount;
    return `Deposited ${amount}, ${playerName}. Your new balance is ${playerData.balance}.`;
  } else if (action === "withdraw") {
    if (playerData.balance >= amount) {
      playerData.balance -= amount;
      return `Withdrawn ${amount}, ${playerName}. Your new balance is ${playerData.balance}.`;
    } else {
      return "Insufficient balance.";
    }
  }
}

// Bot command handler
function handleCommand(message) {
  const [command, ...args] = message.split(" ");

  if (command === ".slot") {
    const playerName = message.split(" ")[0]; // Assuming player name is not provided, using message sender's name instead
    const bet = parseInt(args[0]);
    return slotGame(playerName, bet);
  } else if (command === ".wallet") {
    const playerName = message.split(" ")[0]; // Assuming player name is not provided, using message sender's name instead
    return wallet(playerName);
  } else if (command === ".bank") {
    const playerName = message.split(" ")[0]; // Assuming player name is not provided, using message sender's name instead
    const action = args[0];
    const amount = parseInt(args[1]);
    return bank(playerName, action, amount);
  }
}

// Example usage:
const message = ".slot 1000000";
console.log(handleCommand(message));
{
  "starting_balance": 1000000,
  "min_bet": 1000000,
  "max_win": 30000000,
  "min_balance": 1000000
}
