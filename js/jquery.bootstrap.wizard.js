;(function($) {
var bootstrapWizardCreate = function(element, options) {
	var element = $(element);
	var obj = this;
	
	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	var baseItemSelector = 'li:has([data-toggle="tab"])';
	var historyStack = [];

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, options);
	var $activeTab = null;
	var $navigation = null;
	
	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	this.fixNavigationButtons = function() {
		// Get the current active tab
		if(!$activeTab.length) {
			// Select first one
			$navigation.find('a:first').tab('show');
			$activeTab = $navigation.find(baseItemSelector + ':first');
		}

		// See if we're currently in the first/last then disable the previous and last buttons
		$($settings.previousSelector, element).toggleClass('disabled', (obj.firstIndex() >= obj.currentIndex()));
		$($settings.nextSelector, element).toggleClass('disabled', (obj.currentIndex() >= obj.navigationLength()));
		$($settings.nextSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.lastSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.finishSelector, element).toggleClass('hidden', (obj.currentIndex() < obj.navigationLength()));
		$($settings.backSelector, element).toggleClass('disabled', (historyStack.length == 0));
		$($settings.backSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));

		// We are unbinding and rebinding to ensure single firing and no double-click errors
		obj.rebindClick($($settings.nextSelector, element), obj.next); 
		obj.rebindClick($($settings.previousSelector, element), obj.previous);
		obj.rebindClick($($settings.lastSelector, element), obj.last);
		obj.rebindClick($($settings.firstSelector, element), obj.first);
		obj.rebindClick($($settings.finishSelector, element), obj.finish);
		obj.rebindClick($($settings.backSelector, element), obj.back);

		if($settings.onTabShow && typeof $settings.onTabShow === 'function' && $settings.onTabShow($activeTab, $navigation, obj.currentIndex())===false){
			return false;
		}
	};

	this.next = function(e) {

		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex(); 
		$index = obj.nextIndex();

	  // Did we click the last button
		if($index > obj.navigationLength()) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}

		// ------------------- Handle foreward -------------------  //
		// ------------------- Configurations below must also be applied to the 'Continue' button -------------------  //
		// ------------------- Or just remove configuration button -------------------  //
		var currentTab = $index;
		console.log(currentTab);

			// Enable everything before starting
			$('select option').attr('disabled', false);
			$('#poster').attr('disabled', false);
			$('#leaflet').attr('disabled', false);
			$('#shelf').attr('disabled', false);

			$('#3up').attr('disabled', false);
			$('#6up').attr('disabled', false);
			$('#9up').attr('disabled', false);
			$('#12up').attr('disabled', false);

			$('#product').attr('disabled', false);
			$('#service').attr('disabled', false);

		if (fb.checked) {

			// Disabling all dropdowns
			$('select option').attr('disabled', true);

			// Disabling radio buttons
			$('#poster').attr('disabled', true);
			$('#leaflet').attr('disabled', true);
			$('#shelf').attr('disabled', true);
			$('#3up').attr('disabled', true);
			$('#6up').attr('disabled', true);
			$('#9up').attr('disabled', true);
			$('#12up').attr('disabled', true);

			$('#product').attr('disabled', true);
			$('#service').attr('disabled', true);

			// after the click function happens it's already on the next index
			if (currentTab == 1){
				document.getElementById("jump").click();
			}

			if(currentTab == 3){
				document.getElementById("jump").click();
				document.getElementById("jump").click();
				document.getElementById("jump").click();
				document.getElementById("jump").click();
			}
		};

		if (pos.checked) {			    

			// Hide and show steps
			$('#rootwizard').bootstrapWizard('hide', $('#tab5')); 
			$('#rootwizard').bootstrapWizard('hide', $('#tab7'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab4'));

			$('#rootwizard').bootstrapWizard('display', $('#tab6'));
			//$('#rootwizard').bootstrapWizard('display', $('#tab7'));
			

			// Disable and enable dropdowns required
			$('#longerDrop').attr('disabled', false);
			$('#shorterDrop').attr('disabled', true);
			// Deselect shelfie templates
			$('input[name=shelfTemp]').attr('checked',false);

			document.getElementById("3up").checked = false;

				// Skipping steps
				if (currentTab == 4) {
					document.getElementById("jump").click();
					console.log("poster clicked and index = 4")
				};

				if (currentTab == 6) {
					document.getElementById("jump").click();
				};

		} else if (leaf.checked) {			    
			$('#rootwizard').bootstrapWizard('hide', $('#tab5'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab6'));

			$('#rootwizard').bootstrapWizard('display', $('#tab7'));
			$('#rootwizard').bootstrapWizard('display', $('#tab8'));

			$('#longerDrop').attr('disabled', true);
			$('#shorterDrop').attr('disabled', false);
			$('input[name=shelfTemp]').attr('checked',false); 
			// handler1()

				if (currentTab == 4) {
					document.getElementById("jump").click();
					document.getElementById("jump").click();
				};

				if (currentTab == 6) {
					document.getElementById("jump").click();
				};

		} else if (shelf.checked) {
			$('#rootwizard').bootstrapWizard('display', $('#tab5'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab6'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab7'));

			$('#longerDrop').attr('disabled', true);
			$('#shorterDrop').attr('disabled', true); 

				if (currentTab == 5) {
					document.getElementById("jump").click();
					document.getElementById("jump").click();
				};
		}
		// ------------------- Handle foreward -------------------  //		    
	};

	this.previous = function(e) {
		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		$index = obj.previousIndex();

		if($index < 0) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}

		// ------------------- Handle backwards -------------------  //
		var currentTab = $index;
		console.log(currentTab);

		if (fb.checked) {

			// after the click function happens it's already on the next index
			if(currentTab == 6){
				document.getElementById("jumpBack").click();
				document.getElementById("jumpBack").click();
				document.getElementById("jumpBack").click();
			}

			if(currentTab == 1){
				document.getElementById("jumpBack").click();
			}
		};

		if (leaf.checked) {			    
			$('#rootwizard').bootstrapWizard('hide', $('#tab5'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab7'));
			$('#rootwizard').bootstrapWizard('display', $('#tab6'));
			$('#rootwizard').bootstrapWizard('display', $('#tab8'));

			$('#longerDrop').attr('disabled', true);
			$('#shorterDrop').attr('disabled', false); 

				if (currentTab == 5) {
					document.getElementById("jumpBack").click();
					document.getElementById("jumpBack").click();
				};



		} else if (pos.checked) {	

			$('#rootwizard').bootstrapWizard('hide', $('#tab5')); 
			$('#rootwizard').bootstrapWizard('hide', $('#tab8'));
			$('#rootwizard').bootstrapWizard('display', $('#tab6'));
			$('#rootwizard').bootstrapWizard('display', $('#tab7'));

			$('#longerDrop').attr('disabled', false);
			$('#shorterDrop').attr('disabled', true);

				if (currentTab == 4) {
					document.getElementById("jumpBack").click();
				};

				if (currentTab == 6) {
					document.getElementById("jumpBack").click();
				};

		} else if (shelf.checked) {
			$('#rootwizard').bootstrapWizard('hide', $('#tab6'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab7'));
			$('#rootwizard').bootstrapWizard('hide', $('#tab8'));

			$('#longerDrop').attr('disabled', true);
			$('#shorterDrop').attr('disabled', true);

				if (currentTab == 6) {
					document.getElementById("jumpBack").click();
					document.getElementById("jumpBack").click();
				};
		}
		// ------------------- Handle backwards -------------------  //	
	};

	this.first = function (e) {
		if($settings.onFirst && typeof $settings.onFirst === 'function' && $settings.onFirst($activeTab, $navigation, obj.firstIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(0) a').tab('show');
	};

	this.last = function(e) {
		if($settings.onLast && typeof $settings.onLast === 'function' && $settings.onLast($activeTab, $navigation, obj.lastIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(' + obj.navigationLength() + ') a').tab('show');
	};

	this.finish = function (e) {
	  if ($settings.onFinish && typeof $settings.onFinish === 'function') {
	    $settings.onFinish($activeTab, $navigation, obj.lastIndex());
	  }
	};

	this.back = function () {
	  if (historyStack.length == 0) {
	    return null;
	  }

	  var formerIndex = historyStack.pop();
	  if ($settings.onBack && typeof $settings.onBack === 'function' && $settings.onBack($activeTab, $navigation, formerIndex) === false) {
	    historyStack.push(formerIndex);
	    return false;
	  }

	  element.find(baseItemSelector + ':eq(' + formerIndex + ') a').tab('show');
	};

	this.currentIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab);
	};

	this.firstIndex = function() {
		return 0;
	};

	this.lastIndex = function() {
		return obj.navigationLength();
	};
	this.getIndex = function(e) {
		return $navigation.find(baseItemSelector).index(e);
	};
	this.nextIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) + 1;
	};
	this.previousIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) - 1;
	};
	this.navigationLength = function() {
		return $navigation.find(baseItemSelector).length - 1;
	};
	this.activeTab = function() {
		return $activeTab;
	};
	this.nextTab = function() {
		return $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')').length ? $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')') : null;
	};
	this.previousTab = function() {
		if(obj.currentIndex() <= 0) {
			return null;
		}
		return $navigation.find(baseItemSelector + ':eq('+parseInt(obj.currentIndex()-1)+')');
	};
	this.show = function(index) {
	  var tabToShow = isNaN(index) ? 
      element.find(baseItemSelector + ' a[href=#' + index + ']') : 
      element.find(baseItemSelector + ':eq(' + index + ') a');
	  if (tabToShow.length > 0) {
	    historyStack.push(obj.currentIndex());
	    tabToShow.tab('show');
	  }
	};
	this.disable = function (index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').addClass('disabled');
	};
	this.enable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').removeClass('disabled');
	};
	this.hide = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').hide();
	};
	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show();
	};
	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};
	
	var innerTabClick = function (e) {
		// Get the index of the clicked tab
		var $ul = $navigation.find(baseItemSelector);
		var clickedIndex = $ul.index($(e.currentTarget).parent(baseItemSelector));
		var $clickedTab = $( $ul[clickedIndex] );
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex, $clickedTab)===false){
		    return false;
		}
	};
	
	var innerTabShown = function (e) {  // use shown instead of show to help prevent double firing
		$element = $(e.target).parent();
		var nextTab = $navigation.find(baseItemSelector).index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		$activeTab = $element; // activated tab
		obj.fixNavigationButtons();
	};
	
	this.resetWizard = function() {
		
		// remove the existing handlers
		$('a[data-toggle="tab"]', $navigation).off('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).off('shown shown.bs.tab', innerTabShown);
		
		// reset elements based on current state of the DOM
		$navigation = element.find('ul:first', element);
		$activeTab = $navigation.find(baseItemSelector + '.active', element);
		
		// re-add handlers
		$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
		
		obj.fixNavigationButtons();
	};

	$navigation = element.find('ul:first', element);
	$activeTab = $navigation.find(baseItemSelector + '.active', element);

	if(!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass);
	}

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	// Load onShow
	if($settings.onShow && typeof $settings.onShow === 'function'){
		$settings.onShow($activeTab, $navigation, obj.nextIndex());
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);

	// attach to both shown and shown.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
	$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
};
$.fn.bootstrapWizard = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('bootstrapWizard')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return;
		// pass options to plugin constructor
		var wizard = new bootstrapWizardCreate(element, options);
		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard);
		// and then trigger initial change
		wizard.fixNavigationButtons();
	});
};

// expose options
$.fn.bootstrapWizard.defaults = {
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
  finishSelector:   '.wizard li.finish',
	backSelector:     '.wizard li.back',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
  onFinish:         null,
  onBack:           null,
	onTabChange:      null, 
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery);