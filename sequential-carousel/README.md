<h2>Code Sample: Sequential Carousel</h2>

<img src="https://github.com/gubbeleye/code-samples/blob/master/sequential-carousel/captures/Capture.PNG" alt="" />
<br>
<br>
<h4>Description</h4>
<p>This code demonstrates the control of user progress through a one page, carousel-based course. To accomplish this, I used a combination of css classes and jQuery for DOM access and manipulation, along with the 'slide-changed' and 'reached-last-slide' custom event listeners from the carousel plug-in.</p>
<h5>Requirements</h5>
<p>The user must proceed <i>between</i> sections (carousels) in order based on completion of prior sections. The progress <i>within</i> sections must also be controlled based upon sequential slide progression and completion of required interactions.</p>
<p>Many slides include animations which need to be fired upon the slide taking focus then reset when removed from view.</p>
<p>When a user completes all the carousels on the page, the page is scored as completed. Once that happens, the user can come back and review the course without restrictions. Therefore, all locking functionality needs to be disabled on subsequent visits.</p>
<p>To handle these needs, the code is structured for 3 different scenarios:</p>
<ol>
<li>The page is unscored: lock-out code</li>
<li>The page is scored: unlock code</li>
<li>Code that always runs: animation control</li>
</ol>
<h4>Code</h4>
<a href="https://github.com/gubbeleye/code-samples/blob/master/sequential-carousel/markup.html">HTML</a>
<a href="https://github.com/gubbeleye/code-samples/blob/master/sequential-carousel/scripts.js">JavaScript</a>
<h4>Screen captures</h4>
<p>Drop target placement highlighted</p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/sequential-carousel/captures/Capture2.PNG" alt="" />
<br>
<br>
<p>Drag targets accepted</p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/sequential-carousel/captures/Capture3.PNG" alt="" />
