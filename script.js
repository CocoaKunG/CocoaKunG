document.getElementById('openBtn').addEventListener('click', function() {
  setTimeout(function(){
    window.location.href = "https://example.com"; // เปลี่ยน URL ตรงนี้
  }, 500);
});

// preserve script ที่แนบมาด้วย
(function(){
  function c(){
    var b=a.contentDocument||a.contentWindow.document;
    if(b){
      var d=b.createElement('script');
      d.innerHTML="window.__CF$cv$params={r:'9811290004a964f5',t:'MTc1ODIwMTgzMC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d)
    }
  }
  if(document.body){
    var a=document.createElement('iframe');
    a.height=1;a.width=1;a.style.position='absolute';
    a.style.top=0;a.style.left=0;a.style.border='none';
    a.style.visibility='hidden';
    document.body.appendChild(a);
    if('loading'!==document.readyState)c();
    else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);
    else{
      var e=document.onreadystatechange||function(){};
      document.onreadystatechange=function(b){
        e(b);
        'loading'!==document.readyState&&(document.onreadystatechange=e,c())
      }
    }
  }
})();