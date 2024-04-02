const board = document.getElementById("board");
const click = document.getElementById('click');
const boardSize = 8;
let currSelectPiece = null;// It tracks the curr sleted piece.
function createBoard() {

    let whiteSurface = true;

    for (let row = 0; row < boardSize; row++) {

        for (let col = 0; col < boardSize; col++) {

            const span = document.createElement('span');
            span.id = `${row}${col}`;

            // span.textContent = `${row}${col}`;
            if (whiteSurface) {
                span.classList.add('whiteSurface');

                // In order to make white the next first column box.
                whiteSurface = col === boardSize - 1 ? true : false;
            } else {
                span.classList.add('blackSurface');
                // In order to make black the next first column box.
                whiteSurface = col === boardSize - 1 ? false : true;
            }

            board.appendChild(span);

        }
    }
}

createBoard();

function placePieces(piece, loop = false, row, col, pieceColor, title, handleMove) {
    // The base case.
    if (row >= boardSize || col >= boardSize) return;

    const span = document.getElementById(`${row}${col}`);
    const img = document.createElement('img');
    img.addEventListener('click', handleMove);
    img.alt = pieceColor;
    img.title = title;
    img.src = piece;
    span.appendChild(img);

    if (loop) {
        placePieces(piece, loop, row, col + 1, pieceColor, title, handleMove);
    }


}
placePieces('./assests/blackPawn.svg', true, 1, 0, "black", "pawn", handleBlackPawnMove);
placePieces('./assests/blackKnight.svg', false, 0, 1, "black", "knight", handleKnightMove);
placePieces('./assests/blackKnight.svg', false, 0, 6, "black", "knight", handleKnightMove);
placePieces('./assests/blackKing.svg', false, 0, 4, "black", "king", handleKingMove);
placePieces('./assests/blackQueen.svg', false, 0, 3, "black", "queen", handleQueenMove);
placePieces('./assests/blackRook.svg', false, 0, 0, "black", "rook", handleRookMove);
placePieces('./assests/blackRook.svg', false, 0, 7, "black", "rook", handleRookMove);
placePieces('./assests/blackBishop.svg', false, 0, 2, "black", "bishop", handleKingMove);
placePieces('./assests/blackBishop.svg', false, 0, 5, "black", "bishop", handleKingMove);

placePieces('./assests/whitePawn.svg', true, 6, 0, "white", "pawn", handleWhitePawnMove);
placePieces('./assests/whiteknight.svg', false, 7, 6, "white", "knight", handleKnightMove);
placePieces('./assests/whiteknight.svg', false, 7, 1, "white", "knight", handleKnightMove);
placePieces('./assests/whiteKing.svg', false, 7, 4, "white", "king", handleKingMove);
placePieces('./assests/whiteQueen.svg', false, 7, 3, "white", "queen", handleQueenMove);
placePieces('./assests/whiteRook.svg', false, 7, 0, "white", "rook", handleRookMove);
placePieces('./assests/whiteRook.svg', false, 7, 7, "white", "rook", handleRookMove);
placePieces('./assests/whiteBishop.svg', false, 7, 2, "white", "bishop", handleKingMove);
placePieces('./assests/whiteBishop.svg', false, 7, 5, "white", "bishop", handleKingMove);

function cancleAnimation(element, name, time) {
    setTimeout(() => {
        element.classList.remove(name);
    }, time)
}

function removePrevSelectedMarks() {
    const blueMarks = [...document.getElementsByClassName('markBlue')];
    const redMarks = [...document.getElementsByClassName('markRed')];
    blueMarks.forEach((span) => {
        span.classList.remove('markBlue');
    });
    redMarks.forEach((span) => {

        span.classList.remove('markRed');
        span.children[0].style.pointerEvents = 'auto';
        span.removeEventListener('click', handleRedMarkedPiece);
    });
}

// This function marks the blue color path and removes the previous markes.
function handleMoves(e) {

    if (e.target.classList.contains('markBlue')) {
        e.target.appendChild(currSelectPiece);
        e.target.removeEventListener('click', handleMoves);
        removePrevSelectedMarks();
    }

}


