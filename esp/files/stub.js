/*##############################################################################
#    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
############################################################################## */
define([
    "dojo/_base/lang",
    "dojo/_base/fx",
    "dojo/_base/window",
    "dojo/_base/connect",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/io-query",
    "dojo/ready",

    "hpcc/ECLPlaygroundWidget",
    "hpcc/GraphPageWidget",
    "hpcc/ResultsWidget",
    "hpcc/TimingPageWidget",
    "hpcc/TimingTreeMapWidget",
    "hpcc/ECLSourceWidget",
    "hpcc/InfoGridWidget",
    "hpcc/WUQueryWidget",
    "hpcc/WUDetailsWidget",
    "hpcc/GetDFUWorkunitsWidget",
    "hpcc/DFUWUDetailsWidget",
    "hpcc/DFUWUQueryWidget",
    "hpcc/LFDetailsWidget"
], function (lang, fx, baseWindow, connect, dom, domStyle, domGeometry, ioQuery, ready,
        ECLPlaygroundWidget, GraphPageWidget, ResultsWidget, TimingPageWidget, TimingTreeMapWidget, ECLSourceWidget, InfoGridWidget, WUQueryWidget, WUDetailsWidget, GetDFUWorkunitsWidget, DFUWUDetailsWidget, DFUWUQueryWidget, LFDetailsWidget
        ) {

    var initUi = function () {
        var params = ioQuery.queryToObject(dojo.doc.location.search.substr((dojo.doc.location.search.substr(0, 1) == "?" ? 1 : 0)));

        //TODO:  Can we get rid of the required dependency above?
        var widget = new (eval(params.Widget))({
            id: "app",
            "class": "hpccApp"
        });

        if (widget) {
            widget.placeAt(dojo.body(), "last");
            widget.startup();
            widget.init(params);
        }
    },

    startLoading = function (targetNode) {
        var overlayNode = dom.byId("loadingOverlay");
        if ("none" == domStyle.get(overlayNode, "display")) {
            var coords = domGeometry.getMarginBox(targetNode || baseWindow.body());
            domGeometry.setMarginBox(overlayNode, coords);
            domStyle.set(dom.byId("loadingOverlay"), {
                display: "block",
                opacity: 1
            });
        }
    },

    endLoading = function () {
        fx.fadeOut({
            node: dom.byId("loadingOverlay"),
            duration: 175,
            onEnd: function (node) {
                domStyle.set(node, "display", "none");
            }
        }).play();
    };

    return {
        init: function () {
            startLoading();
            ready(function () {
                initUi();
                endLoading();
            });
        }
    };
});