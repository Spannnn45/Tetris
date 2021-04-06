var canvas = document.getElementById("Tetris");
var ctx = canvas.getContext("2d");
var canvasWidth = Math.floor((window.innerWidth/30)-1);
var canvasHeigth = Math.floor((window.innerHeight/30)-1);
console.log(canvasHeigth)

canvas.width = canvasWidth*30;
canvas.height = canvasHeigth*30;

ctx.fillStyle = "#A9A9A9";
ctx.fillRect(0, 0, 1920, 1080);

class Cube {
    constructor(x, y, canvas, color) {
        this.x = x;
        this.y = y;
        this.ctx = canvas;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        this.ctx.strokeRect(this.x*30, this.y*30, 30, 30);
        this.ctx.fillRect(this.x*30, this.y*30, 30, 30);
    }

    moveDown() {
        this.y += 1;
        this.draw();
    }
}

class Iblock {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.ctx = canvas;
        this.shape = [new Cube(x, y-2, canvas, "#add8e6"), new Cube(x, y-1, canvas, "#add8e6"), new Cube(x, y, canvas, "#add8e6"), new Cube(x, y+1, canvas, "#add8e6")]
        this.rotation = 0;
        this.shape.forEach(element => {
            element.draw();
        });
    }

    goLeftRight(goLeft, otherBlocks) {

        var goToSide = true;

        if (goLeft) {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x - 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x -= 1;
                    element.draw();
                });
            }

        } else {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x + 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x += 1;
                    element.draw();
                });
            }
        }
    }

    draw() {
    this.ctx.fillStyle = "#add8e6";
    }

    moveDown(otherBlocks) {
        var goDown = true;
        this.ctx.fillStyle = "#A9A9A9";
        this.y += 1;
        this.shape.forEach((element) => {
            this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
        });
        try {
            this.shape.forEach((element) => {
                otherBlocks.forEach((otherElement) => {
                    otherElement.shape.forEach(otherElementCube => {
                        console.log(otherElementCube.y.toString() + " " + element.y.toString());
                        if (element.x == otherElementCube.x && otherElementCube.y-1 == element.y) {
                            goDown = false;
                            return true;
                        }
                    });            
                });
            });
        } catch (e) {
            goDown = true;
            console.log(e);
        }
        
        this.shape.forEach((element) => {
            if (goDown) {
                element.moveDown()
            } else {
                element.y -= 1;
                element.moveDown(otherBlocks)
            };
        });
    }

    rotateLeft() {
        this.rotateRight()
        this.rotateRight()
        this.rotateRight()
    }

    rotateRight() {
        switch (this.rotation) {
            case 0:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[1].x += 1;
                this.shape[0].x += 2;
                this.shape[0].y += 1;
                this.shape[2].y -= 1;
                this.shape[3].y -= 2;
                this.shape[3].x -= 1;
                this.rotation = 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;

            case 1:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[1].y += 1;
                this.shape[2].x += 1;
                this.shape[0].y += 2;
                this.shape[0].x -= 1;
                this.shape[3].x += 2;
                this.shape[3].y -= 1;
                this.rotation += 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;

            case 2:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[1].x -= 1;
                this.shape[2].y += 1;
                this.shape[0].y -= 1;
                this.shape[0].x -= 2;
                this.shape[3].y += 2;
                this.shape[3].x += 1;
                this.rotation += 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;

            case 3:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[1].y -= 1;
                this.shape[2].x -= 1;
                this.shape[0].y -= 2;
                this.shape[0].x += 1;
                this.shape[3].y += 1;
                this.shape[3].x -= 2;
                this.rotation = 0;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;
            }
    }
}

