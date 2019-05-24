let eventNumber = -1
let MAIN_CONTAINER_WIDTH = 640
let MAIN_CONTAINER_HEIGHT = 480
let MAIN_CONTAINER_MARGIN = '-240px 0 0 -320px'

let graph = null
let layout = null

function main(container) {

    container.style.height = MAIN_CONTAINER_HEIGHT + 'px'
    container.style.width = MAIN_CONTAINER_WIDTH + 'px'
    container.style.margin = MAIN_CONTAINER_MARGIN

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        graph = new mxGraph(container);

        //create layout
        layout = new mxHierarchicalLayout(graph)

        //get root (layer 0)
        let parent = graph.getDefaultParent();

        //execute layout
        layout.execute(parent)
    }
};

function next() {
    eventNumber = eventNumber + 1
    if (eventNumber == 0 || eventNumber < cbpPlayer.resource.changeEvents.length) {
        let changeEvent = cbpPlayer.resource.changeEvents[eventNumber]
        changeEvent.drawReplay(graph)
    }
};