SotonBusLocator.views.Viewport = Ext.extend(Ext.Panel, {    fullscreen: true,	html: 	'<div style="display: none;">'+				'<div id="lipsum">'+					'<p>Help is not available yet!</p>'+				'</div>'+			'</div>',    layout: 'card',    cardSwitchAnimation: 'slide',    dockedItems: [        {        	xtype: 'toolbar',        	title: 'Soton Bus Locator',        	items: [    	        {    	            text: 'Back',    	            itemId: 'backBtn',    	            ui: 'back',    	        },				{					text: ' Current Location',					iconCls: 'locate',    	            itemId: 'locateBtn', 					iconMask: true,										ui: 'action',    	        },				{					xtype: 'spacer'				},				{    	            					xtype: 'selectfield',					name: 'options',					itemId: 'selectMenu', 					options: [						{text: 'Select Bus', value: '0'},						{text: 'U1', value: '1'},						{text: 'U2', value: '2'},						{text: 'U3', value: '3'},						{text: 'U4', value: '4'},						{text: 'U5', value: '5'},						{text: 'U6', value: '6'},						{text: 'U7', value: '7'},						{text: 'U8', value: '8'},						{text: 'U9', value: '9'},						{text: 'U10', value: '10'}					],									    	        },    	        {					text: ' Search',    	            itemId: 'searchBtn',    	            iconCls: 'search',    	            iconMask: true,    	            ui: 'action',    	        },				{					text: ' Help',					iconCls: 'info',					itemId: 'helpBtn', 					iconMask: true,					ui: 'action',									},    	    ],        },    ],});