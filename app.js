function GenerateStartStop(){
    disp();
    var start = document.getElementById("start");
	var str = start.options[start.selectedIndex].text; //getting start point
    var stop = document.getElementById("stop");
	var st = stop.options[stop.selectedIndex].text; //getting end point
    sessionStorage.setItem('key',str);
    sessionStorage.setItem('val',st);
    var stFinal= sessionStorage.getItem('key')    
    var strFinal= sessionStorage.getItem('val')
    console.log(stFinal);
    document.getElementById('start1').innerText=stFinal
    document.getElementById('stop1').innerText=strFinal
    
}
function disp(){
    var ele = document.getElementsByName('ppl')
    for(i=0;i<ele.length;i++){
        if(ele[i].checked){
            sessionStorage.setItem('ppl',ele[i].value) //Retrieving number of tickets from input
            
        }
        
    }
}
  
function getroutes(source,dest){
    if(source == dest){
        sessionStorage.setItem('fare',0);
        distance = 0;
        sessionStorage.setItem('bus',"You can't take a bus to the same place");
        return;

    }
    var routes = [['500D','Hebbala Bridge', 'Kempapura', 'Veeranapalya', 'Manyatha Tech Park', 'Junction Of Nagavara', 'HBR Layout', 'Kalyananagara Bus Station', 'Babusabpalya', 'Banasawadi', 'Vijaya Bank Colony', 'Ramamurthy Nagara', 'Kasthuri Nagara', 'Tin Factory', 'K.R.Puram Railway Station', 'B.Narayanapura', 'Mahadevapura', 'Emc 2', 'Doddanekkundi', 'Rainbow Hospital', 'Karthiknagara', 'Marathhalli Bridge','Marathahalli Innovative Multiplex', 'Kadubisanahalli', 'New Horizon College', 'Devarabisanahalli', 'Intel Ring Road', 'Cs-Accenture B7 Eco Space', 'Bellanduru Junction', 'Bellanduru', 'Ibbaluru', 'Agara Junction', 'H.S.R B.D.A Complex', 'H.S.R. Layout (S.I. Apartment)', 'Central Silk Board'],['600A','Madiwala','Forum Mall','Central Silk Board']];
    var dis = [['500D',0,0.4,1.5,2.3,2.8,3.5,5.3,5.6,6.9,8.0,9.1,10.4,10.9,11.6,12,13,14,15.2,15.5,16,17,18.5,20,21,21.8,22.3,23,23.5,23.8,24.5,26,28,29,30.6],['600A',0,1,1.5]];
    //Routes - List of routes with name
    //Dis - List of distances from initial stop
    var distance = [];
    var Spres = [-1,-1];
    var Dpres = [-1,-1];
    var fare = 0;
    var scount = 0;
    for(let i=0;i<routes.length;i++){
        for(let j=0;j<routes[i].length;j++){
            if(source == routes[i][j]){
                Spres = [i,j]; //Finding source stop in routes
                //break;
            }
        }
        if(Spres[0] != -1 && Dpres[0] != -1){ //Checking if destination is in the same route as source
            for(let j=0;j<routes[i].length;j++){
                if(dest == routes[i][j]){
                    Dpres = [i,j];
                    //break; 
                }
            if(Dpres[0] != -1){
                //break;
            }
            }
        } 
        else if(Spres[0] != -1 && Dpres[0] == -1){ 
            //If destination is in different route, we find the route where it is present
            for(let j = 0; j < routes.length;j++){
                for(let k = 0;k<routes[j].length;k++){
                    if(dest == routes[j][k])
                        Dpres = [j,k];
                }
            }
        }
        else{

        }
    }
    console.log(Spres + " : " + Dpres);
    if(Spres[0] == -1 || Dpres[0]==-1){
        console.log("Not found");
    }
    else if(Spres[0] == Dpres[0]){ // If source and dest are in same route
        distance.push(Math.abs(dis[Dpres[0]][Dpres[1]] - dis[Spres[0]][Spres[1]]));
        if(dis[Spres[0]].length < 6)
            fare+=5;
        else
            fare += parseInt(Math.abs(dis[Dpres[0]][Dpres[1]] - dis[Spres[0]][Spres[1]]) / parseInt((dis[Spres[0]][dis[Spres[0]].length-1] - dis[Spres[0]][1]) /6)+1)*5 ;
    }
    else if(Spres[0] != Dpres[0]){ //If  source and dest are in different routes
        var common = [];
        for(let i = 0;i<routes[Spres[0]].length;i++){
            for(let j = 0;j<routes[Dpres[0]].length;j++){
                if(routes[Dpres[0]][j] == routes[Spres[0]][i]){
                    common.push(routes[Dpres[0]][j]); //storing all common stops
                }
            }
        }
        var min_dist = 10000;
        var min_loc = '';
        for(let i = 0; i<common.length;i++){
            if(((Math.abs(dis[Spres[0]][routes[Spres[0]].indexOf(common[i])] - dis[Spres[0]][Spres[1]])) + Math.abs(dis[Dpres[0]][routes[Dpres[0]].indexOf(common[i])] - dis[Dpres[0]][Dpres[1]])) < min_dist){
                min_loc = common[i];
                //min_dist is calculating minimum distance (min fare) from point 'A' to 'C'
                //min_loc stores the stop to change buses
                min_dist = ((Math.abs(dis[Spres[0]][routes[Spres[0]].indexOf(common[i])] - dis[Spres[0]][Spres[1]])) + Math.abs(dis[Dpres[0]][routes[Dpres[0]].indexOf(common[i])] - dis[Dpres[0]][Dpres[1]]));
                if(dis[Spres[0]].length > 6)
                    fare += dis[Spres[0]][routes[Spres[0]].indexOf(common[i])] / (dis[Spres[0]][(dis[Spres[0]].length)-1]/6) * 5;
                else
                    fare += 5;
                if(dis[Dpres[0]].length > 6)    
                    fare += dis[Dpres[0]][routes[Dpres[0]].indexOf(common[i])] / (dis[Dpres[0]][(dis[Dpres[0]].length)-1]/6) * 5;
                else
                    fare += 5;
            }
        }
        distance =  min_dist;
    }

    scount = Number(localStorage.getItem(source+" : "+dest)) + 1; //incrementing count from that source to dest
    localStorage.setItem(source+" : "+dest,scount);
    sessionStorage.setItem('fare',fare);
    if(Spres[0] == Dpres[0])
        sessionStorage.setItem('bus',routes[Spres[0]][0]);
    else
        sessionStorage.setItem('bus',routes[Spres[0]][0] + " and " + routes[Dpres[0]][0] + " switch at " + min_loc);
}
// function generateQRCode() {
        
