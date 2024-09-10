import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ManpowerNoteSheetHeader from "./ManpowerNoteSheetHeader";
import ManpowerNoteSheetModel from "./models/ManpowerNoteSheetModel";
import ManpowerNoteSheetForm from "./ManpowerNoteSheetForm";
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty("You must enter a manpowerNoteSheet name")
    .min(5, "The manpowerNoteSheet name must be at least 5 characters"),
});

function ManpowerNoteSheet() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { manpowerNoteSheetId } = routeParams;

  const [formKey, setFormKey] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (manpowerNoteSheetId === "new") {
      reset(ManpowerNoteSheetModel({}));
    }
  }, [manpowerNoteSheetId, reset]);
  const handleReset = () => {
    reset({});
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <FormProvider {...methods} key={formKey}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-80 h-80",
        }}
        header={<ManpowerNoteSheetHeader handleReset={handleReset} />}
        content={
          <div className="p-16 ">
            <ManpowerNoteSheetForm manpowerNoteSheetId={manpowerNoteSheetId} />
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default ManpowerNoteSheet;
