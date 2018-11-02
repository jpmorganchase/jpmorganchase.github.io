// Copyright 2015 ThoughtWorks, Inc.

// This file is part of getgauge/html-report.

// getgauge/html-report is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// getgauge/html-report is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with getgauge/html-report.  If not, see <http://www.gnu.org/licenses/>.

const SORTING_ORDER = {
    DESC:'DESC',
    ASC:'ASC',
};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y, "Z"
    ].join(" ");
}

function filterSpecList(status) {
    $('#listOfSpecifications li.spec-name').each(function() {
        if ($(this).hasClass(status)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    var specs = $(".spec-list a").filter(function() { return $(this).children().first().is(':visible'); })
    filterSidebar(specs, $('#searchSpecifications').val().trim());
}

function showFirstSpecContent() {
    $('li.spec-name:visible:first').click();
    if ($('li.spec-name:visible:first').length === 0) {
        $('#specificationContainer').hide();
    }
}

function filterSidebar(specsCollection, searchText) {
    if (!index) return;
    tagMatches = index.Tags[searchText];
    specsCollection.each(function() {
        var relPath = $(this).attr('href').split("/");
        var fileName = relPath[relPath.length - 1];
        var existsIn = function(arr) {
            if (arr === undefined) {
                return false;
            }
            arr = $.grep(arr, function(a, i) {
                return a.indexOf(fileName) > -1;
            });
            return arr.length > 0;
        }
        specHeadingText = $(this).text().trim().toLowerCase();
        if (existsIn(tagMatches) || specHeadingText.indexOf(searchText.toLowerCase()) > -1 || searchText === '') {
            $($(this).find('li')[0]).show();
        } else {
            $($(this).find('li')[0]).hide();
        }
    })
}

function resetSidebar() {
    $('#listOfSpecifications li.spec-name').each(function() {
        $(this).show();
    });
}

function openModal(e) {
    $(this).next('.modal').css('display', 'block');
    $('body').addClass('is-modal-open');
}

function closeModal() {
    $('.modal').css('display', 'none');
    $('body').removeClass('is-modal-open');
}

function isDescendingOrder(specsSortOrder) {
    return specsSortOrder === SORTING_ORDER.DESC;
}

function createDate(hours, minutes, seconds) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
}

function sortSpecsByName(sortingOrder) {
    return $('#listOfSpecifications ul#scenarios a').sort(function (leftSpec, rightSpec) {
        if (isDescendingOrder(sortingOrder))
            return $(leftSpec).find('.spec-name span:nth-child(1)').text() > $(rightSpec).find('.spec-name span:nth-child(1)').text() ? -1 : 1;
        else
            return $(leftSpec).find('.spec-name span:nth-child(1)').text() < $(rightSpec).find('.spec-name span:nth-child(1)').text() ? -1 : 1;
    });
}

function sortSpecsByExecutionTime(sortingOrder) {
    return $('#listOfSpecifications ul#scenarios a').sort(function (leftSpec, rightSpec) {
        var leftSpecTime = $(leftSpec).find('.spec-name span:nth-child(2)').text().split(':');
        var rightSpecTime = $(rightSpec).find('.spec-name span:nth-child(2)').text().split(':');

        var leftDate = createDate.apply(null, leftSpecTime.map( time => parseInt(time)));
        var rightDate = createDate.apply(null, rightSpecTime.map( time => parseInt(time)));

        if (isDescendingOrder(sortingOrder))
            return leftDate > rightDate ? -1 : 1;
        else
            return leftDate < rightDate ? -1 : 1;
    });
}

function toggleSortIcons(element, sortingOrder) {
    $(element).find('.sort-icons .fa').removeClass('active');
    if (isDescendingOrder(sortingOrder))
        $(element).find('.sort-icons .fa-caret-up').addClass('active');
    else
        $(element).find('.sort-icons .fa-caret-down').addClass('active');
}

var initializers = {
    "initializeFilters": function() {
        if (sessionStorage.FilterStatus) {
            filterSpecList(sessionStorage.FilterStatus);
            $('.spec-filter').each(function() {
                if ($(this).data('status') === sessionStorage.FilterStatus) {
                    $(this).addClass('active');
                }
            });
            if ($('li.spec-name:visible:first').length === 0) {
                $('#specificationContainer').hide();
            }
        } else {
            $('.total-specs').addClass('active');
        }
        if (sessionStorage.SearchText) {
            $('#searchSpecifications').val(sessionStorage.SearchText);
            var specs = $(".spec-list a");
            filterSidebar(specs, sessionStorage.SearchText);
        }
    },
    "attachScenarioToggle": function() {
        $('.row-selector').click(function() {
            $('.row-selector').each(function() { $(this).removeClass('selected'); });
            $(this).addClass('selected');
            var tr = $(this).data('rowindex');
            $(".scenario-container").each(function() {
                if (typeof $(this).data('tablerow') != 'undefined') {
                    if ($(this).data('tablerow') === tr) { $(this).show(); } else { $(this).hide(); }
                } else {
                    $(this).show();
                }
            });
            $(".error-container").each(function() {
                if (typeof $(this).data('tablerow') != 'undefined') {
                    if ($(this).data('tablerow') === tr) { $(this).show(); } else { $(this).hide(); }
                } else {
                    $(this).show();
                }
            });

        });
    },
    "attachSpecFilter": function() {
        var resetState = function() {
            $('.spec-filter, .total-specs').each(function() {
                $(this).removeClass('active');
            });
        };
        $('.spec-filter, #pie-chart path.shadow').click(function() {
            resetState();
            var status = $(this).data('status');
            sessionStorage.FilterStatus = status;
            filterSpecList(status);
            showFirstSpecContent();
            $(this).addClass('active');
        });
        $('.total-specs').click(function() {
            resetState();
            resetSidebar();
            sessionStorage.removeItem('FilterStatus');
            var specs = $(".spec-list a").filter(function() { return $(this).children().first().is(':visible'); })
            filterSidebar(specs, $('#searchSpecifications').val().trim());
            showFirstSpecContent();
            $(this).addClass('active');
        });
    },
    "registerModals": function() {
        $('.modal-link').click(openModal);
        $(document).keydown(function(e) {
            if (e.keyCode == 27) closeModal();
        })
        $('.close').click(closeModal)
    },
    "registerConceptToggle": function() {
        $('.concept').click(function() {
            var conceptSteps = $(this).next('.concept-steps');
            var iconClass = $(conceptSteps).is(':visible') ? "plus" : "minus";
            $(conceptSteps).fadeToggle('fast', 'linear');
            $(this).find("i.fa").removeClass("fa-minus-square").removeClass("fa-plus-square").addClass("fa-" + iconClass + "-square");
        });
    },
    "registerMessageToggle": function() {
        $('.message-container i.fa').click(function() {
            var messages = $(this).next('.messages');
            var iconClass = messages.is(':visible') ? "plus" : "minus";
            messages.fadeToggle('fast', 'linear');
            $(this).removeClass("fa-minus-square").removeClass("fa-plus-square").addClass("fa-" + iconClass + "-square");
        });
    },
    "registerErrorContainerToggle": function() {
        $(".error-container .toggle-show").click(function() {
            var self = $(this);
            self.next('.exception-container').stop().toggleClass('hidden');
            self.text(self.text().indexOf("Show") > 0 ? "[Hide details]" : "[Show details]");
        });
    },
    "registerSearch": function() {
        $('#searchSpecifications').change(function() {
            searchText = $(this).val().trim();
            if (searchText.length == 0) {
                sessionStorage.removeItem('SearchText');
                resetSidebar();
            } else {
                sessionStorage.SearchText = searchText;
                var specs = $(".spec-list a");
                filterSidebar(specs, searchText);
            }
            showFirstSpecContent();
        });
    },
    "registerSearchAutocomplete": function() {
        new autoComplete({
            selector: 'input[id="searchSpecifications"]',
            minChars: 1,
            source: function(term, suggest) {
                term = term.toLowerCase();
                var tagChoices = Object.keys(index.Tags);
                var specChoices = Object.keys(index.Specs);
                var suggestions = [];
                var suggestionPredicate = function(type) {
                    return function(x) {
                        if (x.toLowerCase().startsWith(term))
                            suggestions.push([x, type]);
                    }
                };
                tagChoices.forEach(suggestionPredicate("tag"));
                specChoices.forEach(suggestionPredicate("spec"));
                suggest(suggestions);
            },
            renderItem: function(item, search) {
                iconClass = item[1] == "tag" ? "tags" : "bars"
                return '<div class="autocomplete-suggestion" data-value="' + item[0] + '"><i class="fa fa-' + iconClass + '" aria-hidden="true"></i>&nbsp;' + item[0] + '</div>';
            },
            onSelect: function(e, term, item) {
                $('#searchSpecifications').val($(item).data('value')).change();
            }
        });
    },
    "initializeClipboard": function() {
        new Clipboard('.clipboard-btn');
    },
    "drawPieChart": function() {
        var results = $("#pie-chart").data("results").split(",").map(Number);
        var total = Number($("#pie-chart").data("total"));
        var paths = $("#pie-chart path.status")
        var startAngle = 0;
        for (i = 0; i < results.length; i++) {
            coveredAngle = startAngle + results[i] * 360 / total;
            if (total === results[i])
                coveredAngle -= 0.05;
            $(paths[i]).attr('d', describeArc(100, 75, 72, startAngle, coveredAngle));
            $(paths[i]).next('path.shadow').attr('d', describeArc(100, 75, 75, startAngle, coveredAngle));
            if (results[i] === 0 || total === results[i])
                $(paths[i]).attr('stroke-width', 0);
            startAngle = coveredAngle;
        }
    },
    "initSpecsSorting": function () {
        $('.specs-sorting .sort').click(function () {
            const sortBy = $(this).data('sort-by');
            var sortingOrder = sessionStorage[sortBy];
            sortingOrder = sessionStorage[sortBy] = sortingOrder === SORTING_ORDER.ASC ? SORTING_ORDER.DESC : SORTING_ORDER.ASC;
            var sortingFunc;
            sortingFunc = sortBy === 'specs-name' ? sortSpecsByName : sortSpecsByExecutionTime;
            toggleSortIcons(this, sortingOrder);
            $('#listOfSpecifications ul#scenarios').html(sortingFunc(sortingOrder));
        });
    }
};

$(function() {
    $.each(initializers, function(k, v) { v(); });
});