//     if (c4) {
//       let qrcodeContainer = document.getElementById("qrcode");
//       qrcodeContainer.innerHTML = "";
//     //   new QRCode(qrcodeContainer, c4);
//     //   /*With some styles*/
//       let qrcode= document.getElementById(".qrcode");
//     //   qrcodeContainer2.innerHTML = "";
//       new QRCode(qrcode, {
//         text: c4,
//         width: 128,
//         height: 128,
//         colorDark: "#5868bf",
//         colorLight: "#ffffff",
//         correctLevel: QRCode.CorrectLevel.H
//       });
//       document.getElementById("#qr").style.display = "block";
//     } else {
//       alert("Please enter a valid URL");
//     }
//   }


function CheckSessionVar(){
    var c1 = sessionStorage.getItem('key');
    var c2 = sessionStorage.getItem('val'); 
    getroutes(c1,c2);
    var c3 = Number(sessionStorage.getItem('fare'))
    var c4= Number(sessionStorage.getItem('ppl'));
    console.log(c4);
    c3 = c3*c4;
    var c5 = sessionStorage.getItem('bus');
    console.log(c1);
    console.log(c2); 
    document.getElementById('fare').innerText=c3//total
    document.getElementById('start1').innerText=c1//from
    document.getElementById('stop1').innerText=c2 //to
    document.getElementById('pno').innerText=c4//number of tickets
    document.getElementById('routeno').innerText=c5 //route numbers
    ///////

    //////

    //////

    // function generateQRCode() {

        // var c3 = Number(sessionStorage.getItem('fare'))
      
        if (c3) {
        //   let qrcodeContainer = document.getElementById("qrcode");
         // qrcodeContainer.innerHTML = "";
        //  new QRCode(qrcodeContainer, c3);
        //   /*With some styles*/
          let qrcodeContainer2 = document.getElementById("qrcode");
          qrcodeContainer2.innerHTML = "";
          new QRCode(qrcodeContainer2, {
            text: `${c4}`,
            width: 128,
            height: 128,
            colorDark: "#5868bf",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
          document.getElementById("qrcode").style.display = "block";
        } else {
          alert("Please enter a valid URL");
        }
    //   }

}

