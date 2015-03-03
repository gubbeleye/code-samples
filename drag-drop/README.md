<h2>Code Sample: Drag and Drop</h2>

In this drag and drop, the user is encouraged to quickly match the occupations (draggables) to the faces (droppables) in any order they deem appropriate. Once a match is made, either by dragging/dropping or clicking, the matched components are disabled. After the user matches the last pair, the occupation titles (paragraphs within the draggables) are shuffled.

The two major challenges were as follows:
Create the illusion of triangular drop targets, accomplished through the careful CSS placement of drop targets inside containers with triangular background images.
Shuffling the titles after all draggables had been placed, accomplished by using a combination of jQuery methods including each(), index(), get(), detach(), and appendTo().
<br>
<br>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture.PNG" alt="" />
<br>
<br>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture2.PNG" alt="" />
<br>
<br>
<p><b>Drag targets accepted</b></p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture3.PNG" alt="" />
<br>
<br>
<p><b>Drag target titles shuffled</b></p>
<img src="https://github.com/gubbeleye/code-samples/blob/master/drag-drop/captures/Capture4.PNG" alt="" />
