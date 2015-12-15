(function () {
    angular.module('angular-button-spinner', []).directive('buttonSpinner', ["$compile", function ($compile) {
        "use strict";

        var loadingIconElement, nextIconElement, backIconElement;
        var loadingIconTemplateDefault = "<span ng-show=\"loading\">&nbsp;<i class=\"fa fa-spinner fa-spin\"></i><span/>";

        var link = function (scope, element, attributes) {

            loadingIconElement = $compile(loadingIconTemplateDefault)(scope);
            element.append(loadingIconElement);

            attributes.$observe('loadingIcon', function (value) {
                var loadingIconTemplate = "<span ng-show=\"loading\">&nbsp;<i class=\"" + value + "\"></i><span/>";
                if (!!loadingIconElement) {
                    loadingIconElement.remove();
                }
                loadingIconElement = $compile(loadingIconTemplate)(scope);
                element.append(loadingIconElement);
            });

            attributes.$observe('nextIcon', function (value) {
                if (!!nextIconElement) {
                    nextIconElement.remove();
                }
                var nextIconTemplate = "<span ng-hide=\"loading\">&nbsp;<i class=\"" + value + "\"></i><span/>";
                nextIconElement = $compile(nextIconTemplate)(scope);
                element.append(nextIconElement);
            });

            attributes.$observe('backIcon', function (value) {
                if (!!backIconElement) {
                    backIconElement.remove();
                }
                var backIconTemplate = "<span>&nbsp;<i class=\"" + value + "\"></i><span/>";
                backIconElement = $compile(backIconTemplate)(scope);
                element.append(backIconElement);
            });
        }

        return {
            restrict: 'A',
            scope: {
                loading: '=buttonSpinner',
                loadingIcon: '@?',
                backIcon: '@?',
                nextIcon: '@?'
            },
            link: link
        }
    }]);
}());