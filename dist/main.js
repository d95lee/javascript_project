!function(){const t=document.querySelector("#canvas"),e=t.getContext("2d"),i=(document.querySelector("#playerShoot"),document.querySelector("#scoreboard")),s=document.querySelector("#gameOver"),h=document.querySelector("#scoreEle"),r=document.querySelector("#startScreen"),o=document.querySelector(".scoreboard-container"),a=document.querySelector("#restart"),l=document.querySelector("#music"),c=document.querySelector("#gunshot"),d=(document.querySelector("#gunshotButton"),document.querySelector("#musicButton")),n=document.querySelector("#levelEle"),y=document.querySelector("#gameOverLevel"),u=document.querySelector(".socials:nth-child(1)"),x=document.querySelector(".socials:nth-child(2)"),p=document.querySelector("#hard-mode"),m=document.querySelector("#easy-mode");t.width=1820,t.height=800;const v=new Image;v.src="./assets/player/player.png";const w=new Image;w.src="./assets/enemy/red_zombie.png";const g=new Image;g.src="./assets/enemy/blue_zombie.png";const b=new Image;b.src="./assets/enemy/black_zombie.png";const M=new Image;M.src="./assets/enemy/green_zombie.png",p.addEventListener("click",(()=>{class m{constructor(t,e,i,s,h){this.x=t,this.y=e,this.radius=i,this.color=s,this.velocity=h}draw(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(w,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw2(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(g,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw3(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(b,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw4(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(M,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}updateEnemyPos(){let t=q.width/2,e=q.height/2,i=q.x+t-this.x,s=q.y+e-this.y;const h=Math.atan2(q.y+e+20-this.y,q.x+t-this.x);this.x+=Math.cos(h),this.y+=Math.sin(h),this.draw(),i>0?"red"===this.color?this.x+=.2+.05*I:"blue"===this.color?this.x+=.4+.05*I:"black"===this.color?this.x+=.6+.05*I:"green"===this.color&&(this.x+=1+.05*I):i<0&&"red"===this.color?this.x-=.2+.05*I:"blue"===this.color?this.x-=.4+.05*I:"black"===this.color?this.x-=.6+.05*I:"green"===this.color&&(this.x-=1+.05*I),s>0?"red"===this.color?this.y+=.2+.05*I:"blue"===this.color?this.y+=.4+.05*I:"black"===this.color?this.y+=.6+.05*I:"green"===this.color&&(this.y+=1+.05*I):s<0&&"red"===this.color?this.y-=.2+.05*I:"blue"===this.color?this.y-=.4+.05*I:"black"===this.color?this.y-=.6+.05*I:"green"===this.color&&(this.y-=1+.05*I)}speedIncrease(){xDiff>0?this.x+=1:xDiff<0?this.x-=1:yDiff>0?this.y+=1:yDiff<0&&(this.y-=1)}}class f{constructor(t,e,i,s,h){this.x=t,this.y=e,this.radius=i,this.color=s,this.velocity=h,this.vx=0,this.vy=0}draw(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.shadowColor="#899",e.shadowBlur=9,e.fill(),e.closePath()}update(){this.draw(),this.x=this.x+this.velocity.x,this.y=this.y+this.velocity.y}}let S=[],k=[],L=[],P=0,E=100,I=0;const q=new class{constructor(t,e,i){this.x=t,this.y=e,this.playerSprite=i,this.width=30,this.height=30,this.vx=0,this.vy=0,document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this))}handleKeyDown(t){"KeyA"===t.code&&(this.vx=-3),"KeyD"===t.code&&(this.vx=3),"KeyW"===t.code&&(this.vy=-3),"KeyS"===t.code&&(this.vy=3)}handleKeyUp(t){"KeyA"===t.code&&(this.vx=0),"KeyD"===t.code&&(this.vx=0),"KeyW"===t.code&&(this.vy=0),"KeyS"===t.code&&(this.vy=0)}draw(){e.drawImage(this.playerSprite,205,240,34,42,this.x,this.y,2*this.width,2*this.height)}update(){this.x+=this.vx,this.y+=this.vy,this.x<0?this.x=0:this.y<0?this.y=0:this.x>t.width-this.width?this.x=t.width-this.width:this.y>t.height-this.height&&(this.y=t.height-this.height)}}(100,100,v);function H(){e.clearRect(0,0,t.width,t.height);const a=requestAnimationFrame(H);q.x+=q.vx,q.y+=q.vy,q.update(),q.draw(),S.forEach(((t,e)=>{t.updateEnemyPos(),"red"===t.color?t.draw():"blue"===t.color?t.draw2():"black"===t.color?t.draw3():t.draw4(),k.forEach(((s,h)=>{Math.hypot(s.x-t.x,s.y-t.y)-t.radius-s.radius<1&&(S.splice(e,1),k.splice(h,1),"red"===t.color?(P+=10,i.innerHTML=`Score: ${P}`):"blue"===t.color?(P+=20,i.innerHTML=`Score: ${P}`):"black"===t.color?(P+=30,i.innerHTML=`Score: ${P}`):"green"===t.color&&(P+=50,i.innerHTML=`Score: ${P}`))}));let s=q.width/2,h=q.height/2;L.forEach(((t,e)=>{Math.hypot(t.x-(q.x+s),t.y-(q.y+h))-q.width-t.radius<1&&(L.splice(e,1),E-=5,health.innerHTML=`Health: ${E}`)})),Math.hypot(q.x+s-t.x,q.y+h-t.y)-t.radius-t.radius/2-q.width/6-q.height/6<1&&(E-=1,health.innerHTML=`Health: ${E}`)})),0===S.length&&(I+=1,function(){let e=1;e=2*I-1,I>=1&&(S.forEach((t=>{t.speedIncrease()})),L=[]);for(let i=0;i<e;i++){const e=["red","blue","green","black"],i=e[Math.floor(e.length*Math.random())];let s=Math.floor(Math.random()*t.width),h=Math.floor(Math.random()*t.height);S.push(new m(s,h,30,i,this.velocity)),S.forEach((t=>{if(t.updateEnemyPos(),"red"===t.color){const e=Math.atan2(q.y-t.y,q.x-t.x),i={x:2*Math.cos(e),y:2*Math.sin(e)};L.push(new f(t.x,t.y,3,"blue",i))}}))}}(),n.innerHTML=`Level: ${I}`),k.forEach(((e,i)=>{e.update(),(e.x-e.radius<0||e.x-e.radius>t.width||e.y+e.radius<0||e.y-e.radius>t.height)&&k.splice(i,1)})),E<=0&&(cancelAnimationFrame(a),document.querySelector("#gameOver").style.display,s.style.display="block",h.innerHTML=`${P} Points`,y.innerHTML=`Survived until level ${I}`,o.style.display="none",n.style.display="none"),"block"==r.style.display&&cancelAnimationFrame(a),L.forEach((t=>{t.update(),t.draw()}))}function T(){k=[],L=[],S=[],P=0,E=100,I=0,document.querySelector("#health").innerHTML=`Health: ${E}`,document.querySelector("#scoreboard").innerHTML=`Score: ${P}`}let K=!0;addEventListener("click",(t=>{if(K){const e=55,i=30,s=Math.atan2(t.clientY-q.y-i,t.clientX-q.x-e),h={x:10*Math.cos(s),y:10*Math.sin(s)};k.push(new f(q.x+e,q.y+i,3,"red",h))&&addEventListener("click",(()=>{c.play(),c.volume=.2})),K=!1,setTimeout((()=>{K=!0}),500)}})),a.addEventListener("click",(()=>{T(),H(),l.play(),l.volume=.2,s.style.display="none",o.style.display="block",n.style.display="block"})),d.addEventListener("click",(()=>{l.paused?(l.play(),l.volume=.2):(l.pause(),l.currentTime=0)})),p.addEventListener("click",(()=>{T(),H(),l.play(),l.volume=.2,r.style.display="none",o.style.display="block",n.style.display="block",u.style.display="block",x.style.display="block"}))})),d.addEventListener("click",(()=>{l.paused?(l.play(),l.volume=.2):(l.pause(),l.currentTime=0)})),m.addEventListener("click",(()=>{class p{constructor(t,e,i,s,h){this.x=t,this.y=e,this.radius=i,this.color=s,this.velocity=h}draw(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(w,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw2(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(g,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw3(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(b,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}draw4(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.save(),e.clip(),e.drawImage(M,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),e.restore(),e.closePath()}updateEnemyPos(){let t=I.width/2,e=I.height/2,i=I.x+t-this.x,s=I.y+e-this.y;const h=Math.atan2(I.y+e+20-this.y,I.x+t-this.x);this.x+=Math.cos(h),this.y+=Math.sin(h),this.draw(),i>0?"red"===this.color?this.x+=.2+.03*E:"blue"===this.color?this.x+=.4+.03*E:"black"===this.color?this.x+=.6+.03*E:"green"===this.color&&(this.x+=1+.03*E):i<0&&"red"===this.color?this.x-=.2+.03*E:"blue"===this.color?this.x-=.4+.03*E:"black"===this.color?this.x-=.6+.03*E:"green"===this.color&&(this.x-=1+.03*E),s>0?"red"===this.color?this.y+=.2+.03*E:"blue"===this.color?this.y+=.4+.03*E:"black"===this.color?this.y+=.6+.03*E:"green"===this.color&&(this.y+=1+.03*E):s<0&&"red"===this.color?this.y-=.2+.03*E:"blue"===this.color?this.y-=.4+.03*E:"black"===this.color?this.y-=.6+.03*E:"green"===this.color&&(this.y-=1+.03*E)}speedIncrease(){xDiff>0?this.x+=1:xDiff<0?this.x-=1:yDiff>0?this.y+=1:yDiff<0&&(this.y-=1)}}class f{constructor(t,e,i,s,h){this.x=t,this.y=e,this.radius=i,this.color=s,this.velocity=h,this.vx=0,this.vy=0}draw(){e.beginPath(),e.fillStyle=this.color,e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.shadowColor="#899",e.shadowBlur=9,e.fill(),e.closePath()}update(){this.draw(),this.x=this.x+this.velocity.x,this.y=this.y+this.velocity.y}}let S=[],k=[],L=0,P=100,E=0;const I=new class{constructor(t,e,i){this.x=t,this.y=e,this.playerSprite=i,this.width=30,this.height=30,this.vx=0,this.vy=0,document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this))}handleKeyDown(t){"KeyA"===t.code&&(this.vx=-3),"KeyD"===t.code&&(this.vx=3),"KeyW"===t.code&&(this.vy=-3),"KeyS"===t.code&&(this.vy=3)}handleKeyUp(t){"KeyA"===t.code&&(this.vx=0),"KeyD"===t.code&&(this.vx=0),"KeyW"===t.code&&(this.vy=0),"KeyS"===t.code&&(this.vy=0)}draw(){e.drawImage(this.playerSprite,205,240,34,42,this.x,this.y,2*this.width,2*this.height)}update(){this.x+=this.vx,this.y+=this.vy,this.x<0?this.x=0:this.y<0?this.y=0:this.x>t.width-this.width?this.x=t.width-this.width:this.y>t.height-this.height&&(this.y=t.height-this.width)}}(100,100,v);function q(){e.clearRect(0,0,t.width,t.height);const a=requestAnimationFrame(q);I.x+=I.vx,I.y+=I.vy,I.update(),I.draw(),S.forEach(((t,e)=>{t.updateEnemyPos(),"red"===t.color?t.draw():"blue"===t.color?t.draw2():"black"===t.color?t.draw3():t.draw4(),k.forEach(((s,h)=>{Math.hypot(s.x-t.x,s.y-t.y)-t.radius-s.radius<1&&(S.splice(e,1),k.splice(h,1),"red"===t.color?(L+=10,i.innerHTML=`Score: ${L}`):"blue"===t.color?(L+=20,i.innerHTML=`Score: ${L}`):"black"===t.color?(L+=30,i.innerHTML=`Score: ${L}`):"green"===t.color&&(L+=50,i.innerHTML=`Score: ${L}`))}));let s=I.width/2,h=I.height/2;Math.hypot(I.x+s-t.x,I.y+h-t.y)-t.radius-t.radius/2-I.width/6-I.height/6<1&&(P-=.5,health.innerHTML=`Health: ${P}`)})),0===S.length&&(E+=1,function(){let e=1;e=2*E-1,E>=1&&S.forEach((t=>{t.speedIncrease()}));for(let i=0;i<e;i++){const e=["red","blue","green","black"],i=e[Math.floor(e.length*Math.random())];let s=Math.floor(Math.random()*t.width),h=Math.floor(Math.random()*t.height);S.push(new p(s,h,30,i,this.velocity))}}(),n.innerHTML=`Level: ${E}`),k.forEach(((e,i)=>{e.update(),(e.x-e.radius<0||e.x-e.radius>t.width||e.y+e.radius<0||e.y-e.radius>t.height)&&k.splice(i,1)})),P<=0&&(cancelAnimationFrame(a),document.querySelector("#gameOver").style.display,s.style.display="block",h.innerHTML=`${L} Points`,y.innerHTML=`Survived until level ${E}`,o.style.display="none",n.style.display="none"),"block"==r.style.display&&cancelAnimationFrame(a)}function H(){k=[],S=[],L=0,P=100,E=0,document.querySelector("#health").innerHTML=`Health: ${P}`,document.querySelector("#scoreboard").innerHTML=`Score: ${L}`}addEventListener("click",(t=>{const e=Math.atan2(t.clientY-I.y-30,t.clientX-I.x-55),i={x:15*Math.cos(e),y:15*Math.sin(e)};k.push(new f(I.x+55,I.y+30,3,"red",i))})),a.addEventListener("click",(()=>{H(),q(),l.play(),l.volume=.2,s.style.display="none",o.style.display="block",n.style.display="block"})),window.addEventListener("click",(()=>{c.play(),c.volume=.2})),d.addEventListener("click",(()=>{l.paused?(l.play(),l.volume=.2):(l.pause(),l.currentTime=0)})),m.addEventListener("click",(()=>{H(),q(),l.play(),l.volume=.2,r.style.display="none",o.style.display="block",n.style.display="block",u.style.display="block",x.style.display="block"}))}))}();
//# sourceMappingURL=main.js.map