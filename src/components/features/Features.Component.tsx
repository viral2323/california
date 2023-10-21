import { Box } from "@mui/system";
import React, { useRef, useEffect, useState } from "react";
import {MenuItem, PaginationItem, Select ,SelectChangeEvent} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Home from "@arcgis/core/widgets/Home";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { fetchFeatures } from "../../services/apiServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { polygone, polyline } from "./Polyline";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
// TYPES

interface featureData {
  category: string;
  id: number;
  feat_desc: string;
  reg_definition: string;
  geoMetry: {[key: string]: [][][]};
}
interface categoryData {
  mainCategory: string,
  category: string[]
}
const drawerWidth = 360;

// esriConfig.apiKey = "AAPK99032b1e752243268d1affb3c85564c7JzDyP8SdtVJ0q-BTFBQpdy7_ZfqB4wl23CO2TrpO6ySijMaeouLR5IIKDgyr5DUC"

esriConfig.apiKey = process.env.REACT_APP_ARC_GIS_API_KEY || "";

const PreIcon = () => (
  <Box className="flex justify-center items-center gap-x-[5px] pr-[0.4rem]">
    <KeyboardArrowLeftIcon sx={{ fontSize: "26px" }} />
    <Typography>Previous</Typography>
  </Box>
);

