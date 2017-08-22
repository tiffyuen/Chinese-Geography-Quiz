fillInImages();

function hamburgeronclick(i,labels, j) {
	return function() { 
		var menu = document.getElementById("clickedMenu"+i);
		var nodes = document.getElementById("labelDiv"+i).childNodes;
		var flexy = document.getElementById("parentDiv" + i);
		nodes.forEach(function (div) {
			childDiv = document.getElementById('div'+i+'p0');
			//if(div.firstChild.style.visibility == "visible") {
				console.log("change to hidden");
				//div.firstChild.style.visibility = "hidden";//}
			//else div.firstChild.style.visibility = "visible";
		});
		var parentDiv = document.getElementById("labelDiv"+i);
                parentDiv.style.display = "flex";
                parentDiv.style.flexDirection = "row";
                parentDiv.style.width = "200px";
                parentDiv.style.height = "auto";
                parentDiv.style.border = "2px solid #4c2c1c";
                flexy.appendChild(parentDiv);

		if(menu.style.dislplay === "none" || menu.style.display === "") { menu.style.display = "flex"; }
		else if(menu.style.display == "flex"){ menu.style.display = ""; }
		//console.log("labels for " + i + ": " + labels);
		listenChangeTags(i,labels,j);
	};
}

function listenChangeTags(i, labels, j) {
	console.log("changeHta" + i);
		var changeTag = document.getElementById("changeTags"+i);
		console.log("changeTag" + changeTag);
		changeTag.onclick = changeTagsonclick(i,labels,j);
	//document.getElementById("labelDiv"+i).style.display = "block";
}

function changeTagsonclick(i,labels, j) {
        return function() {
		j = 0;
		console.log("ham2");
		//var flexy = document.getElementById("parentDiv" + i);

                document.getElementById("labelDiv"+i).style.position = "absolute";
                var nodes = document.getElementById("labelDiv"+i).childNodes;
                nodes.forEach(function (div) {
			div.style.display = "flex";
			div.style.flexDirection = "row";
			div.style.position = "relative";
                       // childDiv = document.getElementById('div'+i+'label'+);
			//childDiv.getElementsByTagName('img').style.display = "block";
//div.firstChild.style.display == "block";
//div.firstChild.style.visibility == "block"
//div.firstChild.style.display == "block";
if(div.firstChild.style.display == "flex") {
                                console.log("change to hidden");
                                //div.firstChild.style.display == "block";
                                div.firstChild.style.display = "none";}
                        else {div.firstChild.style.display = "flex";}
			//document.getElementById('div'+i+'label'+ j).style.flexDirection = "row";
			j = j + 1;
                        /*if(div.firstChild.style.visiblity == "visible") {
                                console.log("change to hidden");
				//div.firstChild.style.display == "block";
                                div.firstChild.style.visibility = "hidden";}
                        else {div.firstChild.style.visibility = "visible";}*///div.firstChild.style.display == "none";}
                });
		//TODO: make x and words align, small div width align with box
		/*var parentDiv = document.getElementById("labelDiv"+i);
		parentDiv.style.display = "flex";
		parentDiv.style.flexDirection = "row";
                parentDiv.style.width = "200px";
                parentDiv.style.height = "auto";
                parentDiv.style.border = "2px solid #4c2c1c";
		flexy.appendChild(parentDiv);*/
                //if(menu.style.dislplay === "none" || menu.style.display === "") { menu.style.display = "flex"; }
                //else if(menu.style.display == "flex"){ menu.style.display = ""; }
                console.log("labels for " + i + ": " + labels);
                //changeTagsonclick(i,labels,j);
        };
}


function labelonclick(i,label,obj) {
	return function() {
		console.log("label " + label + " i:" + i);
		var oReq = new XMLHttpRequest();
		oReq.open('GET', "http://138.68.25.50:10126/query?img=" + obj.fileName + "&op=delete&label=" + label);
		oReq.send();
	}
}

