
import { useState, useRef, ReactNode } from 'react';

interface DraggableProps {
  id: string;
  children: ReactNode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const Draggable = ({ id, children, onDragStart, onDragEnd }: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // Store the ID in the drag event
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    
    if (onDragStart) {
      onDragStart();
    }
    
    // This makes the drag image transparent in some browsers
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <div
      ref={nodeRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`transition-transform ${isDragging ? 'opacity-50' : ''}`}
    >
      {children}
    </div>
  );
};