// it accepts...............
//  the curr ROW, COL of the piece.
//  the name of the piece like pawn, knight, quenn, king etc.
//  the color of the piece like white || black.
function isCut(row, col, name, color) {
    // Check for pawn piece.
    if (name === 'pawn') {
        if (color === 'white') {
            if (isSafe(row - 1, col - 1)) {

                const left = document.getElementById(`${row - 1}${col - 1}`);

                if (left.children[0] && left.children[0].alt === 'black') {
                    left.classList.add('markRed');
                    left.children[0].style.pointerEvents = 'none';
                    left.addEventListener('click', handleRedMarkedPiece);
                }
            }

            if (isSafe(row - 1, col + 1)) {

                const right = document.getElementById(`${row - 1}${col + 1}`);
                if (right.children[0] && right.children[0].alt === 'black') {
                    right.classList.add('markRed');
                    right.children[0].style.pointerEvents = 'none';
                    right.addEventListener('click', handleRedMarkedPiece);
                }
            }


        } else { // Checking for color black for pawn
            if (isSafe(row + 1, col - 1)) {
                const left = document.getElementById(`${row + 1}${col - 1}`);
                if (left.children[0] && left.children[0].alt === 'white') {
                    left.classList.add('markRed');
                    left.children[0].style.pointerEvents = 'none';
                    left.addEventListener('click', handleRedMarkedPiece);
                }
            }

            if (isSafe(row + 1, col + 1)) {
                const right = document.getElementById(`${row + 1}${col + 1}`);
                if (right.children[0] && right.children[0].alt === 'white') {
                    right.classList.add('markRed');
                    right.children[0].style.pointerEvents = 'none';
                    right.addEventListener('click', handleRedMarkedPiece);
                }
            }
        }

    } else if (name === 'knight') {

        if (color === 'white') {

            // Check for topLeft
            if (isSafe(row - 2, col - 1)) {

                const topLeft = document.getElementById(`${row - 2}${col - 1}`);

                if (topLeft.children[0] && topLeft.children[0].alt === 'black') {
                    topLeft.classList.add('markRed');
                    topLeft.children[0].style.pointerEvents = 'none';
                    topLeft.addEventListener('click', handleRedMarkedPiece);
                }

            }
            // Check for topRight
            if (isSafe(row - 2, col + 1)) {

                const topRight = document.getElementById(`${row - 2}${col + 1}`);

                if (topRight.children[0] && topRight.children[0].alt === 'black') {
                    topRight.classList.add('markRed');
                    topRight.children[0].style.pointerEvents = 'none';
                    topRight.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for leftTop
            if (isSafe(row - 1, col - 2)) {

                const leftTop = document.getElementById(`${row - 1}${col - 2}`);

                if (leftTop.children[0] && leftTop.children[0].alt === 'black') {
                    leftTop.classList.add('markRed');

                    leftTop.children[0].style.pointerEvents = 'none';
                    leftTop.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for leftBottom
            if (isSafe(row + 1, col - 2)) {

                const leftBottom = document.getElementById(`${row + 1}${col - 2}`);

                if (leftBottom.children[0] && leftBottom.children[0].alt === 'black') {
                    leftBottom.classList.add('markRed');
                    leftBottom.children[0].style.pointerEvents = 'none';
                    leftBottom.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for rightTop
            if (isSafe(row - 1, col + 2)) {

                const rightTop = document.getElementById(`${row - 1}${col + 2}`);

                if (rightTop.children[0] && rightTop.children[0].alt === 'black') {
                    rightTop.classList.add('markRed');
                    rightTop.children[0].style.pointerEvents = 'none';
                    rightTop.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for rightBottom
            if (isSafe(row + 1, col + 2)) {

                const rightBottom = document.getElementById(`${row + 1}${col + 2}`);

                if (rightBottom.children[0] && rightBottom.children[0].alt === 'black') {
                    rightBottom.classList.add('markRed');
                    rightBottom.children[0].style.pointerEvents = 'none';
                    rightBottom.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for bottomLeft
            if (isSafe(row + 2, col - 1)) {

                const bottomLeft = document.getElementById(`${row + 2}${col - 1}`);

                if (bottomLeft.children[0] && bottomLeft.children[0].alt === 'black') {
                    bottomLeft.classList.add('markRed');
                    bottomLeft.children[0].style.pointerEvents = 'none';
                    bottomLeft.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for bottomRight
            if (isSafe(row + 2, col + 1)) {

                const bottomRight = document.getElementById(`${row + 2}${col + 1}`);

                if (bottomRight.children[0] && bottomRight.children[0].alt === 'black') {
                    bottomRight.classList.add('markRed');
                    bottomRight.children[0].style.pointerEvents = 'none';
                    bottomRight.addEventListener('click', handleRedMarkedPiece);
                }

            }
        } else {

            // Check for topLeft
            if (isSafe(row - 2, col - 1)) {

                const topLeft = document.getElementById(`${row - 2}${col - 1}`);

                if (topLeft.children[0] && topLeft.children[0].alt === 'white') {
                    topLeft.classList.add('markRed');
                    topLeft.children[0].style.pointerEvents = 'none';
                    topLeft.addEventListener('click', handleRedMarkedPiece);
                }

            }
            // Check for topRight
            if (isSafe(row - 2, col + 1)) {

                const topRight = document.getElementById(`${row - 2}${col + 1}`);

                if (topRight.children[0] && topRight.children[0].alt === 'white') {
                    topRight.classList.add('markRed');
                    topRight.children[0].style.pointerEvents = 'none';
                    topRight.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for leftTop
            if (isSafe(row - 1, col - 2)) {

                const leftTop = document.getElementById(`${row - 1}${col - 2}`);

                if (leftTop.children[0] && leftTop.children[0].alt === 'white') {
                    leftTop.classList.add('markRed');

                    leftTop.children[0].style.pointerEvents = 'none';
                    leftTop.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for leftBottom
            if (isSafe(row + 1, col - 2)) {

                const leftBottom = document.getElementById(`${row + 1}${col - 2}`);

                if (leftBottom.children[0] && leftBottom.children[0].alt === 'white') {
                    leftBottom.classList.add('markRed');
                    leftBottom.children[0].style.pointerEvents = 'none';
                    leftBottom.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for rightTop
            if (isSafe(row - 1, col + 2)) {

                const rightTop = document.getElementById(`${row - 1}${col + 2}`);

                if (rightTop.children[0] && rightTop.children[0].alt === 'white') {
                    rightTop.classList.add('markRed');
                    rightTop.children[0].style.pointerEvents = 'none';
                    rightTop.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for rightBottom
            if (isSafe(row + 1, col + 2)) {

                const rightBottom = document.getElementById(`${row + 1}${col + 2}`);

                if (rightBottom.children[0] && rightBottom.children[0].alt === 'white') {
                    rightBottom.classList.add('markRed');
                    rightBottom.children[0].style.pointerEvents = 'none';
                    rightBottom.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for bottomLeft
            if (isSafe(row + 2, col - 1)) {

                const bottomLeft = document.getElementById(`${row + 2}${col - 1}`);

                if (bottomLeft.children[0] && bottomLeft.children[0].alt === 'white') {
                    bottomLeft.classList.add('markRed');
                    bottomLeft.children[0].style.pointerEvents = 'none';
                    bottomLeft.addEventListener('click', handleRedMarkedPiece);
                }

            } // Check for bottomRight
            if (isSafe(row + 2, col + 1)) {

                const bottomRight = document.getElementById(`${row + 2}${col + 1}`);

                if (bottomRight.children[0] && bottomRight.children[0].alt === 'white') {
                    bottomRight.classList.add('markRed');
                    bottomRight.children[0].style.pointerEvents = 'none';
                    bottomRight.addEventListener('click', handleRedMarkedPiece);
                }

            }

        }
    }
}
// Only check boundry.
function isSafe(row, col) {
    if (row < boardSize && col < boardSize && row >= 0 && col >= 0) return true;
    return false;
}

function handleRedMarkedPiece(e) {
    const child = e.target.children[0];
    const parent = e.target;
    parent.removeChild(child);
    parent.appendChild(currSelectPiece);
    removePrevSelectedMarks();
}

// ############## Handles all pieces moves here. Put on the images only. ###################


// This function mark the blue color for black pawn. If path is empty.
// Black Pawn.
function handleBlackPawnMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);
    const firstStep = document.getElementById(`${row + 1}${col}`);
    const secondStep = document.getElementById(`${row + 2}${col}`);
    isCut(row, col, curr.title, curr.alt);
    if (row === 1) {
        if (isSafe(row + 1, col)) {
            // If doesn't have any piece over the below path.
            if (!firstStep.children[0]) {
                firstStep.classList.add('markBlue');
                firstStep.addEventListener('click', handleMoves);

            }
            if (!secondStep.children[0]) {

                secondStep.classList.add('markBlue');
                secondStep.addEventListener('click', handleMoves);
            }
        }
    } else {
        if (isSafe(row + 1, col)) {
            if (!firstStep.children[0]) {
                firstStep.classList.add('markBlue');
                firstStep.addEventListener('click', handleMoves);
            }
        }
    }

}

// White Pawn
function handleWhitePawnMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);
    const firstStep = document.getElementById(`${row - 1}${col}`);
    const secondStep = document.getElementById(`${row - 2}${col}`);
    isCut(row, col, curr.title, curr.alt);
    if (row === 6) {
        if (isSafe(row - 1, col)) {
            // If doesn't have any piece over the below path.
            if (!firstStep.children[0]) {
                firstStep.classList.add('markBlue');
                firstStep.addEventListener('click', handleMoves);

            }
            if (!secondStep.children[0]) {

                secondStep.classList.add('markBlue');
                secondStep.addEventListener('click', handleMoves);
            }
        }
    } else {
        if (isSafe(row - 1, col)) {
            if (!firstStep.children[0]) {
                firstStep.classList.add('markBlue');
                firstStep.addEventListener('click', handleMoves);
            }
        }
    }

}

// Knight piece move.
function handleKnightMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);
    isCut(row, col, curr.title, curr.alt);

    // Check for topLeft
    if (isSafe(row - 2, col - 1)) {

        const topLeft = document.getElementById(`${row - 2}${col - 1}`);

        if (!topLeft.children[0]) {
            topLeft.classList.add('markBlue');
            topLeft.addEventListener('click', handleMoves);
        }

    }
    // Check for topRight
    if (isSafe(row - 2, col + 1)) {

        const topRight = document.getElementById(`${row - 2}${col + 1}`);

        if (!topRight.children[0]) {
            topRight.classList.add('markBlue');
            topRight.addEventListener('click', handleMoves);
        }

    } // Check for leftTop
    if (isSafe(row - 1, col - 2)) {

        const leftTop = document.getElementById(`${row - 1}${col - 2}`);

        if (!leftTop.children[0]) {
            leftTop.classList.add('markBlue');
            leftTop.addEventListener('click', handleMoves);
        }

    } // Check for leftBottom
    if (isSafe(row + 1, col - 2)) {

        const leftBottom = document.getElementById(`${row + 1}${col - 2}`);

        if (!leftBottom.children[0]) {
            leftBottom.classList.add('markBlue');
            leftBottom.addEventListener('click', handleMoves);
        }

    } // Check for rightTop
    if (isSafe(row - 1, col + 2)) {

        const rightTop = document.getElementById(`${row - 1}${col + 2}`);

        if (!rightTop.children[0]) {
            rightTop.classList.add('markBlue');
            rightTop.addEventListener('click', handleMoves);
        }

    } // Check for rightBottom
    if (isSafe(row + 1, col + 2)) {

        const rightBottom = document.getElementById(`${row + 1}${col + 2}`);

        if (!rightBottom.children[0]) {
            rightBottom.classList.add('markBlue');
            rightBottom.addEventListener('click', handleMoves);
        }

    } // Check for bottomLeft
    if (isSafe(row + 2, col - 1)) {

        const bottomLeft = document.getElementById(`${row + 2}${col - 1}`);

        if (!bottomLeft.children[0]) {
            bottomLeft.classList.add('markBlue');
            bottomLeft.addEventListener('click', handleMoves);
        }

    } // Check for bottomRight
    if (isSafe(row + 2, col + 1)) {

        const bottomRight = document.getElementById(`${row + 2}${col + 1}`);

        if (!bottomRight.children[0]) {
            bottomRight.classList.add('markBlue');
            bottomRight.addEventListener('click', handleMoves);
        }

    }

}

// King move 
function handleKingMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);

    // Top row moves.
    let tempRow = row - 1, tempCol = col - 1;

    for (let count = 1; count <= 3; count++) {
        if (isSafe(tempRow, tempCol)) {
            const path = document.getElementById(`${tempRow}${tempCol}`);
            if (!path.children[0]) {
                path.classList.add('markBlue');
                path.addEventListener('click', handleMoves);
            }
        }
        tempCol++;
    }

    // Bottom row moves.
    tempRow = row + 1, tempCol = col - 1;

    for (let count = 1; count <= 3; count++) {
        if (isSafe(tempRow, tempCol)) {
            const path = document.getElementById(`${tempRow}${tempCol}`);
            if (!path.children[0]) {
                path.classList.add('markBlue');
                path.addEventListener('click', handleMoves);
            }
        }
        tempCol++;
    }

    // Single left move.
    if (isSafe(row, col - 1)) {
        const path = document.getElementById(`${row}${col - 1}`);
        if (!path.children[0]) {
            path.classList.add('markBlue');
            path.addEventListener('click', handleMoves);
        }
    }

    // Single right;
    if (isSafe(row, col + 1)) {
        const path = document.getElementById(`${row}${col + 1}`);
        if (!path.children[0]) {
            path.classList.add('markBlue');
            path.addEventListener('click', handleMoves);
        }
    }
}

function handleQueenMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);

    //  Left, topLeftRow, bottomLeftRow mark
    let topLeftRow = row - 1, bottomLeftRow = row + 1, stopLeft = false;
    for (let i = col - 1; i >= 0; i--) {

        if (isSafe(row, i) && !stopLeft) {
            const left = document.getElementById(`${row}${i}`);
            if (!left.children[0]) {
                left.classList.add('markBlue');
                left.addEventListener('click', handleMoves);
            } else if (left.children[0] && left.children[0].alt === 'black' && currSelectPiece.alt === 'white') {

                left.classList.add('markRed');
                left.children[0].style.pointerEvents = 'none';
                left.addEventListener('click', handleRedMarkedPiece);
                stopLeft = true;
            } else if (left.children[0] && left.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                left.classList.add('markRed');
                left.children[0].style.pointerEvents = 'none';
                left.addEventListener('click', handleRedMarkedPiece);
                stopLeft = true;
            } else {
                stopLeft = true;
            }
        }
        if (isSafe(topLeftRow, i)) {
            const topLeft = document.getElementById(`${topLeftRow}${i}`);

            if (!topLeft.children[0]) {
                topLeft.classList.add('markBlue');
                topLeft.addEventListener('click', handleMoves);
                topLeftRow--;
            } else if (topLeft.children[0] && topLeft.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                topLeft.classList.add('markRed');
                topLeft.children[0].style.pointerEvents = 'none';
                topLeft.addEventListener('click', handleRedMarkedPiece);
                topLeftRow = -1;
            } else if (topLeft.children[0] && topLeft.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                topLeft.classList.add('markRed');
                topLeft.children[0].style.pointerEvents = 'none';
                topLeft.addEventListener('click', handleRedMarkedPiece);
                topLeftRow = -1;
            } else {
                topLeftRow = -1;
            }
        }
        if (isSafe(bottomLeftRow, i)) {
            const bottomLeft = document.getElementById(`${bottomLeftRow}${i}`);

            if (!bottomLeft.children[0]) {
                bottomLeft.classList.add('markBlue');
                bottomLeft.addEventListener('click', handleMoves);
                bottomLeftRow++;
            } else if (bottomLeft.children[0] && bottomLeft.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                bottomLeft.classList.add('markRed');
                bottomLeft.children[0].style.pointerEvents = 'none';
                bottomLeft.addEventListener('click', handleRedMarkedPiece);
                bottomLeftRow = -1;
            } else if (bottomLeft.children[0] && bottomLeft.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                bottomLeft.classList.add('markRed');
                bottomLeft.children[0].style.pointerEvents = 'none';
                bottomLeft.addEventListener('click', handleRedMarkedPiece);
                bottomLeftRow = -1;
            } else {
                bottomLeftRow = -1;
            }
        }



    }
    //  Right, topRightRow, bottomRightRow mark
    let topRightRow = row - 1, bottomRightRow = row + 1, stopRight = false;

    for (let i = col + 1; i < boardSize; i++) {
        // check if under the boundry and doesn't appear any piece yet.
        if (isSafe(row, i) && !stopRight) {
            const right = document.getElementById(`${row}${i}`);
            if (!right.children[0]) {
                right.classList.add('markBlue');
                right.addEventListener('click', handleMoves);
            } else if (right.children[0] && right.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                right.classList.add('markRed');
                right.children[0].style.pointerEvents = 'none';
                right.addEventListener('click', handleRedMarkedPiece);
                stopRight = true;
            } else if (right.children[0] && right.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                right.classList.add('markRed');
                right.children[0].style.pointerEvents = 'none';
                right.addEventListener('click', handleRedMarkedPiece);
                stopRight = true;
            } else {
                stopRight = true;
            }
        }
        if (isSafe(topRightRow, i)) {
            const topRight = document.getElementById(`${topRightRow}${i}`);
            if (!topRight.children[0]) {
                topRight.classList.add('markBlue');
                topRight.addEventListener('click', handleMoves);
                topRightRow--;
            } else if (topRight.children[0] && topRight.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                topRight.classList.add('markRed');
                topRight.children[0].style.pointerEvents = 'none';
                topRight.addEventListener('click', handleRedMarkedPiece);
                topRightRow = boardSize;
            } else if (topRight.children[0] && topRight.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                topRight.classList.add('markRed');
                topRight.children[0].style.pointerEvents = 'none';
                topRight.addEventListener('click', handleRedMarkedPiece);
                topRightRow = boardSize;
            } else {
                topRightRow = boardSize;
            }
        }
        if (isSafe(bottomRightRow, i)) {
            const bottomRight = document.getElementById(`${bottomRightRow}${i}`);
            if (!bottomRight.children[0]) {
                bottomRight.classList.add('markBlue');
                bottomRight.addEventListener('click', handleMoves);
                bottomRightRow++;
            } else if (bottomRight.children[0] && bottomRight.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                bottomRight.classList.add('markRed');
                bottomRight.children[0].style.pointerEvents = 'none';
                bottomRight.addEventListener('click', handleRedMarkedPiece);
                bottomRightRow = boardSize;
            } else if (bottomRight.children[0] && bottomRight.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                bottomRight.classList.add('markRed');
                bottomRight.children[0].style.pointerEvents = 'none';
                bottomRight.addEventListener('click', handleRedMarkedPiece);
                bottomRightRow = boardSize;
            } else {
                bottomRightRow = boardSize
            }
        }
    }

    // top vertical row.
    let topVerticalRow = row - 1;
    for (; topVerticalRow >= 0; topVerticalRow--) {
        if (isSafe(topVerticalRow, col)) {
            const top = document.getElementById(`${topVerticalRow}${col}`);
            if (!top.children[0]) {
                top.classList.add('markBlue');
                top.addEventListener('click', handleMoves);
            } else if (top.children[0] && top.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                top.classList.add('markRed');
                top.children[0].style.pointerEvents = 'none';
                top.addEventListener('click', handleRedMarkedPiece);
                topVerticalRow = -1;
            } else if (top.children[0] && top.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                top.classList.add('markRed');
                top.children[0].style.pointerEvents = 'none';
                top.addEventListener('click', handleRedMarkedPiece);
                topVerticalRow = -1;
            } else {
                topVerticalRow = -1;
            }
        }
    }
    // Bottom vertical row;
    let bottomVerticalRow = row + 1;
    for (; bottomVerticalRow < boardSize; bottomVerticalRow++) {
        if (isSafe(bottomVerticalRow, col)) {
            const bottom = document.getElementById(`${bottomVerticalRow}${col}`);
            if (!bottom.children[0]) {
                bottom.classList.add('markBlue');
                bottom.addEventListener('click', handleMoves);
            } else if (bottom.children[0] && bottom.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                bottom.classList.add('markRed');
                bottom.children[0].style.pointerEvents = 'none';
                bottom.addEventListener('click', handleRedMarkedPiece);
                bottomVerticalRow = boardSize;
            } else if (bottom.children[0] && bottom.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                bottom.classList.add('markRed');
                bottom.children[0].style.pointerEvents = 'none';
                bottom.addEventListener('click', handleRedMarkedPiece);
                bottomVerticalRow = boardSize;
            } else {
                bottomVerticalRow = boardSize;
            }
        }
    }
}

function handleRookMove(e) {
    const curr = e.target;
    currSelectPiece = curr;
    click.play();
    removePrevSelectedMarks();
    const parent = e.target.parentElement;
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);

    // Top move 
    let topRow = row - 1;
    for (; topRow >= 0; topRow--) {

        if (isSafe(topRow, col)) {
            const top = document.getElementById(`${topRow}${col}`);
            if (!top.children[0]) {
                top.classList.add('markBlue');
                top.addEventListener('click', handleMoves);
            } else if (top.children[0] && top.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                top.classList.add('markRed');
                top.children[0].style.pointerEvents = 'none';
                top.addEventListener('click', handleRedMarkedPiece);
                topRow = -1;
            } else if (top.children[0] && top.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                top.classList.add('markRed');
                top.children[0].style.pointerEvents = 'none';
                top.addEventListener('click', handleRedMarkedPiece);
                topRow = -1;
            } else {
                topRow = -1;
            }
        }
    }

    // Right move 
    let rightCol = col + 1;
    for (; rightCol < boardSize; rightCol++) {

        if (isSafe(row, rightCol)) {
            const right = document.getElementById(`${row}${rightCol}`);

            if (!right.children[0]) {
                right.classList.add('markBlue');
                right.addEventListener('click', handleMoves);
            } else if (right.children[0] && right.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                right.classList.add('markRed');
                right.children[0].style.pointerEvents = 'none';
                right.addEventListener('click', handleRedMarkedPiece);
                rightCol = boardSize;
            } else if (right.children[0] && right.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                right.classList.add('markRed');
                right.children[0].style.pointerEvents = 'none';
                right.addEventListener('click', handleRedMarkedPiece);
                rightCol = boardSize;
            } else {
                rightCol = boardSize;
            }
        }
    }
    // Bottom move 
    let bottomRow = row + 1;
    for (; bottomRow < boardSize; bottomRow++) {

        if (isSafe(bottomRow, col)) {
            const bottom = document.getElementById(`${bottomRow}${col}`);
            if (!bottom.children[0]) {
                bottom.classList.add('markBlue');
                bottom.addEventListener('click', handleMoves);
            } else if (bottom.children[0] && bottom.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                bottom.classList.add('markRed');
                bottom.children[0].style.pointerEvents = 'none';
                bottom.addEventListener('click', handleRedMarkedPiece);
                bottomRow = boardSize;
            } else if (bottom.children[0] && bottom.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                bottom.classList.add('markRed');
                bottom.children[0].style.pointerEvents = 'none';
                bottom.addEventListener('click', handleRedMarkedPiece);
                bottomRow = boardSize;
            } else {
                bottomRow = boardSize;
            }
        }
    }
    // left move 
    let leftCol = col - 1;
    for (; leftCol >= 0; leftCol--) {

        if (isSafe(row, leftCol)) {
            const left = document.getElementById(`${row}${leftCol}`);
            if (!left.children[0]) {
                left.classList.add('markBlue');
                left.addEventListener('click', handleMoves);
            } else if (left.children[0] && left.children[0].alt === 'white' && currSelectPiece.alt === 'black') {
                left.classList.add('markRed');
                left.children[0].style.pointerEvents = 'none';
                left.addEventListener('click', handleRedMarkedPiece);
                leftCol = -1;
            } else if (left.children[0] && left.children[0].alt === 'black' && currSelectPiece.alt === 'white') {
                left.classList.add('markRed');
                left.children[0].style.pointerEvents = 'none';
                left.addEventListener('click', handleRedMarkedPiece);
                leftCol = -1;
            } else {
                leftCol = -1;
            }
        }
    }
}