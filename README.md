


In this drag and drop, the user is encouraged to quickly match the occupations (draggables) to the faces (droppables) in any order they deem appropriate. Once a match is made, either by dragging/dropping or clicking, the matched components are disabled. After the user matches the last pair, the occupation titles (paragraphs within the draggables) are shuffled.

The two major challenges were as follows:
Create the illusion of triangular drop targets, accomplished through the careful CSS placement of drop targets inside containers with triangular background images.
Shuffling the titles after all draggables had been placed, accomplished by using a combination of jQuery methods including each(), index(), get(), detach(), and appendTo().

