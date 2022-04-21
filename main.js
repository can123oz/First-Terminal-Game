const prompt = require('prompt-sync')({sigint: true});
// these are characters at the field that we created
const hat = '^'; // this it the bounty 
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*'; // this is the player


class Field {
    constructor(  ) {
        this._land = [];
        process.stdout.write('Welcome to the hat find game \n');
    }
    get land() {
        return this._land;
    }
    print() {
        for (let i = 0 ; i < this._land.length ; i++) {
            let land2 = this._land[i].join('');
            console.log(land2);
        }
    }
    generateField() {
        let array = [];
        let xAxis = prompt("Enter a Value to Create a Random land: ");
        let yAxis  = prompt("Enter a Value to Create a Random land: "); //promt is getting string value as an input but I need a int.
        xAxis = parseInt(xAxis);
        yAxis = parseInt(yAxis);
        for (let i = 0; i < xAxis ; i++) {
            array.push(new Array(yAxis).fill(fieldCharacter));
        }
        let holeCounter = 0;
        let holeLimit = xAxis;
        
        for (let i = 1 ; i<xAxis ; i++) {
            for (let j = 1 ; j<yAxis ; j++) {
                let randomField = Math.floor(Math.random()*4);
                if (randomField == 2 && holeCounter<=holeLimit) {
                    array[i][j] = hole;
                    holeCounter++
                }
            }
        }
        array[0][0] = pathCharacter;
        let xxx;
        let yyy;
        do { //this must run atleast one time. it controls the hat is in the hole or not.
            xxx = Math.floor(Math.random()*xAxis);
            yyy = Math.floor(Math.random()*yAxis);
        } while (array[xxx][yyy] == hole);
        array[xxx][yyy] = hat;
        console.log('This is your land');
        for (let i = 0 ; i < xAxis ; i++) { //this loop creates a better array for better visuals for gameplay. without these ('') .
            let array1 = array[i].join('');
            console.log(array1);
        }
        this._land = array;
    }

}

//const myFieldVar = new Field([['*', '░', '░', '░', 'O', '░', '░'],['░', '░', 'O', '░', '░', '░', '░'],['░', '░', '░', '^', '░', '░', '░'],['░', '░', '░','O', '░', '░', '░'],['░', '░', '░', '░', '░', '░', '░']]);
const myFieldVar = new Field(); 


const moveMan = (myField) => { //this the game part
    console.log('And Now Its time to play do your move with W,A,S,D for directions');
    console.log(myField.print());
    let currentPosition = myField._land[0][0]; //this is the starting position for searching the hat in the field.
    let initialPositionForX = 0;
    let initialPositionForY = 0;
    while(myField._land[initialPositionForX][initialPositionForY] !== '^') {  // while loop keeps the game running till you found the hat
        let userInput = prompt("Which Way : ");
        if (userInput == "s" || userInput =="S") { //to go down
            if (initialPositionForX < myField._land.length-1) {
                currentPosition = myField._land[initialPositionForX++][initialPositionForY];
            }
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost :( ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') { // first it checks the ground then change the graphic
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else if (userInput == "a" || userInput =="A") { //to go left
            if (initialPositionForY > 0) {
                currentPosition = myField._land[initialPositionForX][initialPositionForY--];
                if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                    console.log("You felt to the hole, You Lost ");
                    return false;
                }
                if (myField._land[initialPositionForX][initialPositionForY] !== '^') { // first it checks the ground then change the graphic
                    myField._land[initialPositionForX][initialPositionForY] = '*';
                }
                myField.print()
            }
        } else if (userInput == "d" || userInput =="D") { //to go right
            if (initialPositionForY <= myField._land.length) {
                currentPosition = myField._land[initialPositionForX][initialPositionForY++];
            }
            
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost :( ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') { // first it checks the ground then change the graphic
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else if (userInput == "W" || userInput =="w") { //to go forward
            if (initialPositionForX > 0) {
                currentPosition = myField._land[initialPositionForX--][initialPositionForY];
            }
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost :( ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') { // first it checks the ground then change the graphic
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else {
            console.log("wrong input to move please use, for up: W , for down: S , for right: R, for left: A  "); //checks the users inputs
        }
    }
    console.log("YOU FOUND THE HAT !!!"); //congratz the player before exiting the game
}


myFieldVar.generateField(); //first call the field function to create the 2D area for game
moveMan(myFieldVar);






