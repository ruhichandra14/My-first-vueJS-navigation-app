if(xsltNode && !xsltDoc.isAttribute(xsltNode)){
    var childXSLTNode = xsltNode.getFirstElement();
    if(canvas.mode === "map" || canvas.mode === "xslt"){
        if(xsltNode){
            if(xsltNode.getFirstElement() && xsltNode.getFirstElement().getLocalName() === "copy-of"){

            }
        }

    }

    else if(canvas.prevMode === "schema"){
        if(xsltNode && xsltNode.getLocalName() === "copy-of"){

        }

    }
}



HandleCopyOfDrawLineCases: function(mode, prevMode, rule, xsltNode){
    var copiedRule = jmRule.copyRule(rule);
    var selectedNode, origValueOfId;

    if(canvas.mode === "map" || canvas.mode === "xslt"){
        selectedNode = xsltNode.getChildElements();
        if(selectedNode && selectedNode[0]){
            origValueOfId = xsltDoc.getIndexPath(xsltNode.getFirstElement());
        }
    }
    else if(canvas.prevMode === "schema"){
        selectedNode = xsltNode.getParentNode();
        if(selectedNodeParent){
            origValueOfId = xsltDoc.getIndexPath(selectedNode);
        }
    }

    if (copiedRule && origValueOfId){
        copiedRule.target = origValueOfId;
        jmRule.putRule(copiedRule);

        // Add the originalvalueof to overrides to prevent
        // it from being filtered out
        mapperData.addTargetNodeIdToFilterOverrides(origValueOfId);
    }
    //Remove Rule for Parent Node

    if(origValueOfId && xsltDoc.findXSLTNode(origValueOfId) && xsltDoc.findXSLTNode(origValueOfId).getParentNode()){
        jmRule.removeRule(xsltDoc.getIndexPath(xsltDoc.findXSLTNode(origValueOfId).getParentNode()));
    }
}