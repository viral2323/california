import React, { useState, useEffect } from "react";
import { StyledMenu } from "./Common.Styles";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, TextField, MenuItem, IconButton } from "@mui/material";

interface PropsTypes {
  anchorRef: null | HTMLElement;
  closeFilter: () => void;
  applyFilter: () => void;
  fieldFilterPayload: fieldFilterPayload;
  setFieldFilterPayload: (data: fieldFilterPayload) => void;
  filterItem: number[];
  setFilterItem: (data: number[]) => void;
  listOfColumn: string[]
}

interface filterPayload {
  filterType: string;
  filterColumn: string;
  filterValue: string | number;
  id: number;
}
interface fieldFilterPayload {
  filterPayload: filterPayload[];
}

interface columnList {
  id: number;
  list: string[];
}

// ENUMS

const filterRules = [
  {
    label: "contains",
    value: "CONTAINS",
  },
  {
    label: "equals",
    value: "EQUALS",
  },
  {
    label: "is empty",
    value: "IS EMPTY",
  },
  {
    label: "is not empty",
    value: "IS NOT EMPTY",
  },
  {
    label: "start with",
    value: "STARTS WITH",
  },
  {
    label: "ends with",
    value: "ENDS WITH",
  },
  {
    label: "is any of",
    value: "ANY OF",
  },
];

const filterBooleanFieldValue = [
  {
    label: "True",
    value: 'true',
  },
  {
    label: "False",
    value: 'false',
  },
];

