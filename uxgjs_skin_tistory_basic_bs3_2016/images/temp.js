$(function(){function a(){$("#permalink_article,s_article_rep, s_guest,s_paging,s_notice_rep,s_notice_rep,s_article_protected,s_local,s_tag").hide()}function b(){a(),$("s_article_rep").show()}b(),$("#permalink_article a, .tt_category a, .brand-logo, #doc-top-nav a.a1").click(function(b){b.preventDefault(),a(),$("s_article_rep").show(),$("s_index_article_rep").show(),$("#permalink_article").hide()}),$(".list_wrap a, .recentPost a, .recentComments a, #doc-top-nav a.a2").click(function(b){b.preventDefault(),a(),$("s_article_rep").show(),$("s_index_article_rep").hide(),$("#permalink_article").show()}),$('a[href="/tag"], #doc-top-nav a.a3').click(function(b){b.preventDefault(),a(),$("s_tag").show()}),$('a[href="/location"], #doc-top-nav a.a4').click(function(b){b.preventDefault(),a(),$("s_local").show()}),$("li a[href='/guestbook'], #doc-top-nav a.a5").click(function(b){b.preventDefault(),a(),$("s_guest").show()}),$('a[href="/media"], #doc-top-nav a.a6').click(function(b){b.preventDefault(),a()}),$('a[href="/admin"]').click(function(b){b.preventDefault(),a(),$("s_article_rep").show(),$("s_index_article_rep").show(),$("#permalink_article").hide()})});