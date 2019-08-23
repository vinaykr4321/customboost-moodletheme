$(document).ready(function(){
    if (!window.location.href.includes('search/index.php')) {
        localStorage.setItem("custom", 0);
    }

    const showcustom = localStorage.getItem("custom");
    let customstyle = "";
    let moodlestyle = "";
    let checked = "";
    if(showcustom == 1){
        customstyle = `style="color:green;"`;
        $("#customresult").css("display","block");
        $("#moodleresult").css("display","none");
        $(".mform").css("display","none");
        $(".alert-info").css("display","none");
        checked="checked";
    }else{
        moodlestyle = `style="color:green;"`;
        $("#customresult").css("display","none");
        $("#moodleresult").css("display","block");
        checked="";
    }
    const inputdata = `<div class="customshowbtn"  id="customshowbtn"><input id="customtoggle" type="checkbox" data-toggle="toggle" data-on=" " ${checked} data-off=" " data-size="mini" /> Custom Result</div>`;


    const tabdata = ` <div id='tabholder' style='display:flex;position:absolute;top:0;left:8;'>
                        <div style='margin:10px'><a href='#' ${moodlestyle} id='moodleresultshow'>Moodle Result</a></div>
                        <div style='margin:10px'><a href='#' ${customstyle} id='customresultshow'>Custom Result</a></div>
                    </div>`;

    $("#customrender").parent().css("padding-top","20px");
    $("#customrender").parent().append(tabdata);


    $("#customresultshow").on("click", function(){
        $("#customresult").css("display","block");
        $("#moodleresult").css("display","none");

        $("#customresultshow").css({"color":"green"});
        $("#moodleresultshow").css({"color":"#1177D1"});

        $(".mform").css("display","none");
        $(".alert-info").css("display","none");
    });

    $("#moodleresultshow").on("click", function(){
        $("#customresult").css("display","none");
        $("#moodleresult").css("display","block");

        $("#customresultshow").css({"color":"#1177D1"});
        $("#moodleresultshow").css({"color":"green"});

        $(".mform").css("display","block");
        $(".alert-info").css("display","block");
    });


    $("input[name='q'][placeholder='Search']").parent().append(inputdata); 
    $("input[name='q'][placeholder='Search']").addClass("custominputclass");

    $("input[name='q'][placeholder='Search']").on("mouseover",function(){
        $("input[name='q'][placeholder='Search']").parent().addClass("customexpanded");
        $("input[name='q'][placeholder='Search']").parent().parent().addClass("customexpanded");
        $(".fa-search").hide();
    });
    


    const customcss = `<style>
                        .checkbox label .toggle,.checkbox-inline .toggle{margin-left:-20px;margin-right:5px}
                        .toggle{position:relative;overflow:hidden}
                        .toggle input[type=checkbox]{display:none}
                        .toggle-group{position:absolute;width:200%;top:0;bottom:0;left:0;transition:left .35s;-webkit-transition:left .35s;-moz-user-select:none;-webkit-user-select:none}
                        .toggle.off .toggle-group{left:-100%}
                        .toggle-on{position:absolute;top:0;bottom:0;left:0;right:50%;margin:0;border:0;border-radius:0}
                        .toggle-off{position:absolute;top:0;bottom:0;left:50%;right:0;margin:0;border:0;border-radius:0}
                        .toggle-handle{position:relative;margin:0 auto;padding-top:0;padding-bottom:0;height:100%;width:0;border-width:0 1px}
                        .toggle.btn{min-width:59px;min-height:34px}
                        .toggle-on.btn{padding-right:24px}
                        .toggle-off.btn{padding-left:24px}
                        .toggle.btn-lg{min-width:79px;min-height:45px}
                        .toggle-on.btn-lg{padding-right:31px}
                        .toggle-off.btn-lg{padding-left:31px}
                        .toggle-handle.btn-lg{width:40px}
                        .toggle.btn-sm{min-width:50px;min-height:30px}
                        .toggle-on.btn-sm{padding-right:20px}
                        .toggle-off.btn-sm{padding-left:20px}
                        .toggle.btn-xs{min-width:35px;min-height:22px}
                        .toggle-on.btn-xs{padding-right:12px}
                        .toggle-off.btn-xs{padding-left:12px}
                    </style>
    `;
    const js = `<script>+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.toggle"),f="object"==typeof b&&b;e||d.data("bs.toggle",e=new c(this,f)),"string"==typeof b&&e[b]&&e[b]()})}var c=function(b,c){this.$element=a(b),this.options=a.extend({},this.defaults(),c),this.render()};c.VERSION="2.2.0",c.DEFAULTS={on:"On",off:"Off",onstyle:"primary",offstyle:"default",size:"normal",style:"",width:null,height:null},c.prototype.defaults=function(){return{on:this.$element.attr("data-on")||c.DEFAULTS.on,off:this.$element.attr("data-off")||c.DEFAULTS.off,onstyle:this.$element.attr("data-onstyle")||c.DEFAULTS.onstyle,offstyle:this.$element.attr("data-offstyle")||c.DEFAULTS.offstyle,size:this.$element.attr("data-size")||c.DEFAULTS.size,style:this.$element.attr("data-style")||c.DEFAULTS.style,width:this.$element.attr("data-width")||c.DEFAULTS.width,height:this.$element.attr("data-height")||c.DEFAULTS.height}},c.prototype.render=function(){this._onstyle="btn-"+this.options.onstyle,this._offstyle="btn-"+this.options.offstyle;var b="large"===this.options.size?"btn-lg":"small"===this.options.size?"btn-sm":"mini"===this.options.size?"btn-xs":"",c=a('<label class="btn">').html(this.options.on).addClass(this._onstyle+" "+b),d=a('<label class="btn">').html(this.options.off).addClass(this._offstyle+" "+b+" active"),e=a('<span class="toggle-handle btn btn-default">').addClass(b),f=a('<div class="toggle-group">').append(c,d,e),g=a('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop("checked")?this._onstyle:this._offstyle+" off").addClass(b).addClass(this.options.style);this.$element.wrap(g),a.extend(this,{$toggle:this.$element.parent(),$toggleOn:c,$toggleOff:d,$toggleGroup:f}),this.$toggle.append(f);var h=this.options.width||Math.max(c.outerWidth(),d.outerWidth())+e.outerWidth()/2,i=this.options.height||Math.max(c.outerHeight(),d.outerHeight());c.addClass("toggle-on"),d.addClass("toggle-off"),this.$toggle.css({width:h,height:i}),this.options.height&&(c.css("line-height",c.height()+"px"),d.css("line-height",d.height()+"px")),this.update(!0),this.trigger(!0)},c.prototype.toggle=function(){this.$element.prop("checked")?this.off():this.on()},c.prototype.on=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._offstyle+" off").addClass(this._onstyle),this.$element.prop("checked",!0),void(a||this.trigger()))},c.prototype.off=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._onstyle).addClass(this._offstyle+" off"),this.$element.prop("checked",!1),void(a||this.trigger()))},c.prototype.enable=function(){this.$toggle.removeAttr("disabled"),this.$element.prop("disabled",!1)},c.prototype.disable=function(){this.$toggle.attr("disabled","disabled"),this.$element.prop("disabled",!0)},c.prototype.update=function(a){this.$element.prop("disabled")?this.disable():this.enable(),this.$element.prop("checked")?this.on(a):this.off(a)},c.prototype.trigger=function(b){this.$element.off("change.bs.toggle"),b||this.$element.change(),this.$element.on("change.bs.toggle",a.proxy(function(){this.update()},this))},c.prototype.destroy=function(){this.$element.off("change.bs.toggle"),this.$toggleGroup.remove(),this.$element.removeData("bs.toggle"),this.$element.unwrap()};var d=a.fn.bootstrapToggle;a.fn.bootstrapToggle=b,a.fn.bootstrapToggle.Constructor=c,a.fn.toggle.noConflict=function(){return a.fn.bootstrapToggle=d,this},a(function(){a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()}),a(document).on("click.bs.toggle","div[data-toggle^=toggle]",function(b){var c=a(this).find("input[type=checkbox]");c.bootstrapToggle("toggle"),b.preventDefault()})}(jQuery);</script>`;
    var yourscript = $('<script>').attr('type','text/javascript').html(js);


    $("input[name='q'][placeholder='Search']").on("input",function(){
        if($("#customtoggle").prop('checked') == true){
            localStorage.setItem("custom",1);
        }else{
            localStorage.setItem("custom",0);
        }
    });

    $("#customtoggle").on("change",function(){
        if($("#customtoggle").prop('checked') == true){
            localStorage.setItem("custom",1);
        }else{
            localStorage.setItem("custom",0);
        }
    });


    setTimeout(()=>{
        $("body").append(customcss);
        $('body').append(yourscript);
    },500);

    
    

});