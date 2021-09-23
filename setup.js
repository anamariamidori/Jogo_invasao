
function start(){

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'></div>");
	$("#fundoGame").append("<div id='inimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    var jogo = {}
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar=true;
    var fimdejogo=false;
    var pontos=0;
    var perdidos=0;
    var energiaAtual=3;
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
    var TECLA = {
        up: 38,
        down: 40,
        space: 32
    }
    jogo.pressionou = [];

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    
        $(document).keyup(function(e){
           jogo.pressionou[e.which] = false;
    });
    

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
    placar();
    energia();
	
	}
    function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
    }

    function movejogador() {
	
        if (jogo.pressionou[TECLA.up]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);
            if (topo<=0) {
		
                $("#jogador").css("top",topo+10);
            }
            
        
        }
        
        if (jogo.pressionou[TECLA.down]) {
            
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);
            
            if (topo>=420) {	
            	$("#jogador").css("top",topo-10);
            
            }	
        }
        
        if (jogo.pressionou[TECLA.space]) {
            disparo();
        }
    
    }

    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
            if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",700);
            $("#inimigo1").css("top",posicaoY);
                
        }
    }

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",775);

					
	    }
    }

    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
                gamewin();                        
        }
    }

    function disparo() {
	
        if (podeAtirar==true) {
            
        podeAtirar=false;
        
        topo = parseInt($("#jogador").css("top"))
        posicaoX= parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;
        topoTiro=topo+37;
        $("#fundoGame").append("<div id='disparo'></div>");
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);
        somDisparo.play();
        
        var tempoDisparo=window.setInterval(executaDisparo, 30);
        
        } 
     
            function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
    
                if (posicaoX>900) {
                            
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;
                $("#disparo").remove();
                podeAtirar=true;
                        
            }
        } 
    } 

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));    
        console.log(colisao1);
    
    }

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
            
        if (colisao1.length>0) {
                
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);
        
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
            perdidos++;
            energiaAtual--;
        }

        if (colisao2.length>0) {
	
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
            perdidos++;
            energiaAtual--;
                
            reposicionaInimigo2();
                
        }
        if (colisao3.length>0) {
		
		
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
            pontos=pontos+50;
                
        }
        if (colisao4.length>0) {
		
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            pontos=pontos+100;
            
            reposicionaInimigo2();
                
        }
        if (colisao5.length>0) {
		
            reposicionaAmigo();
            $("#amigo").remove();
            perdidos++;
            energiaAtual--;
            somPerdido.play();
        }

        if (colisao6.length>0) {
	    
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
            perdidos++;
            energiaAtual--;
            somPerdido.play();
                    
            reposicionaAmigo();
                    
        }
        
    }

    function explosao1(inimigo1X,inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(./imgs/explosao.png)");
        var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        somExplosao.play();
        
        var tempoExplosao=window.setInterval(removeExplosao, 1000);
        
            function removeExplosao() {
                
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
                
            }
            
    }
    function explosao2(inimigo2X,inimigo2Y) {
	
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(./imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        somExplosao.play();
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
            function removeExplosao2() {
                
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
                
            }
    }

    function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 6500);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $("#fundoGame").append("<div id=inimigo2></div");
                velocidade=velocidade+0.2;
                
                }
                
        }	
    }

    function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 3000);
        
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
            
            $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            velocidade=velocidade+0.2;
            
            }
        }  
    }

    function explosao3(amigoX,amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;
        somExplosao.play();
                
        }
        
    }
    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + " Perdidos: " + perdidos + "</h2>");
        
    }
    function energia() {
	
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(./imgs/energia3.png)");
		}
	
		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(./imgs/energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(./imgs/energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(./imgs/energia0.png)");
			gameOver();

		}
	
	}
    function gameOver() {
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação  foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><buttom><i class='fas fa-play'></i>Jogar Novamente</buttom></div>");
    }
    function gamewin() {
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Parabens!! Você venceu </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><buttom><i class='fas fa-play'></i>Jogar Novamente</buttom></div>");
    }

}

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} 


