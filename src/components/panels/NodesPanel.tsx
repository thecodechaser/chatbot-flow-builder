import React from 'react';
import { MessageCircle } from 'lucide-react';

// Configuration for available node types - easily extensible
const nodeTypes = [
  {
    type: 'messageNode',
    label: 'Message',
    icon: MessageCircle,
    description: 'Send a text message',
  },
  // Future node types can be added here
  // {
  //   type: 'conditionalNode',
  //   label: 'Conditional',
  //   icon: GitBranch,
  //   description: 'Branch the conversation',
  // },
];

const NodesPanel: React.FC = () => {
  // Handle drag start for node creation
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Nodes
      </h2>
      
      <div className="space-y-3">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;
          
          return (
            <div
              key={nodeType.type}
              className="bg-white border-2 border-blue-500 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200"
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <IconComponent size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {nodeType.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {nodeType.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          How to use:
        </h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Drag nodes from this panel to the flow</li>
          <li>• Click on a node to edit its properties</li>
          <li>• Connect nodes by dragging from output to input</li>
          <li>• Each output can only have one connection</li>
        </ul>
      </div>
    </div>
  );
};

export default NodesPanel;