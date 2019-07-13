var canvas=document.querySelector('canvas');
canvas.width=400;
canvas.height=600;
var c=canvas.getContext('2d');
function Circle(cx,cy,radius,color,i,j){
    this.i=i;
    this.j=j;
    this.cx=cx;
    this.cy=cy;
    this.radius=radius;
    this.color=color;
    this.draw=function(){
        c.beginPath();
        c.arc(this.cx,this.cy,this.radius,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
    }
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
function Grid(){
    this.x1=canvas.width*0.1;
    this.y1=canvas.height*0.1;
    this.x2=canvas.width*0.9;
    this.y2=canvas.height*0.9;
    this.hgap=0.8*canvas.width*(1/6);
    this.vgap=0.8*canvas.height*(1/9);
    this.color="red";
    this.radius=(this.x2-this.x1)/24;
    this.gap2=(this.x2-this.x1)/36;
    this.gapx3=(this.x2-this.x1)/36;
    this.gapy3=(this.y2-this.y1)/72;
    this.grid=[];
    this.number=[];
    this.capacity=[];
    this.center1=[];
    this.center2=[];
    this.center3=[];
    this.center4=[];
    this.circles=[];
    this.movecircles=[];
    this.direction=[];
    this.on=0;
    this.speed=5;
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push(0);
        }
        this.grid.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push(0);
        }
        this.number.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            if(i==0&&j==0)
            x.push(1);
            else if(i==0&&j==5)
            x.push(1);
            else if(i==8&&j==0)
            x.push(1);
            else if(i==8&&j==5)
            x.push(1);
            else if(i==0||j==0||i==8||j==5)
            x.push(2);
            else
            x.push(3);
        }
        this.capacity.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push({cx:((11-2*j)*this.x1+(2*j+1)*this.x2)/12
            ,cy:((17-2*i)*this.y1+(2*i+1)*this.y2)/18});
        }
        this.center1.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push({cx1:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)-this.gap2,
            cy1:((17-2*i)*this.y1+(2*i+1)*this.y2)/18,
            cx2:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)+this.gap2,
            cy2:((17-2*i)*this.y1+(2*i+1)*this.y2)/18
        });
        }
        this.center2.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push({cx1:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)-this.gapx3,
            cy1:((17-2*i)*this.y1+(2*i+1)*this.y2)/18-this.gapy3,
            cx2:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)+this.gapx3,
            cy2:((17-2*i)*this.y1+(2*i+1)*this.y2)/18-this.gapy3,
            cx3:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12),
            cy3:((17-2*i)*this.y1+(2*i+1)*this.y2)/18+this.gapy3
        });
        }
        this.center3.push(x);
    }
    for(var i=0;i<9;i++){
        x=[];
        for(var j=0;j<6;j++){
            x.push({cx1:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)-this.gapx3,
            cy1:((17-2*i)*this.y1+(2*i+1)*this.y2)/18,
            cx2:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12)+this.gapx3,
            cy2:((17-2*i)*this.y1+(2*i+1)*this.y2)/18,
            cx3:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12),
            cy3:((17-2*i)*this.y1+(2*i+1)*this.y2)/18+this.gapy3,
            cx4:(((11-2*j)*this.x1+(2*j+1)*this.x2)/12),
            cy4:((17-2*i)*this.y1+(2*i+1)*this.y2)/18-this.gapy3
        });
        }
        this.center4.push(x);
    }
    for(var i=0;i<9;i++){
        var y=[];
        for(var j=0;j<6;j++){
            var x=[];
            if(i==0&&j==0)
            {
                x.push("B");
                x.push("R");
            }
            else if(i==0&&j==5)
            {
                x.push("L");
                x.push("B");
            }
            else if(i==8&&j==0)
            {
                x.push("R");
                x.push("T");
            }
            else if(i==8&&j==5)
            {
                x.push("L");
                x.push("T");
            }
            else if(i==0)
            {
                x.push("L");
                x.push("B");
                x.push("R");
            }
            else if(i==8)
            {
                x.push("L");
                x.push("R");
                x.push("T");   
            }
            else if(j==0)
            {
                x.push("B");
                x.push("R");
                x.push("T");
            }
            else if(j==5)
            {
                x.push("L");
                x.push("B");
                x.push("T");
            }
            else
            {
                x.push("L");
                x.push("B");
                x.push("R");
                x.push("T");
            }
            y.push({dir:x,ind:0});
        }
        this.direction.push(y);
    }
    this.drawGrid=function(){
        c.strokeStyle=this.color;
        for(var i=this.x1;i<=this.x2;i+=this.hgap)
        {
            c.beginPath();
            c.moveTo(i,this.y1);
            c.lineTo(i,this.y2);
            c.stroke();
        }
        for(var i=this.y1;i<=this.y2;i+=this.vgap)
        {
            c.beginPath();
            c.moveTo(this.x1,i);
            c.lineTo(this.x2,i);
            c.stroke();
        }
    }
    this.contains=function(x,y){
        if(x>=this.x1&&x<=this.x2&&y>=this.y1&&y<=this.y2)
        return true;
    }
    this.indexOf=function(x,y){
        var j=Math.floor((x-this.x1)*6/(this.x2-this.x1));
        var i=Math.floor((y-this.y1)*9/(this.y2-this.y1));
        var index={i:i,j:j};
        return index;
    }
    this.isComplete=function(){
        var red=0;
        var blue=0;
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                if(this.grid[i][j]=="red")
                red+=this.number[i][j];
                else if(this.grid[i][j]=="blue")
                blue+=this.number[i][j];
            }
        }
        if(red>=2&&blue==0)
        return true;
        else if(blue>=2&&red==0)
        return true;
        else
        return false;
    }
    this.winner=function(){
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                if(this.grid[i][j]=="blue")
                return "Blue";
                if(this.grid[i][j]=="red")
                return "Red";
            }
        }
    }
    this.canSplit=function(){
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                if(this.capacity[i][j]<this.number[i][j])
                return true;
            }
        }
        return false;
    }
    this.shrink=function(s){
        for(var p=0;p<s.length;p++){
            var x=s[p].i;
            var y=s[p].j;
            for(var q=0;q<this.circles.length;q++)
            {
                if(this.circles[q].i==x&&this.circles[q].j==y)
                {
                    this.circles[q].cx=this.center1[x][y].cx;
                    this.circles[q].cy=this.center1[x][y].cy;
                }
            }
        }
    }
    this.animate=function(){
        this.movecircles=[];
        this.movable=[];
        for(var i=0;i<9;i++){
            x=[];
            for(var j=0;j<6;j++){
                x.push(0);
            }
            this.movable.push(x);
        }
        for(var i=0;i<this.circles.length;i++){
            var x=this.circles[i].i;
            var y=this.circles[i].j;
            if(this.number[x][y]>this.capacity[x][y]&&this.movable[x][y]<=this.capacity[x][y]){
                this.movable[x][y]+=1;
                var ind=this.direction[x][y].ind;
                var dir=this.direction[x][y].dir[ind];
                var cx;
                var cy;
                var dx;
                var dy;
                if(dir=="L")
                {
                    cx=this.center1[x][y-1].cx;
                    cy=this.center1[x][y-1].cy;
                    dx=-this.speed;
                    dy=0;
                }
                else if(dir=="B")
                {
                    cx=this.center1[x+1][y].cx;
                    cy=this.center1[x+1][y].cy;
                    dx=0;
                    dy=this.speed;
                }
                else if(dir=="R")
                {
                    cx=this.center1[x][y+1].cx;
                    cy=this.center1[x][y+1].cy;
                    dx=this.speed;
                    dy=0;
                }
                else if(dir=="T")
                {
                    cx=this.center1[x-1][y].cx;
                    cy=this.center1[x-1][y].cy;
                    dx=0;
                    dy=-this.speed;
                }
                this.movecircles.push({move:1,cx:cx,cy:cy,dx:dx,dy:dy});
                this.direction[x][y].ind=(ind+1);
            }
            else
            this.movecircles.push({move:0,cx:0,cy:0,dx:0,dy:0});
        }
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                this.direction[i][j].ind=0;
            }
        }
    }
    this.isSafe=function(x,y){
        if(x>=0&&x<9&&y>=0&&y<6)
        return true;
        return false;
    }
    this.animationcomplete=function(){
        for(var i=0;i<this.movecircles.length;i++){
            if(this.movecircles[i].move==1)
            {
                if(this.movecircles[i].dx<0&&this.movecircles[i].cx>=this.circles[i].cx)
                return true;
                else if(this.movecircles[i].dx>0&&this.movecircles[i].cx<=this.circles[i].cx)
                return true;
                else if(this.movecircles[i].dy<0&&this.movecircles[i].cy>=this.circles[i].cy)
                return true;
                else if(this.movecircles[i].dy>0&&this.movecircles[i].cy<=this.circles[i].cy)
                return true;
                else
                return false;
            }
        }
    }
    this.move=function(){
        if(!this.animationcomplete())
        {
            c.clearRect(0,0,canvas.width,canvas.height);
            grid.drawGrid();
            for(var i=0;i<this.circles.length;i++)
            {
                if(this.movecircles[i].move==1)
                {
                    this.circles[i].cx+=this.movecircles[i].dx;
                    this.circles[i].cy+=this.movecircles[i].dy;
                }
                this.circles[i].draw();
            }
        }
        else
        {
            c.clearRect(0,0,canvas.width,canvas.height);
            grid.drawGrid(); 
            for(var i=0;i<this.circles.length;i++){
                if(this.movecircles[i].move==1)
                {
                    this.circles[i].cx=this.movecircles[i].cx;
                    this.circles[i].cy=this.movecircles[i].cy;
                    var index=this.indexOf(this.circles[i].cx,this.circles[i].cy);
                    this.circles[i].i=index.i;
                    this.circles[i].j=index.j;
                }
                this.circles[i].draw();
            }
            this.copynumber=[];
            for(var i=0;i<9;i++){
                x=[];
                for(var j=0;j<6;j++){
                    x.push(this.number[i][j]);
                }
                this.copynumber.push(x);
            }
            for(var i=0;i<9;i++)
            {
                for(var j=0;j<6;j++){
                    if(this.number[i][j]>this.capacity[i][j])
                    {
                        if(this.isSafe(i+1,j))
                        {
                            this.copynumber[i+1][j]+=1;
                            this.grid[i+1][j]=this.grid[i][j];
                        }
                        if(this.isSafe(i-1,j))
                        {
                            this.copynumber[i-1][j]+=1;
                            this.grid[i-1][j]=this.grid[i][j];
                        }
                        if(this.isSafe(i,j+1))
                        {
                            this.copynumber[i][j+1]+=1;
                            this.grid[i][j+1]=this.grid[i][j];
                        }
                        if(this.isSafe(i,j-1))
                        {
                            this.copynumber[i][j-1]+=1;
                            this.grid[i][j-1]=this.grid[i][j];
                        }
                        this.copynumber[i][j]=this.number[i][j]-this.capacity[i][j]-1;
                        if(this.copynumber[i][j]==0)
                        this.grid[i][j]=0;
                    }
                }
            }
            this.number=this.copynumber;
            c.clearRect(0,0,canvas.width,canvas.height);
            this.drawGrid();
            this.circles=[];
            for(var i=0;i<9;i++)
            {
                for(var j=0;j<6;j++)
                {
                    for(var k=0;k<this.number[i][j];k++)
                    {
                        this.circles.push(new Circle(this.center1[i][j].cx,this.center1[i][j].cy,this.radius,this.grid[i][j],i,j));
                    }
                }
            }
            for(var i=0;i<this.circles.length;i++){
                this.circles[i].draw();
            }
            this.expand();
            this.on=0;
        }
    }
    this.expand=function(){
        var ecircles=[];
        for(var i=0;i<9;i++){
            var x=[];
            for(var j=0;j<6;j++){
                x.push([]);
            }
            ecircles.push(x);
        }
        for(var i=0;i<this.circles.length;i++){
            ecircles[this.circles[i].i][this.circles[i].j].push(i);
        }
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                if(ecircles[i][j].length==2)
                {
                    this.circles[ecircles[i][j][0]].cx=this.center2[i][j].cx1;
                    this.circles[ecircles[i][j][0]].cy=this.center2[i][j].cy1;
                    this.circles[ecircles[i][j][1]].cx=this.center2[i][j].cx2;
                    this.circles[ecircles[i][j][1]].cy=this.center2[i][j].cy2;
                    this.circles[ecircles[i][j][0]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][1]].color=this.grid[i][j];
                }
                else if(ecircles[i][j].length==3)
                {
                    this.circles[ecircles[i][j][0]].cx=this.center3[i][j].cx1;
                    this.circles[ecircles[i][j][0]].cy=this.center3[i][j].cy1;
                    this.circles[ecircles[i][j][1]].cx=this.center3[i][j].cx2;
                    this.circles[ecircles[i][j][1]].cy=this.center3[i][j].cy2;
                    this.circles[ecircles[i][j][2]].cx=this.center3[i][j].cx3;
                    this.circles[ecircles[i][j][2]].cy=this.center3[i][j].cy3;
                    this.circles[ecircles[i][j][0]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][1]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][2]].color=this.grid[i][j];
                }
                else if(ecircles[i][j].length==4)
                {
                    this.circles[ecircles[i][j][0]].cx=this.center4[i][j].cx1;
                    this.circles[ecircles[i][j][0]].cy=this.center4[i][j].cy1;
                    this.circles[ecircles[i][j][1]].cx=this.center4[i][j].cx2;
                    this.circles[ecircles[i][j][1]].cy=this.center4[i][j].cy2;
                    this.circles[ecircles[i][j][2]].cx=this.center4[i][j].cx3;
                    this.circles[ecircles[i][j][2]].cy=this.center4[i][j].cy3;
                    this.circles[ecircles[i][j][3]].cx=this.center4[i][j].cx4;
                    this.circles[ecircles[i][j][3]].cy=this.center4[i][j].cy4;
                    this.circles[ecircles[i][j][0]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][1]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][2]].color=this.grid[i][j];
                    this.circles[ecircles[i][j][3]].color=this.grid[i][j];
                }
            }
        }
        c.clearRect(0,0,canvas.width,canvas.height);
        this.drawGrid();
        for(var i=0;i<this.circles.length;i++){
            this.circles[i].draw();
        }
    }
}
var grid=new Grid();
grid.drawGrid();
var prevmouse={
    x:undefined,
    y:undefined
};
var mouse={
    x:undefined,
    y:undefined
};
function animate()
{
    requestAnimationFrame(animate);
    var s1=document.getElementById("span1");
    var s2=document.getElementById("span2");
    var r=0,b=0;
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<6;j++)
        {
            if(grid.grid[i][j]=="red")
            r+=grid.number[i][j];
            else if(grid.grid[i][j]=="blue")
            b+=grid.number[i][j];
        }
    }
    s1.innerHTML=r;
    s2.innerHTML=b;
    if(grid.isComplete()&&grid.on==0)
    { 
        alert(grid.winner()+" wins.");
        grid=new Grid();
        c.clearRect(0,0,canvas.width,canvas.height); 
        grid.drawGrid();
    }
    else if(grid.canSplit()&&grid.on==0)
    {
        split=[];
        for(var i=0;i<9;i++){
            for(var j=0;j<6;j++){
                if(grid.capacity[i][j]<grid.number[i][j])
                {
                    var s={i:i,j:j};
                    split.push(s);
                }
            }
        }
        grid.shrink(split);
        myMusic=new sound("Click.mp3");
        myMusic.play();
        c.clearRect(0,0,canvas.width,canvas.height);
        grid.drawGrid();
        for(var i=0;i<grid.circles.length;i++){
            grid.circles[i].draw();
        }
        grid.animate();
        grid.on=1;
    }
    else if((prevmouse.x!=mouse.x||prevmouse.y!=mouse.y)&&grid.on==0)
    {
        if(grid.contains(mouse.x,mouse.y))
        {
            var x=mouse.x;
            var y=mouse.y;
            var index=grid.indexOf(x,y);
            var i=index.i;
            var j=index.j;
            if((grid.color=='blue'&&grid.grid[i][j]!='red')||(grid.color=='red'&&grid.grid[i][j]!='blue'))
            {
                myMusic=new sound("Click.mp3");
                myMusic.play();
                if(grid.number[i][j]<4)
                {
                    grid.number[i][j]++;
                    if(grid.grid[i][j]==0)
                    grid.grid[i][j]=grid.color;
                }
                grid.circles=[];
                for(var i=0;i<9;i++){
                    for(var j=0;j<6;j++){
                        if(grid.number[i][j]==1){
                            grid.circles.push(new Circle(grid.center1[i][j].cx,grid.center1[i][j].cy,grid.radius,grid.grid[i][j],i,j));
                        }
                        else if(grid.number[i][j]==2){
                            grid.circles.push(new Circle(grid.center2[i][j].cx1,grid.center2[i][j].cy1,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center2[i][j].cx2,grid.center2[i][j].cy2,grid.radius,grid.grid[i][j],i,j));
                        }
                        else if(grid.number[i][j]==3){
                            grid.circles.push(new Circle(grid.center3[i][j].cx1,grid.center3[i][j].cy1,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center3[i][j].cx2,grid.center3[i][j].cy2,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center3[i][j].cx3,grid.center3[i][j].cy3,grid.radius,grid.grid[i][j],i,j));
                        }
                        else if(grid.number[i][j]==4){
                            grid.circles.push(new Circle(grid.center4[i][j].cx1,grid.center4[i][j].cy1,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center4[i][j].cx2,grid.center4[i][j].cy2,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center4[i][j].cx3,grid.center4[i][j].cy3,grid.radius,grid.grid[i][j],i,j));
                            grid.circles.push(new Circle(grid.center4[i][j].cx4,grid.center4[i][j].cy4,grid.radius,grid.grid[i][j],i,j));
                        }
                    }
                }
                c.clearRect(0,0,canvas.width,canvas.height);
                grid.drawGrid();
                for(var i=0;i<grid.circles.length;i++){
                    grid.circles[i].draw();
                }
                if(grid.canSplit())
                {
                    split=[];
                    for(var i=0;i<9;i++){
                        for(var j=0;j<6;j++){
                            if(grid.capacity[i][j]<grid.number[i][j])
                            {
                                var s={i:i,j:j};
                                split.push(s);
                            }
                        }
                    }
                    grid.shrink(split);
                    myMusic=new sound("Click.mp3");
                    myMusic.play();
                    c.clearRect(0,0,canvas.width,canvas.height);
                    grid.drawGrid();
                    for(var i=0;i<grid.circles.length;i++){
                        grid.circles[i].draw();
                    }
                    grid.animate();
                    grid.on=1;
                }
                else
                {
                    if(grid.color=='blue')
                    grid.color='red';
                    else
                    grid.color='blue';
                    c.clearRect(0,0,canvas.width,canvas.height);
                    grid.drawGrid();
                    for(var i=0;i<grid.circles.length;i++){
                        grid.circles[i].draw();
                    }
                }
            }
            prevmouse.x=mouse.x;
            prevmouse.y=mouse.y;
        }
    }
    else if(grid.on==1)
    {
        grid.move();
        if(!grid.canSplit())
        {
            if(grid.color=='blue')
            grid.color='red';
            else
            grid.color='blue';
            c.clearRect(0,0,canvas.width,canvas.height);
            grid.drawGrid();
            for(var i=0;i<grid.circles.length;i++){
                grid.circles[i].draw();
            }
        }
    }
}
animate();
window.addEventListener('click',function(event){
    prevmouse.x=mouse.x;
    prevmouse.y=mouse.y;
    mouse.x=event.x-200;
    mouse.y=event.y;
})
function newgame()
{
    c.clearRect(0,0,canvas.width,canvas.height);
    grid=new Grid();
    grid.drawGrid();
}
function black()
{
    document.getElementById("canvas").style.backgroundColor="black";
}
function white()
{
    document.getElementById("canvas").style.backgroundColor="white";
}
function yellow()
{
    document.getElementById("canvas").style.backgroundColor="yellow";
}