function animate(graph) {
    let morph = new mxMorphing(graph);
    morph.addListener(mxEvent.DONE, function () {
        graph.getModel().endUpdate();
    });
    morph.startAnimation();
}

function DrawAddToResourceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 40
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2

        let root = graph.getModel().getCell('resource')
        let edgeId = 'resource#'+ this.valueId
        let vertex = graph.insertVertex(parent, this.valueId, this.valueId, x, y, width, height)
        graph.insertEdge(parent, edgeId, this.index, root, vertex)

        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}

function DrawRemoveFromResourceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        // let parent = graph.getDefaultParent()
        // let cell = graph.getModel().getCell(this.valueId)
        // graph.model.remove(cell)
        // layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}

function DrawSetAttributeEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let valueId = this.targetId + '.' + this.featureName + '.0'
        let valueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)
        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height, 'rounded=1;arcSize=50;')
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.value
        let valueNode = graph.getModel().getCell(valueId)
        if (value != null) {
            let ownerNode = graph.getModel().getCell(this.valueId)
            valueNode = graph.insertVertex(parent, valueId, value, x, y, width, height, 'shape=hexagon;size=0.001;')
            let edge = graph.insertEdge(parent, valueEdgeId, null, featureNode, valueNode)
        }

        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}

function DrawUnsetAttributeEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2
        F

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let oldValueId = this.targetId + '.' + this.featureName + '.0'
        let oldValueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)
        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height)
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.value
        let valueNode = graph.getModel().getCell(oldValueId)
        let valueEdge = graph.getModel().getCell(oldValueEdgeId)
        if (valueNode != null) {
            graph.getModel().remove(valueNode)
        }
        if (valueEdge != null) {
            graph.getModel().remove(valueEdge)
        }


        layout.execute(parent);
    } catch
        (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}

function DrawSetReferenceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let valueId = this.targetId + '.' + this.featureName + '.0'
        let valueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)
        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height, 'rounded=1;arcSize=50;')
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.valueId
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
        animate(graph)
    }
}

function DrawUnsetReferenceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2
        F

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let oldValueId = this.targetId + '.' + this.featureName + '.0'
        let oldValueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)
        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height, 'rounded=1;arcSize=50;')
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.valueId
        let valueNode = graph.getModel().getCell(oldValueId)
        let valueEdge = graph.getModel().getCell(oldValueEdgeId)
        if (valueNode != null) {
            graph.getModel().remove(valueNode)
        }
        if (valueEdge != null) {
            graph.getModel().remove(valueEdge)
        }


        layout.execute(parent);
    } catch
        (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}

function DrawAddToReferenceEvent(graph) {
    graph.getModel().beginUpdate();
    try {
        let parent = graph.getDefaultParent()
        let width = 60
        let height = 20
        let a = graph.container.clientWidth * graph.view.scale
        let b = graph.container.clientHeight * graph.view.scale
        let x = (-width + a) / 2
        let y = (-height + b) / 2

        let featureId = this.targetId + '.' + this.featureName
        let featureEdgeId = this.targetId + '#' + this.featureName
        let valueId = this.targetId + '.' + this.featureName + '.0'
        let valueEdgeId = this.targetId + '#' + this.featureName + '#0'
        let featureNode = graph.getModel().getCell(featureId)

        if (featureNode == null) {
            let ownerNode = graph.getModel().getCell(this.targetId)
            featureNode = graph.insertVertex(parent, featureId, this.featureName, x, y, width, height, 'rounded=1;arcSize=50;')
            let edge = graph.insertEdge(parent, featureEdgeId, null, ownerNode, featureNode)
        }

        let value = this.valueId
        let index = this.index
        if (value != null) {
            let valueNode = graph.getModel().getCell(value)

            let eObject = cbpPlayer.resource.getEObject(this.targetId);
            let feature = eObject.features.get(this.featureName);
            if (feature.isContainment == true){
                let edge = null
                for (let i = 0; i < valueNode.getEdgeCount();i++){
                     edge = valueNode.getEdgeAt(i)
                     let x = edge.getId()
                    if (x.includes(this.valueId)){
                        break
                    }
                }
                graph.getModel().remove(edge)
            }

            let edge = graph.insertEdge(parent, valueEdgeId, index, featureNode, valueNode)
        }

        layout.execute(parent);
    } catch (e) {
        console.log(e)
    } finally {
        animate(graph)
    }
}


// assign appropriate drawing function to each event
for (let changeEvent of cbpPlayer.resource.changeEvents) {
    if (changeEvent instanceof AddToResourceEvent) {
        changeEvent.draw = DrawAddToResourceEvent
    } else if (changeEvent instanceof RemoveFromResourceEvent) {
        changeEvent.draw = DrawRemoveFromResourceEvent
    } else if (changeEvent instanceof SetAttributeEvent) {
        changeEvent.draw = DrawSetAttributeEvent
    } else if (changeEvent instanceof UnsetAttributeEvent) {
        changeEvent.draw = DrawUnsetAttributeEvent
    } else if (changeEvent instanceof SetReferenceEvent) {
        changeEvent.draw = DrawSetReferenceEvent
    } else if (changeEvent instanceof UnsetReferenceEvent) {
        changeEvent.draw = DrawUnsetReferenceEvent
    } else if (changeEvent instanceof AddToReferenceEvent) {
        changeEvent.draw = DrawAddToReferenceEvent
    }
}
