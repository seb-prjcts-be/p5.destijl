let specimen, chars;
function setup() {
  chars=Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'+Merz.characters.replace(/[A-Z0-9]/g,''));
  createCanvas(900, Math.ceil(chars.length/8)*120+40).parent('characters');
  noLoop();
  document.getElementById('count').textContent=chars.length+' characters. Curly quotation marks are also recognised.';
  document.getElementById('weight').addEventListener('input',()=>{build();redraw();});
  document.getElementById('save-characters').addEventListener('click',()=>specimen.downloadSVG('p5.merz-characters.svg'));
  describe('All letters, numbers and punctuation in p5.merz.');
  build();
}
function build(){
  const weight=Number(document.getElementById('weight').value);
  document.getElementById('weight-value').value=weight.toFixed(2);
  specimen=Merz.create({width:900,height:Math.ceil(chars.length/8)*120+40});
  chars.forEach((char,i)=>specimen.letter(char,28+(i%8)*110,25+Math.floor(i/8)*120,{size:70,weight}));
}
function draw(){
  specimen.draw();
  noStroke();fill('#62625b');textFont('Arial');textSize(14);
  chars.forEach((char,i)=>text(char,28+(i%8)*110,115+Math.floor(i/8)*120));
}
