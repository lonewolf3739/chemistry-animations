function Shell(r, noOfElectrons) {
	/*radius of shell*/
	this.radius = r ;
	/*# of electrons in shell*/
	this.noOfElectrons = noOfElectrons ;
	
	var orbit = new THREE.Group();
	var geometry = new THREE.CircleGeometry(this.radius, 100);
	var angle = (2*Math.PI)/noOfElectrons ;
	geometry.vertices.shift();
	
	/*circle geometry which holds the electrons*/
	var circle = new THREE.Line(
		geometry,
		new THREE.LineDashedMaterial({color: 'grey'})
	);
	circle.rotation.x = Math.PI;
	/*positioning the electrons*/
	for(var i = 0; i < 2*Math.PI; i += angle) {
		var electron = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.05, 32, 32),
			new THREE.MeshBasicMaterial({color: 'grey'})
		);
		var x = r*(Math.cos(i)), y = r*(Math.sin(i));
		electron.position.set(x, y, 0);
		orbit.add(electron) ;	
	}
	orbit.add(circle);
	this.orbit = orbit ;
}
function Atom(atomicNumber, k, l, m, n, o, p, q) {
	this.atomicNumber = atomicNumber ;
	this.noOfElectrons = atomicNumber ;
	this.firstModel = firstModel ;
	this.secondModel = secondModel ;
	this.thirdModel = thirdModel ;
	var config = [k, l, m, n, o, p, q, 0] ;
	this.config = config ;
}
function firstModel() {
	var noOfElectrons = this.atomicNumber ;
	var group = new THREE.Group() , i = 1, r = 0.9;
	var nucleus = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.4, 32, 32),
		new THREE.MeshBasicMaterial({color : 0xffdae3})
	);
	++objectCount ;
	nucleus.name = objectCount ;
	group.add(nucleus) ;
	var list = this.config , i = 0;
	while(list[i] != 0) {
		var electrons = list[i] ;
		var shell = new Shell(r, electrons) ;
		group.add(shell.orbit) ;
		r += 0.3 ; 
		i++ ;
	}
	return group ;
}
function secondModel() {
	/*electrons distribution*/
        console.log("Hey second model");
	var noOfElectrons = this.atomicNumber ;
	var group = new THREE.Group() , i = 1, r = 0.9;
	var nucleus = new THREE.Group() ;
	var list = this.config , i = 0;
	while(list[i] != 0) {
		var electrons = list[i] ;
		var shell = new Shell(r, electrons) ;
		group.add(shell.orbit) ;
		r += 0.3 ; 
		i++ ;
	}
	/*end of electrons distribution*/
	
	/*code for nucleus*/
	var pro_col = "springgreen" ;
	var neu_col = "steelblue" ;
	var angle1, angle2, electrons = this.atomicNumber, multiplication_factor ;
	multiplication_factor = electrons/180 ;
		
	/*code for adding neutrons and protons*/
	for(var i = 0; i < electrons; i++) {
		angle1 = Math.acos( -1 + ( 2 * i ) / electrons );
		angle2 = Math.sqrt( electrons * Math.PI ) * angle1;
		var x =	Math.cos( angle2 ) * multiplication_factor * Math.sin( angle1 );
		var y = Math.sin( angle2 ) * multiplication_factor * Math.sin( angle1 );
		var z = Math.cos( angle1 ) * multiplication_factor ;
		var proton = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.1, 32, 32),
			new THREE.MeshBasicMaterial({color : pro_col})
		);
		proton.position.set(x, y, z) ;
		proton.name = "proton"+i ;
		nucleus.add(proton);
		var neutron = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.1, 32, 32),
			new THREE.MeshBasicMaterial({color : neu_col})
		);
		angle1 = Math.acos( -1 + ( 2 * i ) /  electrons );
		angle2 = Math.sqrt( 2 * electrons * Math.PI ) * angle1;
		x = Math.cos( angle2 ) * multiplication_factor *Math.sin( angle1 ) ;
		y = Math.sin( angle2 ) * multiplication_factor *Math.sin( angle1 ) ;
		z = Math.cos( angle1 ) * multiplication_factor  ;
		neutron.position.set(x, y, z) ;
		neutron.name = "neutron"+i ;
		nucleus.add(neutron);		
	}
	/*end of code for adding neutrons and protons*/
	++objectCount ;
	nucleus.name = objectCount ;
	scene.add(nucleus) ;
	
	/*end of code for nucleus*/
	return group ;	
}
function thirdModel() {
            console.log("Hey there");

	var noOfElectrons = this.atomicNumber ;
	var group = new THREE.Group() , i = 1, r = 0.9;
	var nucleus = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.4, 32, 32),
		new THREE.MeshBasicMaterial({color : 0xffdae3})
	);
	++objectCount ;
	nucleus.name = objectCount ;
	group.add(nucleus) ;
	
	var list = this.config , i = 0;
	while(list[i] != 0) {
		var electrons = list[i] ;
		var shell = new Shell(r, electrons) ;
		if(list[i+1] == 0) group.add(shell.orbit) ;
		r += 0.3 ; 
		i++ ;
	}
	return group ;
}
var ph, e, e_flag = 1, ypoint;
function Excitation(f, s) {
	points = [ [-10, -3, 0], [10, -3, 0], [-10, 0, 0], [10, 0, 0], [-10, 2, 0], [10, 2, 0]]
	for(var i = 0; i < 3; i++) {
		var l = makeLine(points[2*i], points[2*i+1]) ;
		l.name = ++objectCount ;
		scene.add(l) ;
	}
	s == 2 ? ypoint = 0 : ypoint = 2 ;
	var geometry = new THREE.SphereGeometry( 0.4, 32, 32 );
	var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 'springgreen', specular: 0x555555, shininess: 30 } );
	e = new THREE.Mesh(geometry, material) ;
	e.name = ++objectCount ;
	e.position.set(0, -3, 0) ;
	scene.add(e) ;
	var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
	var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 'blue', specular: 0x555555, shininess: 30 } );	
	ph = new THREE.Mesh(geometry, material) ;
	ph.name = ++objectCount ;
	ph.position.set(2, -1, 0) ;
	scene.add(ph) ;
	animateExcitation() ;
}
function makeLine(pointX, pointY) {
	var material = new THREE.LineBasicMaterial({ color: Math.random()*0xff1493, width : 10 });
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( pointX[0], pointX[1], pointX[2]),
		new THREE.Vector3( pointY[0], pointY[1], pointY[2])
	);	
	var line = new THREE.Line(geometry, material) ;
	return line ;
}
function animateExcitation() {
	if(ph.position.x > 0) {
		ph.position.x -= 0.02 ;
		ph.position.y -= 0.02 ;
	} else {
		if(e_flag && e.position.y < ypoint) {
			e.position.y += 0.01 ;
			ph.position.y += 0.01 ;
		} else {
			e_flag = 0 ;
			if(ph.position.y > -3) {
				ph.position.y -= 0.01 ;
				e.position.y -= 0.01 ;
			}
		}
	}
	requestAnimationFrame(animateExcitation) ;
	renderer.render(scene,camera);
}