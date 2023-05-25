//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 28;
let raio = diametro / 2;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 15;
let raqueteAltura = 130;

//Velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//Colisão
let colidiu = false;

//Variáveis do oponente
let xRaqueteOponente = 575;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErro = 55;

//Placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons
let trilha;
let ponto;
let raquetada;

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.1);
}

function draw() {
  background(0);
  mostraBolinha();
  
  movimentaBolinha();
  
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio> width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
      yRaquete -= 5
    }
  if (keyIsDown(DOWN_ARROW)) {
      yRaquete += 5
    }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErro
  calculaChanceDeErro()
}

function calculaChanceDeErro() {
  if (pontosOponente >= meusPontos) {
    chanceDeErro += 15
    if (chanceDeErro >= 59){
    chanceDeErro =  60
    }
  } else {
    chanceDeErro -= 15
    if (chanceDeErro <= 20){
    chanceDeErro = 20
    }
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= - 1;
    raquetada.play();
  }
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(30);
  fill(color(255,215,0));
  stroke(255);
  rect(200, 0, 60, 40);
  fill(255);
  text(meusPontos, 230, 30);
  fill(color(255,215,0))
  rect(350, 0, 60, 40)
  fill(255)
  text(pontosOponente, 380, 30);
}

function marcaPonto() {
  if (xBolinha > 585) {
    meusPontos += 1;
    ponto.play();
    ponto.setVolume(0.1);
  }
  if (xBolinha < 15) {
    pontosOponente += 1;
    ponto.play();
    ponto.setVolume(0.1);
  }
}
