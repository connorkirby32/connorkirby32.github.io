

THREE.PointerLockControls = function ( camera ) {

	var scope = this;
	

	
	var rectLength = .2, rectWidth = .2;

	var rectShape = new THREE.Shape();
	rectShape.moveTo( 0,0);
	rectShape.lineTo( 0, rectWidth );
	rectShape.lineTo( rectLength, rectWidth );
	rectShape.lineTo( rectLength, 0 );
	rectShape.lineTo( 0, 0 );
	var rectGeom = new THREE.ShapeGeometry( rectShape );
	rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;		
	rectMesh.position.y = 10;


	camera.rotation.set( 0, 0, 0 );
	
	pitchObject = new THREE.Object3D();
	pitchObject.add( camera );
	pitchObject.add(rectMesh);
	var yawObject = new THREE.Object3D();
	yawObject.add( pitchObject );



	var PI_2 = Math.PI / 2;
	var onMouseMove = function ( event ) {
				
		if(!paused){
			if ( scope.enabled === false ) return;
				var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
				var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;


				yawObject.rotation.y -= movementX * 0.002;
				pitchObject.rotation.x -= movementY * 0.002;
				pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );


		}


	};

	document.addEventListener( 'mousemove', onMouseMove, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};
	

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

};