$(function(){
	var fruits = [
		{fruitName: 'яблуко', id: 0},
		{fruitName: 'груша', id: 1},
		{fruitName: 'персик - був дуже вкусний', id: 2},
		{fruitName: 'виноград', id: 3}],
		idCounter = fruits.length;

	el_create();

	function el_create() {
		var tableRows;

		for(var i = 0; i < fruits.length; i++){
			var gift = fruits[i].fruitName;

			if (fruits[i].fruitName.length > 17) {
				gift = fruits[i].fruitName.slice(0,17)+'...';
			}

			tableRows += '<tr data-id=' + fruits[i].id + '><td><input type="checkbox" class="checkFruit"><span class="nameGift">' + gift + '</span></td> <td class="deleteFruit">x</td></tr>';
		}

		$('#elements table').html(tableRows);
		changeGoods();
		deleteProd();
	}

	function deleteProd () {
		// delete one goods
		$('.deleteFruit').click(function () {
			var id = $(this).parent().attr('data-id');

			for(var i = 0; i < fruits.length; i++){
				if (fruits[i].id == id) {
					fruits.splice(i,1);

					$(this).parent().remove();
				}
			}
		});

		// style goods
		$('.checkFruit').click(function(){
			if($(this).prop( "checked" )) {
				$(this).next().css({
					'text-decoration':'line-through',
					'opacity':0.5
				});
			} else {
				$(this).next().css({
					'text-decoration':'none',
					'opacity':1
				});
			}
		});

		// delete all checked goods
		$('[name=delete]').click(function () {
			var checkedGoodsIds = [],
				checkedAnyItem = false;

			$.each($('.checkFruit'), function (i, item) {
				if ($(item).prop('checked')) {
					var selectedFruitId = parseInt($(item).parents('tr').attr('data-id'));

					checkedGoodsIds.push(selectedFruitId);
					checkedAnyItem = true;
				}
			});

			if(checkedAnyItem) {
				$('.checkFruit:checked').parent().remove();
	
				for (var i = 0; i < fruits.length; i++) {
					$.each(checkedGoodsIds, function (j, checkedGoodId) {
						if (fruits[i] && fruits[i].id === checkedGoodId) {
							fruits.splice(i, 1);
							i--;
						}
					});
				}
			}
			$('[name=selectAll]').prop('checked',false);
		});
	}

	// change goods
	function changeGoods () {
		// double click
		$('.nameGift').dblclick(function() {
			var oldText = '',
				id = +$(this).parents('tr').attr('data-id');

			$.each(fruits, function (i, fruit) {
				if (fruit.id == id) {
					oldText = fruit.fruitName;
				}
			});

			$(this).html('<input value="' + oldText + '">');
			$(this).off('keydown');
			$(this).keydown(function (e) {
				if (e.keyCode == 13) {
					var innerText = $(e.currentTarget).find('input').val();

					$.each(fruits, function (i, fruit) {
						if (fruit.id == id) {
							fruit.fruitName = innerText;
						}
					});

					if(innerText.length > 17) { innerText = innerText.slice(0,17)+'...'; }

					$(this).text(innerText);
				} else if (e.keyCode == 27 ) {

					if(oldText.length > 17) { oldText = oldText.slice(0,17)+'...'; }

					$(this).text(oldText);
			    }
			});
		});
	}

	//enter goods
	$('[name=addd]').keydown(function(e) {
		if(e.keyCode == 13){
			if($('[name=addd]').val() == '') {
				alert('Напиши щось!');
			} else {
				idCounter++;

				fruits.push({
					fruitName: $('[name=addd]').val(),
					id: idCounter
				});

				$('[name=addd]').val('');
				el_create();
				console.log(fruits);
			}
		}
	});

	// select all
	$('[name=selectAll]').click(function () {
		if($(this).prop('checked')) {
			$('.checkFruit').prop('checked',true).next().css({
				'text-decoration':'line-through', 
				'opacity':0.5
			})
		} else {
			$('.checkFruit').prop('checked',false).next().css({
				'text-decoration':'none',
				'opacity':1
			});
		}
	});
})
