var strokeNum, numtext;
(function ($) {

    var pluginName = 'svgPie',
        defaults = {
            easing: 'easeOutCubic',
            dimension: 200,
            percentage: 50,
            duration: 2000,
            totalSecond: 60,
            onStart: function () {
            },
            onComplete: function () {
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend($.easing, {
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });

    $.extend(Plugin.prototype, {
        init: function () {
            $(this.element).css({
                'width': this.settings.dimension + 'px',
                'height': this.settings.dimension + 'px'
            });
            this.createSvg();
            this.animateNumber();
            this.animateStrokeDasharray();
            $(this.element).addClass('rendered');
        },

        createSvg: function () {
            var half = this.settings.dimension / 2;
            var quarter = this.settings.dimension / 4 - 5;
            var area = Math.PI * 2 * quarter;
            var svg =
                '<svg>' +
                '<circle r="' + half +
                '" cx="' + half +
                '" cy="' + half +
                '"/>' +

                '<circle r="' + (quarter + 0.5) +
                '" cx="' + (half) +
                '" cy="' + (half) + '"' +
                'style="stroke-width:' + (half - 10) + 'px;' +
                'stroke-dasharray:' + '0px' + ' ' + area + ';' +
                '"/>' +
                '</svg>' +

                '<div class="percentage"' +
                '></div>';
            $(this.element).prepend(svg);
        },

        // Number animation
        animateNumber: function () {
            var $target = $(this.element).find('.percentage');
            var that = this;
            this.settings.percentage = this.settings.totalSecond;
            numtext = window.setInterval(() => {
                if (that.settings.percentage > 0) {
                    that.settings.percentage -= 1;
                    $({percentageValue: 0}).animate({
                        percentageValue: (that.settings.percentage)
                    }, {
                        duration: that.settings.duration,

                        easing: that.settings.easing,

                        start: that.settings.onStart,

                        step: function () {
                            $target.text(Math.round(that.settings.percentage) + 's');
                        },

                        complete: that.settings.onComplete
                    });
                } else {
                    window.clearInterval(numtext);
                }
            }, 1000);


        },
        // Pie animation
        animateStrokeDasharray: function () {
            var that = this;
            var fillStroke = () => {
                var that = this;
                var debug = that.settings.percentage >= 100 ? 1 : 0;
                var area = 2 * Math.PI * (((that.settings.dimension - 20) / 4) + 0.4);
                var strokeEndValue = ((that.settings.percentage / that.settings.totalSecond) * 100 + debug) * area / 100;
                var $target = $(that.element).find('svg circle:nth-child(2)');
                $({
                    strokeValue: 0
                }).animate({
                    strokeValue: strokeEndValue
                }, {
                    duration: that.settings.duration,
                    easing: that.settings.easing,
                    step: function () {
                        $target.css('stroke-dasharray', (area - strokeEndValue) + 'px' + ' ' + area + 'px');
                    }
                });
            };
            strokeNum = window.setInterval(() => {
                if (that.settings.percentage > 0) {
                    fillStroke();
                } else {
                    fillStroke();
                    window.clearInterval(strokeNum);
                }
            }, 1000);

        },
    });
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            // if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            // }
        });
    };
    $.fn.stopInter = function () {
        window.clearInterval(strokeNum);
        window.clearInterval(numtext);
    };
})(jQuery);
