/*
    This code demonstrates the control of user progress through a carousel-based course.
    To accomplish this, I used a combination of css classes and jQuery for DOM access and 
    manipulation, along with the 'slide-changed' and 'reached-last-slide' custom event 
    listeners from the carousel plug-in.

    Scenario:
        Control progress of user through course content, allowing them to proceed between sections (carousels)
        in order based on prior section completion. The progress within sections was also controlled
        based upon sequential slide progression and completion of required interactions.

        Many slides included animations which needed to be fired upon the change to a slide containing the animation
        then reset when the removed from view.

        Once the course is completed by a user which scores the page, that user can come back and review the course without
        restrictions. Therefore, all locking functionality needs to be disabled.

    To handle these needs, the code is structured for 3 different scenarios:
        1) The page is unscored: lock-out code
        2) The page is scored: unlock code
        3) Code that always runs: animation control
*/


//Code run if page scored
if (parent.sco.apiConnector.suspendData(scoLocation) == '1') {
    $('.sublime-carousel-next').removeClass('disabled');
    $('.locked-cover').css({ 'display': 'none' });
    $('article').removeClass('locked');

//Code run if page unscored
} else {
    //Disable all jump buttons so they cannot be used for navigation
    $('.sublime-carousel-jump').addClass('sublime-carousel-disabled');

    /*
      Note: carousel navigation is disabled in the carousel plug-in code
      using a statement like this: 
      $nav.on('click', '.sublime-carousel-jump:not(.sublime-carousel-disabled)', jumpClicked);
    */

    //All carousels
    $('.carousel').each(function () {
        var $this = $(this);

        //Remove disabled class from first jump button
        var allJumps = $this.find('.sublime-carousel-jump'),
            firstJump = $(allJumps).get(0);
        $(firstJump).removeClass('sublime-carousel-disabled');

        /*Code that executes when the carousel is navigated which triggers
        the custom 'slide-changed' event listener*/
        $this.on('slide-changed', function (e) {
            //Get the current visible slide
            var thisSlide = $this.find('.sublime-carousel-slide').get(e.index);

            //Remove disabled class from current slide's jump button when it loads
            var jumpButton = $this.find('.sublime-carousel-jump').get(e.index);
            $(jumpButton).removeClass('sublime-carousel-disabled');

            /*Add next button disabled class when viewing slides with interaction class.
            The 'interaction' and 'disabled' classes are removed by the interaction code
            when the interaction is completed*/
            var $nextButton = $this.find('.sublime-carousel-next');
            if ($(thisSlide).hasClass('interaction')) {
                $nextButton.addClass('disabled');
                /*This else if condition handles the case of two interaction slides in a row.
                //The user can still go back a slide before they complete an interaction
                //which would leave the next button still locked.*/
            } else if ((!$(thisSlide).hasClass('interaction')) && ($nextButton.hasClass('disabled'))) {
                $nextButton.removeClass('disabled');
            }
        });

        //Reached last slide custom event listener
        $this.on('reached-last-slide', function (e) {
            /*Unlock the next section by hiding the 'locked-cover' over next carousel, 
            and enable the drop down nav item for the current section.*/
            var $nextModule = $this.parents('article').next();
            $nextModule.find('.locked-cover').fadeOut(500, function () {
                $nextModule.removeClass('locked');
                jumpLinks.eq($nextModule.index() - 1).removeClass('disabled');
            });
        });
    });

    //score page at end of carousel 07
    var $carousel07 = $('#carousel07 .carousel');
    $carousel07.on('reached-last-slide', function (e) {
        parent.scorePage();
    });
}

//Always run: primarily handles animations
$('.carousel').each(function () {
    var $this = $(this);

    //Slide changes
    $this.on('slide-changed', function (e) {
        //Find the current slide and all other slides
        var thisSlide = $this.find('.sublime-carousel-slide').get(e.index),
            $otherSlides = $(thisSlide).siblings();

        //Animations
        var animationSlide = $this.find('.animation');
        if (animationSlide.length) {
            //Run animation on current slide if the slide has an 'animation' class
            if ($(thisSlide).hasClass('animation')) {
                //General animations which are basic fade-ins
                $(thisSlide).find('.js-fade-in').each(function (i) {
                    $this.delay(i * 400).fadeIn(400);
                });

                //Special animation
                $(thisSlide).find('.js-move.image-service').animate({
                    left: '+=60'
                }, 600);
                $(thisSlide).find('.js-move.image-content').animate({
                    left: '-=60'
                }, 600);

                //Special animation
                $(thisSlide).find('.guidebox').delay(400).fadeOut(500, function () {
                    $(thisSlide).find('.js-fade-in-after').each(function (i) {
                        $this.delay(i * 600).fadeIn(400);
                    });
                });
            }

            //Reset animations on other slides
            if ($otherSlides.hasClass('animation')) {
                //undo animations
                $otherSlides.find('.js-fade-in').stop().css({ 'display': 'none' });
                $otherSlides.find('.js-fade-in-after').stop().css({ 'display': 'none' });

                $otherSlides.find('.js-move.image-service').stop().css({ 'left': '35px' });
                $otherSlides.find('.js-move.image-content').stop().css({ 'left': '280px' });

                $otherSlides.find('.guidebox').stop().css({ 'display': 'block' });
            }
        }

        //Pause any playing video.js player
        if ($('.play-pause.play').length) {
            $.each(window._V_.players, function (i, player) {
                player.pause();
            });
        }
    });
});