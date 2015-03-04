<html>
<head>

<script type="text/javascript" src="../js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.8.17.custom.min.js"></script>
<link rel="stylesheet" media="all" type="text/css" href="css/wallcalendar.css" />
<script type="text/javascript" src="js/wallcalendar.plugin.js"></script>


<script type="text/javascript">
	$(document).ready(function() {
		$('#leavechart').wallcalendar( {eventsfeed:'leaveevents.cfm', rows:[{id:1368,title:'Jake Bourne'},{id:1139,title:'Andrew Graham'},{id:1257,title:'Mark Thomas'},{id:1142,title:'Vicki Harris'}],
		legend:[{id:1,tooltip:'Full day',classname:'full',colour:'#f00'},{id:4,tooltip:'Flexi day',classname:'flexi',colour:'#ff0'},{id:3,classname:'public',tooltip:'Public holiday',colour:'#f0f'},{id:5,classname:'half',tooltip:'Half day',colour:'#0ff'}] });

		$('#roombookings').wallcalendar( {rows:[{id:1,title:'Harlech 1'},{id:2,title:'Harlech 2'},{id:3,title:'Alexander'},{id:4,title:'Board Room'}],
		legend:[{id:1,tooltip:'Booked',classname:'roombooked',colour:'#f00'},{id:2,tooltip:'Free',classname:'roomfree',colour:'#00f'}] });
	});

	function day_clicked() {
		//alert('day clicked!');
	}
</script>
</head>
<body>
	<div id="leavechart"></div>
	<div style="margin-top:50px;" id="roombookings"></div>
</body>
</html>
