"use client";

import { useState, useMemo, useRef } from 'react';

const KitchenLayoutGenerator = () => {
  const [kitchenData, setKitchenData] = useState({
    width: 12,
    height: 10,
    layoutType: 'L-shaped',
    units: 'feet'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const layoutRef = useRef(null);

  const layoutTypes = ['L-shaped', 'U-shaped', 'Galley', 'Island', 'Straight'];
  const unitOptions = ['feet', 'meters'];

  const handleInputChange = (field, value) => {
    setKitchenData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateLayout = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsGenerating(false);
  };

  const calculateAspectRatio = () => {
    const ratio = kitchenData.width / kitchenData.height;
    if (ratio > 1.5) return 'wide';
    if (ratio < 0.7) return 'tall';
    return 'balanced';
  };

  const downloadLayout = async (format) => {
    const layoutElement = layoutRef.current;
    if (!layoutElement) return;

    // Get the actual kitchen layout element
    const kitchenLayoutElement = layoutElement.querySelector('.kitchen-layout-container');
    if (!kitchenLayoutElement) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Use the same dimensions as the displayed layout
    const scale = 2; // High resolution
    const rect = kitchenLayoutElement.getBoundingClientRect();
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    ctx.scale(scale, scale);
    
    // Draw background matching the display
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.5, '#fffbeb');
    gradient.addColorStop(1, '#fef3c7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw the kitchen layout with exact same measurements
    drawExactKitchenLayout(ctx, kitchenData, rect.width, rect.height);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement('a');
        link.download = `kitchen-layout-${kitchenData.layoutType.toLowerCase()}.${format}`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, `image/${format}`, 1.0);
  };

  const drawExactKitchenLayout = (ctx, kitchenData, containerWidth, containerHeight) => {
    // Calculate the exact same scale as the React component
    const scale = Math.min(containerWidth / kitchenData.width, containerHeight / kitchenData.height) * 0.75;
    const layoutWidth = kitchenData.width * scale;
    const layoutHeight = kitchenData.height * scale;
    const offsetX = (containerWidth - layoutWidth) / 2;
    const offsetY = (containerHeight - layoutHeight) / 2;

    // Draw room background (matches the React component)
    const roomGradient = ctx.createLinearGradient(offsetX, offsetY, offsetX + layoutWidth, offsetY + layoutHeight);
    roomGradient.addColorStop(0, '#fff');
    roomGradient.addColorStop(0.5, '#fffbeb');
    roomGradient.addColorStop(1, '#fef3c7');
    
    ctx.fillStyle = roomGradient;
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 4;
    ctx.fillRect(offsetX, offsetY, layoutWidth, layoutHeight);
    ctx.strokeRect(offsetX, offsetY, layoutWidth, layoutHeight);

    // Draw the exact same kitchen elements
    drawExactKitchenElements(ctx, kitchenData, offsetX, offsetY, layoutWidth, layoutHeight, scale);

    // Draw dimensions (matching the React component style)
    ctx.fillStyle = '#7c2d12';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // Width dimension
    ctx.fillText(
      `${kitchenData.width} ${kitchenData.units}`,
      offsetX + layoutWidth / 2,
      offsetY - 10
    );
    
    // Height dimension
    ctx.save();
    ctx.translate(offsetX - 20, offsetY + layoutHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(
      `${kitchenData.height} ${kitchenData.units}`,
      0,
      0
    );
    ctx.restore();
  };

  const drawExactKitchenElements = (ctx, kitchenData, offsetX, offsetY, width, height, scale) => {
    const baseCabinetHeight = scale * 1;
    const baseCabinetDepth = scale * 2.5;
    const wallCabinetHeight = scale * 0.8;
    const wallCabinetDepth = scale * 2;
    const islandSize = Math.min(kitchenData.width, kitchenData.height) * scale * 0.35;

    // Base cabinet style (matches React component)
    const drawBaseCabinet = (x, y, w, h, borderRadius = '') => {
      const gradient = ctx.createLinearGradient(x, y, x, y + h);
      gradient.addColorStop(0, '#ea580c');
      gradient.addColorStop(1, '#c2410c');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 3;
      
      if (borderRadius.includes('top')) {
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + 10);
        ctx.quadraticCurveTo(x, y, x + 10, y);
        ctx.lineTo(x + w - 10, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + 10);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (borderRadius.includes('right')) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w - 10, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + 10);
        ctx.lineTo(x + w, y + h - 10);
        ctx.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      }
    };

    // Wall cabinet style (matches React component)
    const drawWallCabinet = (x, y, w, h, borderRadius = '') => {
      const gradient = ctx.createLinearGradient(x, y, x, y + h);
      gradient.addColorStop(0, '#fdba74');
      gradient.addColorStop(1, '#fb923c');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 3;
      
      if (borderRadius.includes('bottom')) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + h - 10);
        ctx.quadraticCurveTo(x, y + h, x + 10, y + h);
        ctx.lineTo(x + w - 10, y + h);
        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 10);
        ctx.lineTo(x + w, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (borderRadius.includes('right')) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w - 10, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + 10);
        ctx.lineTo(x + w, y + h - 10);
        ctx.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      }
    };

    // Draw layout based on type
    switch (kitchenData.layoutType) {
      case 'L-shaped':
        // Base cabinets
        drawBaseCabinet(offsetX, offsetY + height - baseCabinetHeight, width * 0.7, baseCabinetHeight, 'top');
        drawBaseCabinet(offsetX, offsetY + height - (height * 0.6), baseCabinetDepth, height * 0.6, 'right');
        
        // Wall cabinets
        drawWallCabinet(offsetX, offsetY, width * 0.65, wallCabinetHeight, 'bottom');
        drawWallCabinet(offsetX, offsetY, wallCabinetDepth, height * 0.5, 'right');
        break;
      
      case 'U-shaped':
        // Base cabinets
        drawBaseCabinet(offsetX, offsetY + height - baseCabinetHeight, width, baseCabinetHeight, 'top');
        drawBaseCabinet(offsetX, offsetY + height - height, baseCabinetDepth, height, 'right');
        drawBaseCabinet(offsetX + width - baseCabinetDepth, offsetY + height - height, baseCabinetDepth, height, 'left');
        
        // Wall cabinets
        drawWallCabinet(offsetX, offsetY, wallCabinetDepth, height * 0.4, 'bottom-right');
        drawWallCabinet(offsetX + width - wallCabinetDepth, offsetY, wallCabinetDepth, height * 0.4, 'bottom-left');
        break;
      
      case 'Galley':
        // Base cabinets
        drawBaseCabinet(offsetX, offsetY + height - baseCabinetHeight, width, baseCabinetHeight, 'top');
        
        // Wall cabinets
        drawWallCabinet(offsetX, offsetY, width, wallCabinetHeight, 'bottom');
        break;
      
      case 'Island':
        // Base cabinets
        drawBaseCabinet(offsetX, offsetY + height - baseCabinetHeight, width, baseCabinetHeight, 'top');
        
        // Island
        const islandGradient = ctx.createLinearGradient(
          offsetX + (width - islandSize) / 2,
          offsetY + (height - islandSize * 0.7) / 2,
          offsetX + (width - islandSize) / 2 + islandSize,
          offsetY + (height - islandSize * 0.7) / 2 + islandSize * 0.7
        );
        islandGradient.addColorStop(0, '#fb923c');
        islandGradient.addColorStop(1, '#ea580c');
        
        ctx.fillStyle = islandGradient;
        ctx.strokeStyle = '#9a3412';
        ctx.lineWidth = 3;
        
        // Rounded rectangle for island
        const islandX = offsetX + (width - islandSize) / 2;
        const islandY = offsetY + (height - islandSize * 0.7) / 2;
        const islandW = islandSize;
        const islandH = islandSize * 0.7;
        const radius = 12;
        
        ctx.beginPath();
        ctx.moveTo(islandX + radius, islandY);
        ctx.lineTo(islandX + islandW - radius, islandY);
        ctx.quadraticCurveTo(islandX + islandW, islandY, islandX + islandW, islandY + radius);
        ctx.lineTo(islandX + islandW, islandY + islandH - radius);
        ctx.quadraticCurveTo(islandX + islandW, islandY + islandH, islandX + islandW - radius, islandY + islandH);
        ctx.lineTo(islandX + radius, islandY + islandH);
        ctx.quadraticCurveTo(islandX, islandY + islandH, islandX, islandY + islandH - radius);
        ctx.lineTo(islandX, islandY + radius);
        ctx.quadraticCurveTo(islandX, islandY, islandX + radius, islandY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'Straight':
      default:
        // Base cabinets
        drawBaseCabinet(offsetX, offsetY + height - baseCabinetHeight, width, baseCabinetHeight, 'top');
        
        // Wall cabinets
        drawWallCabinet(offsetX, offsetY, width, wallCabinetHeight, 'bottom');
        break;
    }

    // Draw appliances in exact same positions
    drawExactAppliances(ctx, kitchenData, offsetX, offsetY, width, height, scale, baseCabinetHeight);
  };

  const drawExactAppliances = (ctx, kitchenData, offsetX, offsetY, width, height, scale, baseCabinetHeight) => {
    // Sink (matches React component position and style)
    const sinkX = offsetX + scale * 4;
    const sinkY = offsetY + height - baseCabinetHeight * 0.85;
    const sinkWidth = scale * 2;
    const sinkHeight = scale * 1.5;

    // Sink base
    const sinkGradient = ctx.createLinearGradient(sinkX, sinkY, sinkX + sinkWidth, sinkY + sinkHeight);
    sinkGradient.addColorStop(0, '#e5e7eb');
    sinkGradient.addColorStop(1, '#d1d5db');
    ctx.fillStyle = sinkGradient;
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    
    // Rounded sink
    const sinkRadius = 8;
    ctx.beginPath();
    ctx.moveTo(sinkX + sinkRadius, sinkY);
    ctx.lineTo(sinkX + sinkWidth - sinkRadius, sinkY);
    ctx.quadraticCurveTo(sinkX + sinkWidth, sinkY, sinkX + sinkWidth, sinkY + sinkRadius);
    ctx.lineTo(sinkX + sinkWidth, sinkY + sinkHeight - sinkRadius);
    ctx.quadraticCurveTo(sinkX + sinkWidth, sinkY + sinkHeight, sinkX + sinkWidth - sinkRadius, sinkY + sinkHeight);
    ctx.lineTo(sinkX + sinkRadius, sinkY + sinkHeight);
    ctx.quadraticCurveTo(sinkX, sinkY + sinkHeight, sinkX, sinkY + sinkHeight - sinkRadius);
    ctx.lineTo(sinkX, sinkY + sinkRadius);
    ctx.quadraticCurveTo(sinkX, sinkY, sinkX + sinkRadius, sinkY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Sink bowl
    const sinkBowlX = sinkX + sinkWidth * 0.15;
    const sinkBowlY = sinkY + sinkHeight * 0.15;
    const sinkBowlSize = sinkWidth * 0.7;
    const sinkBowlGradient = ctx.createRadialGradient(
      sinkBowlX + sinkBowlSize / 2,
      sinkBowlY + sinkBowlSize / 2,
      0,
      sinkBowlX + sinkBowlSize / 2,
      sinkBowlY + sinkBowlSize / 2,
      sinkBowlSize / 2
    );
    sinkBowlGradient.addColorStop(0, '#d1d5db');
    sinkBowlGradient.addColorStop(1, '#9ca3af');
    
    ctx.fillStyle = sinkBowlGradient;
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(
      sinkBowlX + sinkBowlSize / 2,
      sinkBowlY + sinkBowlSize / 2,
      sinkBowlSize / 2,
      sinkBowlSize / 2.5,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();

    // Stove (matches React component position and style)
    const stoveX = offsetX + width - scale * 7.2;
    const stoveY = offsetY + height - baseCabinetHeight * 0.8;
    const stoveWidth = scale * 2.2;
    const stoveHeight = scale * 1.8;

    // Stove base
    const stoveGradient = ctx.createLinearGradient(stoveX, stoveY, stoveX + stoveWidth, stoveY + stoveHeight);
    stoveGradient.addColorStop(0, '#374151');
    stoveGradient.addColorStop(1, '#111827');
    ctx.fillStyle = stoveGradient;
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    
    // Rounded stove
    const stoveRadius = 8;
    ctx.beginPath();
    ctx.moveTo(stoveX + stoveRadius, stoveY);
    ctx.lineTo(stoveX + stoveWidth - stoveRadius, stoveY);
    ctx.quadraticCurveTo(stoveX + stoveWidth, stoveY, stoveX + stoveWidth, stoveY + stoveRadius);
    ctx.lineTo(stoveX + stoveWidth, stoveY + stoveHeight - stoveRadius);
    ctx.quadraticCurveTo(stoveX + stoveWidth, stoveY + stoveHeight, stoveX + stoveWidth - stoveRadius, stoveY + stoveHeight);
    ctx.lineTo(stoveX + stoveRadius, stoveY + stoveHeight);
    ctx.quadraticCurveTo(stoveX, stoveY + stoveHeight, stoveX, stoveY + stoveHeight - stoveRadius);
    ctx.lineTo(stoveX, stoveY + stoveRadius);
    ctx.quadraticCurveTo(stoveX, stoveY, stoveX + stoveRadius, stoveY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Burners (4 burners as in React component)
    const burnerSize = scale * 0.4;
    const burners = [
      { x: stoveX + stoveWidth * 0.3, y: stoveY + stoveHeight * 0.3 },
      { x: stoveX + stoveWidth * 0.7, y: stoveY + stoveHeight * 0.3 },
      { x: stoveX + stoveWidth * 0.3, y: stoveY + stoveHeight * 0.7 },
      { x: stoveX + stoveWidth * 0.7, y: stoveY + stoveHeight * 0.7 }
    ];

    burners.forEach(burner => {
      const burnerGradient = ctx.createRadialGradient(
        burner.x, burner.y, 0,
        burner.x, burner.y, burnerSize
      );
      burnerGradient.addColorStop(0, '#dc2626');
      burnerGradient.addColorStop(0.7, '#b91c1c');
      burnerGradient.addColorStop(1, '#991b1b');
      
      ctx.fillStyle = burnerGradient;
      ctx.beginPath();
      ctx.arc(burner.x, burner.y, burnerSize, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Refrigerator (matches React component position and style)
    const fridgeX = offsetX + width - scale * 3.8;
    const fridgeY = offsetY + height - baseCabinetHeight * 0.85;
    const fridgeWidth = scale * 1.8;
    const fridgeHeight = scale * 3;

    const fridgeGradient = ctx.createLinearGradient(fridgeX, fridgeY, fridgeX + fridgeWidth, fridgeY + fridgeHeight);
    fridgeGradient.addColorStop(0, '#f9fafb');
    fridgeGradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = fridgeGradient;
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    
    // Rounded refrigerator
    const fridgeRadius = 8;
    ctx.beginPath();
    ctx.moveTo(fridgeX + fridgeRadius, fridgeY);
    ctx.lineTo(fridgeX + fridgeWidth - fridgeRadius, fridgeY);
    ctx.quadraticCurveTo(fridgeX + fridgeWidth, fridgeY, fridgeX + fridgeWidth, fridgeY + fridgeRadius);
    ctx.lineTo(fridgeX + fridgeWidth, fridgeY + fridgeHeight - fridgeRadius);
    ctx.quadraticCurveTo(fridgeX + fridgeWidth, fridgeY + fridgeHeight, fridgeX + fridgeWidth - fridgeRadius, fridgeY + fridgeHeight);
    ctx.lineTo(fridgeX + fridgeRadius, fridgeY + fridgeHeight);
    ctx.quadraticCurveTo(fridgeX, fridgeY + fridgeHeight, fridgeX, fridgeY + fridgeHeight - fridgeRadius);
    ctx.lineTo(fridgeX, fridgeY + fridgeRadius);
    ctx.quadraticCurveTo(fridgeX, fridgeY, fridgeX + fridgeRadius, fridgeY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fridge handles (2 handles as in React component)
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(fridgeX + fridgeWidth / 2, fridgeY + fridgeHeight * 0.1);
    ctx.lineTo(fridgeX + fridgeWidth / 2, fridgeY + fridgeHeight * 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(fridgeX + fridgeWidth / 2, fridgeY + fridgeHeight * 0.55);
    ctx.lineTo(fridgeX + fridgeWidth / 2, fridgeY + fridgeHeight * 0.95);
    ctx.stroke();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 p-8">
            <h2 className="text-4xl font-bold text-white mb-2 text-center tracking-tight">
              Kitchen Layout Generator
            </h2>
            <p className="text-orange-100 text-center text-lg">
              Design your perfect kitchen in seconds
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
                    <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                    Kitchen Dimensions
                  </h3>
                  
                  {/* Dimension Inputs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-orange-800 mb-2">
                        Width ({kitchenData.units})
                      </label>
                      <input
                        type="number"
                        value={kitchenData.width}
                        onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 1)}
                        className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white text-gray-800 font-medium"
                        min="1"
                        max="50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-orange-800 mb-2">
                        Height ({kitchenData.units})
                      </label>
                      <input
                        type="number"
                        value={kitchenData.height}
                        onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 1)}
                        className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white text-gray-800 font-medium"
                        min="1"
                        max="50"
                      />
                    </div>
                  </div>

                  {/* Units Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-orange-800 mb-3">
                      Measurement Units
                    </label>
                    <div className="flex gap-3">
                      {unitOptions.map(unit => (
                        <button
                          key={unit}
                          onClick={() => handleInputChange('units', unit)}
                          className={`flex-1 px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                            kitchenData.units === unit
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                              : 'bg-white text-orange-800 border-2 border-orange-200 hover:border-orange-400'
                          }`}
                        >
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Layout Type Selection */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
                    <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    Layout Type
                  </h3>
                  <select
                    value={kitchenData.layoutType}
                    onChange={(e) => handleInputChange('layoutType', e.target.value)}
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white text-gray-800 font-medium text-lg cursor-pointer"
                  >
                    {layoutTypes.map(layout => (
                      <option key={layout} value={layout}>
                        {layout}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateLayout}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Generating Layout...
                    </span>
                  ) : (
                    '✨ Generate Kitchen Layout'
                  )}
                </button>
              </div>

              {/* Preview Section */}
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200 shadow-sm h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-orange-900 flex items-center">
                      <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                      2D Kitchen Layout
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadLayout('png')}
                        className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-all duration-300 border-2 border-orange-300 text-sm flex items-center gap-2 shadow-sm hover:shadow"
                        title="Download as PNG"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PNG
                      </button>
                      <button
                        onClick={() => downloadLayout('jpeg')}
                        className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-all duration-300 border-2 border-orange-300 text-sm flex items-center gap-2 shadow-sm hover:shadow"
                        title="Download as JPEG"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JPEG
                      </button>
                    </div>
                  </div>
                  
                  <div ref={layoutRef} className="bg-white rounded-xl overflow-hidden shadow-inner border-2 border-orange-100 mb-6" style={{ minHeight: '400px' }}>
                    {isGenerating ? (
                      <div className="w-full h-full flex items-center justify-center p-12">
                        <div className="text-center">
                          <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 mx-auto mb-6"></div>
                            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-orange-500 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                          </div>
                          <p className="text-orange-800 font-semibold text-lg">Generating your kitchen layout...</p>
                          <p className="text-orange-600 text-sm mt-2">This will just take a moment</p>
                        </div>
                      </div>
                    ) : (
                      <div className="kitchen-layout-container w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-amber-50">
                        <TwoDKitchenLayout kitchenData={kitchenData} />
                      </div>
                    )}
                  </div>

                  {/* Kitchen Info */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border-2 border-orange-200 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <span className="text-orange-600 block text-sm font-semibold mb-1">Total Area</span>
                      <div className="font-bold text-2xl text-orange-900">
                        {(kitchenData.width * kitchenData.height).toFixed(1)}
                      </div>
                      <div className="text-orange-700 text-sm">{kitchenData.units}²</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-orange-200 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <span className="text-orange-600 block text-sm font-semibold mb-1">Layout Style</span>
                      <div className="font-bold text-xl text-orange-900 capitalize">{kitchenData.layoutType}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-orange-200 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <span className="text-orange-600 block text-sm font-semibold mb-1">Room Shape</span>
                      <div className="font-bold text-xl text-orange-900 capitalize">{calculateAspectRatio()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced 2D Kitchen Layout Component (Keep this exactly as is)
const TwoDKitchenLayout = ({ kitchenData }) => {
  const scale = useMemo(() => {
    const maxWidth = 600;
    const maxHeight = 450;
    
    const widthScale = maxWidth / kitchenData.width;
    const heightScale = maxHeight / kitchenData.height;
    
    return Math.min(widthScale, heightScale) * 0.75;
  }, [kitchenData.width, kitchenData.height]);

  return (
    <div 
      className="relative bg-gradient-to-br from-white via-orange-50 to-amber-50 border-4 border-orange-300 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl"
      style={{
        width: `${kitchenData.width * scale}px`,
        height: `${kitchenData.height * scale}px`,
        minWidth: '250px',
        minHeight: '200px'
      }}
    >
      {/* Room outline with pattern */}
      <div className="absolute inset-0 border-4 border-orange-400 rounded-xl" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 146, 60, 0.03) 10px, rgba(251, 146, 60, 0.03) 20px)`
      }}></div>
      
      {/* Kitchen elements */}
      <div className="animate-fadeIn">
        {renderKitchenElements(kitchenData, scale)}
      </div>
      
      {/* Dimensions labels */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-800 bg-white px-4 py-2 rounded-lg border-2 border-orange-300 shadow-md">
        {kitchenData.width} {kitchenData.units}
      </div>
      <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-bold text-orange-800 bg-white px-4 py-2 rounded-lg border-2 border-orange-300 shadow-md">
        {kitchenData.height} {kitchenData.units}
      </div>
    </div>
  );
};

const renderKitchenElements = (kitchenData, scale) => {
  const elements = [];
  const { layoutType, width, height } = kitchenData;
  
  const baseCabinetHeight = scale * 1;
  const baseCabinetDepth = scale * 2.5;
  const wallCabinetHeight = scale * 0.8;
  const wallCabinetDepth = scale * 2;
  const islandSize = Math.min(width, height) * scale * 0.35;

  const cabinetClass = "transition-all duration-300 hover:brightness-110";
  const baseStyle = "bg-gradient-to-b from-orange-500 to-orange-600 border-3 border-orange-700 shadow-lg rounded-t-xl";
  const wallStyle = "bg-gradient-to-b from-orange-300 to-orange-400 border-3 border-orange-500 shadow-md rounded-b-xl";

  switch (layoutType) {
    case 'L-shaped':
      elements.push(
        <div key="l-base-h" className={`absolute bottom-0 left-0 ${baseStyle} ${cabinetClass}`}
          style={{ width: `${width * scale * 0.7}px`, height: `${baseCabinetHeight}px` }} />
      );
      elements.push(
        <div key="l-base-v" className={`absolute bottom-0 left-0 bg-gradient-to-b from-orange-500 to-orange-600 border-3 border-orange-700 shadow-lg rounded-r-xl ${cabinetClass}`}
          style={{ width: `${baseCabinetDepth}px`, height: `${height * scale * 0.6}px` }} />
      );
      elements.push(
        <div key="l-wall-h" className={`absolute top-0 left-0 ${wallStyle} ${cabinetClass}`}
          style={{ width: `${width * scale * 0.65}px`, height: `${wallCabinetHeight}px` }} />
      );
      elements.push(
        <div key="l-wall-v" className={`absolute top-0 left-0 bg-gradient-to-b from-orange-300 to-orange-400 border-3 border-orange-500 shadow-md rounded-r-xl ${cabinetClass}`}
          style={{ width: `${wallCabinetDepth}px`, height: `${height * scale * 0.5}px` }} />
      );
      break;
    
    case 'U-shaped':
      elements.push(
        <div key="u-base-b" className={`absolute bottom-0 left-0 ${baseStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${baseCabinetHeight}px` }} />
      );
      elements.push(
        <div key="u-base-l" className={`absolute bottom-0 left-0 bg-gradient-to-b from-orange-500 to-orange-600 border-3 border-orange-700 shadow-lg rounded-r-xl ${cabinetClass}`}
          style={{ width: `${baseCabinetDepth}px`, height: `${height * scale}px` }} />
      );
      elements.push(
        <div key="u-base-r" className={`absolute bottom-0 right-0 bg-gradient-to-b from-orange-500 to-orange-600 border-3 border-orange-700 shadow-lg rounded-l-xl ${cabinetClass}`}
          style={{ width: `${baseCabinetDepth}px`, height: `${height * scale}px` }} />
      );
      elements.push(
        <div key="u-wall-l" className={`absolute top-0 left-0 bg-gradient-to-b from-orange-300 to-orange-400 border-3 border-orange-500 shadow-md rounded-br-xl ${cabinetClass}`}
          style={{ width: `${wallCabinetDepth}px`, height: `${height * scale * 0.4}px` }} />
      );
      elements.push(
        <div key="u-wall-r" className={`absolute top-0 right-0 bg-gradient-to-b from-orange-300 to-orange-400 border-3 border-orange-500 shadow-md rounded-bl-xl ${cabinetClass}`}
          style={{ width: `${wallCabinetDepth}px`, height: `${height * scale * 0.4}px` }} />
      );
      break;
    
    case 'Galley':
      elements.push(
        <div key="g-base-b" className={`absolute bottom-0 left-0 ${baseStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${baseCabinetHeight}px` }} />
      );
      elements.push(
        <div key="g-wall-t" className={`absolute top-0 left-0 ${wallStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${wallCabinetHeight}px` }} />
      );
      break;
    
    case 'Island':
      elements.push(
        <div key="i-base-b" className={`absolute bottom-0 left-0 ${baseStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${baseCabinetHeight}px` }} />
      );
      elements.push(
        <div key="island" className={`absolute bg-gradient-to-br from-orange-400 to-orange-500 border-3 border-orange-600 rounded-xl shadow-2xl ${cabinetClass}`}
          style={{ 
            width: `${islandSize}px`, 
            height: `${islandSize * 0.7}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
      );
      break;
    
    case 'Straight':
    default:
      elements.push(
        <div key="s-base" className={`absolute bottom-0 left-0 ${baseStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${baseCabinetHeight}px` }} />
      );
      elements.push(
        <div key="s-wall" className={`absolute top-0 left-0 ${wallStyle} ${cabinetClass}`}
          style={{ width: `${width * scale}px`, height: `${wallCabinetHeight}px` }} />
      );
      break;
  }

  // Sink
  elements.push(
    <div key="sink" className="absolute bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform"
      style={{ 
        width: `${scale * 2}px`, 
        height: `${scale * 1.5}px`,
        bottom: `${baseCabinetHeight * 0.15}px`,
        left: `${scale * 4}px`
      }}
    >
      <div className="w-2/3 h-2/3 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-2 border-gray-500 shadow-inner"></div>
    </div>
  );

  // Stove
  elements.push(
    <div key="stove" className="absolute bg-gradient-to-br from-gray-800 to-black border-2 border-gray-600 rounded-lg shadow-lg hover:scale-110 transition-transform"
      style={{ 
        width: `${scale * 2.2}px`, 
        height: `${scale * 1.8}px`,
        bottom: `${baseCabinetHeight * 0.15}px`,
        right: `${scale * 5}px`
      }}
    >
      <div className="absolute top-1 left-1 right-1 grid grid-cols-2 gap-1 p-1">
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full border border-red-900 shadow-inner"></div>
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full border border-red-900 shadow-inner"></div>
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full border border-red-900 shadow-inner"></div>
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full border border-red-900 shadow-inner"></div>
      </div>
    </div>
  );

  // Refrigerator
  elements.push(
    <div key="fridge" className="absolute bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-gray-400 rounded-lg shadow-lg hover:scale-110 transition-transform"
      style={{ 
        width: `${scale * 1.8}px`, 
        height: `${scale * 3}px`,
        bottom: `${baseCabinetHeight * 0.15}px`,
        right: `${scale * 2}px`
      }}
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 bg-gray-500 rounded-full" style={{height: '40%'}}></div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 bg-gray-500 rounded-full" style={{height: '40%'}}></div>
    </div>
  );

  return elements;
};

export default KitchenLayoutGenerator;