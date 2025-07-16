import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from './button';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-auto object-contain"
          />
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 