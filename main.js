const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;


function resize() {
  width = window.innerWidth,
  height = window.innerHeight,
  ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  context.scale(ratio, ratio);
}
window.onresize = function() {
  resize();
};
window.onload = function() {
  resize();
  window.requestAnimationFrame(animate);
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('mousemove', (p) => {
  const t = canvas.getBoundingClientRect();
  mouse[0] = (p.pageX - t.left);
  mouse[1] = (p.pageY - t.top);
}, false);

document.onmousedown = function (e) {
  if (e.button == 0) {
    for(const i in graf.nodes){
      if((graf.nodes[i].x-mouse[0])**2+(graf.nodes[i].y-mouse[1])**2 < 25**2) {
        clicks[0] = true;
        clicking = i;
      }
    }
    if (!clicks[0]) {
      clicks[0] = true;
      const n = new VNode();
      clicking = n.id;
      n.x = mouse[0];
      n.y = mouse[1];
      graf.addNode(n);
      graf.color();
    }
  }
  if (e.button == 2) {
    for(const i in graf.nodes){
      if((graf.nodes[i].x-mouse[0])**2+(graf.nodes[i].y-mouse[1])**2 < 60**2) {
        clicks[1] = true;
        clicking = i;
      }
    }
  }
};

document.onmouseup = function (e) {
  if (e.button == 0) {
    clicks[0] = false;
  }
  if (e.button == 2) {
    if (clicks[1]) {
      for(const i in graf.nodes){
        if((graf.nodes[i].x-mouse[0])**2+(graf.nodes[i].y-mouse[1])**2 < 60**2) {
          graf.addConnection(clicking, i);
          graf.color();
        }
      }
    }
    clicks[1] = false;
  }
};

class VNode extends Node {
  constructor() {
    super();
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
  }
  update(){
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.ax = 0;
    this.ay = 0;
  }
}

const mouse = [0, 0];
const clicks = [false, false];
let clicking = 0;

const colors = [];

const graf = new Graph();
const n1 = graf.addNode(new VNode());
const n2 = graf.addNode(new VNode());
const n3 = graf.addNode(new VNode());
graf.addConnection(n1.id, n2.id);
graf.addConnection(n2.id, n3.id);
graf.addConnection(n3.id, n1.id);
graf.color();

function animate() {
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = "black";
  context.rect(0, 0, width, height);
  context.fill();
  context.closePath();


  for(const i in graf.nodes){
    for(const j of graf.nodes[i].neighbors){
      if ((graf.nodes[i].x-graf.nodes[j].x)**2+(graf.nodes[i].y-graf.nodes[j].y)**2 > 800**2) {
        graf.nodes[i].ax = (graf.nodes[j].x-graf.nodes[i].x)/4000;
        graf.nodes[i].ay = (graf.nodes[j].y-graf.nodes[i].y)/4000;
      }
    }
  }

  if (clicks[0]) {
    graf.nodes[clicking].ax = (mouse[0]-graf.nodes[clicking].x)/200;
    graf.nodes[clicking].ay = (mouse[1]-graf.nodes[clicking].y)/200;
  }
  for(const i in graf.nodes){
    graf.nodes[i].update();
  }

  context.strokeStyle = "rgb(189, 152, 109)";
  for(const i in graf.nodes){
    for(const j of graf.nodes[i].neighbors){
      context.beginPath();
      context.lineWidth = 6;
      context.moveTo(graf.nodes[i].x, graf.nodes[i].y);
      context.lineTo(graf.nodes[j].x, graf.nodes[j].y);
      context.stroke();
      context.closePath();
    }
    if(clicks[1]){
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(graf.nodes[clicking].x, graf.nodes[clicking].y);
      context.lineTo(mouse[0], mouse[1]);
      context.stroke();
      context.closePath();
    }
  }

  for(const i in graf.nodes){
    context.beginPath();
    if (i in graf.colors) {
      if (colors.length<=graf.colors[i]) {
        colors.push(Math.random()*255);
      }
      context.fillStyle = 'hsl('+ colors[graf.colors[i]] +',100%,50%)';
    }else{
      context.fillStyle = "white";
    }
    context.arc(graf.nodes[i].x, graf.nodes[i].y, 20, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  context.font = "50px Arial";
  context.fillText(colors.length, 30, 60)
  for (let c in colors){
    context.beginPath();
    context.fillStyle = 'hsl('+ colors[c] +',100%,50%)';
    context.strokeStyle = "rgb(99, 99, 99)";
    context.lineWidth = 2;
    context.rect(0, 100+30*c, 60, 30);
    context.fill();
    context.stroke();
    context.closePath();
  }
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
