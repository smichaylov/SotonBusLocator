Ext.regController('Search', {
 
    index: function()
	{
		if ( ! this.searchView)
		{
			this.searchView = this.render({
				xtype: 'SearchIndex',
			});
	 
			var cancelSearchBtn = this.searchView.query('#cancelSearchBtn')[0];

			cancelSearchBtn.setHandler(function(){
				this.searchView.hide();
			}, this);
		}
		
		panel.show();
	 
		this.searchView.show({
			type: 'slide',
			direction: 'up',
			duration: 500,
		});
	},
});