$('#testJS').click(function () {
    alert("clicked")
})

// //add new person
// $('#addPersonSubmit').click(function(){
//     let personName = $('#addPersonName').val()
//     let personImage = $('#addPersonImage').prop('files')
//     // const $personSubmit = $('#addPersonSubmit')
//     var file = document.getElementById("addPersonImage")
//     var file1= file.files

//     var contents = $('#addPersonImage');
//     var contetns = contents.prop('files')
//     console.log($personName)
//     console.log($personImage)
// })

$("#addPersonForm").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    const $addPersonMessage = $('#addPersonMessage')
    var form = $(this);
    var url = '/testupload';
    let personName = $('#addPersonName').val()
    let files = $('#addPersonImage').prop('files')

    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let valuex
    if (format.test(personName)) {
        //chua kia tu dac biet
        valuex = true;
        $addPersonMessage.css("color","red")
        $addPersonMessage.html("Mã nhân viên không hợp lệ!")
        return
    }
    

    const batchOfFiles = new FormData();
    for (let j = 0; j < files.length; j++) {
        //batchOfFiles.append(personName, files[j]);
        batchOfFiles.append(`${personName}[${j}]`, files[j]);
    }
    $.ajax({
        type: "POST",
        url: url,
        data: batchOfFiles,
        contentType: false,
        processData: false,

        success: function (data) {
            alert(data); // show response from the php script.
        }
    });
});

// $("#addPersonForm").submit(function(e) {
//     e.preventDefault(); // avoid to execute the actual submit of the form.
//     var form = $(this);
//     var url = '/testupload';   
//     $.ajax({
//            type: "POST",
//            url: url,
//            data: form.serialize(), // serializes the form's elements.
//            success: function(data)
//            {
//                alert(data); // show response from the php script.
//            }
//          });
// });

