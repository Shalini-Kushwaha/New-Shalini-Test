//create win object
// test
var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});

var textbox = Ti.UI.createTextField({
	width : '200',
	height : '70'
});

var btnSubmit = Ti.UI.createButton({
	id : 'button',
	top : '75%',
	left : 0,
	height : 30,
	width : 100
});

btnSubmit.addEventListener('click', function() {
	var emailStr = textbox.value;
	var flag = validEmail(emailStr);
	alert(flag);
});
function validEmail(emailStr) {
	//Return true/false for valid/invalid email
	formatTest = /^[\w!#$%&\'*+\-\/=?^`{|}~]+(\.[\w!#$%&\'*+\-\/=?^`{|}~]+)*@[a-z\d]([a-z\d-]*[a-z\d])?(\.[a-z\d]([a-z\d-]*[a-z\d])?)*\.[a-z]{2,6}$/;
	lengthTest = /^(.{1,64})@(.{4,255})$/;
	Ti.API.info('**** email str output ' + formatTest.test(emailStr));
	Ti.API.info('**** email length output ' + formatTest.test(emailStr));
	
	var endofString = emailStr.split('@');
    var ending = endofString.length - 1;
    var domain = endofString[ending];
    
    Ti.API.info('******* domain ' + domain);

	//var url = 'dnscheck.php?domain=gmail.com';
	// var url = 'http://tracert.com/resolve_exe.html?arg=' + domain;
	var url = 'http://www.nmonitoring.com/show-mx-record.html?ip=' + domain + '&mxsub=1';
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			alert(e.error);
			alert('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  /* in milliseconds */
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
	
}

win.add(btnSubmit);
win.add(textbox);
win.open();
