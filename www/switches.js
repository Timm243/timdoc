$(document).ready(function(){

    document.addEventListener("deviceready",onDeviceReady,false);
});

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



              $('#sidebarCollapse').on('click', function () {
                        $('#sidebar').toggleClass('active');
                        $(this).toggleClass('active');
              });



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
//});
