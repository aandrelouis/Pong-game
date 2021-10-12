import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/Jogo.module.css'
import brain from 'brain.js/src/index'
import treino from './treino.json'

export function Jogo(props){
    const canvasRef = useRef(null)
    const [scoreMachine, setScoreMachine] = useState(0); 
    const [scoreHuman,setScoreHuman] = useState(0);
    var velPaddle;
    var paddleHeight;
    var paddleWidth;
    var comeco;
    var paddleRightY;
    var paddleRightX;
    var upPressedPaddleRight;
    var downPressedPaddleRight;
    var paddleLeftY;
    var paddleLeftX ;
    var upPressedPaddleLeft ;
    var downPressedPaddleLeft;
    var ballRadius;
    var velBall;
    var velPadrao;
    var levelIA;
    var tempoReacao;
    var points= 0;

    useEffect(() => { 
         //------- CONFIGURAÇÕES DO CANVAS -------
         var canvas = canvasRef.current;
         var width = canvas.width;
         var height = canvas.height;
         var ctx = canvas.getContext("2d");
         var color = "white"
         var scoreMaquina = 0;
         var scorePerson = 0;
    

        if(props.level === 0){
            //------- CONFIGURAÇÕES DOS PADDLES -------
            velPaddle = 10;
            paddleHeight = 100;
            paddleWidth = 10;
            comeco = 1;

            //------- CONFIGURAÇÕES DO PADDLE DA DIREITA -------
            paddleRightY = (height - paddleHeight) / 2;
            paddleRightX = width - 20 - paddleWidth;
            upPressedPaddleRight = false;
            downPressedPaddleRight = false;

            //------- CONFIGURAÇÕES DO PADDLE DA ESQUERDA -------
            paddleLeftY = (height - paddleHeight) / 2;
            paddleLeftX = 20;
            upPressedPaddleLeft = false;
            downPressedPaddleLeft = false;
            tempoReacao = 2;

            //------- CONFIGURAÇÕES DA BOLINHA -------
            ballRadius = 10;
            velBall = 3;
            velPadrao = 3;  

            levelIA = 10;
            points = 5;

        }else if(props.level === 1){
            //------- CONFIGURAÇÕES DOS PADDLES -------
            velPaddle = 10;
            paddleHeight = 75;
            paddleWidth = 9;
            comeco = 1;

            //------- CONFIGURAÇÕES DO PADDLE DA DIREITA -------
            paddleRightY = (height - paddleHeight) / 2;
            paddleRightX = width - 20 - paddleWidth;
            upPressedPaddleRight = false;
            downPressedPaddleRight = false;

            //------- CONFIGURAÇÕES DO PADDLE DA ESQUERDA -------
            paddleLeftY = (height - paddleHeight) / 2;
            paddleLeftX = 20;
            upPressedPaddleLeft = false;
            downPressedPaddleLeft = false;

            //------- CONFIGURAÇÕES DA BOLINHA -------
            ballRadius = 10;
            velBall = 5;
            velPadrao = 5;

            levelIA = 2;
            tempoReacao = 2;
            points = 15;

        }else if(props.level === 2){
            //------- CONFIGURAÇÕES DOS PADDLES -------
            velPaddle = 12;
            paddleHeight = 60;
            paddleWidth = 7;
            comeco = 1;

            //------- CONFIGURAÇÕES DO PADDLE DA DIREITA -------
            paddleRightY = (height - paddleHeight) / 2;
            paddleRightX = width - 20 - paddleWidth;
            upPressedPaddleRight = false;
            downPressedPaddleRight = false;

            //------- CONFIGURAÇÕES DO PADDLE DA ESQUERDA -------
            paddleLeftY = (height - paddleHeight) / 2;
            paddleLeftX = 20;
            upPressedPaddleLeft = false;
            downPressedPaddleLeft = false;

            //------- CONFIGURAÇÕES DA BOLINHA -------
            ballRadius = 10;
            velBall = 7;
            velPadrao = 7;

            levelIA = 1;
            tempoReacao = 1.5
            points = 50;

        }else{
            //------- CONFIGURAÇÕES DOS PADDLES -------
            velPaddle = 15;
            paddleHeight = 40;
            paddleWidth = 5;
            comeco = 1;

            //------- CONFIGURAÇÕES DO PADDLE DA DIREITA -------
            paddleRightY = (height - paddleHeight) / 2;
            paddleRightX = width - 20 - paddleWidth;
            upPressedPaddleRight = false;
            downPressedPaddleRight = false;

            //------- CONFIGURAÇÕES DO PADDLE DA ESQUERDA -------
            paddleLeftY = (height - paddleHeight) / 2;
            paddleLeftX = 20;
            upPressedPaddleLeft = false;
            downPressedPaddleLeft = false;

            //------- CONFIGURAÇÕES DA BOLINHA -------
            ballRadius = 10;
            velBall = 15;
            velPadrao = 15;

            levelIA = 100;
            tempoReacao = 1;
            points = 100;
        }

        //------- CONFIGURAÇÕES DA IA -------
        const network = new brain.NeuralNetwork()
        network.fromJSON(treino)
        
    
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function getRandomIntBola(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var aux = Math.floor(Math.random() * (max - min)) + min;

            if (aux < 0) {
                return -1;
            } else if (aux > 0) {
                return 1;
            } else {
                return 0;
            }
        }

        function getNegative() {
            var min = 0;
            var max = 9;
            var res;
            min = Math.ceil(min);
            max = Math.floor(max);
            res = Math.floor(Math.random() * (max - min)) + min;
            if (res < 5) {
                return 1;
            } else {
                return -1;
            }
        }

        var x = width / 2; // posição x da bola
        var y = height - (getRandomInt(0, height));  // posição y da bola
        var dx = velBall;  // deslocamento x da bola
        var dy = velBall * getNegative();  // deslocamento y da bola


        //------- EVENTOS DE TECLAS -------
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);


        function keyDownHandler(e) {
            //------- BARRA DA DIREITA -------
            if (e.key == "Up" || e.key == "ArrowUp") {
                upPressedPaddleRight = true;

            }
            else if (e.key == "Down" || e.key == "ArrowDown") {
                downPressedPaddleRight = true;
            }

        }

        function keyUpHandler(e) {
            //------- BARRA DA DIREITA -------
            if (e.key == "Up" || e.key == "ArrowUp") {
                upPressedPaddleRight = false;
            }
            else if (e.key == "Down" || e.key == "ArrowDown") {
                downPressedPaddleRight = false;
            }

        }


        function drawBall() {
            //Desenha a bolinha
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            //Desenha a barrinha esquerda
            ctx.beginPath();
            ctx.rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();


            //Desenha a barrinha direita
            ctx.beginPath();
            ctx.rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        function movePaddle() {
            const result = network.run({ bolaY: y, paddleY: (paddleLeftY + (paddleHeight / levelIA)) })

            if (dx < 0 && x < width/tempoReacao) {
                if (Object.values(result)[0] >= Object.values(result)[1]) {
                    downPressedPaddleLeft = false;
                    upPressedPaddleLeft = true;
                } else if (Object.values(result)[0] <= Object.values(result)[1]) {
                    upPressedPaddleLeft = false;
                    downPressedPaddleLeft = true;
                }
            } else {
                upPressedPaddleLeft = false;
                downPressedPaddleLeft = false;
            }
        }

        function drawLine() {
            //Desenha a barrinha esquerda
            ctx.beginPath();
            ctx.rect((width / 2) + 2, 0, 2, 700);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        function resetBall() {
            x = width / 2;
            y = height - (getRandomInt(0, height));
            velBall = velPadrao;
            if (comeco == 1) {
                dx = velBall;
            } else {
                dx = -velBall;
            }

            dy = velBall * getNegative();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            movePaddle()
            drawBall();
            drawPaddle();
            drawLine()

            if (y + dy > height - ballRadius || y + dy < ballRadius) {
                dy = -dy;
            }
            else if (x + dx > canvas.width - ballRadius - 20) {
                if (y > paddleRightY && y < paddleRightY + paddleHeight && x >= paddleRightX - 40) {
                    dx = -dx;
                    velBall += 0.2;
                    dy = velBall * getRandomIntBola(-5, 5);

                }
                else if (x + dx > canvas.width - ballRadius + 20) {       
                    scoreMaquina++;
                    setScoreMachine(scoreMaquina)
                    comeco = 1;     
                    if(scoreMaquina == points){
                        alert("VOCÊ PERDEU!");
                        props.callbackParent(true)
                    }     
                    resetBall()
                }
            } else if (x + dx < ballRadius + 20) {

                if (y > paddleLeftY && y < paddleLeftY + paddleHeight && x <= paddleLeftX + 40) {
                    dx = -dx;
                    dy = velBall * getRandomIntBola(-5, 5);
                }
                else if (x + dx < ballRadius - 20) {
                    scorePerson++;
                    setScoreHuman(scorePerson)
                    comeco = 0;
                    if(scorePerson == points){
                        alert("VOCÊ GANHOU!");
                        
                        props.callbackParent(true)
                    }  
                    resetBall()
                }
            }

            if (downPressedPaddleRight) {
                paddleRightY += velPaddle;
                if (paddleRightY + paddleHeight > height) {
                    paddleRightY = height - paddleHeight;
                }
            }
            else if (upPressedPaddleRight) {
                paddleRightY -= velPaddle;
                if (paddleRightY < 0) {
                    paddleRightY = 0;
                }
            }

            if (downPressedPaddleLeft) {
                paddleLeftY += velPaddle;
                if (paddleLeftY + paddleHeight > height) {
                    paddleLeftY = height - paddleHeight;
                }
            }
            else if (upPressedPaddleLeft) {
                paddleLeftY -= velPaddle;
                if (paddleLeftY < 0) {
                    paddleLeftY = 0;
                }
            }

            x += dx;
            y += dy;
        }
        var interval = setInterval(draw, 10);
    },[]);

    return(
        <div className={styles.container}>
            <h1>{scoreMachine}x{scoreHuman}</h1>
            <canvas ref={canvasRef} className={styles.canvas} width="800" height="500"></canvas>
        </div>
    )
}