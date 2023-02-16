 const game = {
                w: 800,
                h: 600,
                color: "#fff",
                show() {
                    this.elem = document.getElementById("game")
                    this.elem.style.width = this.w + "px"
                    this.elem.style.height = this.h + "px"
                    this.elem.style.background = this.color
                },
                create() {
                    let div = document.createElement("div")
                    div.id = "game"
                    document.body.append(div)
                    this.show()
                },
                over() {
                    clearInterval(start)
                    this.elem.innerHTML = "GAME OVER !!!!"
                    this.color = "#000"
                    this.show()
                    this.elem.style.display = "flex"
                    this.elem.style.justifyContent = "center"
                    this.elem.style.alignItems = "center"
                    this.elem.style.font = "bold 5em Arial"
                    this.elem.style.color = "yellow"
                },
                win(){
                    clearInterval(start)
                    this.elem.innerHTML = "You are WINNER !!!!"
                    this.color = "#000"
                    this.show()
                    this.elem.style.display = "flex"
                    this.elem.style.justifyContent = "center"
                    this.elem.style.alignItems = "center"
                    this.elem.style.font = "bold 5em Arial"
                    this.elem.style.color = "green"
                }
            }
            const ball = {
                w: 30,
                h: 30,
                color: 'red',
                x: 0,
                y: 0,
                dx: 10,
                dy: -10,
                move() {
                    if( ball.x < 0 || ball.x > game.w - ball.w) ball.dx *= -1
                    if( ball.y < 0 || 
                        (ball.y > game.h - bar.y - bar.h - ball.h) && (ball.x + ball.w / 2 > bar.x) && (ball.x + ball.w / 2 < bar.x + bar.w)) ball.dy *= -1
                    if (ball.y > game.h - ball.h) game.over()
                    bricks.collision()
                    ball.x += ball.dx
                    ball.y += ball.dy
                    ball.show()
                },
                show(state = 0) {
                    if(state){
                        ball.elem = document.getElementById("ball")
                        ball.elem.style.width = ball.w + "px"
                        ball.elem.style.height = ball.h + "px"
                        ball.elem.style.borderRadius = '50%'
                        ball.elem.style.background = ball.color
                    }
                    ball.elem.style.left = ball.x + "px"
                    ball.elem.style.top = ball.y + "px"
                },
                create() {                    
                    let div = document.createElement("div")
                    div.id = "ball"
                    game.elem.append(div)
                    ball.y = game.h - bar.y - bar.h - ball.h
                    this.show(1)
                    
                }
            }
            const bar = {
                x: 0,
                y: 5,
                w: 150,
                h: 10,
                color: 'blue',
                move(e) {
                    if(e.type == 'keydown') {
                        if(e.keyCode == 37) bar.x -= 10
                        if(e.keyCode == 39) bar.x += 10
                    } else {
                        bar.x = e.pageX - game.elem.offsetLeft - 75
                    }
                    if (bar.x < 0) bar.x = 0
                    if (bar.x > 650) bar.x = 650
                    bar.show()
                },
                show() {
                    bar.elem = document.getElementById("bar")
                    bar.elem.style.width = bar.w + "px"
                    bar.elem.style.height = bar.h + "px"
                    bar.elem.style.background = bar.color
                    bar.elem.style.left = bar.x + "px"
                    bar.elem.style.bottom = bar.y + "px"
                },
                create() {
                    let div = document.createElement("div")
                    div.id = "bar"
                    game.elem.append(div)
                    this.show()
                }
            }
            const bricks = {
                row: 3,
                col: 5,
                color: "orange",
                gap: 10,
                arr: [],
                create() {
                    for(let i = 0; i < this.row; i++) {
                        for(let j = 0; j < this.col; j++) { 
                            let brick = new function() {
                                this.id = `b${i}${j}`
                                this.w = (game.w - bricks.gap * (bricks.col + 1)) / bricks.col
                                this.h = this.w / 5
                                this.x = (j + 1) * bricks.gap + j * this.w
                                this.y = (i + 1) * bricks.gap + i * this.h
                                this.color = bricks.color
                                this.status = true 
                            }
                            brickk = brick
                            bricks.arr.push(brick) 
                            let div = document.createElement("div")
                            div.id = `b${i}${j}`
                            game.elem.append(div)                          
                        }
                    }
                    this.show()
                },
                show() {
                    for(let i = 0; i < this.arr.length; i++) {
                        let brick = this.arr[i]
                        if (brick.status){
                            brick.elem = document.getElementById(brick.id)
                            brick.elem.style.width = brick.w + "px"
                            brick.elem.style.height = brick.h + "px"
                            brick.elem.style.background = brick.color
                            brick.elem.style.left = brick.x + "px"
                            brick.elem.style.top = brick.y + "px"
                        }else{
                            brick.elem = document.getElementById(brick.id)
                            brick.w = 0
                            brick.y = 0
                            brick.elem.style.width = "0px"
                            brick.elem.style.height = "0px"
                        }
                    }
                },
                collision() {
                
                    for (let i = 0; i < this.arr.length; i++) {
                            if(ball.y-30 < bricks.arr[i].y && (ball.x + ball.w / 2 > this.arr[i].x) && (ball.x + ball.w / 2 < this.arr[i].x + this.arr[i].w) ){
                                this.arr[i].status = false
                                ball.dy *= -1
                                n++
                                this.show()
                                if(n==15)game.win()
                                break;
                            }
                    }
                }
            }
            let n = 0
            game.create()
            ball.create()
            bar.create()
            bricks.create()
            let start = setInterval(ball.move, 40)
            document.onkeydown = bar.move
            game.elem.onmousemove = bar.move