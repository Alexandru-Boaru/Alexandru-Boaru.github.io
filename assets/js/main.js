/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

function UrlExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status!=404;
  }

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var modalImgs = document.getElementsByClassName("myImg");
/*
Array.from(modalImgs).forEach(element => {
	element.addEventListener('click', displayModal(element));
});

img.onclick = function(element){
  modal.style.display = "block";
  modalImg.src = element.src;
  captionText.innerHTML = element.alt;
}*/

function displayModal(element)
{
  modal.style.display = "block";
  modalImg.src = element.src;
  captionText.innerHTML = element.alt;
}



function displayNext(direction)
{
	if(modal.style.display != "none")
	{

		var bigTokens = modalImg.src.split("_")
		var smallTokens = bigTokens[1].split(".");
		if(direction == "left" && Number(smallTokens[0]) > 1)
		{
			smallTokens[0] = String(Number(smallTokens[0])-1);
			var newSrc = "";
			newSrc = newSrc.concat(bigTokens[0], "_", smallTokens[0], ".", smallTokens[1]);
			modalImg.src = newSrc;
			captionText.innerHTML = smallTokens[0]-1;
		}
		else if(direction == "right" && Number(smallTokens[0] < globalSubImages.length)){
			smallTokens[0] = String(Number(smallTokens[0])+1);
			var newSrc = "";
			newSrc = newSrc.concat(bigTokens[0], "_", smallTokens[0], ".", smallTokens[1]);
			modalImg.src = newSrc;
			captionText.innerHTML = smallTokens[0]-1;
		}
	}
}

function displayLeft()
{
	displayNext("left");
}

function displayRight()
{
	displayNext("right");
}

//Function for swiping modal on phone

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
			displayLeft();
        } else {
            /* left swipe */
			displayRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
if(span != null){
	span.onclick = function() {
		modal.style.display = "none";
	}
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keydown', closeModal);

function keyDown(e){
    console.log(pageToLoad);
}

function closeModal(e)
{
	if(e.keyCode == 27 && modal)
		modal.style.display = "none";
	if(e.keyCode == 37 && modal)
		displayLeft();
	if(e.keyCode == 39 && modal)
		displayRight();
}
window.addEventListener('load', reorderProjects());
function reorderProjects()
{
	projectRoot = document.getElementById("two");
	var projects = Array.from(projectRoot.children);
	var headerParagraph = projects[0];
	projects = projects.filter((p)=> p.nodeName == "SECTION");
	var orderType = "invChrono";
	switch(orderType)
	{
		case "invChrono":
			for(var i = 0; i < projects.length-1; i++)
			{
				projectRoot.insertBefore(projects[i+1], projects[i]);
			}
			break;
		default:
			break;
	}
}