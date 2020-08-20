/*File name : app.js
  Author's name : Seyeong Park
  Web site name : SY's Slot Machine
  File description: This is main JavaScript file for slot machine*/

(function () {

    let playerMoney = 2000;
    let winnings = 0;
    let jackpot = 5000;
    let turn = 0;
    let playerBet = 0;
    let winNumber = 0;
    let lossNumber = 0;
    let winRatio = 0;

    // Function scoped letiables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let pyths = 0;
    let htmlfis = 0;
    let jscris = 0;
    let csss = 0;
    let manifest = [
        { id: "background", src: "../Assets/images/background.png" },
        { id: "banana", src: "../Assets/images/banana.gif" },
        { id: "bar", src: "../Assets/images/bar.gif" },
        { id: "bell", src: "../Assets/images/bell.gif" },
        { id: "bet_line", src: "../Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "../Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "../Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "../Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "../Assets/images/betMaxButton.png" },
        { id: "blank", src: "../Assets/images/blank.gif" },
        { id: "cherry", src: "../Assets/images/cherry.gif" },
        { id: "grapes", src: "../Assets/images/grapes.gif" },
        { id: "orange", src: "../Assets/images/orange.gif" },
        { id: "seven", src: "../Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "stopButton", src: "./Assets/images/stopIcon.png" },
        { id: "coin", src: "./Assets/sound/coin.mp3" },
        { id: "spin", src: "./Assets/sound/spin.mp3" },
    ];

    /* Utility function to show Player Stats */

function showPlayerGameStats()
{
    creditLabel.text=playerMoney;
    resultJackpot.text= "Jackpot: " + jackpot ;
    resultMoney.text="Player Money: " + playerMoney;
    resultnTurn.text="Turn: " + turn;
    resultnBet.text= "Bet: " + playerBet ;
    resultnWins.text="Wins: " + winNumber;
    resultnLosses.text=  "Losses: " + lossNumber;
    resultRatio.text=  "Win Ratio: " + (winRatio * 100).toFixed(2) + "%";
    winningsLabel.text=winnings;
    winRatio = winNumber / turn;
}

    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }

    /* Utility function to reset all fruit tallies */
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
        pyths = 0;
        htmlfis = 0;
        jscris = 0;
        csss = 0;
    }

    /* Utility function to reset the player stats */
    function resetAll() {
        playerMoney = 2000;
        winnings = 0;
        jackpot = 5000;
        turn = 0;
        playerBet = 0;
        winNumber = 0;
        lossNumber = 0;
        winRatio = 0;
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
        
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        let jackPotTry = Math.floor(Math.random() * 51 + 1);
        let jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }
    
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney += winnings;
        resultLabel.text="You Won: $" + winnings;
        
        resetFruitTally();
        checkJackPot();
    }
    
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        resultLabel.text="You Lost!";
    }

    /* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        let betLine = [" ", " ", " "];
        let outCome = [0, 0, 0];
    
        for (let spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "pyth";
                    pyths++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "htmlfi";
                    htmlfis++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "jscri";
                    jscris++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "css";
                    csss++;
                    break;
            }
        }
        return betLine;
    }
    

        /* This function calculates the player's winnings, if any */
        function determineWinnings()
        {
            if (blanks == 0)
            {
                if (grapes == 3) {
                    winnings = playerBet * 10;
                }
                else if(bananas == 3) {
                    winnings = playerBet * 20;
                }
                else if (oranges == 3) {
                    winnings = playerBet * 30;
                }
                else if (cherries == 3) {
                    winnings = playerBet * 40;
                }
                else if (bars == 3) {
                    winnings = playerBet * 50;
                }
                else if (bells == 3) {
                    winnings = playerBet * 75;
                }
                else if (sevens == 3) {
                    winnings = playerBet * 100;
                }
                else if (grapes == 2) {
                    winnings = playerBet * 2;
                }
                else if (bananas == 2) {
                    winnings = playerBet * 2;
                }
                else if (oranges == 2) {
                    winnings = playerBet * 3;
                }
                else if (cherries == 2) {
                    winnings = playerBet * 4;
                }
                else if (bars == 2) {
                    winnings = playerBet * 5;
                }
                else if (bells == 2) {
                    winnings = playerBet * 10;
                }
                else if (sevens == 2) {
                    winnings = playerBet * 20;
                }
                else if (pyths == 1) {
                    winnings = playerBet * 5;
                }
                else if (htmlfis == 1) {
                    winnings = playerBet * 5;
                }
                else if (jscris == 1) {
                    winnings = playerBet * 5;
                }
                else if (csss == 1) {
                    winnings = playerBet * 5;
                }
                else if (sevens == 1) {
                    winnings = playerBet * 5;
                }
                else {
                    winnings = playerBet * 1;
                }
                winNumber++;
                showWinMessage();
            }
            else
            {
                lossNumber++;
                showLossMessage();
            }
            
        }
         

       
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X -250, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(resetButton);
        stopButton = new UIObjects.Button("stopButton", Config.Screen.CENTER_X -250, Config.Screen.CENTER_Y + 20, true);
        stage.addChild(stopButton);

        // Labels
        jackPotLabel = new UIObjects.Label("5000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("2000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);        
        winningsLabel = new UIObjects.Label("-", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(" - ", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X-12, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);   

        //User's status information
        resultLabel = new UIObjects.Label("Click SPIN button" , "40px", "cursive", "#D4AF37", Config.Screen.CENTER_X+130, Config.Screen.CENTER_Y - 310, true);
        stage.addChild(resultLabel);   
        resultJackpot = new UIObjects.Label("Jackpot: " , "20px", "Consolas", "#000000", Config.Screen.CENTER_X-230, Config.Screen.CENTER_Y - 370, true);
        stage.addChild(resultJackpot);   
        resultMoney = new UIObjects.Label("Player Money: ", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-205, Config.Screen.CENTER_Y - 350, true);
        stage.addChild(resultMoney);    
        resultnWins = new UIObjects.Label("Wins: ", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-244, Config.Screen.CENTER_Y - 330, true);
        stage.addChild(resultnWins);   
        resultnTurn = new UIObjects.Label("Turn: ", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-245, Config.Screen.CENTER_Y - 310, true);
        stage.addChild(resultnTurn);   
        resultnBet = new UIObjects.Label("Bet: ", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-249, Config.Screen.CENTER_Y - 290, true);
        stage.addChild(resultnBet);   
        resultnLosses = new UIObjects.Label("Losses: ", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-237, Config.Screen.CENTER_Y - 270, true);
        stage.addChild(resultnLosses);  
        resultRatio = new UIObjects.Label("Win Ratio", "20px", "Consolas", "#000000", Config.Screen.CENTER_X-230, Config.Screen.CENTER_Y - 250, true);
        stage.addChild(resultRatio);    

        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }

    function interfaceLogic() {

        spinButton.on("click", () => {
            // reel test
            let reels = Reels();                      
            // example of how to replace the images in the reels                
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);

            createjs.Sound.play("spin");
            if (playerMoney == 0)
            {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {                    
                    resetAll(); 
                    showPlayerGameStats();    
                }

            }
            else if ( playerBet <= playerMoney ) {                 
                Reels(); 
                winningsLabel.text=winnings;
                determineWinnings();
                turn++; 
                showPlayerGameStats();  
            }
            else if ( playerBet > playerMoney) {
                if (confirm("You don't have enough Money to place that bet. \nDo you want to play again?")) {
                    resetAll();
                    showPlayerGameStats();        
                }
            }
            else if (playerMoney >= jackpot) {
                confirm("Congratulations, you won $"+jackpot+ " Jackpot!!")
            }

            determineWinnings();
        });

        // When click BET1, playerBet will be 1
        bet1Button.on("click", () => {
                playerBet = 1;      
                betLabel.text=playerBet;
                createjs.Sound.play("coin");
        });
        
         // When click BET10, playerBet will be 10
        bet10Button.on("click", () => {
            playerBet = 10;      
            betLabel.text=playerBet;
            createjs.Sound.play("coin");
        });
        
        // When click BET100, playerBet will be 100       
        bet100Button.on("click", () => {
            playerBet = 100;      
            betLabel.text=playerBet;
            createjs.Sound.play("coin");
        });

        // When click BETMAX, playerBet will be 999
        betMaxButton.on("click", () => {
            playerBet = 999;      
            betLabel.text=playerBet;
            createjs.Sound.play("coin");
            createjs.Sound.play("coin");
        });
        resetButton.on("click", () => {    
            location.reload(true);
            location.href = location.href;
            history.go(0);
             
        }); 
        stopButton.on("click", () => {    
            alert("Do you want to stop this game?");
            location.reload(true);
            location.href = location.href;
            history.go(0);
        });       
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();   
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map



