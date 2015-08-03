
angular.module('app').factory('elementManagerSvc', function (mapSvc) {
	var ElementManager = function(elementName,elementIcon,elementIconSelected){
		this.elementIcon = elementIcon;
		this.elementIconSelected = elementIconSelected;
		this.elementName = elementName;
		this.elementMarker = undefined;
		this.listElements = [];
		this.model = undefined;
		this.elementSvc = undefined;
		this.selectedItemsIndex = [];
	};


	ElementManager.prototype = {
		addElement:function(element){
			var l = element.location;
			console.log('ElementManager.add'+this.elementName,element,l);
			
			var center = new google.maps.LatLng(l.latitude,l.longitude);
			var parent = this;
			var elementMarker = new google.maps.Marker({
			    position: center,
			    map: mapSvc.getMap(),
			    icon: this.elementIcon,
			    elementName:element
			  });
			console.log('Added marker at : ',center)
			// this.elementMarker = elementMarker;
			// add listener
			google.maps.event.addListener(elementMarker, 'click', function(event) {
			    console.log("click "+element.i);
			    parent.selectElement(element.i,elementMarker);
			    // parent.scope.$digest();
			  	// droneMarker.setMap(null);
			});

			google.maps.event.addListener(elementMarker, 'mouseover', function() {
			    console.log("mouseover");
			    elementMarker.setAnimation(null);
			    // elementMarker.setAnimation(google.maps.Animation.BOUNCE);
			});
			google.maps.event.addListener(elementMarker, 'mouseout', function() {

			     
			});
			element.i = this.listElements.length;
			this.listElements.push(elementMarker);

			return elementMarker;
		},
		moveElement:function(i,l){
			// console.log('moveElement',l.location);
			this.listElements[i].setPosition(new google.maps.LatLng(l.latitude,l.longitude));
		},
		showElement:function(i,value){
			var list = this.listElements;
			// console.log('showElement',i,value);
			if(value){
					list[i].setMap(AdminMapUtil.map);
				}
			else
				list[i].setMap(null);

		},
		// add new elemenet on location,
		// i will be appended with the name of ellement	
		newElement:function(location,i){
			if(i==undefined)
				i = this.listElements.length;
			var element =  {name: this.elementName+'-'+i, location: location,i:i};
			// add to front end
			this.addElement(element);
			// save it to db
			// this.elementSvc.save(element);
		},
		addElements:function(listElements){
			// console.log('Map ',AdminMapUtil.map);
			// console.log('addElements',this.elementName,listElements);
			for (var i = 0; i < listElements.length; i++) {
			//for (var i = listElements.length - 1; i >= 0; i--) {
				var elements = listElements[i];
				elements.i = i;
				// console.log('addElements',elements)
				// apend index for dron indentification
				// elements.i = i;
				this.addElement(elements);
			};
		},
		selectElement:function(index,marker){
			marker.setIcon(this.elementIconSelected);
			this.selectedItemsIndex.push(marker);
		},
		unselectElement:function(i,marker){
			marker.setIcon(this.elementIcon);
			this.selectedItemsIndex.push(marker);
		},
		unselectElements:function(){
			for (var i = this.listElements.length - 1; i >= 0; i--) {
				this.unselectElement(i,this.listElements[i]);
			};
		},


		showElements:function(value){
			var list = this.listElements;
			// console.log('showElements',this.elementName,value,this.model[this.elementName])
			for (var i = list.length - 1; i >= 0; i--) {
				if(value && this.isActive()){
				//	console.log('this.elementName',this.elementName);
					list[i].setMap(AdminMapUtil.map);

				}
				else
					list[i].setMap(null);
			};
		},	
		setModel: function(model){
			this.model = model;
		},
		setService:function(elementSvc){
			this.elementSvc= elementSvc;
		},
		query:function(){
			var parent = this;
			var elements = this.elementSvc.query(function(){
				console.log('Elementssssss',elements);
	            parent.addElements(elements);
	        });
		},isActive:function(){
			//console.log("parent.isActive");
			return this.model[this.elementName];
		}
	};



	return ElementManager;
});