function FieldFilter(props: PropsTypes) {
  const {
    anchorRef,
    closeFilter,
    applyFilter,
    fieldFilterPayload,
    setFieldFilterPayload,
    filterItem,
    setFilterItem,
    listOfColumn
  } = props;

  // STATE FOR STORING LOCAL VARIABLE
  
  const [columnList, setColumnList] = useState<columnList[]>([
    {
      id: 0,
      list: [...listOfColumn],
    },
  ]);

  useEffect(() => {
    disableUsedColumn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldFilterPayload])

  // HNADLERS TO IMPLEMENT FUNCTIONALITY
  const disableUsedColumn = () => {
    const allList = [...listOfColumn];
    
    const seltectdList = fieldFilterPayload.filterPayload.map((item: filterPayload) => {
      return item.filterColumn
    })
    const usedCol = seltectdList.filter((col: string) => {
      return col !== "" 
    })

    let colList:columnList[] = [];

      fieldFilterPayload.filterPayload.forEach((item: filterPayload) => {

        const filedColumn = item.filterColumn;

        const finalList = usedCol.filter((v: string) => v !== filedColumn)
        const newList = allList.filter((item) => !finalList.includes(item));

        colList.push({id: item.id, list: [...newList]})

      })
      setColumnList([...colList])
  };

  const changeColumnValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    itme: number
  ) => {
    const findItem = fieldFilterPayload.filterPayload.find(
      (item: filterPayload) => {
        return item.id === itme;
      }
    );
    const filterValue = () => {
      if (e.target.value === "Is Application Group") {
        return 'false';
      } 
      return "";
    };
    const filterTypeValue = (value: string) => {
      if (e.target.value === "Tier" || e.target.value === "Is Application Group") {
        return "EQUALS";
      }
      return value;
    };

    if (findItem) {
      const update = fieldFilterPayload.filterPayload.map(
        (item: filterPayload) => {
          if (item.id === itme) {
            return {
              ...item,
              filterColumn: e.target.value,
              filterValue: filterValue(),
              filterType: filterTypeValue(item.filterType),
            };
          }
          return item;
        }
      );
      setFieldFilterPayload({ filterPayload: [...update] });
    }
    
  };

  const columnLabelAndValue = (name: number) => {
    const value = fieldFilterPayload.filterPayload.find(
      (item: filterPayload) => {
        return item.id === name;
      }
    );

    if (value) {
      return value.filterColumn;
    }
  };

  const setOperatorFilterValue = (index: number, event: React.MouseEvent) => {
    const ele = event.target as HTMLLIElement;
    const value = ele.getAttribute("data-value") || "";

    const findItem = fieldFilterPayload.filterPayload.find(
      (item: filterPayload) => {
        return item.id === index;
      }
    );

    if (findItem) {
      const update = fieldFilterPayload.filterPayload.map(
        (item: filterPayload) => {
          if (item.id === index) {
            return { ...item, filterType: value };
          }
          return item;
        }
      );

      setFieldFilterPayload({ filterPayload: [...update] });
    }
  };

  const setTextFilterValue = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const findItem = fieldFilterPayload.filterPayload.find(
      (item: filterPayload) => {
        return item.id === index;
      }
    );

    if (findItem) {
      const update = fieldFilterPayload.filterPayload.map(
        (item: filterPayload) => {
          if (item.id === index) {
            return { ...item, filterValue: event.target.value };
          }
          return item;
        }
      );

      setFieldFilterPayload({ filterPayload: [...update] });
    }
  };

  const addMoreFilter = () => {
    const lastEle = filterItem[filterItem.length - 1];
    setFilterItem([...filterItem, lastEle + 1]);
    setFieldFilterPayload({
      filterPayload: [
        ...fieldFilterPayload.filterPayload,
        { id: lastEle + 1, filterColumn: "", filterValue: "", filterType: "" },
      ],
    });
    // disableUsedColumn()
  };

  const removeMoreFilter = (number: number) => {
    const newItemArray = filterItem.filter((item: number) => item !== number);
    const newPayload = fieldFilterPayload.filterPayload.filter(
      (item: filterPayload) => {
        return item.id !== number;
      }
    );
    setFieldFilterPayload({ filterPayload: [...newPayload] });
    setFilterItem([...newItemArray]);
  };

  const closeAllFilter = () => {
    closeFilter();
    // setFilterItem([0]);
  };

  const applyAllFilter = () => {
    // setFilterItem([0]);
    applyFilter();
  };

  // COMMON TEXTFIELD TO AVOID STATE OVERRIDE

  const filterOperatorField = (
    data: filterPayload | undefined,
    index: number
  ) => {
    const setValueToField = () => {
      const columnName = data?.filterColumn;
       if(columnName === "Is Application Group"){
        return "EQUALS";
      }
      if (data) {
        const value = data;
        return value.filterType;
      }
    };

    const checkListNeedToDisable = (name: string) => {
      const columnName = data?.filterColumn;
      const operatorName = ['equals', 'greater than', 'less than']
      if (columnName === "Tier" || columnName === "Is Application Group") {
        if (operatorName.includes(name)) {
          return false;
        }
        return true;
      }
      return false;
    };

    const AddMoreOperator = () => {
      const columnName = data?.filterColumn;
      if(columnName === 'Tier'){
        return [
          {
            label: "greater than",
            value: "GREATER THAN",
          },
          {
            label: "less than",
            value: "LESS THAN",
          },
        ]
      }
      return []
    }

    return (
      <div>
        <TextField
          id="standard-select-operator"
          select
          label="Operator"
          defaultValue={"EQUALS"}
          value={setValueToField()}
          variant="standard"
          className="w-[200px]"
        >
          {[...filterRules, ...AddMoreOperator()].map((option) => (
            <MenuItem
              onClick={(e: React.MouseEvent) =>
                setOperatorFilterValue(index, e)
              }
              key={option.value}
              value={option.value}
              disabled={checkListNeedToDisable(option.label)}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  };

  const filtertextField = (data: filterPayload | undefined, index: number) => {
    const setValueToField = () => {
      const value = data;
      return value?.filterValue;
    };

    const fieldType = () => {
      const value = data?.filterColumn;
      if (value === "Tier") {
        return "number";
      }
      return "text";
    };

    const checkField = () => {
      const value = data?.filterColumn;
      if (value === "Is Application Group") {
        return true;
      }
      return false;
    };

    return (
      <div>
        <TextField
          id="standard-basic"
          label="Value"
          defaultValue={checkField() ? 'false' : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextFilterValue(index, e)
          }
          variant="standard"
          className="w-[200px]"
          type={fieldType()}
          select={checkField()}
          value={setValueToField()}
          onKeyDown={(e:any) => {
            e.stopPropagation();
          }}
        >
          {filterBooleanFieldValue.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  };

  return (
    <>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorRef}
        open={Boolean(anchorRef)}
        horizontal={"left"}
        onClose={closeAllFilter}
      >
        <div className="flex flex-col">
          {filterItem.length > 0 &&
            filterItem.map((item: number, _, arr: number[]) => {
              const findItem = fieldFilterPayload.filterPayload.find(
                (data: filterPayload) => {
                  return data.id === item;
                }
              );
              const findColumnList = columnList.find((keyValue: columnList) => {
                return keyValue.id === item;
              });
              return (
                <div key={item} className="p-2 flex flex-row gap-x-2.5 items-center">
                  <div className="flex items-center gap-x-2.5">
                    <div className="flex items-center gap-2 mr-2 mt-3">
                      <IconButton
                        sx={{
                          p: 0,
                        }}
                        aria-label="Clear column filter"
                        title="Clear column filter"
                        onClick={closeAllFilter}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                    <div>
                      <TextField
                        id="standard-select-column"
                        select
                        label="Column Name"
                        variant="standard"
                        className="w-[200px]"
                        value={columnLabelAndValue(item)}
                        defaultValue={columnLabelAndValue(item)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          changeColumnValue(e, item)
                        }
                      >
                        {findColumnList &&
                          findColumnList.list.length > 0 &&
                          findColumnList.list.map((option) => (
                            <MenuItem value={option}>{option}</MenuItem>
                          ))}
                      </TextField>
                    </div>
                    {filterOperatorField(findItem, item)}
                    {filtertextField(findItem, item)}
                  </div>
                  {item >= 1 && (
                    <Button className="h-10" color="secondary" variant="contained" onClick={() => removeMoreFilter(item)}>
                      Remove
                    </Button>
                  )}
                  {item <= 0 && (
                    <>
                      <Button className="h-10" disabled={arr.length >= listOfColumn.length} color="primary" variant="contained" onClick={addMoreFilter}>Add More</Button>
                      <Button className="h-10" color="info" variant="contained" onClick={applyAllFilter}>Filter</Button>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </StyledMenu>
    </>
  );
}

export default React.memo(FieldFilter)
