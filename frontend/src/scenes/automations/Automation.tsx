/**
 * This example shows how you can use custom nodes and edges to dynamically add elements to your react flow graph.
 * A global layouting function calculates the new positions for the nodes every time the graph changes and animates existing nodes to their new position.
 *
 * There are three ways of adding nodes to the graph:
 *  1. Click an existing node: Create a new child node of the clicked node
 *  2. Click on the plus icon of an existing edge: Create a node in between the connected nodes of the edge
 *  3. Click a placeholder node: Turn the placeholder into a "real" node to prevent jumping of the layout
 *
 * The graph elements are added via hook calls in the custom nodes and edges. The layout is calculated every time the graph changes (see hooks/useLayout.ts).
 **/
import ReactFlow, { Background, ProOptions, ReactFlowProvider } from 'reactflow'

import useLayout from './hooks/useLayout'
import nodeTypes from './NodeTypes'
import edgeTypes from './EdgeTypes'

import 'reactflow/dist/style.css'
import { useValues } from 'kea'
import { automationsLogic } from './automationsLogic'
import { AutomationStepConfig } from './AutomationStepConfig'
import { automationStepConfigLogic } from './automationStepConfigLogic'

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true }

const fitViewOptions = {
    padding: 0.95,
}

function ReactFlowPro(): JSX.Element {
    // this hook call ensures that the layout is re-calculated every time the graph changes
    const { flowSteps, flowEdges } = useValues(automationsLogic)
    useLayout()

    return (
        <ReactFlow
            defaultNodes={flowSteps}
            defaultEdges={flowEdges}
            proOptions={proOptions}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitViewOptions={fitViewOptions}
            minZoom={0.2}
            nodesDraggable={false}
            nodesConnectable={false}
            zoomOnDoubleClick={false}
        >
            <Background />
        </ReactFlow>
    )
}

function ReactFlowWrapper(): JSX.Element {
    const { stepConfigOpen } = useValues(automationStepConfigLogic)
    return (
        <div className="flex w-full h-full">
            <div className="flex-1">
                <ReactFlowProvider>
                    <ReactFlowPro />
                </ReactFlowProvider>
            </div>
            {stepConfigOpen && (
                <div className="flex-1">
                    <AutomationStepConfig />
                </div>
            )}
        </div>
    )
}

export default ReactFlowWrapper