# MVCSS

<pre>
M V C S S
O I
D E
E W
L
</pre>

1. Use imperative javascript to create a declarative model in css
2. Attach the declarative model to a dom node
3. Apply CSS to the dom node based

Attach CSS to Model

MVCSS

Model - Collection of data attached to a dom element as css properties

View - Styles defined on dom element utailzing css properties

Controller - Object used to manipulate values in model. Can be anything from automated code to user generated events.

It's sometimes difficult to decouple the model from the view.

For example, CSS doesn't have concept of "true" and "false",
so you may have to bake values for certain properties
(like "block" and "none" for display or "hidden" and "visible" for visibility")
into your model in order in order to toggle between different states.
