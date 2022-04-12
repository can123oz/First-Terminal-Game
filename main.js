const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


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
        let yAxis  = prompt("Enter a Value to Create a Random land: ");
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
        do {
            xxx = Math.floor(Math.random()*xAxis);
            yyy = Math.floor(Math.random()*yAxis);
        } while (array[xxx][yyy] == hole);
        array[xxx][yyy] = hat;
        console.log('This is your land');
        for (let i = 0 ; i < xAxis ; i++) {
            let array1 = array[i].join('');
            console.log(array1);
        }
        this._land = array;
    }

}

//const myFieldVar = new Field([['*', '░', '░', '░', 'O', '░', '░'],['░', '░', 'O', '░', '░', '░', '░'],['░', '░', '░', '^', '░', '░', '░'],['░', '░', '░','O', '░', '░', '░'],['░', '░', '░', '░', '░', '░', '░']]);
const myFieldVar = new Field();


const moveMan = (myField) => {
    console.log('And Now Its time to play do your move');
    console.log(myField.print());
    let currentPosition = myField._land[0][0];
    let initialPositionForX = 0;
    let initialPositionForY = 0;
    while(myField._land[initialPositionForX][initialPositionForY] !== '^') {
        let userInput = prompt("Which Way : ");
        if (userInput == "d" || userInput =="D") {
            if (initialPositionForX < myField._land.length-1) {
                currentPosition = myField._land[initialPositionForX++][initialPositionForY];
            }
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') {
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else if (userInput == "l" || userInput =="L") {
            if (initialPositionForY > 0) {
                currentPosition = myField._land[initialPositionForX][initialPositionForY--];
                if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                    console.log("You felt to the hole, You Lost ");
                    return false;
                }
                if (myField._land[initialPositionForX][initialPositionForY] !== '^') {
                    myField._land[initialPositionForX][initialPositionForY] = '*';
                }
                myField.print()
            }
        } else if (userInput == "r" || userInput =="R") {
            if (initialPositionForY <= myField._land.length) {
                currentPosition = myField._land[initialPositionForX][initialPositionForY++];
            }
            
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') {
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else if (userInput == "u" || userInput =="U") {
            if (initialPositionForX > 0) {
                currentPosition = myField._land[initialPositionForX--][initialPositionForY];
            }
            if (myField._land[initialPositionForX][initialPositionForY] == hole) {
                console.log("You felt to the hole, You Lost ");
                return false;
            }
            if (myField._land[initialPositionForX][initialPositionForY] !== '^') {
                myField._land[initialPositionForX][initialPositionForY] = '*';
            }
            myField.print()
        } else {
            console.log("wrong input to move ");
        }
    }
    console.log("YOU FOUND THE HAT !!!");
}


myFieldVar.generateField();
moveMan(myFieldVar);






