"use strict";function loginstatus(){var a=$("#ttMenubarInnerWrap"),b=-1!=$.trim(a.find("a.tt_menubar_link_tit").text()).indexOf("로그아웃");return b}function isLoginStatus(){var a=$("#ttMenubarInnerWrap"),b=-1!=$.trim(a.find("a.tt_menubar_link_tit").text()).indexOf("로그아웃");b?(document.getElementById("btn_login_toggle").innerHTML='<i class="xi-log-out"></i> 로그아웃',loginToggle=moveLogout):(document.getElementById("btn_login_toggle").innerHTML='<i class="xi-log-in"></i> 로그인',loginToggle=moveLogin)}function moveLogin(){var a="https://www.tistory.com/auth/login?redirectUrl="+encodeURIComponent(window.location.href);document.location.href=a}function moveLogout(){var a="https://www.tistory.com/auth/logout?redirectUrl="+encodeURIComponent(window.location.href);document.location.href=a}$("p_common").last().addClass("selected"),$.fn.extend({animateCss:function(a){var b="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";$(this).addClass("animated "+a).one(b,function(){$(this).removeClass("animated "+a)})}}),$(function(){$(".markdown-here-wrapper a").attr("target","_blank"),$("input, textarea").placeholder()}),+$(function(){if($("#header .blogMenu > li > a").addClass("hvr-shutter-out-vertical"),$("#header a.category").addClass("hvr-shutter-out-vertical"),$("#header a.searchBtn").addClass("hvr-shutter-out-vertical"),$("#header .navbar ul").addClass("nav pull-right blogMenu"),$("#header .navbar ul > li > a").addClass("hvr-shutter-out-vertical"),"add"==skin_cfg.kind){$("#header .navbar ul  li a").prepend("<i></i>");var a=skin_cfg.topmenu_icon;jQuery.each(a,function(a,b){$("#header .navbar ul li a").eq(a-1).children("i").addClass(b)})}else if("change"==skin_cfg.kind){$("#header .navbar ul  li a").empty(),$("#header .navbar ul  li a").prepend("<i></i>");var a=skin_cfg.topmenu_icon;jQuery.each(a,function(a,b){$("#header .navbar ul li a").eq(a-1).children("i").addClass(b)})}$("a[href='category']").click(function(a){a.preventDefault(),a.stopPropagation(),$("#header .sub-menu").toggle("fast"),$("#header .sub-tag").hide("fast"),$("#header .search").hide("fast")}),$("a[href='search']").click(function(a){a.preventDefault(),a.stopPropagation(),$("#header .search").toggle(),$("#header .search input").animateCss("bounceInDown"),$("#header .search button").animateCss("bounceInDown")}),$(document).click(function(){$("#header .sub-menu").hide("fast"),$("#header .sub-tag").hide("fast"),$("#header #nav-adminMenu").hide("fast"),$(".logoImage").children("i").removeClass("xi-angle-up").addClass("xi-angle-down")}),$("#header .logoImage img").click(function(a){a.preventDefault(),a.stopPropagation(),$("#header #nav-adminMenu").toggle("fast")}),isLoginStatus()});var loginToggle;+$(function(){function a(){$("#sidenavOverlay").css("display","none")}$(".category ul").addClass("list-unstyled"),$(".category_list").addClass("metismenu"),$(".category_list").attr("id","menu"),$(".sub_category_list").prev(".link_item").append('<i class="xi-angle-left"></i>'),$(".link_tit").prepend('<i class="xi-star"></i>'),$(".link_item").prepend("<i></i>");var b=skin_cfg.sidebar_icon;jQuery.each(b,function(a,b){$(".link_item").eq(a-1).children("i").addClass(b)}),$("#menu").metisMenu(),$("a[href='category']").click(function(a){a.preventDefault(),$("#sidebar").toggleClass("sidebarShow"),$("#sidenavOverlay").toggle()}),$("#sidenavOverlay").click(function(){$("#sidebar").removeClass("sidebarShow"),a()})}),+$(function(){$("#entry .entry:first-child").addClass("index-info")}),$(".p_01").last().addClass("selected"),+$(function(){}),+$(function(){$("#taglog ul li a").addClass("waves-effect hvr-wobble-top btn")}),+$(function(){$(".sns-send").after($(".another_category")),$(".sns-send").after($(".entry-ccl"))}),+$(function(){function a(a){c++,$(".rpForm .kind").empty(),$(".rpForm .kind").append("<label class='radio-inline'><input type='radio' name='kindOptions' id='kindOptions1' value=''>일반</label>"),$.each(a.comment_kind,function(a,b){$(".rpForm .kind").append("<label class='radio-inline'><input type='radio' name='kindOptions' id='kindOptions1' value='"+b+"'>"+b+"</label>")}),$("input[name='kindOptions']").click(function(){var a="",b="",c="##",d=$(this).val();b=d?c+d+c:"";var e=$(".rp_textarea").val(),f=e.split(c,2);f[1]?(a=d?e.replace(f[1],d):e.replace(c+f[1]+c,d),$(".rp_textarea").val(a)):$(".rp_textarea").val(b+" "+e)});var b,d,e,f,g,h,i,j="##";$(".s_rp_rep .txt_reply").each(function(){switch(f="",h="",g="",b=$(this).text(),d=b.split(j,2),e=d[1],i=b.replace(j+e+j,""),$(this).text(i),jQuery.each(a.comment_kind,function(a,b){e==b&&(f=b,g=a)}),g){case"1":h="sub1";break;case"2":h="sub2";break;case"3":h="primary";break;case"4":h="success";break;case"5":h="info";break;case"6":h="warning";break;case"7":h="danger";break;default:h="main"}f&&$(this).parent().prev(".info").append("<span class='label label-"+h+"'>"+f+"</span>"),$(this).parent().parent().addClass("custom-panel-"+h)})}if($(".sidebar")[0])var b=$(".sidebar")[0].scrollHeight;$(".sidebar").mCustomScrollbar({theme:"minimal-dark",setTop:"-"+b+"px"});var c=0;a(skin_cfg),$(document).on("DOMNodeInserted","#commentList",function(){0===c&&setTimeout(function(){a(skin_cfg)},500)}),$(document).on("focus","#comment",function(){c=0}),$(document).on("click",".my_edit a",function(){c=0})}),+$(function(){$(".pagination li a .selected").parents("li").addClass("active")}),$(function(){$("#footer .recentPost ul > li > a  ").addClass("truncate"),$("#footer .recentComments ul > li > a  ").addClass("truncate"),$("#footer .recentComments ul > li .name  ").addClass("truncate"),skin_cfg.sns.facebook&&$("#footer .profile .sns").prepend("<a href='https://facebook.com/"+skin_cfg.sns.facebook+"' class='facebook' target='_blank'><i class='xi xi-facebook xi-border'></i></a>"),skin_cfg.sns.twitter&&$("#footer .profile .sns").prepend("<a href='https://twitter.com/"+skin_cfg.sns.twitter+"' class='twitter' target='_blank'><i class='xi xi-twitter xi-border'></i></a>"),skin_cfg.sns.google&&$("#footer .profile .sns").prepend("<a href='https://plus.google.com/u/0/"+skin_cfg.sns.google+"' class='googleplus' target='_blank'><i class='xi xi-google-plus xi-border'></i></a>"),skin_cfg.sns.kakaostory&&$("#footer .profile .sns").prepend("<a href='https://story.kakao.com/"+skin_cfg.sns.kakaostory+"' class='kakaostory' target='_blank'><i class='xi xi-kakaostory xi-border'></i></a>"),$(".footer-recentContents .badge > span").each(function(){$(this).text()||$(this).parent().remove()}),$("div").hasClass("sidebar")===!0&&($(".etcArea1").css("display","none"),$(".counterBox").css("display","none"));var a=function(){var a=$(".btn_top"),b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;$(window).scroll(function(){$(this).scrollTop()>150&&b>1e3?a.fadeIn(100):a.fadeOut(100)}),a.click(function(){return $("html, body").animate({scrollTop:0},400),!1})};a()});