$(function(){
	"use strict";
	var APP_KEY = "d9avl1a43v2r96j";

	var client = new Dropbox.Client({key: APP_KEY});
	var theDatastore;
	var storageTable;
	beginAuthentication();

	function beginAuthentication(){

		// Try to finish OAuth authorization.
		client.authenticate({interactive: false}, function (error) {
		    if (error) {
		        alert('Authentication error: ' + error);
		    }
		});

		if (client.isAuthenticated()) {
		    // Client is authenticated. Display UI.
		    loadDatastore();
		}

	}


	function loadDatastore(){
		var datastoreManager = client.getDatastoreManager();
		datastoreManager.openDefaultDatastore(function (error, datastore) {
		    if (error) {
		        alert('Error opening default datastore: ' + error);
		        return;
		    }
		    theDatastore = datastore;
		    storageTable = theDatastore.getTable('passwords');
		});
	}
	$('.test-store').on('click', testStoreValue);
	function testStoreValue(){
		var mydataarray = new Uint8Array(25);
		for(var i = 0; i < 25; i++){
			mydataarray[i] = i;
		}

		console.log("Storing data");
		var stored = storageTable.insert({
			hello: mydataarray,
			key: "The key",
		});
	}
	$('.test-fetch').on('click', testFetchValue);
	function testFetchValue(){
		var results = storageTable.query({
			key: "The key",
		});
		var result = results[0].get('hello');
		console.log(result);
		console.log(typeof(result));
	}

});