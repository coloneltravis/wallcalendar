

(function( $ ) {

	var methods = {

		init : function(options) {

			var settings = {
				'eventsfeed'	: '',
				'rows'			: [{id:1,title:'row1'},{id:2,title:'row2'},{id:3,title:'row3'}],
				'legend'		: [{id:1,tooltip:'Full day',classname:'full',colour:'#f00'},{id:4,tooltip:'Flexi day',classname:'flexi',colour:'#ff0'},{id:3,classname:'public',tooltip:'Public holiday',colour:'#f0f'},{id:5,classname:'half',tooltip:'Half day',colour:'#0ff'}]
			};

			return $(this).each(function() {
				var config = $.extend(settings, options);

				var myid = $(this).attr('id');
				var today = new Date();
				methods.drawNav(today, myid);
				methods.drawRows(today, config.rows, myid);

				$(this).append("<div class='wallcalendar-popup' id='" + myid + "-wallcalendar-popup'/>");

				$(this).data('config', settings);
			});
		},

		drawNav : function(thisdate, myid) {
			var navid = myid + '-navheader';

			if ((thisdate.getMonth()-1) < 0) {
				var previd = myid + '-prev-' + (thisdate.getFullYear()-1) + '-' + '11';
			}
			else var previd = myid + '-prev-' + (thisdate.getFullYear()) + '-' + (thisdate.getMonth()-1);

			if ((thisdate.getMonth()+1) > 11) {
				var nextid = myid + '-next-' + (thisdate.getFullYear()+1) + '-' + '0';
			}
			else var nextid = myid + '-next-' + (thisdate.getFullYear()) + '-' + (thisdate.getMonth()+1);

			$('#' + myid).append('<div class="navheader" id="' + navid + '" />');
			$('#' + navid).append('<a href="#" class="wallcalendar-nav-prev" id="' + previd + '">&lt;&lt;&lt;</a>');
			$('#' + navid).append(methods.getMonthYear(thisdate));
			$('#' + navid).append('<a href="#" class="wallcalendar-nav-next" id="' + nextid + '">&gt;&gt;&gt;</a>');
	
			//$('#' + previd).append("<img src='images/prev.png' alt='&lt;&lt;&lt;' />");
			//$('#' + nextid).append("<img src='images/next.png' alt='&gt;&gt;&gt;' />");

			$('#' + previd).bind('click.wallcalendar', methods.gotomonth);
			$('#' + nextid).bind('click.wallcalendar', methods.gotomonth);			
		},

		drawRows : function(thisdate, rows, myid) {
			var yy = thisdate.getFullYear();
			var mm = thisdate.getMonth()+1;
			var daysinmonth = methods.DaysInMonth(yy, mm-1);

			var tblid = myid + '-tbl';
			$('#' + myid).append('<table cellspacing="0" id="' + tblid + '"/>');
			$('#' + tblid).addClass("tbl-wallcalendar");

			for (var row = 0; row < rows.length; row++) {
				var rowtitle = rows[row].title;
				var rowid = myid + '-r' + rows[row].id;

				$('#' + tblid).append('<tr id="' + rowid + '"/>');
				$('#' + rowid).append('<th style="white-space:nowrap;" class="col">' + rowtitle + '</th>');

				for (dd = 1; dd <= daysinmonth; dd++) {

					dd = '00' + dd;
					var len = dd.length;
					dd = dd.substr(len-2);	

					mm = '00' + mm;
					len = mm.length;
					mm = mm.substr(len-2);
					
					var colid = rowid + '-d' + yy + mm + dd;
					$('#' + rowid).append('<td class="col day" id="' + colid + '">' + dd + '</td>');
				}
			}
			
		},

		getMonthYear : function(thisdate) {
			switch(thisdate.getMonth()) {
				case 0 : return 'January' + ' ' + thisdate.getFullYear();
				break;
				case 1 : return 'February' + ' ' + thisdate.getFullYear();
				break;
				case 2 : return 'March' + ' ' + thisdate.getFullYear();
				break;
				case 3 : return 'April' + ' ' + thisdate.getFullYear();
				break;
				case 4 : return 'May' + ' ' + thisdate.getFullYear();
				break;
				case 5 : return 'June' + ' ' + thisdate.getFullYear();
				break;
				case 6 : return 'July' + ' ' + thisdate.getFullYear();
				break;
				case 7 : return 'August' + ' ' + thisdate.getFullYear();
				break;
				case 8 : return 'September' + ' ' + thisdate.getFullYear();
				break;
				case 9 : return 'October' + ' ' + thisdate.getFullYear();
				break;
				case 10 : return 'November' + ' ' + thisdate.getFullYear();
				break;
				case 11 : return 'December' + ' ' + thisdate.getFullYear();
				break;
			}
		},
		
		
		DaysInMonth : function (y,m) { return 32 - new Date(y,m,32).getDate(); },

		gotomonth : function(e) {
			var params = e.target.id.split('-');
			var yy = params[2];
			var mm = params[3];

			var d = new Date();
			d.setFullYear(yy);
			d.setMonth(mm);

			var myid = $(this).parent().parent().attr('id');
			var config = $('#' + myid).data('config');

			$('#' + myid).empty();
			methods.drawNav(d, myid);
			methods.drawRows(d, config.rows, myid);

			methods.loadData(d, myid);

			//$('td.col').css("width", config.daysize);

			return false;
		},

		findLegend : function(myid, id) {
			var config = $('#' + myid).data('config');

			for (var key = 0; key < config.legend.length; key++) {
				if (config.legend[key].id == id) {
					return config.legend[key];
				}
			}
			
			return null;
		},
		
		popup : function(e) {
			
		},

		loadData : function(thisdate, myid) {
			var config = $('#' + myid).data('config');
			$.ajax({url:config.eventsfeed, data:'mmyy=' + Math.round(thisdate.getTime()/1000),
								success: function(res) {
									$.each(res, function(i, el) {
										//alert(el.id + ' ' + el.start + ' ' + el.type);
										var itemid = myid + '-r' + el.id + '-d' + el.start.substr(0,6);
										
										var start = el.start.substr(6);
										var end = el.end.substr(6);


										var legend = methods.findLegend(myid, el.type);

										if (legend != null) {
											for (var d = Number(start); d <= Number(end); d++) {
												var dd = '00' + d.toString();
												var len = dd.length;
												dd = dd.substr(len-2);

												$('#' + itemid + dd).addClass(legend.classname);
												$('#' + itemid + dd).attr("title", legend.tooltip);
												$('#' + itemid + dd).css("background-color", legend.colour);
												$('#' + itemid + dd).css("background-image", legend.backimage);
												$('#' + itemid + dd).bind('mouseover.wallcalendar', function(e){methods.popup();} );
											}
										}
									});
								}
			});
		}
	};


	$.fn.wallcalendar = function(method) {
	    if ( methods[method] ) {
	        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	      }
	    else if ( typeof method === 'object' || ! method ) {
	        return methods.init.apply( this, arguments );
	    }
	    else {
	        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    } 
	};
	
}) (jQuery);

