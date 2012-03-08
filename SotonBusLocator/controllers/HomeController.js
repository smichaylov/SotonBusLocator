Ext.regController('Home', {
 
	index: function(options)
    {
        if ( ! this.indexView)
        {
            this.indexView = this.render({
                xtype: 'HomeIndex',
            });
        }
		
		//var helpBtn = this.application.viewport.query('#helpBtn')[0];
        //helpBtn.hide();
		
		panel.hide();
		
		var selectMenu = this.application.viewport.query('#selectMenu')[0];
        selectMenu.hide();
		
		var searchBtn = this.application.viewport.query('#searchBtn')[0];
        searchBtn.hide();
		
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.hide();
		
		var locateBtn = this.application.viewport.query('#locateBtn')[0];
        locateBtn.hide();
     
        this.application.viewport.setActiveItem(this.indexView, options.animation);
    },
	
	//-----------------------------------------------------------------------------------------------------------------------------
    nearest: function()
    {
        if ( ! this.nearestView)
        {
            this.nearestView = this.render({
                xtype: 'HomeNearest',
            });
        }
		
		panel.show();
	
		/*
		if (panelHidden) 
			app.viewport.dockedItems.items[0].show();
		else
			app.viewport.dockedItems.items[0].hide();
		panelHidden = !panelHidden;
		*/
		//SotonBusLocator.items[0].rendered = false;
		//SotonBusLocator.doLayout();
		
		
		var selectMenu = this.application.viewport.query('#selectMenu')[0];
        selectMenu.show();
     
		//var searchBtn = this.application.viewport.query('#searchBtn')[0];
        //searchBtn.show();
		
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();
		
		var locateBtn = this.application.viewport.query('#locateBtn')[0];
        locateBtn.show();
        
        backBtn.setHandler(function()
		{
        	Ext.dispatch({
        	    controller: 'Home',
        	    action: 'index',
        	    historyUrl: 'Home/index',
        	    animation: {
        	        type: 'slide',
        	        reverse: true,
        	    },
        	});
		});
		
        this.application.viewport.setActiveItem(this.nearestView);
    },
	
	//-----------------------------------------------------------------------------------------------------------------------------
    specific: function()
    {
        if ( ! this.specificView)
        {
            this.specificView = this.render({
                xtype: 'HomeSpecific',
            });
        }
		
		panel.show();
		
		var selectMenu = this.application.viewport.query('#selectMenu')[0];
        selectMenu.hide();
     
		var searchBtn = this.application.viewport.query('#searchBtn')[0];
        searchBtn.show();
		
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();
		
		var locateBtn = this.application.viewport.query('#locateBtn')[0];
        locateBtn.show();
        
        backBtn.setHandler(function()
		{
        	Ext.dispatch({
        	    controller: 'Home',
        	    action: 'index',
        	    historyUrl: 'Home/index',
        	    animation: {
        	        type: 'slide',
        	        reverse: true,
        	    },
        	});
		});
        
        this.application.viewport.setActiveItem(this.specificView);
    },
	
	//-----------------------------------------------------------------------------------------------------------------------------
    destination: function()
    {
        if ( ! this.destinationView)
        {
            this.destinationView = this.render({
                xtype: 'HomeDestination',
            });
        }
		
		panel.show();
		
		var selectMenu = this.application.viewport.query('#selectMenu')[0];
        selectMenu.hide();
		
		var searchBtn = this.application.viewport.query('#searchBtn')[0];
        searchBtn.show();
		
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();
		
		var locateBtn = this.application.viewport.query('#locateBtn')[0];
        locateBtn.show();
        
        backBtn.setHandler(function()
		{
        	Ext.dispatch({
        	    controller: 'Home',
        	    action: 'index',
        	    historyUrl: 'Home/index',
        	    animation: {
        	        type: 'slide',
        	        reverse: true,
        	    },
        	});
		});
        
        this.application.viewport.setActiveItem(this.destinationView);
    },
});