$.fn.tabular = function() {
	var tables = this;
	
	tables.each(function (i, e) {
		var table = $(e.cloneNode(true)).attr('data-tabular', 'target').data('page', 1).hide();
		var pager = $('<ul data-tabular="pager"><li><a href="#" data-tabular="previous">Previous</a></li> <li><a href="#" data-tabular="next">Next</a></li></ul>').hide();
		$(e).wrap('<div data-tabular="container">').after(pager).after(table);
		tabularPage(e, table);
		pager.find('a[data-tabular=previous]').click(function (evt) {
			table.data('page', Math.max(1, table.data('page') - 1));
			tabularPage(e, table);
			evt.preventDefault();
		});
		pager.find('a[data-tabular=next]').click(function (evt) {
			table.data('page', Math.min(Math.max(1, $(e).find('tr').length - 1), table.data('page') + 1));
			tabularPage(e, table);
			evt.preventDefault();
		});
	});
	
	function tabularPage(src, dst) {
		$(dst).empty();
		$(src).find('th[data-tabular!=unimportant]').each(function (i, e) {
			var page = $(dst).data('page');
			var data = $(src).find('tr').eq(page).find('td[data-tabular!=unimportant]')[i].cloneNode(true);
			var row = $('<tr>').append(e.cloneNode(true)).append(data);
			$(dst).append(row);
		});
	}
	
	function tabularResponsive() {
		if ($(window).width() < 768) {
			$('table[data-tabular=responsive]').hide();
			$('table[data-tabular=target], ul[data-tabular=pager]').show();
		} else {
			$('table[data-tabular=responsive]').show();
			$('table[data-tabular=target], ul[data-tabular=pager]').hide();
		}
	}
	
	$(window).resize(tabularResponsive);
	tabularResponsive();

	$('ul[data-tabular=pager]').addClass('pager');
	
	return this;
}
$('table[data-tabular=responsive]').tabular();