










            var schemaNode = schemaTree.findNodeFromIndexPath("source", fromId);
            var srcNodeType;
            if(schemaNode){
                srcNodeType = schemaTree.isAttribute(schemaNode)?"attribute":"element";
            }










            //check tgt data type /schemaType of tgt node
            var tgtSchemaNode, tgtNodeDataType, isLeafNode;
            var tgtNode = UITree.getUIXSLTTreeNode(toId);
            var tgtSchemaGhostId = tgtNode.attr("ghost");
            if(tgtSchemaGhostId){
                tgtSchemaNode = schemaTree.findNodeFromIndexPath(schemaTree.TARGET, tgtSchemaGhostId);
            }
            else{
                tgtSchemaNode = mapperData.xsltPathToSchemaNodeMap[toId];
            }

            if(tgtSchemaNode){
                tgtNodeDataType = schemaTree.getDataType(tgtSchemaNode);
            }

            // Check if source node is an attribute, target node can be a ghost/non ghost node
            if(srcNodeType){
                if(xsltDoc.isGhostNode(toId)){
                    if(tgtNodeDataType && tgtNodeDataType.indexOf("anyType") > -1){
                        return true;
                    }
                }
                else{
                    var xsltNode = xsltDoc.findXSLTNode(toId);
                    if (xsltNode && xsltDoc.isMappedNode(xsltNode)){
                        canvas.dragPopupText = mapperData.getClientBundleMessageWithReplacement("CANVAS_TGT_NODE_MAPPED");
                        return false;
                    }
                    if(tgtNodeDataType && tgtNodeDataType.indexOf("anyType") > -1 ){
                        if(xsltNode && xsltNode.getFirstElement()){
                            if(xsltNode.getFirstElement().getLocalName() === "copy-of"){
                                if(srcNodeType !== "attribute"){
                                    return true;
                                }
                                else{
                                    //modify this error msg as drop notallowed , as value-of is created by attribute and copy-of and value-of can't exist together
                                    canvas.dragPopupText = mapperData.getClientBundleMessageWithReplacement("CANVAS_VALUE_COPY_NOT_ANYTYPE");
                                    return false;
                                }
                            }
                            if(xsltNode.getFirstElement().getLocalName() === "value-of"){
                                if(srcNodeType === "attribute"){
                                    return true;
                                }
                                else{
                                    //modify this error msg as drop notallowed , as value-of is created by attribute and copy-of and value-of can't exist together
                                    canvas.dragPopupText = mapperData.getClientBundleMessageWithReplacement("CANVAS_VALUE_COPY_NOT_ANYTYPE");
                                    return false;
                                }
                            }
                        }
                    }
                }








            else if(xslInfo && xslInfo.name === "copy-of"){
                    if(srcNodeType){
                        if(srcNodeType !== "attribute"){
                            return true;
                        }
                        else if(srcNodeType === "attribute"){
                            canvas.dragPopupText = mapperData.getClientBundleMessageWithReplacement("CANVAS_ATTRIBUTE_NOT_COPYOF");
                            return false;
                        }
                    }
                }







                if(isSourceComplex && tgtNodeDataType && tgtNodeDataType.indexOf("anyType") > -1){
                    return true;
                }








                var targetNode = $("#" + targetid)[0];
                var targetNodeText;
                if(targetNode){
                    targetNodeText = targetNode.innerText.trim();
                }

                if(targetNodeText && targetNodeText === "copy-of"){
                    input.xsltConstruct = "copy-of";
                }





                var toSchemaNode = mapperData.xsltPathToSchemaNodeMap[targetid];
                var nodeDataType, srcNodeType;
                if(toSchemaNode){
                    nodeDataType = schemaTree.getDataType(toSchemaNode);
                }
                var schemaNode;
                if(canvas.dragFrom){
                    schemaNode = schemaTree.findNodeFromIndexPath("source", canvas.dragFrom);
                }
                if(schemaNode){
                    srcNodeType = schemaTree.isAttribute(schemaNode)?"attribute":"element";
                }

                if(nodeDataType){
                    if(schemaNode && srcNodeType){
                        xsltDoc.updateXpathFromRule(modRule, xsltNode, nodeDataType, srcNodeType);
                    }
                    else{
                        xsltDoc.updateXpathFromRule(modRule, xsltNode, nodeDataType);
                    }
                }
                else{
                    xsltDoc.updateXpathFromRule(modRule, xsltNode, true);
                }












                var input = canvas.createInputJSONObjectForParse(xsltNode, text);

                var $selectedNodeText;
                if($selectedNode){
                    $selectedNodeText = $selectedNode[0].innerText.trim();
                }
                if($selectedNodeText === "copy-of"){
                    input.xsltConstruct = "copy-of";
                }




                var toSchemaNode = mapperData.xsltPathToSchemaNodeMap[nodeId];
                var nodeDataType;
                if(toSchemaNode){
                    nodeDataType = schemaTree.getDataType(toSchemaNode);
                }
                if(nodeDataType){
                    xsltDoc.updateXpathFromRule(rule, xsltNode, nodeDataType);
                }
                else{
                    xsltDoc.updateXpathFromRule(rule, xsltNode);
                }







                var isNonXSLTNodePreviousParentOfSingleCopyOf = xsltDoc.isParentOfSingleCopyOf(nonXSLTNodeParent);






                //canvas.specialHandlingForMultipleValueOfs(isNonXSLTNodePreviousParentOfSingleValueOf, newNode, nonXSLTNodeParent);

                if(newNode.node.tagName === "xsl:copy-of"){
                    canvas.specialHandlingForCopyOf(isNonXSLTNodePreviousParentOfSingleCopyOf, newNode, nonXSLTNodeParent);
                }
                else{
                    canvas.specialHandlingForMultipleValueOfs(isNonXSLTNodePreviousParentOfSingleValueOf, newNode, nonXSLTNodeParent);
                }







                specialHandlingForCopyOf: function(isNonXSLTNodePreviousParentOfSingleCopyOf, newNode, nonXSLTNodeParent){
                    if(!xsltDoc.isXSLTNode(nonXSLTNodeParent) && isNonXSLTNodePreviousParentOfSingleCopyOf && xsltDoc.isXSLTNode(newNode)){
                        var selectedNodeId = xsltDoc.getIndexPath(nonXSLTNodeParent);
                        var originalSingleValueOfRule = jmRule.getRule(selectedNodeId);
                        if(originalSingleValueOfRule){
                            var copiedRule = jmRule.copyRule(originalSingleValueOfRule);
                            var selectedNodeChildren = nonXSLTNodeParent.getChildElements();
                            var origValueOfId = xsltDoc.getIndexPath(selectedNodeChildren[0]);

                            if (copiedRule && origValueOfId){
                                copiedRule.target = origValueOfId;
                                jmRule.putRule(copiedRule);

                                // Add the originalvalueof to overrides to prevent
                                // it from being filtered out
                                mapperData.addTargetNodeIdToFilterOverrides(origValueOfId);
                            }
                            //Remove Rule for Parent Node
                            jmRule.removeRule(selectedNodeId);
                        }
                    }
                },
























