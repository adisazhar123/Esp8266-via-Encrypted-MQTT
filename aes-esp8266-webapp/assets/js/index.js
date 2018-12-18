  let btnRed = document.getElementById('btn-red');
  let btnYellow = document.getElementById('btn-yellow');
  let btnGreen = document.getElementById('btn-green');

  btnRed.addEventListener('click', function(){
    io.socket.post('/publish/red', {}, function(resData, jwRes){
      console.log(jwRes);
      console.log(resData);
    });
  });

  btnYellow.addEventListener('click', function(){
    io.socket.post('/publish/yellow', {}, function(resData, jwRes){
      console.log(jwRes);
      console.log(resData);
    });
  });

  btnGreen.addEventListener('click', function(){
    io.socket.post('/publish/green', {}, function(resData, jwRes){
      console.log(jwRes);
      console.log(resData);
    });
  });
