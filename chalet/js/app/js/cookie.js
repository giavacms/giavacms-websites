var _cookieScriptsHostName = "localhost:9000";
var cookieScriptsHostName = "votalatua.estate";

var cookieScripts = document.getElementsByTagName("script"), cookieScriptSrc = cookieScripts[cookieScripts.length - 1].src, cookieQuery = null, cookieScriptPosition = "bottom", cookieScriptSource = cookieScriptsHostName, cookieScriptDomain = "", cookieScriptReadMore = "/#/cookie-policy", cookieId = "cookie", cookieScriptDebug = 0, cookieScriptTitle = "", cookieScriptDesc = "I cookie aiutano " + cookieScriptsHostName + " a fornire i propri servizi. Navigando sul sito accetti il loro utilizzo. ", cookieScriptAccept = "OK",
    cookieScriptMore = "Informazioni", cookieScriptCopyrights = "OK", cookieScriptLoadJavaScript = function (f, g) {
        var b = document.getElementsByTagName("head")[0], c = document.createElement("script");
        c.type = "text/javascript";
        c.src = f;
        void 0 != g && (c.onload = c.onreadystatechange = function () {
            c.readyState && !/loaded|complete/.test(c.readyState) || (c.onload = c.onreadystatechange = null, b && c.parentNode && b.removeChild(c), c = void 0, g())
        });
        b.insertBefore(c, b.firstChild)
    }, InjectCookieScript = function () {
        function f(b) {
            "show" == b ? (cookieQuery("#cookiescript_overlay",
                cookieScriptWindow).show(), cookieQuery("#cookiescript_info_box", cookieScriptWindow).show()) : "hide" == b && (cookieQuery("#cookiescript_overlay", cookieScriptWindow).hide(), cookieQuery("#cookiescript_info_box", cookieScriptWindow).hide())
        }

        function g() {
            cookieQuery('script.cscookiesaccepted[type="text/plain"]').each(function () {
                cookieQuery(this).attr("src") ? cookieQuery(this).after('<script type="text/javascript" src="' + cookieQuery(this).attr("src") + '">\x3c/script>') : cookieQuery(this).after('<script type="text/javascript">' +
                cookieQuery(this).html() + "\x3c/script>");
                cookieQuery(this).empty()
            })
        }

        cookieScriptDropfromFlag = 0;
        if (("" != cookieScriptSrc) && (cookieScriptSrc.indexOf(cookieScriptsHostName + "/js/cookie.js") == -1)) return !1;
        cookieScriptDroptoFlag = 0;
        cookieScriptCreateCookie = function (b, c, a) {
            var d = "", e;
            a && (e = new Date, e.setTime(e.getTime() + 864E5 * a), d = "; expires=" + e.toGMTString());
            a = "";
            "" !=
            cookieScriptDomain && (a = "; domain=" + cookieScriptDomain);
            document.cookie = b + "=" + c + d + a + "; path=/"
        };
        cookieScriptReadCookie = function (b) {
            b += "=";
            for (var c = document.cookie.split(";"), a, d = 0; d < c.length; d++) {
                for (a = c[d]; " " == a.charAt(0);)a = a.substring(1, a.length);
                if (0 == a.indexOf(b))return a.substring(b.length, a.length)
            }
            return null
        };
        cookieQuery(function () {
            cookieScriptWindow = window.document;
            cookieQuery("#cookiescript_injected", cookieScriptWindow).remove();
            cookieQuery("#cookiescript_overlay", cookieScriptWindow).remove();
            cookieQuery("#cookiescript_info_box", cookieScriptWindow).remove();
            if ("visit" == cookieScriptReadCookie("cookiescriptaccept"))return !1;
            cookieQuery("body", cookieScriptWindow).append('<div id="cookiescript_injected"><div id="cookiescript_wrapper">' + cookieScriptDesc + '&nbsp;&nbsp;<a id="cookiescript_readmore">' + cookieScriptMore + '</a><div id="cookiescript_accept">' + cookieScriptAccept + '</div><a href="//' + cookieScriptSource + '" target="_self" id="cookiescript_link"  style="display:block !important"></a><div id="cookiescript_pixel"></div></div>');
            cookieQuery("#cookiescript_injected", cookieScriptWindow).css({
                "background-color": "#FFFFFF",
                "z-index": 999999,
                opacity: 1,
                position: "fixed",
                padding: "3px 0",
                width: "100%",
                left: 0,
                "font-size": "10px",
                "font-weight": "normal",
                "text-align": "left",
                color: "#000000",
                "font-family": "Arial, sans-serif",
                display: "none",
                "-moz-box-shadow": "0px 0px 8px #000000",
                "-webkit-box-shadow": "0px 0px 8px #000000",
                "box-shadow": "0px 0px 8px #000000"
            });
            cookieQuery("#cookiescript_buttons", cookieScriptWindow).css({
                width: "200px",
                margin: "0 auto",
                "font-size": "13px",
                "font-weight": "normal",
                "text-align": "center",
                color: "#000000",
                "font-family": "Arial, sans-serif"
            });
            cookieQuery("#cookiescript_wrapper", cookieScriptWindow).css({
                margin: "0 10px",
                "font-size": "13px",
                "font-weight": "normal",
                "text-align": "center",
                color: "#000000",
                "font-family": "Arial, sans-serif",
                "line-height": "23px"
            });
            "top" == cookieScriptPosition ? cookieQuery("#cookiescript_injected", cookieScriptWindow).css("top", 0) : cookieQuery("#cookiescript_injected", cookieScriptWindow).css("bottom", 0);
            cookieQuery("#cookiescript_injected h4#cookiescript_header", cookieScriptWindow).css({
                "background-color": "#FFFFFF",
                "z-index": 999999,
                padding: "0 0 7px 0",
                "text-align": "center",
                color: "#000000",
                "font-family": "Arial, sans-serif",
                display: "block",
                "font-size": "15px",
                "font-weight": "bold",
                margin: "0"
            });
            cookieQuery("#cookiescript_injected span", cookieScriptWindow).css({
                display: "block",
                "font-size": "100%",
                margin: "5px 0"
            });
            cookieQuery("#cookiescript_injected a", cookieScriptWindow).css({
                "text-decoration": "underline",
                color: "#000000"
            });
            cookieQuery("#cookiescript_injected a#cookiescript_link", cookieScriptWindow).css({
                "text-decoration": "none",
                color: "#000000",
                "font-size": "85%",
                "text-decoration": "none",
                "float": "right",
                padding: "0px 20px 0 0",
                "letter-spacing": "normal",
                "font-weight": "normal"
            });
            cookieQuery("#cookiescript_injected div#cookiescript_accept", cookieScriptWindow).css({
                "-webkit-border-radius": "5px",
                "-khtml-border-radius": "5px",
                "-moz-border-radius": "5px",
                "border-radius": "5px",
                "background-color": "#F59432",
                border: 0,
                padding: "3px 7px",
                "font-weight": "bold",
                cursor: "pointer",
                margin: "0 10px 0 10px",
                color: "#FFFFFF",
                "-webkit-transition": "0.25s",
                "-moz-transition": "0.25s",
                transition: "0.25s",
                display: "inline",
                "text-shadow": "rgb(0, 0, 0) 0px 0px 2px",
                "white-space": "nowrap"
            });
            cookieQuery("#cookiescript_injected #cookiescript_readmore", cookieScriptWindow).css({
                cursor: "pointer",
                "text-decoration": "underline",
                padding: 0,
                margin: 0,
                color: "#000000",
                "white-space": "nowrap"
            });
            cookieQuery("#cookiescript_injected div#cookiescript_pixel",
                cookieScriptWindow).css({width: "1px", height: "1px", "float": "left"});
            cookieQuery("#cookiescript_injected #cookiescript_pixel").css({"background-image": "url(//" + cookieScriptSource + "/pixel.gif?p=" + cookieId + "&a=s)"});
            cookieQuery("#cookiescript_injected div#cookiescript_accept", cookieScriptWindow).hover(function () {
                cookieQuery(this).css("background-color", "#F59432")
            }, function () {
                cookieQuery(this).css("background-color", "#F59432")
            });
            cookieQuery("#cookiescript_injected", cookieScriptWindow).fadeIn(1E3);
            cookieQuery("#cookiescript_injected div#cookiescript_accept", cookieScriptWindow).click(function () {
                cookieQuery("#cookiescript_injected #cookiescript_pixel").css({"background-image": "url(//" + cookieScriptSource + "/pixel.gif?p=" + cookieId + "&a=o)"});
                cookieQuery("#cookiescript_injected", cookieScriptWindow).fadeOut(200);
                cookieScriptCreateCookie("cookiescriptaccept", "visit", 30);
                f("hide");
                g()
            });
            cookieQuery("#cookiescript_injected #cookiescript_readmore", cookieScriptWindow).click(function () {
                cookieQuery("#cookiescript_injected #cookiescript_pixel").css({
                    "background-image": "url(//" +
                    cookieScriptSource + "/pixel.gif?p=" + cookieId + "&a=r)"
                });
                window.open(cookieScriptReadMore, "_self");
                return !1
            });
            cookieQuery("#cookiescript_overlay", cookieScriptWindow).click(function () {
                f("hide")
            });
            cookieQuery("#cookiescript_info_close", cookieScriptWindow).click(function () {
                f("hide")
            });
            document.onkeydown = function (b) {
                b = b || window.event;
                27 == b.keyCode && f("hide")
            }
        });
        cookieScriptCreateCookie = function (b, c, a) {
            var d = "", e;
            a && (e = new Date, e.setTime(e.getTime() + 864E5 * a), d = "; expires=" + e.toGMTString());
            a = "";
            "" != cookieScriptDomain &&
            (a = "; domain=" + cookieScriptDomain);
            document.cookie = b + "=" + c + d + a + "; path=/"
        };
        cookieScriptReadCookie = function (b) {
            b += "=";
            for (var c = document.cookie.split(";"), a, d = 0; d < c.length; d++) {
                for (a = c[d]; " " == a.charAt(0);)a = a.substring(1, a.length);
                if (0 == a.indexOf(b))return a.substring(b.length, a.length)
            }
            return null
        };
        "visit" == cookieScriptReadCookie("cookiescriptaccept") && g()
    };
window.jQuery && jQuery.fn && /^(1\.[8-9]|2\.[0-9])/.test(jQuery.fn.jquery) ? (cookieScriptDebug && window.console && console.log("Using existing jQuery version " + jQuery.fn.jquery), cookieQuery = window.jQuery, InjectCookieScript()) : (cookieScriptDebug && window.console && console.log("Loading jQuery 1.8.1 from ajax.googleapis.com"), cookieScriptLoadJavaScript(("https:" == document.location.protocol ? "https://" : "http://") + "ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js", function () {
    cookieQuery = jQuery.noConflict(!0);
    InjectCookieScript()
}));
