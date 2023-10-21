import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import PolyLine from '@arcgis/core/geometry/Polyline'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';


export const polygone = (geoMetry: [][][], layer: any, color: string, category: string) => {
    const polyGon = new Polygon({
        rings: geoMetry,
        // spatialReference: { wkid: 4326 },
      });
      const polylineGraphic = new Graphic({
        geometry: polyGon,
        attributes:{
          id: category
        }
        // symbol: simpleLineSymbol,
      });
      layer.add(polylineGraphic);
}

export const polyline = (geoMetry: [][][], layer: any, color: string, category: string) => {
  const polyLine = new PolyLine({
    paths: geoMetry
  })

  const polyLineGraphic = new Graphic({
    geometry: polyLine,
    attributes:{
      id: category
    },
    symbol: new SimpleFillSymbol({
      color: new Color('blue'),
      outline: {
        color: new Color('darkblue'),
        width: 1
      }
    })
  })

  layer.add(polyLineGraphic)
}