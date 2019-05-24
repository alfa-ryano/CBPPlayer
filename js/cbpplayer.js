const ATTRIBUTE = "ATTRIBUTE"
const REFERENCE = "REFERENCE"

/***
 *
 */
class EObject {
    constructor() {
        this.id = null
        this.package = null
        this.className = null
        this.features = new Map()
        this.resource = null
    }
}

/**
 *
 */
class EFeature {
    constructor(owner) {
        this.name = null
        this.type = ATTRIBUTE
        this.owner = owner
        this.values = new Map()
    }

    ATTRIBUTE() {
        return ATTRIBUTE
    }

    REFERENCE() {
        return REFERENCE
    }
}

/**
 *
 */
class Resource {
    constructor() {
        this.idToEObjectMap = new Map()
        this.eObjectToIdMap = new Map()
        this.contents = new EFeature()
        this.changeEvents = []
        this.packages = []
    }

    setId(eObject, id) {
        this.eObjectToIdMap.set(eObject, id)
        this.idToEObjectMap.set(id, eObject)
    }

    getId(eObject) {
        return this.eObjectToIdMap.get(eObject)
    }

    setEObject(id, eObject) {
        this.eObjectToIdMap.set(eObject, id)
        this.idToEObjectMap.set(id, eObject)
    }

    getEObject(id) {
        return this.idToEObjectMap.get(id)
    }
}

/**
 *
 */
class ChangeEvent {
    constructor() {
        this.value = null
        this.session = null
    }

    replay() {
    }

    draw(graph) {
    }

    drawReplay(graph) {
        this.replay()
        this.draw(graph)
    }
}

/**
 *
 */
class SessionEvent extends ChangeEvent {
    constructor() {
        super();
        this.id = null
        this.time = null
    }
}

class CreateEObjectEvent extends ChangeEvent {
    constructor() {
        super();
        this.id = null
        this.package = null
        this.className = null
        this.resource = null
        this.eObject = null
    }

    replay() {
        this.eObject = new EObject()
        let eObject = this.eObject
        eObject.id = this.id
        eObject.package = this.package
        eObject.className = this.className
        eObject.resource = this.resource
        this.resource.setId(eObject, eObject.id)
    }
}

class AddToResourceEvent extends ChangeEvent {
    constructor() {
        super();
        this.position = null
        this.resource = null
        this.valueId = null
        this.value = null
    }

    replay() {
        this.value = this.resource.getEObject(this.valueId)
        this.resource.contents.values.set(this.position, this.value)
    }
}


/**
 * CbpUtil
 */
class CbpUtil {
    constructor() {
    }

    // Changes XML to JSON
    xmlToJson(xml) {

        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        // If just one text node inside
        if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
            obj = xml.childNodes[0].nodeValue;
        } else if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }

    /**
     * method to read a text file
     * @param {*} file
     */
    readTextFile(file) {
        var request = new XMLHttpRequest()
        request.open('GET', file, false)
        request.send(null)
        if (request.status === 200) {
            return request.responseText
        }
        return ""
    }
}


/**
 * CbpPlayer
 */
class CbpPlayer {

    constructor() {
        this.changeEventLines = null
        this.resource = new Resource()
    }

    /**
     * method to load a Cbp file
     * @param {*} file
     */
    loadCbp(file) {
        let cbpUtil = new CbpUtil()
        let cbpText = CbpUtil.prototype.readTextFile(file)
        this.changeEventLines = cbpText.split('\n')
        this.changeEventLines = this.changeEventLines.map(line => line.trim())
        this.changeEventLines.pop() // remove the last empty line

        let oParser = new DOMParser()
        for (let xmlString of this.changeEventLines) {
            let domEvent = oParser.parseFromString(xmlString, "application/xml").firstChild
            let eventType = domEvent.nodeName;
            console.log(eventType)
            if (eventType == 'session') {
                let changeEvent = new SessionEvent()
                changeEvent.id = domEvent.getAttribute('id')
                changeEvent.time = domEvent.getAttribute('time')
                this.resource.changeEvents.push(changeEvent)
                console;
            } else if (eventType == 'create') {
                let changeEvent = new CreateEObjectEvent()
                changeEvent.id = domEvent.getAttribute('id')
                changeEvent.package = domEvent.getAttribute('epackage')
                changeEvent.className = domEvent.getAttribute('eclass')
                changeEvent.resource = this.resource
                this.resource.changeEvents.push(changeEvent)
                console;
            } else if (eventType == 'add-to-resource') {
                let changeEvent = new AddToResourceEvent()
                changeEvent.position = domEvent.getAttribute('position')
                changeEvent.valueId = domEvent.firstChild.getAttribute('eobject')
                changeEvent.resource = this.resource
                this.resource.changeEvents.push(changeEvent)
                console;
            }
        }
    }
}

/**
 * MAIN CODE
 */
var cbpPlayer = new CbpPlayer()
var file = "cbp/origin.cbpxml"
cbpPlayer.loadCbp(file)
