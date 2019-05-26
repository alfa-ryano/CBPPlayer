function DrawAddToResourceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let x = (-width + MAIN_CONTAINER_WIDTH) / 2
        let y = (-height + MAIN_CONTAINER_HEIGHT) / 2

        graph.insertVertex(parent, this.valueId, this.valueId, x, y, width, height, 'rounded=1;');
        // let node = graph.getModel().getCell(this.valueId)

        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        let morph = new mxMorphing(graph);
        morph.addListener(mxEvent.DONE, function () {
            graph.getModel().endUpdate();
        });
        morph.startAnimation();
    }
    console
}

function DrawRemoveFromResourceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let cell = graph.getModel().getCell(this.valueId)
        graph.model.remove(cell)
        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        let morph = new mxMorphing(graph);
        morph.addListener(mxEvent.DONE, function () {
            graph.getModel().endUpdate();
        });
        morph.startAnimation();
    }
    console
}

function DrawSetAttributeEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let x = (-width + MAIN_CONTAINER_WIDTH) / 2
        let y = (-height + MAIN_CONTAINER_HEIGHT) / 2

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let valueId = this.targetId + '.' + this.featureName + '.0'
        let valueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)
        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height)
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.value
        let valueNode = graph.getModel().getCell(valueId)
        if (value != null) {
            let ownerNode = graph.getModel().getCell(this.valueId)
            valueNode = graph.insertVertex(parent, valueId, value, x, y, width, height)
            let edge = graph.insertEdge(parent, valueEdgeId, null, featureNode, valueNode)
        }

        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        let morph = new mxMorphing(graph);
        morph.addListener(mxEvent.DONE, function () {
            graph.getModel().endUpdate();
        });
        morph.startAnimation();
    }
    console
}


// assign appropriate drawing function to each event
for (let changeEvent of cbpPlayer.resource.changeEvents) {
    if (changeEvent instanceof AddToResourceEvent) {
        changeEvent.draw = DrawAddToResourceEvent
    } else if (changeEvent instanceof RemoveFromResourceEvent) {
        changeEvent.draw = DrawRemoveFromResourceEvent
    } else if (changeEvent instanceof SetAttributeEvent) {
        changeEvent.draw = DrawSetAttributeEvent
    }
}
