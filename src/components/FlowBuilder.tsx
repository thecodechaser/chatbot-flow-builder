import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlowProvider,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import MessageNode from './nodes/MessageNode';
import NodesPanel from './panels/NodesPanel';
import SettingsPanel from './panels/SettingsPanel';
import Header from './Header';
import Footer from './Footer';
import { NodeData } from '../types/nodeTypes';

// Custom node types
const nodeTypes = {
  messageNode: MessageNode,
};

// Initial state with empty flow
const initialNodes: Node<NodeData>[] = [];
const initialEdges: Edge[] = [];

const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [saveError, setSaveError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<string>('');

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  let id = 0;
  const getId = () => `message_${id++}`;

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source already has a connection
      const sourceHasConnection = edges.some(edge => 
        edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      
      if (sourceHasConnection) {
        return; // Prevent multiple connections from same source
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle drag and drop from nodes panel
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<NodeData> = {
        id: getId(),
        type: 'messageNode',
        position,
        data: { text: 'textNode' }, // Default text
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);
  }, []);

  // Handle clicking on empty space to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Update node text from settings panel
  const updateNodeText = useCallback((nodeId: string, newText: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text: newText } }
          : node
      )
    );
    
    // Update selected node if it's the one being edited
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, text: newText } } : null);
    }
  }, [setNodes, selectedNode]);

  // Validate and save the flow
  const handleSave = useCallback(() => {
    setSaveError('');
    setSaveSuccess('');
    
    if (nodes.length === 0) {
      console.log('Saving empty flow...');
      setSaveSuccess('Flow saved successfully!');
      return;
    }

    if (nodes.length === 1) {
      console.log('Saving flow with single node...');
      setSaveSuccess('Flow saved successfully!');
      return;
    }

    // Check for nodes with empty target handles
    const nodesWithoutIncoming = nodes.filter(node => {
      return !edges.some(edge => edge.target === node.id);
    });

    // If more than one node has no incoming connections, show error
    if (nodesWithoutIncoming.length > 1) {
      setSaveError('Cannot save flow');
      return;
    }

    // If validation passes, save the flow
    console.log('Flow saved successfully!', { nodes, edges });
    setSaveError('');
    setSaveSuccess('Flow saved successfully!');
  }, [nodes, edges]);

  return (
    <div className="flex flex-col h-screen">
      <Header onSave={handleSave} saveError={saveError} saveSuccess={saveSuccess} />
      
      <div className="flex flex-1">
        {/* Main flow area */}
        <div className="relative flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            className="bg-gray-50"
            fitView
          >
            <Controls />
            <Background color="#e5e7eb" gap={16} />
          </ReactFlow>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col bg-white border-l border-gray-200 w-80">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onUpdateText={updateNodeText}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Wrap with ReactFlowProvider
const FlowBuilderWrapper: React.FC = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default FlowBuilderWrapper;