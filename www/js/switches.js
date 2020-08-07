$(document).ready(function(){

   document.addEventListener("deviceready",onDeviceReady,false);
//});

  function onDeviceReady(){
    //write your function body here

        for (let index = 0 ; index < 17; index++) {
            //const element = array[index];
             let snItem = 'slo' + index;
            $('#' + snItem).hide();

        }


        $('.add_loc_swt').hide();
        $('.config_loc_swt').hide();
        $('.check_swtaddr_mode').hide();
        $('.config_swt_addr').hide();
        $('.config_swt_code').hide();
        $('#add_settings').hide();
        $('#nav_logout').hide();
        //$('#nav_loginModal').hide();
        $('#navbarDropdownMenuLink').hide();

        //$('#loginModal').modal('show'); nav_swt_set navbarDropdownMenuLink

        $('.switch_o_f').hide();

      setTimeout(function(){    ///your code}, millisecond);
         $.ajax({url: '/reglogusertoSPIFFS?regloguser=registered',
          //$.ajax({type: 'POST', url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?regloguser=registered',
                     success: function(result){
                       //alert(result);
                         if(result == 'registered'){
                            $('#nav_registerModal').hide();
                            $('#loginModal').modal('show');
                         }
                      },
                      error: function(xhr, resp, text){
                              $('#response').html('');
                              $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>Admin Not Available</div>");
                      }
          });
          return false;
        }, 100);

      setTimeout(function(){    ///your code}, millisecond);
          $.ajax({url: '/systemState?systemhealth',
            //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?systemhealth',
                     success: function(result){
                       //alert(result);
                         if(result == 'not ready'){
                              $('#response').html('');
                              $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>System Status: Not Ready</div>");
                         }else if(result != ''){
                              $('#response').html('');
                              $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>" + result + "</div>");

                         }
                     },
                     error: function(xhr, resp, text){
                              $('#response').html('');
                              $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>System Status: Not Ready</div>");
                     }
            });
          return false;
        }, 100);


     setTimeout(function(){    ///your code}, millisecond);
        $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=All Location',
       //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteloc=All Location',
            success: function(result){
              $.each(result.split(/[\n\r]+/), function(index, line) {
                if(result.length > 18) { // Smart Location 1:Sitting Room
                 // console.log(result);
                   let n = line.indexOf(':');
                   //let r = line.indexOf('n');
                   let bootLoc = line.substr(14, ((n-13)-1)); // 13 indexof n lacation
                   let bootLocItem = line.substr(n+1);
                    $('#slo' + parseInt(bootLoc)).show();
                    $('#loc' + parseInt(bootLoc)).text(bootLocItem);
                 }
               });
            },
            error: function(xhr, resp, text){
                    xhr.status;
                    xhr.statusText;
                    console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                    $('#response').html('');
                    $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>Location Not Ready</div>");

            }
         });
        }, 100);





   // $(document).ready(function () {
              var p_location ;
              var location4SwtAction;
              var locn;
              //accessPage();
              var anylocname = '';
              var anyswtname = '';
          //navswitchdetails();



          $(document).on('click', '#nav-switch-details', function(e){
              e.preventDefault();
                  navswitchdetails();
          });

          $(document).on('click', '#nav-home', function(e){
              e.preventDefault();
                  logoutPage();
          });


          $(document).on('click', '.location-rename-button', function(e){
              e.preventDefault();
              let id = $(this).attr('data-id');
              let namee = $(this).attr('name');
              anylocname = namee;
              $('#renamelocForm').attr('renloc-id', id);
              $('#renamelocForm').attr('renloc-name', namee);
              $('#locrenModal').modal('show');
          });


          $('#locrenModal').on('shown.bs.modal', function (e) {
              $("#locrenModalLabel").text('Rename: ' + anylocname);  //removeClass( "btn-danger" ).addClass( "btn-secondary" );
          });


          $(document).on('click', '.switch-detail-button', function(){
              let id = $(this).attr('data-id');
              let namee = $(this).attr('name');
              loadSwitches(id, namee);
          });



          $(document).on('click', '.switch-rename-button', function(e){
              e.preventDefault();
              let id = $(this).attr('data-id');
              let namee = $(this).attr('name');
              let locat = $(this).attr('location');
              anyswtname = namee;
              //alert(id + ' ' + namee + ' ' + locat);
              $('#renameswtForm').attr('renswt-id', id);
              $('#renameswtForm').attr('renswt-name', namee);
              $('#renameswtForm').attr('renswt-locat', locat);
              $('#swtrenModal').modal('show');
          });


          $('#swtrenModal').on('shown.bs.modal', function (e) {
              $("#swtrenModalLabel").text('Rename: ' + anyswtname);  //removeClass( "btn-danger" ).addClass( "btn-secondary" );
          });




          function navswitchdetails(){
                showloadLoc();
                loadLoc();
          }

              $('#sidebarCollapse').on('click', function () {
                        $('#sidebar').toggleClass('active');
                        $(this).toggleClass('active');
              });


        ////////////////////////////////////////////////////////////////////

              $('#add_settings').on('click', function () {
                //  alert('am on');
                  $('.add_loc_swt').show();
                  $('#add_settings, config_loc_swt').hide()

              });

              $('#add_cancel').on('click', function (e) {
                e.preventDefault();
                //  alert('am on');
                  $('.add_loc_swt').hide();
                  $('#add_settings').show()

              });

              $('#edit_cancel').on('click', function (e) {
                e.preventDefault();
                var r = confirm('Are you sure?!!');
                  if (r == true) {
                      location.reload();
                  }

              });


              $('#add_submit').on('click', function (e) {
                e.preventDefault();
                for(let i=1; i<17; i++){
                            if($('#slo' + parseInt(i)).is(':hidden')){
                              $('#slo' + parseInt(i)).show();
                              showSwitches();
                              $('.switch_o_f').show();
                              $('.add_loc_swt').hide();
                              $('.config_loc_swt').show();
                              p_location = $('#loc' + parseInt(i)).text();
                              alert('Location ' + i + ' added!!!');
                              break;
                            } else {
                              continue;
                            }
                }
              });


            $('#edit_submit').on('click', function (e) {
                e.preventDefault();
                    let switch_nos = 1;  // boolen variable 1 for all roker swt named, 0 for none
                    let editswnos = $('#m_switches').val();   //for number swt desire: 1 or 3 or n
                    let editvalue = $('#edit_loc_swt').val(); // for loc name
              if (editswnos != '') {
                    for (let i=1; i<=parseInt(editswnos); i++){ //loop thru number of roker switch chosen
                      console.log('switch log' + i);
                      if (($('#swt' + i).val()) == null ){       // if name not assigned on any of the chosen then all is null
                        switch_nos = 0;
                        break;
                      }
                    }
              }
              if ((editvalue != '') && (switch_nos = 1)){ //write read to/from spiffs
                        $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=reg~' + p_location.toString() + ':' +  editvalue.toString(),
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteloc=reg~' + p_location.toString() + ':' +  editvalue.toString(),
                            success: function(result){
                              console.log(result);
                              if(result == (p_location.toString() + ':' + editvalue.toString())){ //writing loc name is success then
                              // alert(result);
                                let sw_iptxt;                     // proceed to write switches name into dbase
                                for (let i=1; i<=parseInt(editswnos); i++){
                                  sw_iptxt = $('#swt' + i).val();
                                  if (p_location.length == 16) {
                                        //console.log('x ,' + p_location.length);
                                    setTimeout(() => {
                                        $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=reg~' + (p_location + 'x' + i).toString() + ':' + sw_iptxt.toString(),
                                      //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=reg~' + (p_location + 'x' + i).toString() + ':' + sw_iptxt.toString(),
                                            success : function(result){
                                              if(result == sw_iptxt.toString()){
                                                    //alert('swt failed');
                                              }
                                            }
                                        }); //,
                                      }, 50);  //reg&Smart Location 1x1:Ceiling Rose
                                  }else{
                                      // console.log(p_location.length);
                                    setTimeout(() => {
                                      //$.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=reg~' + (p_location + i).toString() + ':' + sw_iptxt.toString(),
                                        $.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=reg~' + (p_location + i).toString() + ':' + sw_iptxt.toString(),
                                            success : function(result){
                                                  if(result == sw_iptxt.toString()){
                                                  // alert('swt failed');
                                                  }
                                              }
                                        });
                                      }, 50);
                                  }
                                }
                                let locnumber= p_location.toString().substr(14);
                                $('.config_loc_swt').hide();
                                $('#add_settings').show();
                                $('#loc' + parseInt(locnumber)).text(editvalue.toString());
                                alert('location set: success!! ' + editvalue.toString());
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('error: ' + xhr.status + ' , ' + ' location set: failed!!');
                            }
                        });
                }else{
                    alert('Location name / switches numbers/names VALUES cant be empty OR All the number of switches provided must be named');
                }
            });

        //////////////////////////////////////////////////////////////////

                $('button').on('click',function(e) {
                    e.preventDefault();
                            var b_value = $(this).attr('id');
                          // var locn;
                              switch (b_value) {
                                case 'loc1':
                                  location4SwtAction = '1A';
                                  locn = '1x';
                                  loadSwt(locn);
                                  break;
                                case 'loc2':
                                  location4SwtAction = '2A';
                                  locn = '2x';
                                  loadSwt(locn);
                                  break;
                                case 'loc3':
                                  location4SwtAction = '3A';
                                  locn = '3x';
                                  loadSwt(locn);
                                  break;
                                case 'loc4':
                                  location4SwtAction = '4A';
                                  locn = '4x';
                                  loadSwt(locn);
                                  break;
                                case 'loc5':
                                  location4SwtAction = '5A';
                                  locn = '5x';
                                  loadSwt(locn);
                                  break;
                                case 'loc6':
                                  location4SwtAction = '6A';
                                  locn = '6x';
                                  loadSwt(locn);
                                  break;
                                case 'loc7':
                                  location4SwtAction = '7A';
                                  locn = '7x';
                                  loadSwt(locn);
                                  break;
                                case 'loc8':
                                  location4SwtAction = '8A';
                                  locn = '8x';
                                  loadSwt(locn);
                                  break;
                                case 'loc9':
                                  location4SwtAction = '9A';
                                  locn = '9x';
                                  loadSwt(locn);
                                  break;
                                case 'loc10':
                                  location4SwtAction = 10;
                                  locn = 10;
                                  loadSwt(locn);
                                  break;
                                case 'loc11':
                                  location4SwtAction = 11;
                                  locn = 11;
                                  loadSwt(locn);
                                  break;
                                case 'loc12':
                                  location4SwtAction = 12;
                                  locn = 12;
                                  loadSwt(locn);
                                  break;
                                case 'loc13':
                                  location4SwtAction = 13;
                                  locn = 13;
                                  loadSwt(locn);
                                  break;
                                case 'loc14':
                                  location4SwtAction = 14;
                                  locn = 14;
                                  loadSwt(locn);
                                  break;
                                case 'loc15':
                                  location4SwtAction = 15;
                                  locn = 15;
                                  loadSwt(locn);
                                  break;
                                case 'loc16':
                                  location4SwtAction = 16;
                                  locn = 16;
                                  loadSwt(locn);
                                  break;
                              }
                      });

                      function loadSwt(locnum){
                            showSwitches();
                            $('.switch_o_f') .show();
                            for (let index = 1 ; index < 11; index++) {
                              // $('#r_swt' + index).show();
                                $('#rockr' + parseInt(index)).prop('checked', false);
                                $('#r_swt' + index).hide();
                                //$('#rockr' + parseInt(swtnLoc)).prop('checked', false);
                            }
                            $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=All Switches',
                            //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=All Switches',
                              success: function(result){
                                    console.log(result);
                                  $.each(result.split(/[\n\r]+/), function(index, line) {
                                      if (('Smart Location' + ' ' + locnum) == (line.substr(0,17))){
                                          let n = line.indexOf(':');
                                          let swtnLoc = line.substr(17, (n-17));
                                          let locswtItem = line.substr(n+1);
                                            $('#r_swt' + parseInt(swtnLoc)).show();
                                            $('#swt' + parseInt(swtnLoc)).val(locswtItem).prop('disabled', true);
                                        }
                                  });

                                  let loctext;  //= locnum.charAt(1) ;
                                  if(locnum.charAt(1) == 'x'){
                                      loctext = locnum.substr(0,1);
                                  }else{
                                      loctext = locnum;
                                  }
                                setTimeout(() => {
                                  $.ajax({url: '/rdswtStateArr?readswtState=All State',
                                 //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readswtState=All State',
                                      success: function(result){
                                          // console.log(result);
                                          let swtnLoc;
                                          $.each(result.split(/[,]+/), function(index, line) {
                                              if ((line.length == 2) && (loctext == line.substr(0,1))){
                                                //  console.log(line.substr(1));
                                                    swtnLoc = line.substr(1);
                                                    $('#rockr' + parseInt(swtnLoc)).prop('checked', true);
                                              } else if ((line.length == 3) && (loctext == line.substr(0,2))){
                                                    swtnLoc = line.substr(2);
                                                    $('#rockr' + parseInt(swtnLoc)).prop('checked', true);
                                              }
                                          });
                                      },
                                      error: function(xhr, resp, text){
                                                  $('#response').html('');
                                                  $('#response').html("<div class='alert  text-center text-primary font-weight-bold'>Switch State: Not Available</div>");
                                      }
                                  });
                                }, 50);

                                            let locTitle;
                                        setTimeout(() => {
                                            $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=Smart Location' + ' ' + loctext,
                                           // $.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteloc=Smart Location' + ' ' + loctext,
                                                success: function(result){
                                                  // console.log(result);
                                                    if(result != ''){
                                                      let n = result.indexOf(':');
                                                      let locTitle = result.substr(n+1);
                                                      $('#loc_title').text('LOCATION : '+ locTitle);
                                                    }
                                                }
                                            });
                                        }, 50);
                              },
                              error: function(xhr, resp, text){
                                    xhr.status;
                                    xhr.statusText;
                                    console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                    alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                              }
                          });
                        }

        /////////////////////////////////    /// /////////////////////// /////


                            $('input[name="rswitch"]').change(function() {
                                // e.preventDefault();
                                let chbox_id = $(this).attr('id');
                                    //$('#' + chbox_id).prop('checked') ? alert(chbox_id + ' is on') : alert(chbox_id + ' is off');
                                let roc_s = chbox_id.substr(5);
                                // let a = '';
                                let action;
                                let ina;
                                if(locn.substr(0, 2) == 'A'){
                                    ina = location4SwtAction.substr(0, 1);
                                }else{
                                    ina = location4SwtAction;
                                }
                                //if(location4SwtAction <= 9){
                                  //    a = 'A';
                              if(($('.config_swt_code').is(':hidden')) && (!($('#reg_swt_code').prop('checked')))){
                                if ($('#' + chbox_id).prop('checked')){
                                    action = 'act&1&' + location4SwtAction.toString() + '&' + ina + roc_s.toString();
                                    switch4Action(action);// act&1&1A&11
                                }else{
                                    action = 'act&0&' + location4SwtAction.toString() + '&' + ina + roc_s.toString();
                                    switch4Action(action);
                                }
                              }else{
                                if ($('#' + chbox_id).prop('checked')){
                                    action = 'config' + location4SwtAction.toString() + '&' + ina + roc_s.toString(); //reg11A11
                                    switch4Action(action); //config1A&19
                                }
                              }
                            });

                            function switch4Action(state){
                                 $.ajax({url: '/wtrdswtACTION?readwriteswt4action=' + state,
                                  //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt4action=' + state,
                                              success: function(result){
                                                console.log(result);
                                                if(result == 'registered'){
                                                  alert('Switch registered: success');
                                                }else { //if(result == 'action'){
                                                  alert('Switch action: success');
                                                }
                                              },
                                              error: function(xhr, resp, text){
                                                  xhr.status;
                                                  xhr.statusText;
                                                  console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                                  alert('Info: ' + xhr.statusText  + ' , ' + 'Switch Address/Code: failed!!!');
                                              }
                                      });
                            }

        ////////////////////////////////////////x//   ////////////////////

            $('#nav_swt_addr').click(function(e) {
              e.preventDefault();
                $('.config_swt_addr').show();
                $('.check_swtaddr_mode').show();
                $('.config_swt_code').hide();
                $('#m_swt_addr').hide();
              });

            $('#nav_swt_hid').click(function(e) {
              e.preventDefault();
                $('#reg_swt_code').prop('checked', false);
                $('.config_swt_addr').hide();
                $('.config_swt_code').hide();
                $('.check_swtaddr_mode').hide();
                $('#add_settings').hide();
              });

              $('#nav_swt_set').click(function(e) {
                e.preventDefault();
                $('#add_settings').show();
              });


              $('#nav_registerModal').click(function(e) {
                e.preventDefault();
                $('#registerModal').modal('show');
              });

              $('#nav_loginModal').click(function(e) {
                e.preventDefault();
                $('#loginModal').modal('show');
              });

              $('#nav_logout').click(function(e) {
                e.preventDefault();
                    logoutPage();
              });



            $('#nav_swt_cod').click(function(e) {
                e.preventDefault();
                        let r = confirm('Are you sure you have configured switch address first?');
                                    if (r == true) {
                                      $('.config_swt_code').show();
                                      $('.config_swt_addr').hide();
                                      $('.check_swtaddr_mode').hide();
                                      $('#reg_swt_code').prop('checked', true);
                                      alert('You are now in: Register switch code mode');
                                    }else{
                                      $('.config_swt_addr').show();
                                      $('.check_swtaddr_mode').show();
                                      $('#m_swt_addr').hide();
                                    }
              });

            $('#reg_swt_code').change(function() {
              //e.preventDefault();
                $('#reg_swt_code').prop('checked', false);
                  $('.config_swt_code').hide();
                  alert('Back to Normal switching mode');
              });

              $('#check1').change(function(){
                  if($(this).prop('checked')){
                        let r = confirm('Configure switch address ???');
                                    if (r == true) {
                                      $('#m_swt_addr').show();
                                    }
                  }else{
                      $('#m_swt_addr').hide();
                  }
              });

              $('#reg_addr').click(function(e) {
                e.preventDefault();
                if($('#check1').prop('checked')){
                  if (($('#m_swt_addr').val()) != ''){
                    let editvalue = $('#m_swt_addr').val();
                        $.ajax({url: '/wtrdswtACTION?readwriteswt4action=rega~' + editvalue,
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt4action=rega~' + editvalue,
                            success: function(result){
                              console.log(result);
                              if(result == editvalue.toString()){
                                alert('Switch Address:' + result + 'success');
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('Info: ' + xhr.statusText  + ' , ' + 'Switch Address: failed!!!');
                            }
                        });
                  }else{
                    alert('Info: Address value can\'t be empty');
                  }
                }else{
                        $.ajax({url: '/wtrdswtACTION?readwriteswt4action=sendaddr',
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt4action=sendaddr',
                            success: function(result){
                              console.log(result);
                              if(result == 'sendaddr'){
                                alert('Switch Address sent: success');
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('Info: ' + xhr.statusText  + ' , ' + 'Switch Address sent: failed!!!');
                            }
                        });

                  }
              });

                    $('#nav_swt_db').click(function(e){
                      e.preventDefault();
                        $.ajax({url: '/readswtaddr?rswtaddr',
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?rswtaddr',    //swtaddr12',
                            success: function(result){
                              console.log(result);
                                alert(result);
                              if(result != ''){
                                alert('Switch Address :' + result);
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('Info: ' + xhr.statusText  + ' , ' + 'Switch Address : failed!!!');
                            }
                        });
                    });

          function logoutPage() {
                        $.ajax({url: '/reglogusertoSPIFFS?regloguser=acclock',
                          //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?regloguser=acclock',   //dezleze~Smart Location' + id + ':' + namee,
                            success: function(result){
                              console.log(result);
                              if(result == 'success'){
                                  $('#navbarDropdownMenuLink').hide();
                                  $('#swithes-content').html('');
                                  $('#loginModal').modal('show');
                              }else if(result == 'not ready'){
                                  $('#navbarDropdownMenuLink').hide();
                                  $('#swithes-content').html('');
                                  $('#loginModal').modal('show');
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                //alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                              // if(xhr.statusText == 'Not Found'){
                                $('#navbarDropdownMenuLink').hide();
                                $('#swithes-content').html('');
                                $('#loginModal').modal('hide');
                                // }
                            }

                        });
          }

        //  ////////////////////////////////////////////////////

          $('#registerForm').on('submit',  function (e) {
            e.preventDefault();
          // console.log("am here1");
          // alert("am here1");
              let firstName = $('#registerFirstName').val(); // get firstName
              let password = $('#registerPassword').val(); //get the pass from Form
              let cPassword = $('#registerConfirmPassword').val(); //get the confirmPass from Form
            if( firstName != '' &&  password != ''  &&  cPassword != '' ){
              if(password ==  cPassword ){
                  //console.log("am here2");
                        $.ajax({url: '/reglogusertoSPIFFS?regloguser=reg~' + firstName + ':' + password,
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?regloguser=reg~' + firstName + ':' + password,
                            success: function(result){
                              console.log(result);
                              if((result == firstName + ':' + password) && (result.substr(0,5) != 'Admin')){
                                  $('#registerModal').modal('hide');
                                  //$('#loginModal').modal('hide');
                                  $('#nav_loginModal').hide();
                                  $('#nav_logout').show();
                              }else if ((result.substr(0,5)) == 'Admin') {    //result.substr(0, )firstName + ':' + password){
                                  $('#navbarDropdownMenuLink').show(); //
                                  $('#nav_registerModal').hide();
                                  $('#nav_loginModal').hide();
                                  $('#nav_logout').show();
                                  $('#registerModal').modal('hide');
                              }else{
                                  $('#messageModalLabel').text('Error: Cant Register');
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('Error: ' + xhr.status + ' , ' + xhr.statusText);
                                $('#messageModalLabel').text('Error: ' + xhr.statusText + 'Cant Register');
                            }
                      });
                }

              }
          });


          $('#loginForm').on('submit', function (e) {
            e.preventDefault();
          // console.log("we here");
            let firstName = $('#loginName').val(); // get firstName
            let password = $('#loginPassword').val(); //get the pass from Form
            if( firstName != '' &&  password != ''){
                        $.ajax({url: '/reglogusertoSPIFFS?regloguser=' + firstName + ':' + password,
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?regloguser=' + firstName + ':' + password,
                            success: function(result){
                              console.log(result);
                              if((result == firstName + ':' + password) && (result.substr(0,5) != 'Admin')){
                                  $('#nav_registerModal').hide();
                                  $('#nav_loginModal').hide();
                                  $('#nav_logout').show();
                                  setTimeout(function(){logoutPage();}, 1000*60*10);
                                  $('#loginModal').modal('hide'); //
                              }else if(result.substr(0,5) == 'Admin') { //result.substr(0, )firstName + ':' + password){
                                  $('#loginModal').modal('hide');
                                  $('#nav_registerModal').hide();
                                  $('#nav_loginModal').hide();
                                  $('#nav_logout').show();
                                  $('#navbarDropdownMenuLink').show();
                              }else{
                                  $('#messageModalLabel').text('Error: Cant login');
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('Error: ' + xhr.status + ' , ' + xhr.statusText);
                                $('#messageModalLabel').text('Error: ' + xhr.statusText + 'Cant login');
                            }
                      });
              }
              return false;
          });


              function showSwitches(){
                var html_switches = `
                  <div class="switch_o_f">
                    <div class="container-fluid">
                    <div class="row">
                      <div class="col-sm-2 col-lg-2"></div>
                      <div class="col-sm-10 col-lg-10 bg-primary justify-content-center">
                      <div class="row justify-content-center bg-danger">
                          <div class="col-sm-10 col-lg-10 text-center">
                              <h4 class="text-light" id="loc_title">LOCATION 1</h4>
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-sm-6 col-lg-3" id="r_swt1">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr1" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt1" placeholder="SWITCH 1">
                          </div>
                          <div class="col-sm-6 col-lg-3" id="r_swt2">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr2" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt2" placeholder="SWITCH 2">
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-sm-6 col-lg-3" id="r_swt3">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr3" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt3" placeholder="SWITCH 3">
                          </div>
                          <div class="col-sm-6 col-lg-3" id="r_swt4">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr4" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt4" placeholder="SWITCH 4">
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-sm-6 col-lg-3" id="r_swt5">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr5" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt5" placeholder="SWITCH 5">
                          </div>
                          <div class="col-sm-6 col-lg-3" id="r_swt6">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr6" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt6" placeholder="SWITCH 6">
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-sm-6 col-lg-3" id="r_swt7">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr7" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt7" placeholder="SWITCH 7">
                          </div>
                          <div class="col-sm-6 col-lg-3" id="r_swt8">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr8" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt8" placeholder="SWITCH 8">
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-sm-6 col-lg-3" id="r_swt9">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr9" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt9" placeholder="SWITCH 9">
                          </div>
                          <div class="col-sm-6 col-lg-3" id="r_swt0">
                            <div class="mid">
                                <label class="rocker rocker-small">
                                    <input type="checkbox" name="rswitch" id="rockr0" data-toggle="toggle">
                                    <span class="switch-left">On</span>
                                    <span class="switch-right">Off</span>
                                </label>
                            </div>
                            <input type="text" class="form-control form-control-sm font-weight-light text-center" id="swt0" placeholder="Master">
                          </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  </div>
                    `;

                //clearResponse();
                $('#swithes-content').html(html_switches);
            }

        /*   accessPage();
          let anylocname = '';
          let anyswtname = '';
          //navswitchdetails();*/




          function showloadLoc(){
            var smart_location_html = `
                    <!-- start table -->
                    <table id='location-table' class='table table-bordered table-hover'>
                      <thead>
                        <!-- creating our table heading -->
                        <tr>
                            <th class='w-60-pct text-center'>Location Configuration</th>
                            <th class='w-25-pct text-align-center'>Action</th>
                        </tr>
                    <thead>
                        <tbody>
                        </tbody>
                    </table>`;
                    $('#swithes-content').html(smart_location_html);
          }

            function loadLoc(){
              $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=All Location',
              //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteloc=All Location',
                success: function(result){
                      // console.log(result);
                    $.each(result.split(/[\n\r]+/), function(index, line) {
                      line.replace(/[\n\r]+/, "");
                      if((line.length > 18) && (line != "")){
                          let loc_Name = line.indexOf(':');
                          let bootLoc = line.substr(14, (loc_Name-14));
                          var item = `
                            <tr class='text-align-center'>
                              <td>` + line.substr(loc_Name + 1) + `</td>
                              <td>
                                    <button class='btn btn-primary btn-sm location-rename-button' name='${line.substr(loc_Name + 1)}' data-id='${bootLoc}'>
                                        <span class='glyphicon glyphicon-remove'></span> Rename
                                    </button>
                                    <button class='btn btn-danger btn-sm switch-detail-button' name='${line.substr(loc_Name + 1)}' data-id='${bootLoc}'>
                                        <span class='glyphicon glyphicon-remove'></span> Details
                                  </button>
                              </td>
                            </tr>`;
                            $('#location-table').append(item);
                          }
                    });

                    //clearResponse();
                  },
                  error: function(xhr, resp, text){
                            xhr.status;
                            xhr.statusText;
                            console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                            alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                  }

              });
            }


            $('#renamelocForm').submit(function (event) {
                    event.preventDefault();
                    let newname = $('#locrenName').val();
                    let id = $(this).attr('renloc-id');
                    let namee = $(this).attr('renloc-name');
                    if (id != undefined) {
                      //alert('am working  ' + id + ' ' + new_name);
                       $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=dezleze~Smart Location' + id + ':' + namee,
                       // $.ajax({url: '/esp8266swtcSIMU16virgin/data/esp8266swt20now1200.php?readwriteloc=dezleze~Smart Location' + id + ':' + namee,
                            success: function(result){
                              console.log(result);
                              if(result == 'success'){
                                  $.ajax({url: '/wtrdnamelocSPIFFS?readwriteloc=reg~Smart Location' + id + ':' + newname,
                                  //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteloc=reg~Smart Location' + id + ':' + newname,
                                        success: function(result){
                                            console.log(result);
                                            navswitchdetails();
                                            $('#locrenModal').modal('hide');
                                        }
                                    });
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                            }

                        });

                    }
            });



            function loadSwitches(locnum, lname){
              locnum = locnum.replace(/[\n\r]/,'');
              var smart_switches_html = `
                    <!-- start table -->
                    <table id='switch-table' class='table table-bordered table-hover'>

                        <!-- creating our table heading -->
                        <tr>
                            <th class='w-60-pct text-center'>Switches Configuration</th>
                            <th class='w-25-pct text-align-center'>Action</th>
                        </tr>
                        <tbody>
                        </tbody>
                      </table>`;
                      $('#swithes-content').html(smart_switches_html);

              $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=All Switches',
              //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=All Switches',
                success: function(result){
                        //console.log(result);
                    $.each(result.split(/[\n\r]+/), function(index, line) {
                        //if(line.length > 18) {
                        if ((line.substr(16,1) == 'x') && (('Smart Location' + ' ' + parseInt(locnum) + 'x') == (line.substr(0,17)))){
                        //if (('Smart Location' + ' ' + '2x').localeCompare(line.substr(0,17)) != false){
                            let n = line.indexOf(':');
                            let swtnId = line.substr(17, (n-17));
                            let swtnLoc = line.substr(15, (n-16));
                            let locswtItem = line.substr(n+1);
                            var item =`
                            <tr class='text-align-center'>
                              <td>` + locswtItem + `</td>
                              <td>
                                    <button class='btn btn-primary btn-sm switch-rename-button' location='${swtnLoc}' name='${locswtItem}' data-id='${swtnId}'>
                                        <span class='glyphicon glyphicon-remove'></span> Rename
                                    </button>
                                    <button class='btn btn-danger btn-sm switch-state-button' location='${swtnLoc}' name='${locswtItem}' data-id='${swtnId}'>
                                        <span class='glyphicon glyphicon-remove'></span> State
                                  </button>
                              </td>
                            </tr>`;
                            $('#switch-table').append(item);
                        } else if (('Smart Location' + ' ' + parseInt(locnum)) == (line.substr(0,17))){
                            let n = line.indexOf(':');
                            let swtnId = line.substr(17, (n-17));
                            let swtnLoc = line.substr(15, (n-16));
                            let locswtItem = line.substr(n+1);
                            var item =`
                            <tr class='text-align-center'>
                              <td>` + locswtItem + `</td>
                              <td>
                                    <button class='btn btn-primary btn-sm switch-rename-button' location='${swtnLoc}' name='${locswtItem}' data-id='${swtnId}'>
                                        <span class='glyphicon glyphicon-remove'></span> Rename
                                    </button>
                                    <button class='btn btn-danger btn-sm switch-state-button' location='${swtnLoc}' name='${locswtItem}' data-id='${swtnId}'>
                                        <span class='glyphicon glyphicon-remove'></span> State
                                  </button>
                              </td>
                            </tr>`;
                            $('#switch-table').append(item);
                        }

                    });
                      $('#page-title').text(lname);
                    //clearResponse();
                  },
                  error: function(xhr, resp, text){
                            xhr.status;
                            xhr.statusText;
                            console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                            alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                  }
              });
                    // $('#page-content').html(smart_switches_html);
            }

            $('#renameswtForm').submit(function (event) {
                    event.preventDefault();
                    let newname = $('#swtrenName').val();
                    let id = $(this).attr('renswt-id');
                    let namee = $(this).attr('renswt-name');
                    let locat = $(this).attr('renswt-locat');
                    let swloc;
                  if (id != undefined) {
                      if (locat.charAt(1) == 'x') {
                        swloc = locat.substr(0, 1);
                      //alert('am working  ' + id + ' ' + newname);
                        $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=dezleze~Smart Location' + ' ' + parseInt(swloc) + 'x' + id + ':' + namee,
                       // $.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=dezleze~Smart Location' + ' ' + parseInt(swloc) + 'x' + id + ':' + namee,
                            success: function(result){
                              console.log(result);
                              if(result == 'success'){
                                  $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=reg~Smart Location' + ' ' + parseInt(swloc) + 'x' + id + ':' + newname,
                                 // $.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=reg~Smart Location' + ' ' + parseInt(swloc) + 'x' + id + ':' + newname,
                                        success: function(result){
                                            console.log(result);
                                            navswitchdetails();
                                            //loadSwitches(id, anylocname);
                                            $('#swtrenModal').modal('hide');
                                        }
                                    });
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                            }

                        });
                      } else {
                        swloc = locat;
                        $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=dezleze~Smart Location' + ' ' + parseInt(swloc) + id + ':' + namee,
                        //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=dezleze~Smart Location' + ' ' + parseInt(swloc) + id + ':' + namee,
                            success: function(result){
                              console.log(result);
                              if(result == 'success'){
                                  $.ajax({url: '/wtrdnameswtSPIFFS?readwriteswt=reg~Smart Location' + ' ' + parseInt(swloc) + id + ':' + newname,
                                  //$.ajax({url: '/esp8266swtcSIMU16virgin3/data/esp8266swt20now1200.php?readwriteswt=reg~Smart Location' + ' ' + parseInt(swloc) + id + ':' + newname,
                                        success: function(result){
                                            console.log(result);
                                              navswitchdetails();
                                            //loadSwitches(id, anylocname);
                                            $('#swtrenModal').modal('hide');
                                        }
                                    });
                              }
                            },
                            error: function(xhr, resp, text){
                                xhr.status;
                                xhr.statusText;
                                console.log('error: ' + xhr.status + ' , ' + xhr.statusText);
                                alert('error: ' + xhr.status + ' , ' + xhr.statusText);
                            }

                        });

                      }

                    }
            });

  // });

    ///////////////////////////////////////////////////////////
  //$(document).ready(function() {
     $('[name="demo"]').bootstrapSwitch({
          // The checkbox state
          state:false,
          // null, 'mini', 'small', 'normal', 'large'
          size:'large',
          // Enable animation
          animation:true,

          onColor:'primary',

          offColor:'default',

          onText:'ON',

          offText:'OFF',

          // Text of the center handle of the switch
          labelText:'&nbsp',

         // Width of the left and right sides in pixels
          handleWidth:'auto',

          // Width of the center handle in pixels
          labelWidth:'auto',

          // Global class prefix
           baseClass:'bootstrap-switch',

          // Container element class(es)
           wrapperClass:'wrapper'

       });


  }    //);
});
