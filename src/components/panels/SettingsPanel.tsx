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
      <div className="flex items-center mb-6 space-x-3">
        <button
          onClick={onClose}
          className="p-1 transition-colors duration-200 rounded hover:bg-gray-100"
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
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Text
          </label>
          <textarea
            id="message-text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message..."
            className="w-full p-3 transition-colors duration-200 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>
      </div>

      {/* Additional settings section */}
      <div className="p-4 mt-6 rounded-lg bg-gray-50">
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Node Info:
        </h3>
        <div className="space-y-1 text-xs text-gray-600">
          <div>ID: {selectedNode.id}</div>
          <div>Type: Message Node</div>
          <div>Position: ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;