import { HiSparkles, HiXCircle } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { causesContext } from "@/context/CausesContext";
import { useFormik } from "formik";

interface ICauses {
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ICausesSchema {
  type: string;
}

interface MyProps {
  showNew: boolean;
  setShowNew: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CauseNew({ showNew, setShowNew }: MyProps) {
  const { createCause } = useContext(causesContext);

  const [newCauseSchema, setNewCauseSchema] = useState<ICausesSchema>({
    type: "",
  });

  const formik = useFormik({
    initialValues: { newCauseSchema },
    onSubmit: async (values, { resetForm }) => {
      await createCause(values.newCauseSchema);
      resetForm();
      setShowNew(false);
    },
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (formik.values.newCauseSchema.type !== newCauseSchema.type) {
      timeoutId = setTimeout(() => {
        formik.handleSubmit();
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [formik.values.newCauseSchema.type]);

  return (
    <div className="rounded-md p-3 w-96 overflow-wrap break-word bg-white shadow-lg border-1 flex flex-col justify-start gap-x-2  gap-y-1 items-start text-xs">
      <div className="flex  justify-center items-center">
        <div className="p-1 border-1 rounded-full bg-gray-300">
          <HiSparkles />
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="inputCause"
              name="newCauseSchema.type"
              onBlur={formik.handleBlur}
              value={formik.values.newCauseSchema.type}
              onChange={formik.handleChange}
              placeholder="Sin lote"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
