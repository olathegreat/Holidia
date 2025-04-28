// colorthief.d.ts
declare module 'colorthief' {
    type RGBColor = [number, number, number];
    
    interface ColorThief {
      getColor(sourceImage: HTMLImageElement | string, quality?: number): Promise<RGBColor> | RGBColor;
      getPalette(sourceImage: HTMLImageElement | string, colorCount?: number, quality?: number): Promise<RGBColor[]> | RGBColor[];
    }
  
    const ColorThief: {
      new (): ColorThief;
    };
  
    export = ColorThief;
  }