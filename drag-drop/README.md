<h2>Code Sample: Drag and Drop</h2>

<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture.PNG" alt="" />
<br>
<br>
<h4>Description</h4>
<p>In this drag and drop, the user is encouraged to quickly match the occupations (draggables) to the faces (droppables) in any order they deem appropriate. Once a match is made, either by dragging/dropping or clicking, the matched components are disabled. After the user matches the last pair, the occupation titles (paragraphs within the draggables) are shuffled.</p>

<p>The two major challenges were as follows:</p>
<ol>
<li>Create the illusion of triangular drop targets, accomplished through the careful CSS placement of drop targets inside containers with triangular background images.</li>
<li>Shuffling the titles after all draggables had been placed, accomplished by using a combination of jQuery methods including each(), index(), get(), detach(), and appendTo().</li>
</ol>
<h4>Code</h4>
<p><a href="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/markup.html">HTML</a>
<p><a href="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/styles.css">CSS</a>
<p><a href="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/scripts.js">JavaScript</a>
<h4>Screen captures</h4>
<p>Drop target placement highlighted</p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture2.PNG" alt="" />
<br>
<br>
<p>Drag targets accepted</p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture3.PNG" alt="" />
<br>
<br>
<p>Drag target titles shuffled</p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture4.PNG" alt="" />
