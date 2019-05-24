function addToResourceEventDraw(graph) {

    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let x = (-width + MAIN_CONTAINER_WIDTH) / 2
        let y = (-height + MAIN_CONTAINER_HEIGHT) / 2

        graph.insertVertex(parent, this.valueId, this.valueId, x, y, width, height);
        // let b = graph.getModel().getCell(this.valueId)

        layout.execute(parent);
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
