function toast(user, msg = 'undefined'){
    let obj = document.getElementsByClassName('toast')[0];
    let text = document.getElementById('ttxt');
    text.innerHTML = msg;
    obj.style.display = 'inline';
    setTimeout(()=>{
      obj.style.display = 'none';
    }, 2000);
  }