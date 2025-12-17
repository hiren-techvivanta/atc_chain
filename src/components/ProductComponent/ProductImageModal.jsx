import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdZoomIn, MdZoomOut, MdRestartAlt } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi2";

const ProductImageModal = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Calculate constraints
  useEffect(() => {
    if (scale > 1 && containerRef.current && imageRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      // We need the unscaled dimensions of the image in the DOM
      // But getBoundingClientRect gives scaled if transform is applied.
      // However, framer motion handles dragConstraints on the element's layout projection usually.
      // A safer way for manual calculation:
      // The amount we can drag X is (ScaledWidth - ContainerWidth) / 2
      
      // If we use the raw values from DOM, they include the scale transform if active.
      // Let's assume the image is centered.
      
      const pWidth = containerRect.width;
      const pHeight = containerRect.height;
      // Get natural dimensions rendered (approximate from rect / scale)
      const iWidth = imageRect.width / scale; // unscaled width
      const iHeight = imageRect.height / scale;

      const scaledWidth = iWidth * scale;
      const scaledHeight = iHeight * scale;

      const xConstraint = (scaledWidth > pWidth ? (scaledWidth - pWidth) / 2 : 0) + (pWidth * 0.5);
      const yConstraint = (scaledHeight > pHeight ? (scaledHeight - pHeight) / 2 : 0) + (pHeight * 0.5);

      setConstraints({
        top: -yConstraint,
        bottom: yConstraint,
        left: -xConstraint,
        right: xConstraint,
      });
    } else {
      setConstraints({ top: 0, left: 0, right: 0, bottom: 0 });
    }
  }, [scale, currentIndex]);


  // Sync internal state with props
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1); // Reset zoom when opening
    }
  }, [isOpen, initialIndex]);

  // Handle navigation
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setScale(1); // Reset zoom on slide change
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
  };

  // Handle Zoom
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setScale(1);
  };

  // Handle Wheel Zoom
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) { // Optional: require ctrl key to avoid accidental zooming while scrolling
        // Allow default behavior or implement special logic? 
        // Typically modals consume wheel events.
        // Let's implement simple wheel zoom
        e.preventDefault();
        const delta = e.deltaY * -0.001; 
        const newScale = Math.min(Math.max(scale + delta, 1), 4);
        setScale(newScale);
    }
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"

        >
            
          <div className="absolute top-4 right-4 z-[60]">
            <button
              onClick={onClose}
              className="p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300 border border-white/10 shadow-lg"
              title="Close"
            >
              <MdClose size={24} />
            </button>
          </div>
            
          {/* Controls Container - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4">
             {/* Zoom Controls */}
             <div className="flex items-center bg-black/50 rounded-full px-2 py-1 backdrop-blur-md border border-white/10 shadow-lg">
                <button
                    onClick={handleZoomOut}
                    disabled={scale <= 1}
                    className="p-2 text-white hover:text-blue-300 disabled:opacity-30 transition-colors"
                    title="Zoom Out"
                >
                    <MdZoomOut size={24} />
                </button>
                <span className="w-12 text-center text-white text-sm font-medium select-none">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    disabled={scale >= 4}
                    className="p-2 text-white hover:text-blue-300 disabled:opacity-30 transition-colors"
                    title="Zoom In"
                >
                    <MdZoomIn size={24} />
                </button>
                 <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
                 <button
                    onClick={handleResetZoom}
                    className="p-2 text-white hover:text-blue-300 transition-colors"
                    title="Reset Zoom"
                >
                    <MdRestartAlt size={22} />
                </button>
             </div>

             {/* Image Counter */}
             <div className="bg-black/50 px-3 py-1 rounded-full border border-white/10">
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
             </div>
          </div>




          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/10 shadow-lg"
              >
                <HiChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/10 shadow-lg"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div 
             className="relative w-full h-full flex items-center justify-center overflow-hidden" 
             ref={containerRef}
            onWheel={(e) => {
                 // Simple scroll zoom
                 e.stopPropagation();
            }}
          >
            <motion.img
              ref={imageRef}
              key={currentIndex} // Re-render motion element on image change
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain select-none cursor-grab active:cursor-grabbing"
              style={{
                 touchAction: "none"
              }}
              
              animate={{ 
                scale: scale, 
                x: scale === 1 ? 0 : undefined, 
                y: scale === 1 ? 0 : undefined 
              }}
              drag={scale > 1}
              dragConstraints={constraints}
              dragElastic={0.7}
              dragMomentum={true}
              
              // Smooth transitions for scale changes
              transition={{ type: "spring", damping: 20, stiffness: 300 }}

              // Tap to toggle zoom for better UX
              onDoubleClick={(e) => {
                  e.stopPropagation();
                  setScale(prev => prev > 1 ? 1 : 2);
              }}
              
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductImageModal;