class Tblock {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.ctx = canvas;
        this.rotation = 0;
        this.shape = [new Cube(x, y+1, canvas, "#6a0dad"), new Cube(x+1, y, canvas, "#6a0dad"), new Cube(x-1, y, canvas, "#6a0dad"), new Cube(x, y, canvas, "#6a0dad")]
        this.shape.forEach(element => {
            element.draw();
        });
        this.rotateRight();
        this.rotateRight();
    }

    rotateRight() {
        switch (this.rotation) {
            case 0:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[0].x -= 1;
                this.shape[0].y -= 1;
                this.shape[1].y += 1;
                this.shape[1].x -= 1;
                this.shape[2].x += 1;
                this.shape[2].y -= 1;
                this.rotation += 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;
            
            case 1:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[0].x += 1;
                this.shape[0].y -= 1;
                this.shape[1].y -= 1;
                this.shape[1].x -= 1;
                this.shape[2].x += 1;
                this.shape[2].y += 1;
                this.rotation += 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;

            case 2:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[0].x += 1;
                this.shape[0].y += 1;
                this.shape[1].y -= 1;
                this.shape[1].x += 1;
                this.shape[2].x -= 1;
                this.shape[2].y += 1;
                this.rotation += 1;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;

            case 3:
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach((element) => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
                });
                this.shape[0].x -= 1;
                this.shape[0].y += 1;
                this.shape[1].y += 1;
                this.shape[1].x += 1;
                this.shape[2].x -= 1;
                this.shape[2].y -= 1;
                this.rotation = 0;
                for(var i = 0; i < this.shape.length; i++) {
                    this.shape[i].draw();
                }
                break;
        }
    }

    draw() {
        this.ctx.fillStyle = "#add8e6";
    }

    goLeftRight(goLeft, otherBlocks) {

        var goToSide = true;

        if (goLeft) {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x - 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x -= 1;
                    element.draw();
                });
            }

        } else {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x + 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x += 1;
                    element.draw();
                });
            }
        }
    }

    moveDown(otherBlocks) {
        var goDown = true;
        this.ctx.fillStyle = "#A9A9A9";
        this.y += 1;
        this.shape.forEach((element) => {
            this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
        });
        try {
            this.shape.forEach((element) => {
                otherBlocks.forEach((otherElement) => {
                    otherElement.shape.forEach(otherElementCube => {
                        console.log(otherElementCube.y.toString() + " " + element.y.toString());
                        if (element.x == otherElementCube.x && otherElementCube.y-1 == element.y) {
                            goDown = false;
                            return true;
                        }
                    });            
                });
            });
        } catch (e) {
            goDown = true;
            console.log(e);
        }
        
        this.shape.forEach((element) => {
            if (goDown) {
                element.moveDown()
            } else {
                element.y -= 1;
                element.moveDown(otherBlocks)
            };
        });
    }
}

class Oblock {

    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.ctx = canvas;
        this.rotation = 0;
        this.shape = [new Cube(x, y, canvas, "#FFFF00"), new Cube(x+1, y, canvas, "#FFFF00"), new Cube(x, y+1, canvas, "#FFFF00"), new Cube(x+1, y+1, canvas, "#FFFF00")]
        this.shape.forEach(element => {
            element.draw();
        });
    }

    rotateRight() {
        console.log("no");
        return "no";
    }

    rotateLeft() {
        console.log("no");
        return "no";
    }

    moveDown(otherBlocks) {
        var goDown = true;
        this.ctx.fillStyle = "#A9A9A9";
        this.y += 1;
        this.shape.forEach((element) => {
            this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32)
        });
        try {
            this.shape.forEach((element) => {
                otherBlocks.forEach((otherElement) => {
                    otherElement.shape.forEach(otherElementCube => {
                        console.log(otherElementCube.y.toString() + " " + element.y.toString());
                        if (element.x == otherElementCube.x && otherElementCube.y-1 == element.y) {
                            goDown = false;
                            return true;
                        }
                    });            
                });
            });
        } catch (e) {
            goDown = true;
            console.log(e);
        }
        
        this.shape.forEach((element) => {
            if (goDown) {
                element.moveDown()
            } else {
                element.y -= 1;
                element.moveDown(otherBlocks)
            };
        });

        return !goDown
    }

    goLeftRight(goLeft, otherBlocks) {

        var goToSide = true;

        if (goLeft) {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x - 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x -= 1;
                    element.draw();
                });
            }

        } else {
            otherBlocks.forEach(element => {
                element.shape.forEach(OtherElement => {
                    this.shape.forEach(ThisElement => {
                        if (OtherElement.x == ThisElement.x + 1 && OtherElement.y == ThisElement.y ) {
                            goToSide = false;
                        }
                    });
                })
            });

            if (goToSide) {
                this.ctx.fillStyle = "#A9A9A9";
                this.shape.forEach(element => {
                    this.ctx.fillRect(element.x*30-1, element.y*30-1, 32, 32);
                });
    
                this.shape.forEach(element => {
                    element.x += 1;
                    element.draw();
                });
            }
        }
    }
}

var blockTypes = [Tblock, Iblock, Oblock];

var number;
var currentBlock;
changeBlock()

var Deadblocks = []
var underLine = false;
var shouldGoDown = true;

function blockMoveDown() {
    currentBlock.shape.forEach((element) => {
        if (element.y >= canvasHeigth-2) {
            underLine = true;
        }
    });

    shouldGoDown = currentBlock.moveDown(Deadblocks);

    if ( shouldGoDown || underLine ) {
        Deadblocks.push(currentBlock);
        changeBlock();
        underLine = false;
    }
}

function changeBlock() {
    number = Math.floor(Math.random() * blockTypes.length)
    currentBlock = new blockTypes[number](10, 0, ctx)
}

window.setInterval(blockMoveDown, 100);