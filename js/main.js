// If you don't want the particles, change the following to false:
const doParticles = true;




// Do not mess with the rest of this file unless you know what you're doing :P

function getWidth() { // credit to travis on stack overflow
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
if (doParticles) {
	if (getWidth() < 400) $.firefly({minPixel: 1,maxPixel: 2,total: 20});
	else $.firefly({minPixel: 1,maxPixel: 3,total: 40});
}

// This is for the click to copy
let t;
$(document).ready(()=>{
	t = $(".ip").html();
})
$(document).on("click","server_address",()=>{
	let copy = document.createElement("textarea");
	copy.style.position = "absolute";
	copy.style.left = "-99999px";
	copy.style.top = "0";
	copy.setAttribute("id", "ta");
	document.body.appendChild(copy);
	copy.textContent = t;
	copy.select();
	document.execCommand("copy");
	$("server_address").html("<span class='extrapad'>IP copied!</span>");
	setTimeout(function(){
		$("server_address").html(t);
		var copy = document.getElementById("ta");
		copy.parentNode.removeChild(copy);
	},800);
});


// This is to fetch the player count
$(document).ready(()=>{
  const ip = $(".sip").attr("data-ip");
  const port = $(".sip").attr("data-port");

  $.ajaxSetup({

  })

  $.get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`, {
      headers:{
          'Access-Control-Allow-Origin': '*'}
  }, (result)=>{
    if (result.online) {
        $(".sip").html('<span class="highlight">' + result.players.now + '</span>');
    } else {
        $(".playercount").html("<a href='javascript:void(0);' onclick='copyServer(server_address)'><h2 id='server_play'>Join us at <span class='highlight' id='server_address'>play.gridmc.io</span>!</h2></a>");
    }
  });

  setInterval(()=>{
    $.get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`, {
              headers:{
          'Access-Control-Allow-Origin': '*'}
  },
     (result)=>{
      if (result.online) {
        $(".sip").html('<span class="highlight">' + result.players.now + '</span>');
      } else {
        $(".playercount").html("<a href='javascript:void(0);' onclick='copyServer(server_address)'><h2 id='server_play'>Join us at <span class='highlight' id='server_address'>play.gridmc.io</span>!</h2></a>");
      }
    });
  }, 3000);
});

function copyServer(element) {
  //var server_ip = document.getElementById('server_address')
  var range, selection, worked;


  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  try {
    document.execCommand('copy');
        Swal.fire({
          position: 'center',
          icon: 'success',
          html: '<b>play.gridmc.io</b> has been copied to your clipboard. Paste it into your minecraft launcher.',
          showConfirmButton: false,
          timer: 3000
        })
  }
  catch (err) {
      Swal.fire({
          position: 'center',
          icon: 'info',
          html: 'Type <b>play.gridmc.io</b> into your Minecraft launcher to join!',
          showConfirmButton: true,
          timer: 3000
        })
  }
}