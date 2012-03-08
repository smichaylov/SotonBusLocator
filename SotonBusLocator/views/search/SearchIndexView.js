SotonBusLocator.views.SearchIndex = Ext.extend(Ext.Panel, {
    cls: 'search-panel',
    floating: true,
    floatingCls: '',
 
    dockedItems: [{
        xtype: 'toolbar',
        items: [
            {
                xtype: 'searchfield',
                flex: 1,
				placeHolder: '  Search for Bus stop',
            },
			{
				itemId: 'searchBtnAction',
				iconCls: 'search',
				iconMask: true,
				ui: 'action',
			},
			{
                text: 'Cancel',
                itemId: 'cancelSearchBtn',
                ui: 'light',
            } 
        ],
    }],
});
Ext.reg('SearchIndex', SotonBusLocator.views.SearchIndex);