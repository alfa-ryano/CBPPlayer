function addToResourceEventDraw(graph) {

    graph.getModel().beginUpdate();
    try {
        var parent = graph.getDefaultParent();
        graph.insertVertex(parent, this.valueId, this.valueId, 20, 20, 80, 30);
    } catch (e) {
        console.log(e)
    } finally {
        graph.getModel().endUpdate();
    }
    console
}

// assign appropriate drawing function to each event
for (let changeEvent of cbpPlayer.resource.changeEvents) {
    if (changeEvent instanceof AddToResourceEvent) {
        changeEvent.draw = addToResourceEventDraw
    }
}