function removeCamera(camID) {
    console.log("Removing camera: " + camID);
    $.ajax({
        type: "POST",
        url: "{{ url_for('remove_camera') }}",
        data: { 'camID': camID },
        success: function (cam) {
            console.log(cam);
            $('#removecam').html('Removing Camera');
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$('#checkin').click(function () {
    //getting selected option from dropdowns
    var camURL = document.getElementById("camURL").value;

    var e1 = document.getElementById("application");
    var application = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("detectionMethod");
    var detectionMethod = e2.options[e2.selectedIndex].value;
    var fpstweak = document.getElementById("fpstweak");

    alertstyle = "alert-success";


    var icon = '<i class="fa fa-video-camera fa-3x" aria-hidden="true"></i>'
    var icondiv = '<div class="product-info">' + icon + '</div>'

    if (detectionMethod == "opencv") {
        dlibDetection = false;
    }
    else {
        dlibDetection = true;
    }

    if (fpstweak == "checked") {
        fpstweak = true;
    }
    else {
        fpstweak = false;
    }

    $('#addcam').html('<i class="fa fa-spin fa-cog fa-3x fa-fw" style="font-size:12px;"></i> Adding Camera');

    console.log("Front end logging:" + camURL + " " + application + " " + detectionMethod + " FPS Tweak: " + fpstweak);
    $.ajax({
        type: "POST",
        url: '/checkin',
        data: { 'camURL': camURL, 'application': application, 'detectionMethod': dlibDetection, 'fpstweak': fpstweak },
        success: function (cam) {
            console.log(cam);

            // var camdiv = document.createElement("div");
            // camdiv .setAttribute("class","alert alert-dismissable " + alertstyle);   
            // var btn = document.createElement("BUTTON");        
            // btn.setAttribute("type","button");    
            // btn.setAttribute("class", "close"); 
            // btn.setAttribute("data-dismiss", "alert");  
            // btn.setAttribute("aria-hidden","true"); 
            // btn.setAttribute("onclick","removeCamera(this.id)"); 
            // btn.setAttribute("id","camera_" + cam.camNum);
            // btn.innerHTML = "&times;";
            // camdiv.innerHTML = '<div class="text-center"><span>' + icon + '<div><strong>Camera '+ cam.camNum + ' FPS: <strong id="camera_' + cam.camNum+ '_fps">' + "Loading... </strong></div><div>" +'<font size="0.9">' + camURL+'<font></span></div>';
            // camdiv.appendChild(btn);
            // document.getElementById("system-cameras").appendChild(camdiv);

            // var viddiv = document.createElement("div");
            // viddiv.setAttribute("class","col-md-4 col-sm-6 col-xs-12");  
            // var vidstream = document.createElement("img");
            // vidstream.setAttribute("class","img-thumbnail panel panel-default"); 
            // vidstream.setAttribute("id",cam.camNum); 
            // vidstream.setAttribute("src","/video_streamer/" + cam.camNum); 
            // vidstream.setAttribute("width","540"); 
            //  vidstream.setAttribute("height","320");
            // viddiv.appendChild(vidstream);
            // document.getElementById("surveillance_panel").appendChild(viddiv);

            // //$('#addcam').html('Add Camera');

        },
        error: function (error) {
            console.log(error);
        }
    });
})

$('#checkout').click(function () {
    //getting selected option from dropdowns
    var camURL = document.getElementById("camURL").value;

    var e1 = document.getElementById("application");
    var application = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("detectionMethod");
    var detectionMethod = e2.options[e2.selectedIndex].value;
    var fpstweak = document.getElementById("fpstweak");

    alertstyle = "alert-success";


    var icon = '<i class="fa fa-video-camera fa-3x" aria-hidden="true"></i>'
    var icondiv = '<div class="product-info">' + icon + '</div>'

    if (detectionMethod == "opencv") {
        dlibDetection = false;
    }
    else {
        dlibDetection = true;
    }

    if (fpstweak == "checked") {
        fpstweak = true;
    }
    else {
        fpstweak = false;
    }

    $('#addcam').html('<i class="fa fa-spin fa-cog fa-3x fa-fw" style="font-size:12px;"></i> Adding Camera');

    console.log("Front end logging:" + camURL + " " + application + " " + detectionMethod + " FPS Tweak: " + fpstweak);
    $.ajax({
        type: "POST",
        url: '/check_out',
        data: { 'camURL': camURL, 'application': application, 'detectionMethod': dlibDetection, 'fpstweak': fpstweak },
        success: function (cam) {
            console.log(cam);

            // var camdiv = document.createElement("div");
            // camdiv .setAttribute("class","alert alert-dismissable " + alertstyle);   
            // var btn = document.createElement("BUTTON");        
            // btn.setAttribute("type","button");    
            // btn.setAttribute("class", "close"); 
            // btn.setAttribute("data-dismiss", "alert");  
            // btn.setAttribute("aria-hidden","true"); 
            // btn.setAttribute("onclick","removeCamera(this.id)"); 
            // btn.setAttribute("id","camera_" + cam.camNum);
            // btn.innerHTML = "&times;";
            // camdiv.innerHTML = '<div class="text-center"><span>' + icon + '<div><strong>Camera '+ cam.camNum + ' FPS: <strong id="camera_' + cam.camNum+ '_fps">' + "Loading... </strong></div><div>" +'<font size="0.9">' + camURL+'<font></span></div>';
            // camdiv.appendChild(btn);
            // document.getElementById("system-cameras").appendChild(camdiv);

            // var viddiv = document.createElement("div");
            // viddiv.setAttribute("class","col-md-4 col-sm-6 col-xs-12");  
            // var vidstream = document.createElement("img");
            // vidstream.setAttribute("class","img-thumbnail panel panel-default"); 
            // vidstream.setAttribute("id",cam.camNum); 
            // vidstream.setAttribute("src","/video_streamer/" + cam.camNum); 
            // vidstream.setAttribute("width","540"); 
            //  vidstream.setAttribute("height","320");
            // viddiv.appendChild(vidstream);
            // document.getElementById("surveillance_panel").appendChild(viddiv);

            // //$('#addcam').html('Add Camera');

        },
        error: function (error) {
            console.log(error);
        }
    });


})


$('#addcam').click(function () {
    //getting selected option from dropdowns
    var camURL = document.getElementById("camURL").value;

    var e1 = document.getElementById("application");
    var application = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("detectionMethod");
    var detectionMethod = e2.options[e2.selectedIndex].value;
    var fpstweak = document.getElementById("fpstweak");

    alertstyle = "alert-success";


    var icon = '<i class="fa fa-video-camera fa-3x" aria-hidden="true"></i>'
    var icondiv = '<div class="product-info">' + icon + '</div>'

    if (detectionMethod == "opencv") {
        dlibDetection = false;
    }
    else {
        dlibDetection = true;
    }

    if (fpstweak == "checked") {
        fpstweak = true;
    }
    else {
        fpstweak = false;
    }

    $('#addcam').html('<i class="fa fa-spin fa-cog fa-3x fa-fw" style="font-size:12px;"></i> Adding Camera');

    console.log("Front end logging:" + camURL + " " + application + " " + detectionMethod + " FPS Tweak: " + fpstweak);
    $.ajax({
        type: "POST",
        url: '/add_camera',
        data: { 'camURL': camURL, 'application': application, 'detectionMethod': dlibDetection, 'fpstweak': fpstweak },
        success: function (cam) {
            console.log(cam);

            var camdiv = document.createElement("div");
            camdiv.setAttribute("class", "alert alert-dismissable " + alertstyle);
            var btn = document.createElement("BUTTON");
            btn.setAttribute("type", "button");
            btn.setAttribute("class", "close");
            btn.setAttribute("data-dismiss", "alert");
            btn.setAttribute("aria-hidden", "true");
            btn.setAttribute("onclick", "removeCamera(this.id)");
            btn.setAttribute("id", "camera_" + cam.camNum);
            btn.innerHTML = "&times;";
            camdiv.innerHTML = '<div class="text-center"><span>' + icon + '<div><strong>Camera ' + cam.camNum + ' FPS: <strong id="camera_' + cam.camNum + '_fps">' + "Loading... </strong></div><div>" + '<font size="0.9">' + camURL + '<font></span></div>';
            camdiv.appendChild(btn);
            document.getElementById("system-cameras").appendChild(camdiv);

            var viddiv = document.createElement("div");
            viddiv.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
            var vidstream = document.createElement("img");
            vidstream.setAttribute("class", "img-thumbnail panel panel-default");
            vidstream.setAttribute("id", cam.camNum);
            vidstream.setAttribute("src", "/video_streamer/" + cam.camNum);
            vidstream.setAttribute("width", "540");
            vidstream.setAttribute("height", "320");
            viddiv.appendChild(vidstream);
            document.getElementById("surveillance_panel").appendChild(viddiv);

            $('#addcam').html('Add Camera');

        },
        error: function (error) {
            console.log(error);
        }
    });


})
//retrainClassifier()
$('#retrain').click(function () {
    $('#retrain').html('<i class="fa fa-refresh fa-spin fa-3x fa-fw" style="font-size:12px;"></i> Retraining Database');

    $.ajax({
        type: "POST",
        url: '/retrain_classifier',
        data: {},
        success: function (results) {
            console.log(results.finished);

            $('#retrain').html('<i class="fa fa-refresh fa-fw"></i> Retrain Database');

        },
        error: function (error) {
            console.log(error);
        }
    });
})

function removeFace(id) {

    //var text=$('#' + id + '_input').html();
    var values = id.split('_');

    var name = values[0];
    var camera = values[1];
    var person = document.getElementById(name + "_" + camera); //remove person from div
    person.parentNode.removeChild(person);

    $.ajax({
        type: "POST",
        url: '/remove_face',
        data: { 'predicted_name': name, 'camera': camera },
        success: function (results) {
            console.log(results);
            var person = document.getElementById(name + "_" + camera); //sometimes faces get reloaded before before they have been deleted this ensures they are removed from the list
            person.parentNode.removeChild(person);

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function addFace(id) {

    var values = id.split('_');

    var name = values[0];
    var camera = values[1];

    if (values[2] == 'trust') {
        var trust = true
    }
    else {

        var trust = false
    }
    var newName = document.getElementById(name + "_" + camera + "_input").value;

    var person = document.getElementById(name + "_" + camera); //remove person from div
    person.parentNode.removeChild(person);


    $.ajax({
        type: "POST",
        url: "{{ url_for('add_face') }}",
        data: { 'person_id': name, 'new_name': newName, 'camera': camera, 'trust': trust },
        success: function (results) {
            console.log(results);

        },
        error: function (error) {
            console.log(error);
        }
    });

}

function createAlert() {
    //getting selected option from dropdowns
    emailAddress = document.getElementById("emailAddress").value;

    var confidence = document.getElementById("slider").value;


    var e = document.getElementById("cameras");
    var cam = e.options[e.selectedIndex].value;
    var e1 = document.getElementById("event");
    var eventd = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById("alarmstate");
    var alarm = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById("people");
    var pers = e3.options[e3.selectedIndex].text;

    var email = false;
    var push = false;
    var triggerA = false;
    var notifyP = false;


    if (document.getElementById("email").checked == true) {
        email = true;
        alertstyle = "alert-danger"
    }
    // if(document.getElementById("push").checked==true) {
    //     push = true;
    //     alertstyle = "alert-info"
    // }
    if (document.getElementById("trigger").checked == true) {
        triggerA = true;
        alertstyle = "alert-danger"
    }
    // if(document.getElementById("notify").checked==true) {
    //     notifyP = true;
    //     alertstyle = "alert-danger"
    // }


    //ajax post used to send alert data via json [ 'push_alert': push,'email_alert':email, 'trigger_alarm':triggerA, 'notify_police':notifyP]
    $.ajax({
        type: "POST",
        url: "{{ url_for('create_alert') }}",
        data: { 'camera': cam, 'eventdetail': eventd, 'alarmstate': alarm, 'person': pers, 'push_alert': push, 'email_alert': email, 'trigger_alarm': triggerA, 'notify_police': notifyP, 'emailAddress': emailAddress, 'confidence': confidence },
        success: function (results) {
            console.log(results);


            var alertdiv = document.createElement("div");
            alertdiv.setAttribute("class", "alert alert-dismissable " + alertstyle);
            var btn = document.createElement("BUTTON");
            btn.setAttribute("type", "button");
            btn.setAttribute("class", "close");
            btn.setAttribute("data-dismiss", "alert");
            btn.setAttribute("aria-hidden", "true");
            btn.setAttribute("onclick", "removeAlert(this.id)");
            btn.setAttribute("id", results.alert_id);
            btn.innerHTML = "&times;";
            alertdiv.innerHTML = results.alert_message;
            alertdiv.appendChild(btn);
            document.getElementById("alert-list").appendChild(alertdiv);

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function removeAlert(id) {
    $.ajax({
        type: "POST",
        url: "{{ url_for('remove_alert') }}",
        data: { 'alert_id': id },
        success: function (results) {
            console.log(results);

        },
        error: function (error) {
            console.log(error);
        }
    });
}

$(document).ready(function () {

    var socket = io.connect('http://' + document.domain + ':' + location.port + '/surveillance');

    var numbers_received = [];
    var people_received = [];

    $("#changestate").click(function () {
        socket.emit('alarm_state_change');
        return false;
    });

    $("#panic").click(function () {
        socket.emit('panic');
        return false;
    });

    socket.on('my response', function (msg) {           //socket.on used to define event handeler
        $('#log').append('<p>' + msg.data + '</p>');
    });

    $('form#emit').submit(function (event) {

    });

    $('form#broadcast').submit(function (event) {
        socket.emit('my broadcast event', { data: $('#broadcast_data').val() });
        return false;
    });

    socket.on('people_detected', function (json) {

        console.log("Received peopledata in Loop" + json);
        var people = JSON.parse(json);
        people_string = '';

        for (var i = 0; i < people.length; i++) {

            if (!document.getElementById(people[i].identity + "_" + people[i].camera)) {
                var img_string = "/get_faceimg/" + people[i].identity + "_" + people[i].camera + "#";

                /////////////////////////////////////////////////////////////////// Main divs
                var maindiv = document.createElement("div");
                maindiv.setAttribute("class", "col-md-3 ");
                maindiv.setAttribute("id", people[i].identity + "_" + people[i].camera);
                var thumbdiv = document.createElement("div");
                thumbdiv.setAttribute("class", "thumbnail ");
                /////////////////////////////////////////////////////////////////// img element
                var imgj = document.createElement("img");
                imgj.setAttribute("src", img_string + new Date().getTime());
                imgj.setAttribute("height", "100");
                imgj.setAttribute("width", "100");
                imgj.setAttribute("id", people[i].identity + "_" + people[i].camera + "_image");
                imgj.setAttribute("alt", "Random Name");
                imgj.setAttribute("class", "person"); //img-circle 
                //document.getElementById("progressbar").appendChild(imgj);
                thumbdiv.appendChild(imgj);
                /////////////////////////////////////////////////////////////////// name element
                var name = document.createElement("p");
                name.setAttribute("class", "text-center predictedName text-black");
                name.setAttribute("id", people[i].identity + "_" + people[i].camera + "_prediction");
                name.innerHTML = "<strong>" + people[i].prediction + "</strong>";
                thumbdiv.appendChild(name);
                /////////////////////////////////////////////////////////////////// button element
                var aligndiv = document.createElement("div");
                aligndiv.setAttribute("class", "pull-right");

                var btndiv = document.createElement("div");
                btndiv.setAttribute("class", "btn-group");
                var btn = document.createElement("BUTTON");
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "btn btn-default btn-xs dropdown-toggle");
                btn.setAttribute("data-toggle", "dropdown");

                var spn = document.createElement("span");
                spn.setAttribute("class", "caret");
                btn.appendChild(spn);

                var list = document.createElement("ul");
                list.setAttribute("class", "dropdown-menu text-centre");
                list.setAttribute("role", "menu");
                list.setAttribute("id", "faceActionList");


                var listitem = document.createElement("li");
                var inner = document.createElement("a");
                inner.setAttribute("id", people[i].identity + "_" + people[i].camera + "_remove");
                inner.setAttribute("onclick", "removeFace(this.id)");
                inner.innerHTML = "Remove";
                //addFace(id)
                listitem.appendChild(inner);
                list.appendChild(listitem);

                var listitem = document.createElement("li");
                var inner = document.createElement("a");
                inner.setAttribute("id", people[i].identity + "_" + people[i].camera + "_trust");
                inner.setAttribute("onclick", "addFace(this.id)");
                inner.innerHTML = "Trust";

                listitem.appendChild(inner);
                list.appendChild(listitem);

                var listitem = document.createElement("li");
                var inner = document.createElement("a");
                inner.setAttribute("data-toggle", "modal");
                inner.setAttribute("id", "addfacebtnID");
                inner.setAttribute("data-target", "#" + people[i].identity + "_" + people[i].camera + "_modal");
                inner.innerHTML = "Add New Face";

                listitem.appendChild(inner);
                list.appendChild(listitem);

                btndiv.appendChild(btn);
                btndiv.appendChild(list);
                aligndiv.appendChild(btndiv);

                //document.getElementById("progressbar").appendChild(btndiv);   
                thumbdiv.appendChild(aligndiv);
                ///////////////////////////////////////////////////////////////////  progress bar element                     
                var d1 = document.createElement("div");
                d1.setAttribute("class", "progress");
                var d2 = document.createElement("div");
                //var values = people[i].prediction.split('_');
                //var name = values[0];
                var conf = people[i].confidence;
                console.log("New Person: " + people[i].prediction + ":" + people[i].confidence);
                if (people[i].prediction != "unknown") {
                    d2.setAttribute("class", "progress-bar progress-bar-success");
                    d2.setAttribute("role", "progress-bar progress-bar-success");
                }
                else {

                    d2.setAttribute("class", "progress-bar progress-bar-danger");
                    d2.setAttribute("role", "progress-bar progress-bar-danger");
                    conf = people[i].confidence;
                }

                d2.setAttribute("aria-valuenow", "50");
                d2.setAttribute("aria-valuemin", "0");
                d2.setAttribute("aria-valuemax", "100");
                d2.setAttribute("style", "width:" + conf + "%");
                d2.innerHTML = conf + "%";
                d1.appendChild(d2);

                var info = document.createElement("span");
                info.setAttribute("id", "detectioinfo");
                info.setAttribute("style", "text-align:center; color:black; font-size:70%;");
                info.innerHTML = "Camera " + people[i].camera + "  -  " + people[i].timeD;


                /////////////////////////////////////////////////////////////////////////////////////

                var modal = document.createElement("div");
                modal.setAttribute("class", "modal modal-default fade col-md-3 text-center");
                modal.setAttribute("id", people[i].identity + "_" + people[i].camera + "_modal");
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("role", "dialog");
                modal.setAttribute("aria-labelledby", "myModalLabel");
                modal.setAttribute("aria-hidden", "true");



                var dialog = document.createElement("div");
                dialog.setAttribute("class", "modal-dialog");
                //modal.appendChild(dialog);

                var content = document.createElement("div");
                dialog.setAttribute("class", "modal-content");
                //dialog.appendChild(content);

                var header = document.createElement("div");
                header.setAttribute("class", "modal-header");
                //dialog.appendChild(content);

                var btn2 = document.createElement("BUTTON");
                btn2.setAttribute("type", "button");
                btn2.setAttribute("class", "close");
                btn2.setAttribute("data-dismiss", "modal");
                btn2.setAttribute("aria-hidden", "true");
                btn2.innerHTML = "&times;";

                header.appendChild(btn2);

                var title = document.createElement("h4");
                title.setAttribute("id", "myModalLabel");
                title.setAttribute("class", "modal-title text-black text-center");
                title.innerHTML = "Add face to Database";

                header.appendChild(title);
                content.appendChild(header);

                var body = document.createElement("div");
                body.setAttribute("class", "modal-body");

                var rowdiv = document.createElement("div");
                rowdiv.setAttribute("class", "row");

                var imgj1 = document.createElement("img");
                imgj1.setAttribute("src", img_string + new Date().getTime());
                imgj1.setAttribute("height", "100");
                imgj1.setAttribute("width", "100");
                imgj1.setAttribute("id", people[i].identity + "_" + people[i].camera + "_imageModal");
                imgj1.setAttribute("class", "person"); //img-circle 

                rowdiv.appendChild(imgj1);

                body.appendChild(rowdiv);

                var name = document.createElement("h4");
                name.setAttribute("class", "text-center text-black");
                name.setAttribute("id", people[i].identity + "_" + people[i].camera + "nameID");
                var values = people[i].prediction.split('_');
                var nameprediction = values[0];
                name.innerHTML = "<strong>" + nameprediction + " ?</strong>";

                body.appendChild(name);

                var form = document.createElement("div");
                form.setAttribute("class", "form-group has-primary");

                var input = document.createElement("input");
                input.setAttribute("class", "form-control");
                input.setAttribute("placeholder", "Enter Name");
                input.setAttribute("type", "text");
                input.setAttribute("id", people[i].identity + "_" + people[i].camera + "_input");

                form.appendChild(input);
                body.appendChild(form);

                content.appendChild(body);

                var footer = document.createElement("div");
                footer.setAttribute("class", "modal-footer");
                //dialog.appendChild(content);

                var btn3 = document.createElement("BUTTON");
                btn3.setAttribute("type", "button");
                btn3.setAttribute("class", "btn btn-primary pull-right");
                btn3.setAttribute("data-dismiss", "modal");
                btn3.setAttribute("aria-hidden", "true");
                btn3.setAttribute("id", people[i].identity + "_" + people[i].camera + "_add");
                btn3.setAttribute("onclick", "addFace(this.id)");
                btn3.innerHTML = "Add Face";

                footer.appendChild(btn3);

                content.appendChild(footer);
                dialog.appendChild(content);
                modal.appendChild(dialog);

                thumbdiv.appendChild(d1);
                thumbdiv.appendChild(info);

                maindiv.appendChild(thumbdiv);


                document.getElementById("detected-faces").appendChild(maindiv);
                document.getElementById("detected-faces").appendChild(modal);
            }
            else {

                var x = document.getElementById(people[i].identity + "_" + people[i].camera).getElementsByClassName("progress-bar");

                for (var j = 0; j < x.length; j++) {
                    console.log("Updating detected face");
                    var values = people[i].prediction.split('_');
                    var name = values[0];
                    var conf = people[i].confidence;
                    ///////////////////////
                    if (name != "unknown") {
                        x[j].setAttribute("class", "progress-bar progress-bar-success");
                        x[j].setAttribute("role", "progress-bar progress-bar-success");
                        var y = document.getElementById(people[i].identity + "_" + people[i].camera).getElementsByClassName("predictedName");
                        y[0].innerHTML = "<strong>" + people[i].prediction + "</strong>";

                    }
                    else {

                        // x[j].setAttribute("class","progress-bar progress-bar-failure");
                        // x[j].setAttribute("role","progress-bar progress-bar-failure");
                        conf = people[i].confidence;
                    }

                    //////////////////////                          
                    x[j].setAttribute("style", "width:" + conf + "%");
                    x[j].innerHTML = conf + "%";
                }
                console.log("Updating image: " + people[i].identity);
                var img_string = "/get_faceimg/" + people[i].identity + '_' + people[i].camera + "#";
                $('#' + people[i].identity + "_" + people[i].camera + '_image').attr('src', img_string + new Date().getTime()); //jquery used to update image
                $('#' + people[i].identity + "_" + people[i].camera + "_imageModal").attr('src', img_string + new Date().getTime()); //update modal image 
            }

            //console.log(people_string);

        }


    });

    socket.on('alarm_status', function (json) {

        console.log("Alarm Status: " + json);
        var alarm_status = JSON.parse(json);

        if (alarm_status.triggered == true) {

            $("#alarmStatus").html("Alarm Triggered");
        }
        else {
            $("#alarmStatus").html(alarm_status.state);

        }

    });


    socket.on('system_monitoring', function (json) {

        console.log("System Monitoring: " + json);
        var systemState = JSON.parse(json);
        var i = 0;
        for (; i < systemState.processingFPS.length; i++) {
            // document.getElementById( "camera_" + i + "_fps").text = systemState.processing_fps[i];
            $("#camera_" + i + "_fps").html(systemState.processingFPS[i]);


        }

        document.getElementById("cpu_usage").value = systemState.cpu;
        document.getElementById("memory_usage").value = systemState.memory;

    });

    socket.on('system_data', function (json) {

        console.log("System Data: " + json);
        var system_data = JSON.parse(json);
        var person;
        var i = 0;
        people_string = '';
        for (; i < system_data.people.length; i++) {
            people_string = people_string + '<option>' + system_data.people[i] + '</option>';
        }
        $('#people').html(people_string);

        var i = 0;
        camera_string = '';
        for (; i < system_data.camNum; i++) {
            camera_string = camera_string + '<option value="' + i.toString() + '"> Camera ' + i + '</option>';
        }
        camera_string = camera_string + '<option value="All">All</option>';
        $('#cameras').html(camera_string);

        if (system_data.onConnect == true) {

            //  var myNode = document.getElementById("foo");
            //  while (myNode.firstChild) {
            //       myNode.removeChild(myNode.firstChild);
            // }

            var icon = '<i class="fa fa-video-camera fa-3x" aria-hidden="true"></i>'
            var icondiv = '<div class="product-info">' + icon + '</div>'

            var i = 0;
            for (; i < system_data.cameras.length; i++) {

                var elementExists = document.getElementById("camera_" + system_data.cameras[i].camNum)
                if (elementExists != null) {
                    break
                }

                console.log("Cameras:" + system_data.cameras[i]);
                var camdiv = document.createElement("div");
                camdiv.setAttribute("class", "alert alert-dismissable alert-success");
                var btn = document.createElement("BUTTON");
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "close");
                btn.setAttribute("data-dismiss", "alert");
                btn.setAttribute("aria-hidden", "true");
                btn.setAttribute("onclick", "removeCamera(this.id)");
                btn.setAttribute("id", "camera_" + system_data.cameras[i].camNum);
                btn.innerHTML = "&times;";
                camdiv.innerHTML = '<div class="text-center"><span>' + icon + '<div><strong>Camera ' + system_data.cameras[i].camNum + ' FPS: <strong id="camera_' + system_data.cameras[i].camNum + '_fps">' + "Loading... </strong></div><div>" + '<font size="0.9">' + system_data.cameras[i].url + '<font>' + '</span></div>';
                camdiv.appendChild(btn);
                document.getElementById("system-cameras").appendChild(camdiv);


                var viddiv = document.createElement("div");
                viddiv.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
                var vidstream = document.createElement("img");
                vidstream.setAttribute("class", "img-thumbnail panel panel-default");
                vidstream.setAttribute("id", system_data.cameras[i].camNum);
                vidstream.setAttribute("src", "/video_streamer/" + system_data.cameras[i].camNum);
                vidstream.setAttribute("width", "540");
                viddiv.appendChild(vidstream);
                document.getElementById("surveillance_panel").appendChild(viddiv);

            }
            console.log("Alerts:" + system_data.alerts);
            var i = 0;
            for (; i < system_data.alerts.length; i++) {

                var elementExists = document.getElementById(system_data.alerts[i].alert_id)
                if (elementExists != null) {
                    break
                }


                var alertdiv = document.createElement("div");
                alertdiv.setAttribute("class", "alert alert-dismissable alert-danger");
                var btn = document.createElement("BUTTON");
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "close");
                btn.setAttribute("data-dismiss", "alert");
                btn.setAttribute("aria-hidden", "true");
                btn.setAttribute("onclick", "removeAlert(this.id)");
                btn.setAttribute("id", system_data.alerts[i].alert_id);
                btn.innerHTML = "&times;";
                alertdiv.innerHTML = system_data.alerts[i].alert_message;
                alertdiv.appendChild(btn);
                document.getElementById("alert-list").appendChild(alertdiv);

            }

        }



    });


});
