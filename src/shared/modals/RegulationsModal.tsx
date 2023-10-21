import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { addRegulation, fetchParentCodes, fetchRegulationById, updateRegulation } from "../../services/apiServices";
import { toast } from "react-toastify";
import showToast from "../../components/toast"; 
import Autocomplete from '@mui/material/Autocomplete';

function RegulationsModal(props: any) {
  const { data, type, onClose } = props;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
        border-color: #0000006b;
        &:hover {
          border-color: rgba(0, 0, 0, 0.87)
        }
      
        &:focus {
          border-color: #a15801;
          box-shadow: 0 0 0 1px ${
            theme.palette.mode === "dark" ? "#a15801" : "#a15801"
          };
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [listOfParentCode, setListOfParentCode] = useState<string[]>([])
  const [disabledFields, setDisabledFields] = useState<any>({
    source: false,
    code: false,
    title: false,
    parentCode: false,
    text: false,
  });

  const handleChange = (event: SelectChangeEvent) => {};

  useEffect(() => {

    (async () => {
      const res = await fetchParentCodes()
      if(res && res.length > 0){
        if(type == 'add-child'){
          setListOfParentCode([...new Set([...res, data.parentCode])])
        }else{
          setListOfParentCode([...res])
        }
        
      }
    })()

    if (type === "add-child") {
      setDisabledFields({
        source: true,
        code: false,
        title: false,
        parentCode: true,
        text: false,
        type: false
      });
      if (data) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            setValue(key, data[key]);
          }
        }
      }
    } else if (type === "add-parent") { 
      setDisabledFields({
        source: false,
        code: false,
        title: false,
        parentCode: false,
        text: false,
        type: false
      });
    } else if (type == "view"  || type === "edit") {
      setDisabledFields({
        source: false,
        code: false,
        title: false,
        parentCode: false,
        verbatim: false,
        type: false
      });

      if (data) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            setValue(key, data[key]);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleParentCode = (value: string | null) => {
    setValue('code', value)
  }

  const handleCode = (value: string | null) => {
    // const regEx = /^\d+\.\d+(?:\([a-zA-Z\d]+\))*$/gm
    // const regEx = /^\\d+(\\.\\d+)?(\\([a-z]\\))?(\\(\\d\\))?(\\([A-Z]\\))?(\\d)?(\\.[a-z])?(\\d)?(\\.[A-Z])?(\\.\\d)?(\\.[a-z])?$/
    const regEx = [/^-?\d+(\.\d+)?$/,/^-?\d+(\.\d+)?\([a-z]\)$/, /^-?\d+(\.\d+)?\([a-z]\)\(\d+\)$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d+\)\([A-Z]\)$/, /^-?\d+(\.\d+)?\([a-z]\)\(\d\)\([A-Z]\)\d+$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d\)\([A-Z]\)\d+\.[a-z]$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d+\)\([A-Z]\)\d+\.[a-z]\.\d+$/] 
    const reuslt = regEx.some((item: any) => {
      return item.test(value)
    })
    
    if(!reuslt){
      setError('code',{type: 'required', message: 'Invalid Code.'})
    }else{
      clearErrors('code')
    }
    setValue('code',value)
  }

  const validateCode = () => {
    const value = getValues('code')
    const regEx = [/^-?\d+(\.\d+)?$/,/^-?\d+(\.\d+)?\([a-z]\)$/, /^-?\d+(\.\d+)?\([a-z]\)\(\d+\)$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d+\)\([A-Z]\)$/, /^-?\d+(\.\d+)?\([a-z]\)\(\d\)\([A-Z]\)\d+$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d\)\([A-Z]\)\d+\.[a-z]$/,/^-?\d+(\.\d+)?\([a-z]\)\(\d+\)\([A-Z]\)\d+\.[a-z]\.\d+$/] 
    const reuslt = regEx.some((item: any) => {
      return item.test(value)
    })
    return reuslt || "Invalid Code."
  }

  const submitForm =async (submitData: any) => {
    if(type == 'add-parent' || type == 'add-child'){
      const payload = {source: submitData.source,parentCode: submitData.parentCode,code: submitData.code,title:submitData.title, type:submitData.type,verbatim: submitData.verbatim}
      const response = await addRegulation(payload)
      if(response.hasOwnProperty('isSuccessful') && response.isSuccessful == true){
        showToast(type == 'add-parent' ? 'Regulation added successfully.' : 'Child regulation added successfully.','success', 3000)
        onClose('update-list')
      }else{
        showToast(response.message,'error', 3000)
      }
    }else if(type == 'edit'){
      const payload = {source: submitData.source,parentCode: submitData.parentCode,code: submitData.code,title:submitData.title, type:submitData.type,verbatim: submitData.verbatim, regulationId: data.regulationId}
      const response = await updateRegulation(payload)
      if(response.hasOwnProperty('isSuccessful') && response.isSuccessful == true){
        showToast('Regulation updated successfully.','success', 3000)
        onClose('update-list')
      }

    }
  };
  const validateParentCode = () => {
    if(type == 'add-child'){
      return "Parent code is required!"
    }else{
      return true
    }
  }

  const closeModal = () => {
    reset();
    onClose();
  };
  
  return (
    <>
      <Dialog open={props?.open} onClose={closeModal} fullScreen={fullScreen}>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogTitle>{props?.title}</DialogTitle>
          <DialogContent>
            <div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="custom-form-control-modal">
                    <Controller
                      name="source"
                      control={control}
                      rules={{ required: "source is required" }}
                      render={({ field, fieldState }) => (
                        <FormControl
                          variant="standard"
                          sx={{ minWidth: 200, width: "100%" }}
                          error={errors["source"] ? true : false}
                          disabled={disabledFields["source"]}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            className="required-label"
                          >
                            Source
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={field.value}
                            onChange={(e: any) =>
                              field.onChange(e.target.value)
                            }
                            label="Source"
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={'CCR Title 14'}>CCR Title 14</MenuItem>
                            <MenuItem value={'California Fish and Game Code'}>
                              California Fish and Game Code
                            </MenuItem>
                            <MenuItem value={'CFR Title 50'}>CFR Title 50</MenuItem>
                          </Select>
                          {errors["source"] && (
                            <FormHelperText>{`${errors["source"].message}`}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="custom-form-control-modal">
                    <Controller
                      name="parentCode"
                      control={control}
                      rules={{ validate: validateParentCode }}
                      render={({ field, fieldState }) => (
                        <FormControl
                          variant="standard"
                          sx={{ minWidth: 200, width: "100%" }}
                          error={errors["parentCode"] ? true : false}
                        >
                          <Autocomplete
                           options={listOfParentCode}
                           id="clear-on-escape"
                            clearOnEscape
                            value={field.value}
                            disabled={disabledFields["parentCode"]}
                            onChange={(event: any, newValue: string | null) => {
                              field.onChange(newValue)
                              handleCode(newValue)
                            }}
                            inputValue={field.value}
                            onInputChange={(event, newInputValue) => {
                              field.onChange(newInputValue)
                            }}
                            renderInput={(params) => (
                              <TextField  error={errors["parentCode"] ? true : false} {...params} label="Parent Code" variant="standard"/>
                            )}
                          />
                           {errors["parentCode"] && (
                            <FormHelperText>{`${errors["parentCode"].message}`}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="custom-form-control-modal">
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Parent code is required." }}
                      render={({ field, fieldState }) => (
                        <FormControl
                          sx={{ minWidth: 200, width: "100%" }}
                          variant="standard"
                        >
                          <TextField
                            error={errors["title"] ? true : false}
                            id="demo-customized-textbox"
                            variant="standard"
                            label="Title *"
                            value={field.value ? field.value : ''}
                            onChange={(e: any) =>
                              field.onChange(e.target.value)
                            }
                            disabled={disabledFields["title"]}
                            helperText={`${
                              errors["title"] ? errors["title"].message : ""
                            }`}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="custom-form-control-modal">
                    <Controller
                      name="code"
                      control={control}
                      rules={{ required: "Code is required.", validate: validateCode}}
                      render={({ field, fieldState }) => (
                        <FormControl
                          sx={{ minWidth: 200, width: "100%" }}
                          variant="standard"
                        >
                          <TextField
                            error={errors["code"] ? true : false}
                            id="demo-customized-textbox"
                            variant="standard"
                            value={field.value ? field.value : ''}
                            label= 'Code *'
                            onChange={(e: any) =>
                              handleCode(e.target.value)
                            }
                            disabled={disabledFields["code"]}
                            helperText={`${
                              errors["code"] ? errors["code"].message : "Ex. 123.6(a)(2)(c)"
                            }`}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="custom-form-control-modal">
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: "Type is reqired." }}
                      render={({ field, fieldState }) => (
                        <FormControl
                          variant="standard"
                          sx={{ minWidth: 200, width: "100%" }}
                          error={errors["type"] ? true : false}
                          disabled={disabledFields["type"]}
                        >
                          <InputLabel
                            className="required-label"
                            id="demo-simple-select-standard-label"
                          >
                            Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={field.value}
                            onChange={(e: any) =>
                              field.onChange(e.target.value)
                            }
                            label="Type"
                            // disabled={disabledFields?.parentCode}
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={'Marine'}>Marine</MenuItem>
                            <MenuItem value={'Inland'}>Inland</MenuItem>
                            <MenuItem value={'General'}>General</MenuItem>
                          </Select>
                          {errors["type"] && (
                            <FormHelperText>{`${errors["type"].message}`}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 flex-col">
                <div
                  className={`pl-2 required-label ${
                    errors["verbatim"] ? "error" : ""
                  } ${disabledFields["verbatim"] ? "disable" : ""}`}
                >
                  Verbatim
                </div>
                <div className="pl-2">
                  <Controller
                    name="verbatim"
                    control={control}
                    rules={{ required: "Verbatim is requied." }}
                    render={({ field, fieldState }) => (
                      <StyledTextarea
                        aria-label="minimum height"
                        className={`${errors["verbatim"] ? "error" : ""} ${
                          disabledFields["verbatim"] ? "disable" : ""
                        }`}
                        maxRows={3}
                        minRows={3}
                        placeholder="Type in here…"
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        disabled={disabledFields["verbatim"]}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            {type !== "view" && <Button type="submit">Submit</Button>}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RegulationsModal;
