(function($) {


    var treeCheckbox = {};

    // 构建模板
    treeCheckbox.buildUI = function(root, data) {

        for (var i = 0, len = data.length; i < len; i++) {

            var $li = $('<li class="tree-checkbox-item"><div class="tree-checkbox-wrapper"><label for="name_' + data[i].value + '"><input type="checkbox" id="name_' + data[i].value + '" data-checked="' + data[i].distribution + '"> ' + data[i].menuName + '</label></div></li>')

            if (data[i].childMenus) {

                var $ul = $('<ul class="tree-checkbox-list">');

                $li.append($ul);
            }

            root.append($li);

            if (typeof data[i] === 'object') {
                for (var k in data[i]) {
                    if (Array.isArray(data[i][k])) {
                        arguments.callee($ul, data[i][k]);
                    }
                }
            }
        }

        return root;
    }

    // 初始化
    treeCheckbox.init = function(root) {

    	// 是否默认勾选
        var $checkbox = $('input[type="checkbox"]');

        for (var i = 0, len = $checkbox.length; i < len; i++) {
        	
        	var checked = $($checkbox[i]).attr('data-checked') === '1';

        	$($checkbox[i]).prop('checked', checked);

        }
        // 绑定事件
        $(root).on('click', function(e) {

            var $target = $(e.target || window.target);

            $target = $target.closest('.tree-checkbox-wrapper').find('input[type="checkbox"]');

            $target.attr('data-checked', +$target.prop('checked'));
            
            var $parent = $target.closest('.tree-checkbox-list').siblings('.tree-checkbox-wrapper').find('input[type="checkbox"]');

            var $siblings = $target.closest('.tree-checkbox-item').siblings('.tree-checkbox-item').find('input[type="checkbox"]');

            var $children = $target.closest('.tree-checkbox-wrapper').siblings('.tree-checkbox-list').find('input[type="checkbox"]');
            
            // 父元素是否勾选
            parentIsChecked($target, $siblings, $parent);

            // 子元素是否勾选
            childrenIsChecked($target, $children);


        })

        var parentIsChecked = function(target, siblings, parent) {

            if ($(target).length === 0) {
                return;
            }

            var checked = true,
                distribution = 0;

            for (var i = 0, len = siblings.length; i < len; i++) {

                if (!$(siblings[i]).prop('checked')) {

                    checked = false;

                }
            }

            checked = $(target).prop('checked') && checked;

            distribution = checked ? 1 : 0;

            parent.prop('checked', checked).attr('data-checked', distribution);

            $target = $(parent);

            var $parent = $target.closest('.tree-checkbox-list').siblings('.tree-checkbox-wrapper').find('input[type="checkbox"]');

            var $siblings = $target.closest('.tree-checkbox-item').siblings('.tree-checkbox-item').find('input[type="checkbox"]');


            parentIsChecked($target, $siblings, $parent);

        };

        var childrenIsChecked = function(target, children) {
            var checked = $(target).prop('checked');

            for (var i = 0, len = children.length; i < len; i++) {

                $(children[i]).prop('checked', checked);

            }

        }
    }


    window.treeCheckbox = treeCheckbox;

})(jQuery);
