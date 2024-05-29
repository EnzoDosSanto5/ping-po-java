//variaveis da bolinha
let XBolinha = 300;
let YBolinha = 200;
let diametro = 30;
let raio = diametro / 2;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da minha raquete     
let XRaquete = 5;
let YRaquete =150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete do oponente
let XRaqueteOponente = 585;
let YRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;   

//placa do jogo
let meusPontos = 0;
let pontosDoOponente = 0; 

//sons do jogo
let raquetada;
let ponto;
let trilha;

function setup() {
  createCanvas(600,400);
  trilha.loop();
}

function draw() {
  background(0); //1 Desenha o background cor 
  mostraBolinha();//2 Desenha a bolinha 
  movimentaBolinha();//3 Movimento da bobinha 
  verificaColisaoBorda();//4 verifica a colisão da bolinha 
  mostraRaquete(XRaquete,YRaquete);
  movimentaMinhaRaquete();  
  //verificaColisaoRaquete();
  verificaColisaoRaquete(XRaquete, YRaquete);
  mostraRaquete(XRaqueteOponente, YRaqueteOponente);
  movimentaRaqueteOponente();  verificaColisaoMinhaRaquete(XRaqueteOponente,YRaqueteOponente);
  incluiPlacar();  
  marcaPonto();
}
function  mostraBolinha () {
    circle(XBolinha, YBolinha, diametro)
}

function movimentaBolinha() {
    XBolinha += velocidadeXBolinha;
    YBolinha += velocidadeYBolinha;
}
   
function verificaColisaoBorda () { 
    if (XBolinha + raio > width || XBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (YBolinha + raio > height || YBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}
function mostraRaquete(x,y ){
 rect (x,y , raqueteComprimento, raqueteAltura);

}  

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        YRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        YRaquete += 10;
    }
}
function verificaColisaoRaquete(){
  if (XBolinha - raio < XRaquete + raqueteComprimento && YBolinha - raio < YRaquete + raqueteAltura && YBolinha + raio > YRaquete){   
velocidadeXBolinha*= -1;
   raquetada.play()
  }
} 

function movimentaRaqueteOponente(){
    if (keyIsDown(87)) {
        YRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        YRaqueteOponente += 10;
    }
 // velocidadeYOponente = YBolinha - YRaqueteOponente - raqueteComprimento/2 - 150;
 // YRaqueteOponente += velocidadeYOponente
}


function verificaColisaoMinhaRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento,raqueteAltura, XBolinha, YBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function incluiPlacar(){
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255,140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);

}

function marcaPonto(){
  if(XBolinha > 586){
    meusPontos += 1;
    ponto.play();
  }
  if(XBolinha < 15){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


