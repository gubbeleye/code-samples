$('.js-drag-target').draggable({
    revert: true,
    revertDuration: 100,
    scroll: false
});

$('.js-drop-target').droppable({
    accept: '.js-drag-target',
    over: function (e, ui) {
        onTermOver(e, ui);
    },
    out: function (e, ui) {
        onTermOut(e, ui);
    },
    drop: function (e, ui) {
        onTermDrop(e, ui);
    }
});

$('.introspection-container').on('mouseleave', function () {
    $('.js-drag-target').draggable('option', 'revert', true).trigger('mouseup');
});


/*
Droppable drop, over, and out functions
*/
function onTermDrop(e, ui) {
    var $drag = ui.draggable,
        $drop = $(e.target);

    runDrop($drag, $drop);
};

function onTermOver(e, ui) {
    var $drag = ui.draggable,
        $drop = $(e.target);
    $drag.addClass('over-drop');
    $drop.parent().addClass('selected');
};

function onTermOut(e, ui) {
    var $drag = ui.draggable,
        $drop = $(e.target);
    $drag.removeClass('over-drop');
    $drop.parent().removeClass('selected');
};


/*
Set up click option so user can click/tap between droppables and draggables to match them.
Only attach event listeners to active targets.
*/
$('.introspection-items').on('click', '.js-drag-target:not(.ui-state-disabled)', function () {
    $('.js-drag-target').removeClass('selected');
    $(this).addClass('selected');
    checkForClickedMatch();
});

$('.introspection-items').on('click', '.js-drop-target:not(.accepted)', function () {
    $('.js-drop-target').removeClass('selected', function () {
        $('.triangle-shape').removeClass('selected')
    });
    $(this).addClass('selected', function () {
        $(this).parent().addClass('selected');
    });
    checkForClickedMatch();
});

function checkForClickedMatch() {
    var $drag = $('.js-drag-target.selected');
    var $drop = $('.js-drop-target.selected');
    
    //When there is both a draggable and a droppable selected,
    //run the same code that would run on a jQuery drop 
    if ($drag.length == 1 && $drop.length == 1) {
        runDrop($drag, $drop);
    }
}


/*
runDrop() handles what happens when a draggable is dropped on a target, 
or when a draggable and droppable are matched via click option
*/
function runDrop($drag, $drop) {
  
    $drop.append($drag);
    
    //turn off the matched drag and drop targets
    $('.js-drag-target, .js-drop-target').removeClass('selected').blur();

    $drop.addClass('accepted', function () { 
      $(this).parent().addClass('accepted'); 
    }).droppable('disable');
    
    $drag.draggable('disable');

    //Check if there are any drag targets left in the draggables container
    if ($('.draggables').find('.js-drag-target').length == 0) {
        // If there are none, begin the shuffle
        shuffleRoles();
    }
}

/*
shuffleRoles() shuffles the paragraph elements (occupation titles) inside the placed 
draggables.
*/
function shuffleRoles() {
    //get the pargraph elements to be shuffled
    var dragText = $('.js-drag-target > p');
    
    //hide the elements
    dragText.fadeOut(800, function () {
        //shuffle the elements by 2 if they haven't moved been already
        dragText.not('.placed').each(function () {
            //find the current index of the parent element within the set and assign to currentPosition
            var currentPosition = $(this).parents('.js-triangle').index(),
                    nextPosition;
                    
            /*If the currentPosition value is less than or equal to 3,
            add 2, if not subtract 4 to get the corresponding element and assign it to nextPosition.*/
            if (currentPosition <= 3) {
                nextPosition = $('.js-triangle').get(currentPosition + 2);
            } else {
                /*Because there are only six paragraph element/parent element pairs, 
                paragraph elements greater than index 3 when shuffled plus 2 would
                not have a parent element to attach to and parent elements 0 and 1 would be left empty,
                therefore we shuffle them to the 0 and 1 positions by subtracting 4.*/
                nextPosition = $('.js-triangle').get(currentPosition - 4);
            }
            /*Find the drag target element inside nextPosition, assign it to nextPositionTarget.
            Move it to nextPositionTarget, and assign it the 'placed' class so it isn't moved 
            or iterated over again.*/
            var nextPositionTarget = $(nextPosition).find('.js-drag-target');
            $(this).detach().appendTo(nextPositionTarget).addClass('placed');
        });

        //Reveal the shuffled text
        $('.js-drop-target').each(function (index) {
            $(this).find(dragText).delay(400 * index).fadeIn();
        })
    });
}