const NextIcon = () => (
  <Box className="flex justify-center items-center gap-x-[5px] pl-[0.4rem]">
    <Typography>Next</Typography>
    <KeyboardArrowRightIcon sx={{ fontSize: "26px" }} />
  </Box>
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function FeaturesComponent() {

  let mapRef = useRef<HTMLDivElement>(null);
  const graphicsLayer = new GraphicsLayer();
  const count = useRef(1)
  const map = new Map({
    basemap: "arcgis-topographic",
  });

  // LOCAL STATE FOR STROING DATA
  const [featureData, setFeatureData] = useState<featureData[]>([]);
  const [currentPage, setCurentPage] = useState<number>(1);
  const [filterData,setFilterData] = useState<featureData[]>([]);
  const [isfiletApply, setIsFilterApply] = useState<boolean>(false)
  //layer Dropdown
  const [ layerDropdown, setLayerDropdown] = useState<string[]>(['Marine','Inland polygons'])
  const [ layerOptions, setLayerOptions] = useState(['Marine','Inland polygons']); //remvoe 'Inland lines'
  //category Dropdown
  const [ categoryDropdown, setCategoryDropdown] = useState<string[]>([])
  const [ categoryOptions, setCategoryOptions] = useState<string[]>([])
  //set all feature and category
  const [allFeaturesTotalData, setAllFeaturesTotalData] = useState<any>([])
  const [allCategoryTotalData, setAllCategoryTotalData] = useState<categoryData[]>([{mainCategory: '', category: []}])

  if(count.current === 1){
    const data = async () => {
      const payload = [
        { name: 'Marine', value: 8, layerName: 'RFR_Marine_TESTSET' },
        { name: 'Inland lines', value: 0, layerName: 'RFRService' },
        { name: 'Inland polygons', value: 1, layerName: 'RFRService' },
      ];
    
      const results = await Promise.allSettled([
        fetchFeatures(payload[0].layerName, payload[0].value),
        // fetchFeatures(payload[1].layerName, payload[1].value),
        fetchFeatures(payload[2].layerName, payload[2].value),
      ]);
    
      return results.map((result) => result.status === 'fulfilled' ? result.value : null);
    };
    
    data()
      .then((result) => {
        console.log('data',result)
        const totalData = [
        {mainCategory: 'Marine', features: result[0].features},
        {mainCategory: 'Inland polygons', features: result[1].features},
        // {mainCategory: 'Inland polygons', features: result[2].features}
      ]
      let totalFeaturesData: any = []
      let totalCategoryData: categoryData[] = []
      totalData.forEach((item: any) => {
          let c: string[] = []
          item.features.forEach((fea: any) => {
            const v = {mainCategory: item.mainCategory,...fea}
            const mc = fea.attributes.category
            totalFeaturesData.push(v)
            c.push(mc)
          }) 
          totalCategoryData.push({mainCategory: item.mainCategory, category: [...c]})
      })

       const allCategory = totalCategoryData.map((item: categoryData) => {
         return item.category
        }) 
    
        const allFeature = totalFeaturesData.map((item: any,index: number) => {
         const attr = item.attributes
         const geoMetry = item.geometry
         return {category: attr.category,id:index, feat_desc:attr.feat_desc, reg_definition: attr.reg_definition, geoMetry: geoMetry}
        })
    
        setFeatureData([...allFeature])
        setCategoryOptions([...new Set([...allCategory.flat()])])
        setCategoryDropdown([...new Set([...allCategory.flat()])])
        setAllCategoryTotalData([...totalCategoryData])
        setAllFeaturesTotalData([...totalFeaturesData])
      })
      .catch((error) => {
        console.error('Error:', error);
      });


    count.current++
  }

  const changeCategory = (value: string | string[]) => {
      const currentLength = categoryDropdown.length
      const valueLength = typeof value == 'object' ? value.length : 0
      if(currentLength > valueLength){
        const findRemovedItemm = categoryOptions.filter((item: string) => {
          return !value.includes(item)
        })

        const updateFeatureDate = featureData.filter((item: featureData) =>{
          return  !findRemovedItemm.includes(item.category)
        })

        setCategoryDropdown([...value])
        setFeatureData([...updateFeatureDate])
        
      }else{
        const findAddedItem = typeof value == 'object' ? value.find((item: string) => {
          return !categoryDropdown.includes(item)
        }) : ''
        const newItem = findAddedItem !== undefined ? findAddedItem : ''
        const updateFeatureDate = allFeaturesTotalData.map((item: any, index:number) => {
          const attr = item.attributes
          const geoMetry = item.geometry
          return {category: attr.category,id:index, feat_desc:attr.feat_desc, reg_definition: attr.reg_definition, geoMetry: geoMetry}
        })

        const newFeatureDate = updateFeatureDate.filter((item: any) =>{
          return item.category === newItem
        })
        setCategoryDropdown((prev) => [...prev, newItem])
        setFeatureData((prev: any) => [...prev, ...newFeatureDate])
      }
      setCurentPage(1)
  }
  
  const renderNextPage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurentPage(page);
  };

  useEffect(() => {
    if(featureData.length > 0){
      featureData.forEach((item:featureData) => {
        if(item.geoMetry.hasOwnProperty('rings')){
          polygone(item.geoMetry.rings, graphicsLayer, '#083a8d', item.category)
        }else if(item.geoMetry.hasOwnProperty('paths')){
          polyline(item.geoMetry.paths,graphicsLayer, '#083a8d', item.category)
        }
      })
    }
    
    const categorizedColors = [
      { category: "Marine Protected Area", hexColor: "#F10BDF" },  //Light Pink
      { category: "Management Area", hexColor: "#CBC3E3" }, //Light purple 
      { category: "Rockfish Conservation Area", hexColor: "#ffb6c1" }, //Light Pink
      { category: "Special Management Area", hexColor: "#f08080" }, //Light Coral
      { category: "region", hexColor: "#87CEEB" }, //Light Salmon
      { category: "freshWaterBody", hexColor: "#555550" }, //Dark Gray
      { category: "tributaryArea", hexColor: "#006a4e" }, //Dark Green
      { category: "freashWaterBody", hexColor: "#0BF1D8" } //Navy blue
    ];

    const graphics = graphicsLayer.graphics.toArray()
    const layers = graphics.map((item: any) => {
      console.log('graphicitem',item)
      const innerColor = categorizedColors.find((cat: any) => cat.category == item.attributes.id)
      const ringColor = `${innerColor?.hexColor}`
        return new FeatureLayer({
          source: [item], // Pass the graphics from the GraphicsLayer as the source
          objectIdField: 'OBJECTID', // Specify the field to use as the object ID
          fields: [
            {
              name: 'OBJECTID',
              alias: 'OBJECTID',
              type: 'oid'
            }
            // Add more fields as needed
          ],
          labelingInfo: [{
            labelExpression: item.attributes.id
          }],
          typeIdField: item.attributes.id,
          renderer: new SimpleRenderer({
            symbol: new SimpleFillSymbol({
              color: new Color(innerColor?.hexColor),
              outline: {
                color: new Color(ringColor),
                width: 1
              },
              style: 'solid'
            }),
            label: item.attributes.id,
          })
        })
    })
    layers.forEach((item: any)=>{
      map.add(item)
    })
    const uniqueData = layers.filter((obj: any, index:number, self: any) => {
      // Check if the current object's typeIdField value is the first occurrence in the array
      return index === self.findIndex((t:any) => t.typeIdField === obj.typeIdField);
    });
    const layerInfos = uniqueData.map((item: any) => {
      return {layer: item}
    })
    if (mapRef.current) {
      new MapView({
        container: mapRef.current,
        map: map,
        center: [-119.417931, 36.778259],
        zoom: 6,
      }).when((view: any) => {
        view.ui.add(
          new Home({
            view: view,
          }),
          "top-left"
        );
        view.ui.add(
          new Expand({
            content: new Legend({
              view: view,
              layerInfos: layerInfos, 
              style: {
                type: "classic",
              },
            }),
            view: view,
            expanded: true,
            
          }),
          'top-left'
        )
      }); 
      // (mapRef as React.MutableRefObject<HTMLDivElement | null>).current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[featureData])

  const changeLayerDropdown = async (value: string[] | string) => {
    const currentLength = layerDropdown.length;
    const valueLength = value.length;

    if(currentLength > valueLength){
      const findRemovedItemm = layerDropdown.find((item: string) => {
        return !value.includes(item)
      })
      const dataArr = allCategoryTotalData.find((item:categoryData) => {
        return item.mainCategory === findRemovedItemm
      }) ?? {mainCategory: '', category: []}

      const updatedCategory = categoryDropdown.filter((item: string) => {
        return !dataArr.category.includes(item)
      })
      
      const updateFeatureDate = featureData.filter((item: featureData) => {
        return !dataArr.category.includes(item.category)
      })
      setFeatureData([...updateFeatureDate])
      setLayerDropdown([...value])
      setCategoryDropdown([...updatedCategory])
    }else{
      const findAddedItem = typeof value == 'object' ? value.find((item: string) => {
        return !layerDropdown.includes(item)
      }) : ''
      const newItem = findAddedItem !== undefined ? findAddedItem : ''

      const dataArr = allCategoryTotalData.find((item: categoryData) => {
        return item.mainCategory === newItem
      }) ?? {mainCategory: '', category: []}
      const updatedCategory = [...categoryDropdown, ...dataArr.category]

      const feature = allFeaturesTotalData.filter((item: any) => {
        return item.mainCategory === newItem
      })
      const updateFeatureData = feature.map((item: any, index:number) => {
        const attr = item.attributes
        const geoMetry = item.geometry
        return {category: attr.category,id:index, feat_desc:attr.feat_desc, reg_definition: attr.reg_definition, geoMetry: geoMetry}
      })
      const update = featureData.filter((item: featureData) => {
        return !dataArr.category.includes(item.category)
      })
      setFeatureData([...update,...updateFeatureData])
      setCategoryDropdown([...new Set(updatedCategory)])
      setLayerDropdown([...value])
    }   
    setCurentPage(1)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value;
    const updateData = featureData.filter((item: featureData) => {
      return (item.feat_desc.toLowerCase().includes(value) || (item.reg_definition && `$${item.reg_definition}`.toLowerCase().includes(value)))
    })
    if(value === ''){
      setIsFilterApply(false)
    }else{
      setIsFilterApply(true)
    }
    setFilterData([...updateData])
  }

  return (
    <>
      <Box
        sx={{ height: "calc(100vh - 130px)" }}
        className="flex flex-row-reverse"
      >
        <Box className="flex-1 relative">
          <div
            ref={mapRef}
            aria-label="viral"
            style={{
              width: `calc(100% - ${drawerWidth})`,
              height: "calc(100vh - 130px)",
            }}
          ></div> 
          <Box className='absolute flex justify-start gap-[15px]' sx={{top: '15px', left: '60px'}}>
            <Box>
            <p className="pb-[5px] text-[#A15801] font-semibold">Select Layer(s)</p>
              <Select
                multiple
                displayEmpty
                value={layerDropdown}
                variant="standard"
                onChange={(e: SelectChangeEvent<typeof layerDropdown>) => changeLayerDropdown(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Layers</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                sx={{background: 'white', width: '200px'}}
                inputProps={{ "aria-label": "Without label" }}
              >
                
                {layerOptions.map((option) => (
                  <MenuItem key={option} value={option} sx={{paddingLeft: '8px', paddingRight: '8px', whiteSpace: 'wrap'}}>
                  <ListItemIcon>
                    <Checkbox checked={layerDropdown.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <p className="pb-[5px] text-[#A15801] font-semibold">Select Category/Categories</p>
              <Select
                multiple
                displayEmpty
                value={categoryDropdown}
                variant="standard"
                onChange={(e: SelectChangeEvent<typeof categoryDropdown>) => changeCategory(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Categories</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                sx={{background: 'white', width: '200px'}}
                inputProps={{ "aria-label": "Without label" }}
              >
                
                {categoryOptions.map((option) => (
                  <MenuItem key={option} value={option} sx={{paddingLeft: '8px', paddingRight: '8px', whiteSpace: 'wrap',wordBreak: 'break-all'}}>
                  <ListItemIcon>
                    <Checkbox checked={categoryDropdown.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
        <Box sx={{ py: 2, overflowY: "auto" }}>
          <div>
            <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="Search List"
                      onClick={() => {}}
                      onMouseDown={() => {}}
                      edge="start"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleChange}
                label="Search"
              />
            </FormControl>
          </div>
          <div>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {(isfiletApply ? filterData : featureData).length > 0 &&
                (isfiletApply ? filterData : featureData)
                  .slice(10 * (currentPage - 1), currentPage * 10)
                  .map(
                    (item: featureData, index: number, arr: featureData[]) => {
                      return (
                        <>
                          <Box className="flex justify-start items-center p-4 gap-[15px]">
                            <Box>
                              <VisibilityIcon
                                titleAccess="View Regulations and Rules Count"
                                fontSize="small"
                                color="primary"
                                sx={{cursor: 'pointer'}}
                              />
                            </Box>
                            <Box>
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.feat_desc}
                                </Typography>
                                <b>` - ${item.reg_definition}`</b>
                              </React.Fragment>
                            </Box>
                          </Box>
                          {!(arr.length === index) && (
                            <Divider
                              sx={{ margin: "0px 1rem" }}
                              variant="inset"
                              component="li"
                            />
                          )}
                        </>
                      );
                    }
                  )}
            </List>
          </div>
          <div>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil((isfiletApply ? filterData : featureData).length / 10)}
                page={currentPage}
                onChange={renderNextPage}
                renderItem={(item) => (
                  <PaginationItem
                    components={{ previous: PreIcon, next: NextIcon }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default FeaturesComponent;
