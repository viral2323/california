import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../../shared/modals/delete-modal/DeleteModal";
import RegulationDetailsModal from "../../../shared/modals/RegulationDetailsModal";
import { useSearchParams } from "react-router-dom";

function RegulationsDetailsComponent() {
  let [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [deleteOpen, setDeleteopen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [titleOpen, setTitleOpen] = useState("Add Details");

  const deleteModalOpenHandler = () => {
    setDeleteopen(true);
  };
  const deleteModalCloseHandler = () => {
    setDeleteopen(false);
  };

  const addModalOpenHandler = () => {
    setAddOpen(true);
  };
  const addModalCloseHandler = () => {
    setAddOpen(false);
  };

  const accordions = [
    {
      id: 1,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
    {
      id: 2,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
    {
      id: 3,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
    {
      id: 4,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
    {
      id: 5,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
    {
      id: 6,
      name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
      innerObj: [
        {
          name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
        },
        {
          name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
        },
        {
          name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
        },
        {
          name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
        },
      ],
    },
  ];
  return (
    <>
      <h1 className="text-4xl  mb-[40px] md:mb-[50px] font-bold text-center">
        Regulations Details
      </h1>
      {/* <div className="mb-[30px] flex justify-end">
        <Button variant="contained" endIcon={<AddIcon />}>
          Add new
        </Button>
      </div> */}
      {accordions?.map((accordion) => {
        return (
          <Accordion
            expanded={expanded === `panel${accordion?.id}`}
            onChange={handleChange(`panel${accordion?.id}`)}
            key={`panel${accordion?.id}`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${accordion?.id}1bh-content`}
              id={`panel${accordion?.id}bh-header`}
            >
              <div className="flex gap-5 items-center w-full ">
                <div>{accordion?.name}</div>
                {type === "edit" ? (
                  <div className="flex items-center justify-end flex-1 pr-6">
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        setTitleOpen("Add Details");
                        addModalOpenHandler();
                      }}
                    >
                      <AddCircleOutlineIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        setTitleOpen("Edit Details");
                        addModalOpenHandler();
                      }}
                    >
                      <EditIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        deleteModalOpenHandler();
                      }}
                    >
                      <DeleteIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
            </AccordionSummary>
            {accordion?.innerObj?.map((innerObj) => {
              return (
                <AccordionDetails key={innerObj?.name}>
                  <div className="flex items-center gap-5">
                    {type === "view" ? (
                      <div>{innerObj?.name}</div>
                    ) : (
                      <div className="basis-[85%]">{innerObj?.name}</div>
                    )}
                    {type === "edit" ? (
                      <div className="basis-[15%] justify-end flex">
                        <IconButton
                          aria-label="add"
                          onClick={() => {
                            setTitleOpen("Add Details");
                            addModalOpenHandler();
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ color: "#1976d2" }} />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setTitleOpen("Edit Details");
                            addModalOpenHandler();
                          }}
                        >
                          <EditIcon sx={{ color: "#1976d2" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteModalOpenHandler();
                          }}
                        >
                          <DeleteIcon sx={{ color: "#1976d2" }} />
                        </IconButton>
                      </div>
                    ) : null}
                  </div>
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
      <DeleteModal open={deleteOpen} handleClose={deleteModalCloseHandler} />
      <RegulationDetailsModal
        title={titleOpen}
        open={addOpen}
        name={
          titleOpen === "Add Details"
            ? ""
            : "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:"
        }
        onClose={addModalCloseHandler}
      />
    </>
  );
}

export default RegulationsDetailsComponent;
