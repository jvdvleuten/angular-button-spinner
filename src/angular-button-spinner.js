(function () {
    angular.module('angular-button-spinner', []).directive('buttonSpinner', function ($compile) {
        "use strict";
        
        var link = function (scope, element, attributes) {
            
            var spinningIconElement, buttonAppendElement, buttonPrependElement;
            
            var spinningIconTemplateDefault = "<span ng-show=\"spinning\">&nbsp;<i class=\"fa fa-spinner fa-spin\"></i><span/>";
            spinningIconElement = $compile(spinningIconTemplateDefault)(scope);
            element.append(spinningIconElement);

            attributes.$observe('spinningIcon', function (value) {
                var spinningIconTemplate = "<span ng-show=\"spinning\">&nbsp;<i class=\"" + value + "\"></i><span/>";
                if (!!spinningIconElement) {
                    spinningIconElement.remove();
                }
                spinningIconElement = $compile(spinningIconTemplate)(scope);
                element.append(spinningIconElement);
            });

            attributes.$observe('buttonAppend', function (value) {
                if (!!buttonAppendElement) {
                    buttonAppendElement.remove();
                }
                var buttonAppendTemplate = "<span ng-hide=\"spinning\">&nbsp;<i class=\"" + value + "\"></i><span/>";
                buttonAppendElement = $compile(buttonAppendTemplate)(scope);
                element.append(buttonAppendElement);
            });

            attributes.$observe('buttonPrepend', function (value) {
                if (!!buttonPrependElement) {
                    buttonPrependElement.remove();
                }
                var buttonPrependTemplate = "<span ng-hide=\"spinning\"><i class=\"" + value + "\"></i>&nbsp;<span/>";
                buttonPrependElement = $compile(buttonPrependTemplate)(scope);
                element.prepend(buttonPrependElement);

                var spinningIconPrependTemplate = "<span ng-show=\"spinning\"><i class=\"fa fa-spinner fa-spin\"></i>&nbsp;<span/>";

                if (scope.spinningIcon) {
                    spinningIconPrependTemplate = "<span ng-show=\"spinning\"><i class=\"" + scope.spinningIcon + "\"></i>&nbsp;<span/>";
                }
                
                if (!!spinningIconElement) {
                    spinningIconElement.remove();
                }
                
                spinningIconElement = $compile(spinningIconPrependTemplate)(scope);
                element.prepend(spinningIconElement);
            });
        }

        return {
            restrict: 'A',
            scope: {
                spinning: '=buttonSpinner',
                spinningIcon: '@?',
                buttonPrepend: '@?',
                buttonAppend: '@?'
            },
            link: link
        }
    });
} ());