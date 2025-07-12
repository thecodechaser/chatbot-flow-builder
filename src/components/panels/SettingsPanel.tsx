import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Node } from 'reactflow';
import { NodeData } from '../../types/nodeTypes';

interface SettingsPanelProps {
  selectedNode: Node<NodeData>;
  onUpdateText: (nodeId: string, newText: string) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onUpdateText,
  onClose,
}) => {
  const [text, setText] = useState(selectedNode.data.text || '');

  // Update local state when selected node changes
  useEffect(() => {
    setText(selectedNode.data.text || '');
  }, [selectedNode.data.text]);

  // Handle text change and update the node
  const handleTextChange = (newText: string) => {
    setText(newText);
    onUpdateText(selectedNode.id, newText);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          Message
        </h2>
      </div>

      {/* Settings form */}
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="message-text" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Text
          </label>
          <textarea
            id="message-text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            rows={4}
          />
        </div>
      </div>

      {/* Additional settings can be added here */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Node Info:
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>ID: {selectedNode.id}</div>
          <div>Type: Message Node</div>
          <div>Position: ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;