

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Utility functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Get the distance
function distance(x1, y1, x2, y2){
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
 
}
// Objects
class Partical {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    }
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }

  update = particles => {
    this.draw();
    for(let i = 0; i<particles.length; i++){
      if(this === particles[i]) continue;
      if(distance(this.x, this.y, particles[i].x,particles[i].y) - this.radius*2 < 0){

      }
    }
    
    if(this.x - this.radius <= 0 || this.x+this.radius >= innerWidth){
      this.velocity.x = -this.velocity.x;
    }
    if(this.y - this.radius <= 0 || this.y+this.radius >= innerHeight){
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles;

function init() {
  particles = [];

  for(let i = 0; i<4; i++){
    let radius = 50;
    let x = randomIntFromRange(radius,canvas.width-radius);
    let y = randomIntFromRange(radius,canvas.height-radius);
    let color = 'blue';

    if(i !==0 ){
      for(let j = 0; j<particles.length; j++){
        if(distance(x,y,particles[j].x,particles[j].y) - radius*2 < 0){
          x = randomIntFromRange(radius,canvas.width-radius);;
          y = randomIntFromRange(radius,canvas.height-radius);
          j=0;
        } 
      }
    }
    particles.push(new Partical(x,y,radius,color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach(particle => {
        particle.update(particle);
  });
}
init()
animate()