function imgStuff(obj,i) {
	var container = document.getElementById("photosContainer");
	var photoObj = obj.fileName;
	var parentDiv = document.createElement("div");
	var menuImg = document.createElement("img");
	var newImg = document.createElement("img");
	var labelDiv = document.createElement("div");
	var clickedMenu = document.createElement("div");
	var changeTags = document.createElement("p");
	var addFave = document.createElement("p");
	var blankDiv = document.createElement("div");
	var menuImg1 = document.createElement("img");	
	var arr = obj.labels.split(",");	

	parentDiv.className = "flexy";
	menuImg.className = "tagMenu";
	newImg.className = "flickrPhoto";		
	labelDiv.className = "labels";							
	clickedMenu.className = "clicked";

	parentDiv.id = "parentDiv"+i;
	menuImg.src="photobooth/optionsTriangle.png";
	menuImg.id="menuImg"+i;
	labelDiv.id="labelDiv"+i;
	newImg.src = "../" + photoObj;	
	clickedMenu.id="clickedMenu"+i;		
	blankDiv.id = "blank";

	changeTags.id = "changeTags" + i;	
	changeTags.innerHTML = "change tags";
	addFave.innerHTML = "add to favorites";	
	blankDiv.id = "blank";
	menuImg1.src="photobooth/optionsTriangle.png";i
	menuImg.id="menuImg1"+i;
	console.log("length for " + i + ": " + arr.length);
	if(arr.length > 1) {
		for(var j = 0; j < arr.length; j++) {
			temp = document.createElement("div");
			tempImg = document.createElement("img");
			tempP = document.createElement("p");

			tempImg.src = "photobooth/removeTagButton.png";
			tempImg.style.width="15px";
			tempImg.style.height="15px";

			tempImg.id="div" + i + "label" + j;
			tempImg.onclick = labelonclick(i,arr[j],obj);
			tempP.id="div" + i + "p" + j;
			tempP.innerHTML=arr[j];
			temp.appendChild(tempImg);
			temp.appendChild(tempP);
			labelDiv.appendChild(temp);
			labelDiv.style.display = "flex";
                	labelDiv.style.flexDirection = "row";
                	labelDiv.style.width = "200px";
                	labelDiv.style.height = "auto";
          	        labelDiv.style.border = "2px solid #4c2c1c";
                	//flexy.appendChild(parentDiv);
			//tempImg.style.visiblity = "hidden";
			tempImg.style.display = "none";
			//labelDiv.style.display="none";
		}
	}
	//add text to clicked hamburger
	clickedMenu.appendChild(changeTags);
	clickedMenu.appendChild(addFave);
        clickedMenu.appendChild(blankDiv);
	blankDiv.appendChild(menuImg1);
	//adding everything to the container
	container.appendChild(parentDiv);			
	parentDiv.appendChild(newImg);
	parentDiv.appendChild(menuImg);
	parentDiv.appendChild(clickedMenu);
	parentDiv.appendChild(labelDiv);
	
	menuImg.onclick = hamburgeronclick(i,obj.labels, arr.length);
	menuImg1.onclick = hamburgeronclick(i,obj.labels, arr.length);
}


var data;
function fillInImages() {
	var oReq = new XMLHttpRequest();
 	oReq.open("GET","http://138.68.25.50:10126/query?op=dump");
	oReq.send();

	oReq.onreadystatechange = function() {
		if(oReq.readyState == 4 && (oReq.status == 200)) {
			data = JSON.parse(oReq.responseText);
			console.log(data);
 			var i = 0;
	
			for(i = Object.keys(data).length -1; i > -1; i--) { imgStuff(data[i],i); }
		}
  	}	
}
function uploadFile() {
    var url = "http://138.68.25.50:10126";

    // where we find the file handle
    var selectedFile = document.getElementById('fileSelector').files[0];
    var formData = new FormData();
    // stick the file into the form
    formData.append("userfile", selectedFile);

    // more or less a standard http request
    var oReq = new XMLHttpRequest();

// create progress bar
    var o = document.getElementById("progress");
    o.style.display = "block";
    var progress = o.appendChild(document.createElement("p"));
    //progress.appendChild(document.createTextNode("upload " + file.name));
    // progress bar
    oReq.upload.addEventListener("progress", function(e) {
        var pc = parseInt(100 - (e.loaded / e.total * 100));
        progress.style.backgroundPosition = pc + "% 0";
    }, false);

    // file received/failed
	oReq.onreadystatechange = function(e) {
		if(oReq.readyState == 4) { progress.className = (oReq.status == 200 ? "success" : "failure"); }
    };

    // POST requests contain data in the body
    // the "true" is the default for the third param, so
    // it is often omitted; it means do the upload
    // asynchornously, that is, using a callback instead
    // of blocking until the operation is completed.
    oReq.open("POST", url, true);
// the response, in case we want to look at it
    oReq.onload = function() {	console.log("hi " + oReq.responseText); }
    oReq.send(formData);
    //Fade image
    var image = document.getElementById('theImage');
    var fr = new FileReader();
    console.log("fader");
    fr.onload = function() { image.src = fr.result; };
    fr.readAsDataURL(selectedFile);

}
function displayNav() {
	nav = document.getElementById("uploadDropDown");
	if(nav.style.display == "" || nav.style.display === "none") { nav.style.display = "block";	}
	else { nav.style.display = "none";	}
}
function displayFilter() {
	var nav = document.getElementById("filterBar");
	var enter = document.getElementById("filterEnter");
	var clear = document.getElementById("filterClear");
	if(nav.style.display == "" || nav.style.display === "none") {
		nav.style.display = "block";
		enter.style.display="inline";
		clear.style.display="inline";
	}
	else {
		nav.style.display = "none";
		enter.style.display="none";
		clear.style.display="none";
	}
}

function showFav(){};
