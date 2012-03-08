SotonBusLocator.views.SearchIndex = Ext.extend(Ext.Panel, {
	fullscreen:true,
    dockedItems: [{
        xtype: 'map',
        items: [
            {
                xtype: 'map',
                itemId: 'gmap'
            },
        ],
    }],
});
Ext.reg('SearchIndex', SotonBusLocator.views.SearchIndex);