let objectCount = 0;
function Shell(r, noOfElectrons, orbitColor) {
	/*radius of shell*/
	this.radius = r ;
	/*# of electrons in shell*/
	this.noOfElectrons = noOfElectrons ;
	
	var orbit = new THREE.Group();
	var geometry = new THREE.CircleGeometry(this.radius, 1010);
	var angle = (2*Math.PI)/noOfElectrons ;
	geometry.vertices.shift();
	
	/*circle geometry which holds the electrons*/
	var circle = new THREE.Line(
		geometry,
		new THREE.LineDashedMaterial({color: orbitColor})
	);
	circle.rotation.x = Math.PI;
	/*positioning the electrons*/
        var start_angle = Math.random()*2 ;
	for(var i = start_angle; i < 2*Math.PI+start_angle; i += angle) {
		var electron = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.05, 32, 32),
			new THREE.MeshBasicMaterial({color: orbitColor})
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
	objectCount = 0;
	++objectCount ;
	nucleus.name = objectCount ;
	group.add(nucleus) ;
	var list = this.config , i = 0;
	while(list[i] != 0) {
		var electrons = list[i] ;
		var shell = new Shell(r, electrons, 'red') ;
		group.add(shell.orbit) ;
		r += 0.3 ; 
		i++ ;
	}
	return group ;
}
function secondModel() {
	/*electrons distribution*/
	var noOfElectrons = this.atomicNumber ;
	var group = new THREE.Group() , i = 1, r = 0.9;
	var nucleus = new THREE.Group() ;
	var list = this.config , i = 0;
	while(list[i] != 0) {
		var electrons = list[i] ;
		var shell = new Shell(r, electrons, 'red') ;
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
	
	/*end of code for nucleus*/
	return {
		'group' : group,
		'nucleus' : nucleus
	} ;	
}
function thirdModel() {
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
function Excitation(f, s, maxL) {
	var ph, e, e_flag = 1, ypoint, yypoint;
	points = [ [-10, -3, 0], [10, -3, 0]]
	var expo = 3 ;
	for(var i = maxL; i >= 0; i--) {
		var l = makeLine(points[0], points[1], i) ;
		l.name = ++objectCount ;
		scene.add(l) ;
		points[0][1] += expo ;
		points[1][1] += expo ;
		expo /= 2 ;
	}
	ypoint = -3 ;
	expo = 3 ;
	for(var i = f; i > 1; i--) {
		ypoint += expo ;
		expo /= 2;
	}
	yypoint = -3 ;
	expo = 3 ;
	for(var i = s; i > 1; i--) {
		yypoint += expo ;
		expo /= 2;
	}	
	var geometry = new THREE.SphereGeometry( 0.4, 32, 32 );
	var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 'springgreen', specular: 0x555555, shininess: 30 } );
	e = new THREE.Mesh(geometry, material) ;
	e.name = ++objectCount ;
	e.position.set(0, ypoint, 0) ;
	scene.add(e) ;
	
	var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
	var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 'blue', specular: 0x555555, shininess: 30 } );	
	ph = new THREE.Mesh(geometry, material) ;
	ph.name = ++objectCount ;
	ph.position.set(2, ypoint+2, 0) ;
	scene.add(ph) ;
	if(s <= f) {
		e.position.set(0, ypoint, 0) ;
		ph.position.set(0, ypoint, 0) ;
		var t = ypoint ;
		ypoint = yypoint ;
		yypoint = t ;
	}
	function makeLine(pointX, pointY, level) {
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
			if(e_flag && e.position.y < yypoint) {
				e.position.y += 0.01 ;
				ph.position.y += 0.01 ;
			} else if(e.position.y >= ypoint){
				e_flag = 0 ;
                                if(s <= f) {
				ph.position.x -= 0.2 ;
				ph.position.y += 0.2 ;
                            }
                                if(s <=f && e.position.y > -3) e.position.y -= 0.02 ;
			}
		}
		requestAnimationFrame(animateExcitation) ;
		render() ;
	}	
	animateExcitation() ;
}
